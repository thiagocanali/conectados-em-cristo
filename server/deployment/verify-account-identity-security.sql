-- Read-only staging assertions to run after account-identity-security.sql.
-- Expect no rows. This script never reads account data or secrets.
SELECT 'missing_rls' AS issue, c.relname AS object_name
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname IN ('accounts', 'account_identities')
  AND c.relkind = 'r'
  AND (NOT c.relrowsecurity OR NOT c.relforcerowsecurity)
UNION ALL
SELECT 'public_table_grant', c.relname
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname IN ('accounts', 'account_identities')
  AND (
    has_table_privilege('anon', c.oid, 'SELECT')
    OR has_table_privilege('authenticated', c.oid, 'SELECT')
    OR has_table_privilege('cec_catalog_reader', c.oid, 'SELECT')
  )
UNION ALL
-- Table-level SELECT checks alone miss column-level grants.
SELECT 'public_column_grant', c.table_name || '.' || c.column_name
FROM information_schema.columns AS c
WHERE c.table_schema = 'public'
  AND c.table_name IN ('accounts', 'account_identities')
  AND (
    has_column_privilege('anon', format('%I.%I', c.table_schema, c.table_name), c.column_name, 'SELECT')
    OR has_column_privilege('authenticated', format('%I.%I', c.table_schema, c.table_name), c.column_name, 'SELECT')
    OR has_column_privilege('cec_catalog_reader', format('%I.%I', c.table_schema, c.table_name), c.column_name, 'SELECT')
  )
UNION ALL
SELECT 'missing_identity_reader', 'cec_identity_reader'
WHERE NOT EXISTS (
  SELECT 1 FROM pg_roles
  WHERE rolname = 'cec_identity_reader' AND rolcanlogin = false AND rolbypassrls = false
);
