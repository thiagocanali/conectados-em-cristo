-- Apply after 0001_create_communities.up.sql in a dedicated Supabase environment.
-- Provision the login credential separately; never record passwords in migrations.
CREATE ROLE cec_catalog_reader
  NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS
  CONNECTION LIMIT 10;

ALTER ROLE cec_catalog_reader SET search_path = public, pg_catalog;
ALTER ROLE cec_catalog_reader SET statement_timeout = '5s';
ALTER ROLE cec_catalog_reader SET default_transaction_read_only = on;

REVOKE CREATE ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO cec_catalog_reader;
REVOKE ALL ON TABLE public.communities FROM PUBLIC, anon, authenticated;
GRANT SELECT (
  id, slug, name, category, description, rules_summary, join_mode,
  status, catalog_visibility
) ON TABLE public.communities TO cec_catalog_reader;

ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities FORCE ROW LEVEL SECURITY;

CREATE POLICY catalog_reader_public_communities
  ON public.communities
  FOR SELECT TO cec_catalog_reader
  USING (status = 'active' AND catalog_visibility = 'listed');

-- Let the existing administrative role validate the runtime permissions.
GRANT cec_catalog_reader TO postgres;
