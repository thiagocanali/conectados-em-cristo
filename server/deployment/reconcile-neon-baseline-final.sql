-- Fail-closed baseline reconciliation. Run ONLY on an isolated validation branch.
BEGIN;
SELECT pg_advisory_xact_lock(19088743, 20261111);
DO $body$
DECLARE cols text[]; cons text[]; idx text[];
BEGIN
 SELECT array_agg(column_name ORDER BY ordinal_position) INTO cols FROM information_schema.columns WHERE table_schema='public' AND table_name='communities';
 IF cols IS DISTINCT FROM ARRAY['id','slug','name','category','description','rules_summary','status','catalog_visibility','join_mode','created_at','updated_at']::text[] THEN RAISE EXCEPTION 'Unexpected community columns/order: %',cols; END IF;
 IF EXISTS (
  SELECT 1 FROM (VALUES
   ('id','uuid','gen_random_uuid()'),('slug','character varying(80)',NULL),('name','character varying(100)',NULL),('category','character varying(60)',NULL),
   ('description','character varying(300)',$q$''::character varying$q$),('rules_summary','character varying(1200)',$q$''::character varying$q$),
   ('status','character varying(16)',$q$'draft'::character varying$q$),('catalog_visibility','character varying(16)',$q$'unlisted'::character varying$q$),
   ('join_mode','character varying(16)',$q$'approval'::character varying$q$),('created_at','timestamp with time zone','now()'),('updated_at','timestamp with time zone','now()')
  ) e(n,t,d)
  LEFT JOIN LATERAL (SELECT format_type(a.atttypid,a.atttypmod) t,pg_get_expr(ad.adbin,ad.adrelid) d FROM pg_attribute a LEFT JOIN pg_attrdef ad ON ad.adrelid=a.attrelid AND ad.adnum=a.attnum WHERE a.attrelid='public.communities'::regclass AND a.attname=e.n AND a.attnum>0 AND NOT a.attisdropped) a ON true
  WHERE a.t IS DISTINCT FROM e.t OR a.d IS DISTINCT FROM e.d
 ) THEN RAISE EXCEPTION 'Column type/default drift'; END IF;
 SELECT array_agg(conname ORDER BY conname) INTO cons FROM pg_constraint WHERE conrelid='public.communities'::regclass;
 IF cons IS DISTINCT FROM ARRAY['communities_catalog_visibility_valid','communities_category_not_blank','communities_join_mode_valid','communities_name_not_blank','communities_pkey','communities_slug_format','communities_slug_key','communities_status_valid']::text[] THEN RAISE EXCEPTION 'Constraint set mismatch: %',cons; END IF;
 IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_pkey' AND pg_get_constraintdef(oid)='PRIMARY KEY (id)') OR NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_slug_key' AND pg_get_constraintdef(oid)='UNIQUE (slug)') THEN RAISE EXCEPTION 'Key definition mismatch'; END IF;
 IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_slug_format' AND pg_get_constraintdef(oid) LIKE '%^[a-z0-9]+(-[a-z0-9]+)*$%') OR NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_name_not_blank' AND pg_get_constraintdef(oid) LIKE '%char_length(btrim%name%') OR NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_category_not_blank' AND pg_get_constraintdef(oid) LIKE '%char_length(btrim%category%') OR NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_status_valid' AND pg_get_constraintdef(oid) LIKE '%draft%active%paused%archived%') OR NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_catalog_visibility_valid' AND pg_get_constraintdef(oid) LIKE '%listed%unlisted%') OR NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.communities'::regclass AND conname='communities_join_mode_valid' AND pg_get_constraintdef(oid) LIKE '%open%approval%') THEN RAISE EXCEPTION 'Check constraint definition mismatch'; END IF;
 SELECT array_agg(indexname ORDER BY indexname) INTO idx FROM pg_indexes WHERE schemaname='public' AND tablename='communities';
 IF idx IS DISTINCT FROM ARRAY['communities_pkey','communities_public_catalog_order_idx','communities_slug_key']::text[] OR NOT EXISTS(SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='communities_public_catalog_order_idx' AND indexdef LIKE '%(name COLLATE "C", id)%' AND indexdef LIKE '%status)%active%' AND indexdef LIKE '%catalog_visibility)%listed%') THEN RAISE EXCEPTION 'Index definition mismatch: %',idx; END IF;
 IF EXISTS(SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='schema_migrations') AND EXISTS(SELECT 1 FROM public.schema_migrations) THEN RAISE EXCEPTION 'Migration history is not empty'; END IF;
END $body$;
CREATE TABLE IF NOT EXISTS public.schema_migrations(version TEXT PRIMARY KEY,applied_at TIMESTAMPTZ NOT NULL DEFAULT now());
INSERT INTO public.schema_migrations(version) VALUES('0001_create_communities');
COMMIT;
