-- Staging-only preparation script. Review and execute as a privileged migration
-- operator after catalog bootstrap. Never run as the public API runtime role.
-- This script does NOT provision login credentials or create public endpoints.
BEGIN;

CREATE TABLE IF NOT EXISTS public.accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL DEFAULT 'pending_verification'
    CHECK (status IN ('pending_verification', 'active', 'restricted', 'suspended', 'deleted')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.account_identities (
  provider text NOT NULL CHECK (provider IN ('supabase')),
  subject text NOT NULL CHECK (length(subject) BETWEEN 1 AND 255),
  account_id uuid NOT NULL REFERENCES public.accounts(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (provider, subject),
  UNIQUE (provider, account_id)
);

CREATE INDEX IF NOT EXISTS account_identities_account_id_idx
  ON public.account_identities(account_id);

ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts FORCE ROW LEVEL SECURITY;
ALTER TABLE public.account_identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.account_identities FORCE ROW LEVEL SECURITY;

-- The public Data API and existing catalog reader must not access identities.
REVOKE ALL ON TABLE public.accounts, public.account_identities
  FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.accounts, public.account_identities
  FROM cec_catalog_reader;

-- Provision this NOLOGIN role separately from credentials. It is intentionally
-- not a BYPASSRLS role and receives read-only column-level grants.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'cec_identity_reader') THEN
    CREATE ROLE cec_identity_reader NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE
      NOINHERIT NOBYPASSRLS CONNECTION LIMIT 10;
  END IF;
END $$;

GRANT USAGE ON SCHEMA public TO cec_identity_reader;
GRANT SELECT (id, status) ON TABLE public.accounts TO cec_identity_reader;
GRANT SELECT (provider, subject, account_id) ON TABLE public.account_identities
  TO cec_identity_reader;

CREATE POLICY identity_reader_accounts ON public.accounts
  FOR SELECT TO cec_identity_reader USING (true);
CREATE POLICY identity_reader_mappings ON public.account_identities
  FOR SELECT TO cec_identity_reader USING (true);

-- The identity reader can resolve any account by trusted provider subject.
-- It must NEVER be used by a browser, public Data API, or untrusted query API.
COMMIT;
