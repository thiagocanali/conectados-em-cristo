-- Read-only verification before recording a pre-existing 0001 baseline.
-- Review every row: this checks columns, required constraints, and index presence.
WITH expected_columns(name, type_name, nullable) AS (
 VALUES
 ('id','uuid',false),
 ('slug','character varying',false),
 ('name','character varying',false),
 ('category','character varying',false),
 ('description','character varying',false),
 ('rules_summary','character varying',false),
 ('status','character varying',false),
 ('catalog_visibility','character varying',false),
 ('join_mode','character varying',false),
 ('created_at','timestamp with time zone',false),
 ('updated_at','timestamp with time zone',false)
), actual_columns AS (
 SELECT column_name, data_type, is_nullable = 'YES' AS nullable
 FROM information_schema.columns
 WHERE table_schema = 'public' AND table_name = 'communities'
), expected_constraints(name) AS (
 VALUES ('communities_pkey'),('communities_slug_key'),
 ('communities_slug_format'),('communities_name_not_blank'),
 ('communities_category_not_blank'),('communities_status_valid'),
 ('communities_catalog_visibility_valid'),('communities_join_mode_valid')
)
SELECT 'column' AS object_type, e.name AS object_name,
       (a.column_name IS NOT NULL AND a.data_type=e.type_name AND a.nullable=e.nullable) AS valid
FROM expected_columns e LEFT JOIN actual_columns a ON a.column_name=e.name
UNION ALL
SELECT 'unexpected_column', a.column_name, false
FROM actual_columns a LEFT JOIN expected_columns e ON e.name=a.column_name
WHERE e.name IS NULL
UNION ALL
SELECT 'constraint', e.name, EXISTS (
 SELECT 1 FROM pg_constraint c
 WHERE c.conrelid='public.communities'::regclass AND c.conname=e.name
)
FROM expected_constraints e
UNION ALL
SELECT 'index', 'communities_public_catalog_order_idx',
       to_regclass('public.communities_public_catalog_order_idx') IS NOT NULL
UNION ALL
SELECT 'migration_history', '0001_create_communities',
       EXISTS (SELECT 1 FROM information_schema.tables
               WHERE table_schema='public' AND table_name='schema_migrations');
