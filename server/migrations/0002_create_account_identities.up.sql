-- Versioned schema baseline. Runtime identity grants and reader policies are
-- provisioned separately by server/deployment/account-identity-security.sql.
-- Do not expose either table to anon/authenticated or a public API.
CREATE TABLE public.accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL DEFAULT 'pending_verification'
    CONSTRAINT accounts_status_valid CHECK (
      status IN ('pending_verification', 'active', 'restricted', 'suspended', 'deleted')
    ),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.account_identities (
  provider text NOT NULL CONSTRAINT account_identities_provider_valid
    CHECK (provider = 'supabase'),
  subject text NOT NULL CONSTRAINT account_identities_subject_valid
    CHECK (length(subject) BETWEEN 1 AND 255),
  account_id uuid NOT NULL REFERENCES public.accounts(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (provider, subject),
  UNIQUE (provider, account_id)
);

CREATE INDEX account_identities_account_id_idx
  ON public.account_identities(account_id);

ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts FORCE ROW LEVEL SECURITY;
ALTER TABLE public.account_identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.account_identities FORCE ROW LEVEL SECURITY;

-- Supabase projects may have default privileges on newly created public tables.
-- Explicitly remove direct public access before any identity records exist.
REVOKE ALL ON TABLE public.accounts, public.account_identities FROM PUBLIC;

-- Supabase-specific role grants must be audited and revoked during deployment.
-- FORCE RLS with no policies denies access even when default role grants exist.

-- No SELECT policies are installed by this migration: deny by default.
-- Apply and verify dedicated reader grants only after security review.
