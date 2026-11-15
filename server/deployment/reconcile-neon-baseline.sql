-- One-time baseline reconciliation for an isolated Neon validation branch only.
-- Records an already-existing schema; does not modify communities.
BEGIN;
SELECT pg_advisory_xact_lock(19088743, 20261111);
DO $$
DECLARE
  expected_columns text[] := ARRAY['id','slug','name','category','description','rules_summary','status','catalog_visibility','join_mode','created_at','updated_at'];
  actual_columns text[];
  expected_constraints text[] := ARRAY['communities_catalog_visibility_valid','communities_category_not_blank','communities_join_mode_valid','communities_name_not_blank','communities_pkey','communities_slug_format','communities_slug_key','communities_status_valid'];
  actual_constraints text[];
  actual_indexes text[];
BEGIN
  IF to_regclass('public.communities') IS NULL THEN RAISE EXCEPTION 'communities table missing'; END IF;
  SELECT array_agg(column_name ORDER BY ordinal_position) INTO actual_columns
    FROM information_schema.columns WHERE table_schema='public' AND table_name='communities';
  IF actual_columns IS DISTINCT FROM expected_columns THEN RAISE EXCEPTION 'Column names/order mismatch: %', actual_columns; END IF;
  IF EXISTS (
    SELECT 1 FROM (VALUES
      ('id','uuid','gen_random_uuid()'),
      ('slug','character varying(80)',NULL),
      ('name','character varying(100)',NULL),
      ('category','character varying(60)',NULL),
      ('description','character varying(300)',$$''::character varying$$),
      ('rules_summary','character varying(1200)',$$''::character varying$$),
      ('status','character varying(16)',$$'draft'::character varying$$),
      ('catalog_visibility','character varying(16)',$$'unlisted'::character varying$$),
      ('join_mode','character varying(16)',$$'approval'::character varying$$),
      ('created_at','timestamp with time zone','now()'),
      ('updated_at','timestamp with time zone','now()')
    ) AS e(name,expected_type,expected_default)
    LEFT JOIN LATERAL (
      SELECT format_type(a.atttypid,a.atttypmod) AS actual_type,
             pg_get_expr(d.adbin,d.adrelid) AS actual_default
      FROM pg_attribute a LEFT JOIN pg_attrdef d ON d.adrelid=a.attrelid AND d.adnum=a.attnum
      WHERE a.attrelid='public.communities'::regclass AND a.attname=e.name AND a.attnum>0 AND NOT a.attisdropped
    ) a ON true
    WHERE a.actual_type IS DISTINCT FROM e.expected_type
       OR a.actual_default IS DISTINCT FROM e.expected_default
  ) THEN RAISE EXCEPTION 'Column type/default mismatch'; END IF;
  SELECT array_agg(conname ORDER BY conname) INTO actual_constraints
    FROM pg_constraint WHERE conrelid='public.communities'::regclass;
  IF actual_constraints IS DISTINCT FROM expected_constraints THEN RAISE EXCEPTION 'Constraint names mismatch: %', actual_constraints; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_pkey' AND pg_get_constraintdef(oid)='PRIMARY KEY (id)') THEN RAISE EXCEPTION 'Primary key mismatch'; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_slug_key' AND pg_get_constraintdef(oid)='UNIQUE (slug)') THEN RAISE EXCEPTION 'Slug unique constraint mismatch'; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_slug_format' AND pg_get_constraintdef(oid) LIKE '%^[a-z0-9]+(-[a-z0-9]+)*$%') THEN RAISE EXCEPTION 'Slug check mismatch'; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_name_not_blank' AND pg_get_constraintdef(oid) LIKE '%char_length(btrim%name%') THEN RAISE EXCEPTION 'Name check mismatch'; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_category_not_blank' AND pg_get_constraintdef(oid) LIKE '%char_length(btrim%category%') THEN RAISE EXCEPTION 'Category check mismatch'; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_status_valid' AND pg_get_constraintdef(oid) LIKE '%draft%active%paused%archived%') THEN RAISE EXCEPTION 'Status check mismatch'; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_catalog_visibility_valid' AND pg_get_constraintdef(oid) LIKE '%listed%unlisted%') THEN RAISE EXCEPTION 'Visibility check mismatch'; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_join_mode_valid' AND pg_get_constraintdef(oid) LIKE '%open%approval%') THEN RAISE EXCEPTION 'Join mode check mismatch'; END IF;
  SELECT array_agg(indexname ORDER BY indexname) INTO actual_indexes FROM pg_indexes WHERE schemaname='public' AND tablename='communities';
  IF actual_indexes IS DISTINCT FROM ARRAY['communities_pkey','communities_public_catalog_order_idx','communities_slug_key']::text[] THEN RAISE EXCEPTION 'Index names mismatch: %', actual_indexes; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='communities_public_catalog_order_idx' AND indexdef LIKE '%(name COLLATE "C", id)%' AND indexdef LIKE '%status = ''active''%' AND indexdef LIKE '%catalog_visibility = ''listed''%') THEN RAISE EXCEPTION 'Catalog index definition mismatch'; END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='schema_migrations') THEN
    IF EXISTS (SELECT 1 FROM public.schema_migrations) THEN RAISE EXCEPTION 'Migration history is not empty'; END IF;
  ELSE
    CREATE TABLE public.schema_migrations (version TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now());
  END IF;
END $$;
INSERT INTO public.schema_migrations(version) VALUES ('0001_create_communities');
COMMIT;
