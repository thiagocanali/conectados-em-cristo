-- Run after 0002_neon_catalog_security.sql, using an administrative
-- read-only SQL session. All booleans should be true.
SELECT
  EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'cec_catalog_reader'
          AND NOT rolcanlogin AND NOT rolbypassrls) AS reader_is_nonlogin_and_nonbypass,
  (SELECT relrowsecurity AND relforcerowsecurity
   FROM pg_class WHERE oid = 'public.communities'::regclass) AS rls_enabled_and_forced,
  EXISTS (SELECT 1 FROM pg_policies
          WHERE schemaname = 'public' AND tablename = 'communities'
            AND policyname = 'communities_catalog_read'
            AND cmd = 'SELECT' AND 'cec_catalog_reader' = ANY(roles)) AS catalog_select_policy_present,
  has_table_privilege('cec_catalog_reader', 'public.communities', 'SELECT') AS reader_can_select,
  NOT has_table_privilege('cec_catalog_reader', 'public.communities', 'INSERT') AS reader_cannot_insert,
  NOT has_table_privilege('cec_catalog_reader', 'public.communities', 'UPDATE') AS reader_cannot_update,
  NOT has_table_privilege('cec_catalog_reader', 'public.communities', 'DELETE') AS reader_cannot_delete;
