-- Neon runtime catalog permissions; apply after 0001_create_communities.
-- NOLOGIN role prevents direct password-based use. Grant membership only to a
-- dedicated login role after secure provisioning, never to the schema owner.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'cec_catalog_reader') THEN
    CREATE ROLE cec_catalog_reader NOLOGIN NOBYPASSRLS;
  END IF;
END $$;

REVOKE ALL ON TABLE public.communities FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO cec_catalog_reader;
GRANT SELECT (id, slug, name, category, description, rules_summary, join_mode, status, catalog_visibility)
  ON public.communities TO cec_catalog_reader;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS communities_catalog_read ON public.communities;
CREATE POLICY communities_catalog_read ON public.communities
  FOR SELECT TO cec_catalog_reader
  USING (status = 'active' AND catalog_visibility = 'listed');
