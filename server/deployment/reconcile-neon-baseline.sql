-- One-time baseline reconciliation. REVIEW before execution on the isolated Neon
-- database. This script does not modify the communities table.
BEGIN;
SELECT pg_advisory_xact_lock(19088743, 20261111);
DO $$
DECLARE
  columns_ok integer;
  constraints_ok integer;
  indexes_ok integer;
BEGIN
  SELECT count(*) INTO columns_ok
  FROM information_schema.columns
  WHERE table_schema='public' AND table_name='communities';
  SELECT count(*) INTO constraints_ok FROM pg_constraint
  WHERE conrelid='public.communities'::regclass;
  SELECT count(*) INTO indexes_ok FROM pg_indexes
  WHERE schemaname='public' AND tablename='communities';
  IF columns_ok <> 11 OR constraints_ok <> 8 OR indexes_ok <> 3 THEN
    RAISE EXCEPTION 'Neon baseline mismatch: columns %, constraints %, indexes %',
      columns_ok, constraints_ok, indexes_ok;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname='public'
    AND indexname='communities_public_catalog_order_idx'
    AND indexdef LIKE '%(name COLLATE "C", id) WHERE%'
  ) THEN
    RAISE EXCEPTION 'Neon catalog index definition mismatch';
  END IF;
END $$;
CREATE TABLE IF NOT EXISTS public.schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.schema_migrations) THEN
    RAISE EXCEPTION 'Refusing baseline reconciliation: migration history is not empty';
  END IF;
END $$;
INSERT INTO public.schema_migrations(version) VALUES ('0001_create_communities');
COMMIT;
