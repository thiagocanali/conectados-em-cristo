-- Destructive rollback. Run only after verifying that no real accounts exist.
-- This deliberately does not remove roles or policies provisioned separately.
DROP TABLE IF EXISTS public.account_identities;
DROP TABLE IF EXISTS public.accounts;
