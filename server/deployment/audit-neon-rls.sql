-- Read-only audit of catalog isolation before any preview traffic.
-- The Neon database owner bypasses RLS unless FORCE ROW LEVEL SECURITY is enabled.
SELECT
  c.relname AS table_name,
  c.relrowsecurity AS rls_enabled,
  c.relforcerowsecurity AS rls_forced,
  pg_get_userbyid(c.relowner) AS table_owner,
  (SELECT count(*)::int FROM pg_policies p
   WHERE p.schemaname='public' AND p.tablename='communities') AS policy_count,
  EXISTS (
    SELECT 1 FROM pg_roles WHERE rolname='cec_catalog_reader'
    AND NOT rolcanlogin AND NOT rolbypassrls
  ) AS restricted_reader_exists
FROM pg_class c
WHERE c.oid='public.communities'::regclass;
