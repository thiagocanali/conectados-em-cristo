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
SELECT 'missing_identity_reader', 'cec_identity_reader'
WHERE NOT EXISTS (
  SELECT 1 FROM pg_roles
  WHERE rolname = 'cec_identity_reader' AND rolcanlogin = false AND rolbypassrls = false
);
