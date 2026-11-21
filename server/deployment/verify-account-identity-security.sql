-- Read-only security assertions after account-identity-security.sql.
-- Expect ZERO rows. Run as a privileged migration reviewer after catalog bootstrap.
-- This query inspects metadata only; it never reads identities or secrets.
WITH protected_tables AS (
  SELECT expected.name, c.oid, c.relrowsecurity, c.relforcerowsecurity
  FROM (VALUES ('accounts'::text), ('account_identities'::text)) AS expected(name)
  LEFT JOIN pg_namespace n ON n.nspname = 'public'
  LEFT JOIN pg_class c ON c.relnamespace = n.oid
    AND c.relname = expected.name AND c.relkind = 'r'
), forbidden_roles AS (
  SELECT rolname FROM pg_roles
  WHERE rolname IN ('anon', 'authenticated', 'cec_catalog_reader')
), forbidden_privileges AS (
  SELECT 'SELECT' AS privilege UNION ALL SELECT 'INSERT'
  UNION ALL SELECT 'UPDATE' UNION ALL SELECT 'DELETE'
  UNION ALL SELECT 'TRUNCATE' UNION ALL SELECT 'REFERENCES'
  UNION ALL SELECT 'TRIGGER'
)
SELECT 'missing_table' AS issue, name AS object_name
FROM protected_tables WHERE oid IS NULL
UNION ALL
SELECT 'missing_rls', name
FROM protected_tables
WHERE oid IS NOT NULL AND (NOT relrowsecurity OR NOT relforcerowsecurity)
UNION ALL
SELECT 'forbidden_table_privilege', t.name || ':' || r.rolname || ':' || p.privilege
FROM protected_tables t CROSS JOIN forbidden_roles r
CROSS JOIN forbidden_privileges p
WHERE t.oid IS NOT NULL AND has_table_privilege(r.rolname, t.oid, p.privilege)
UNION ALL
SELECT 'forbidden_column_privilege', t.name || '.' || a.attname || ':' || r.rolname || ':' || p.privilege
FROM protected_tables t
JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum > 0 AND NOT a.attisdropped
CROSS JOIN forbidden_roles r
CROSS JOIN (VALUES ('SELECT'::text), ('INSERT'::text), ('UPDATE'::text), ('REFERENCES'::text)) p(privilege)
WHERE has_column_privilege(r.rolname, t.oid, a.attname, p.privilege)
UNION ALL
SELECT 'missing_identity_reader', 'cec_identity_reader'
WHERE NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'cec_identity_reader')
UNION ALL
SELECT 'unsafe_identity_reader_attributes', rolname
FROM pg_roles
WHERE rolname = 'cec_identity_reader'
  AND (rolcanlogin OR rolbypassrls OR rolsuper OR rolcreatedb OR rolcreaterole OR rolinherit)
UNION ALL
SELECT 'identity_reader_write_grant', t.name || ':' || p.privilege
FROM protected_tables t
CROSS JOIN (VALUES ('INSERT'::text), ('UPDATE'::text), ('DELETE'::text),
  ('TRUNCATE'::text), ('REFERENCES'::text), ('TRIGGER'::text)) p(privilege)
WHERE t.oid IS NOT NULL
  AND EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'cec_identity_reader')
  AND has_table_privilege('cec_identity_reader', t.oid, p.privilege)
UNION ALL
SELECT 'missing_reader_policy', t.name
FROM protected_tables t
WHERE t.oid IS NOT NULL AND NOT EXISTS (
  SELECT 1 FROM pg_policy pol JOIN pg_roles r ON r.oid = ANY(pol.polroles)
  WHERE pol.polrelid = t.oid AND pol.polcmd = 'r'
    AND r.rolname = 'cec_identity_reader'
)
ORDER BY issue, object_name;
