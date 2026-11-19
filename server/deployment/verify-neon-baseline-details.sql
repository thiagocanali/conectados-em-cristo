-- Read-only drift audit for the existing Neon baseline.
-- Every returned row must have valid=true before marking 0001 applied.
WITH expected(name, full_type, default_expr) AS (
 VALUES
 ('id','uuid','gen_random_uuid()'),
 ('slug','character varying(80)',NULL),
 ('name','character varying(100)',NULL),
 ('category','character varying(60)',NULL),
 ('description','character varying(300)',E'\'\'::character varying'),
 ('rules_summary','character varying(1200)',E'\'\'::character varying'),
 ('status','character varying(16)',E'\'draft\'::character varying'),
 ('catalog_visibility','character varying(16)',E'\'unlisted\'::character varying'),
 ('join_mode','character varying(16)',E'\'approval\'::character varying'),
 ('created_at','timestamp with time zone','now()'),
 ('updated_at','timestamp with time zone','now()')
), actual AS (
 SELECT a.attname AS name, format_type(a.atttypid,a.atttypmod) AS full_type,
        pg_get_expr(d.adbin,d.adrelid) AS default_expr
 FROM pg_attribute a
 LEFT JOIN pg_attrdef d ON d.adrelid=a.attrelid AND d.adnum=a.attnum
 WHERE a.attrelid='public.communities'::regclass AND a.attnum>0 AND NOT a.attisdropped
)
SELECT 'column' AS kind,e.name,(a.full_type=e.full_type AND a.default_expr IS NOT DISTINCT FROM e.default_expr) AS valid
FROM expected e LEFT JOIN actual a USING(name)
UNION ALL
SELECT 'unexpected_column',a.name,false FROM actual a LEFT JOIN expected e USING(name) WHERE e.name IS NULL
UNION ALL
SELECT 'catalog_index','communities_public_catalog_order_idx',
       EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='communities_public_catalog_order_idx'
       AND indexdef LIKE '%(name COLLATE "C", id) WHERE%'
       AND indexdef LIKE '%status%'
       AND indexdef LIKE '%catalog_visibility%');
