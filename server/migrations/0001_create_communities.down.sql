DROP INDEX IF EXISTS communities_public_catalog_order_idx;
DROP TABLE IF EXISTS communities;
DELETE FROM schema_migrations WHERE version = '0001_create_communities';
