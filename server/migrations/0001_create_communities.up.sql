CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(60) NOT NULL,
  description VARCHAR(300) NOT NULL DEFAULT '',
  rules_summary VARCHAR(1200) NOT NULL DEFAULT '',
  status VARCHAR(16) NOT NULL DEFAULT 'draft',
  catalog_visibility VARCHAR(16) NOT NULL DEFAULT 'unlisted',
  join_mode VARCHAR(16) NOT NULL DEFAULT 'approval',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT communities_slug_format
    CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  CONSTRAINT communities_name_not_blank
    CHECK (char_length(btrim(name)) > 0 AND name = btrim(name)),
  CONSTRAINT communities_category_not_blank
    CHECK (char_length(btrim(category)) > 0 AND category = btrim(category)),
  CONSTRAINT communities_status_valid
    CHECK (status IN ('draft', 'active', 'paused', 'archived')),
  CONSTRAINT communities_catalog_visibility_valid
    CHECK (catalog_visibility IN ('listed', 'unlisted')),
  CONSTRAINT communities_join_mode_valid
    CHECK (join_mode IN ('open', 'approval'))
);

CREATE INDEX communities_public_catalog_order_idx
  ON communities (name COLLATE "C", id)
  WHERE status = 'active' AND catalog_visibility = 'listed';
