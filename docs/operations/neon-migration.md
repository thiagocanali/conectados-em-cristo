# Neon PostgreSQL migration — Conectados em Cristo

## Verified provisioning (2026-11-15)

- Neon project: `autumn-wildflower-26404631`, name `conectados-em-cristo`
- Region: `aws-sa-east-1`; PostgreSQL 17; database `conectados`; default branch `main`.
- Schema `public.communities` and `communities_public_catalog_order_idx` created from `server/migrations/0001_create_communities.up.sql`. Verified `SELECT count(*)` returned 0.
- **Not production cutover.** Vercel production remains unchanged, Supabase remains available for rollback.

## Dependency inventory and architecture decisions

- The currently deployed API uses `pg` with `DATABASE_URL` and optional `DATABASE_SSL_CA`. The public catalog query is plain PostgreSQL and can use Neon without changing the repository contract.
- `server/deployment/supabase-catalog-security.sql` and `docs/operations/vercel-supabase-readiness.md` are Supabase-specific operational artifacts; replace their procedures with provider-neutral Neon grants/RLS before cutover.
- Existing authentication in `server/src/auth` is a domain-level identity/authorization contract, **not a complete production login system**. Pending PRs #76–#79 contain Supabase Auth integrations and identity schema proposals; do not merge Supabase-dependent adapters into the new architecture.
- The frontend includes demo auth (`src/services/demoAuth.mjs`, `src/router/demoAuthGuard.mjs`); it is not a substitute for secure user authentication.
- No production Storage/Realtime/Edge Functions integration was established in the reviewed runtime paths. Confirm any other usage before declaring migration complete.
- Better Auth + PostgreSQL is the preferred self-hosted candidate; implement and test sessions, email verification/recovery, account isolation and authorization before changing production traffic.

## Next controlled stages

1. Create a least-privilege Neon runtime role and versioned security migration; verify privileges with a non-owner connection.
2. Prepare Neon-based authentication with a reviewed migration and integration tests, replacing Supabase Auth assumptions.
3. Configure **branch-scoped preview** `DATABASE_URL` in Vercel secret settings, with SSL verification. Never commit or print a connection string. Keep production settings untouched.
4. Validate readiness 200, catalog 200, authorization and complete user journeys in a deliberate `[preview]` build only after CI passes.
5. Audit old Supabase dependencies, rollback plan, backup/restore and data ownership before requesting any production cutover.

The database schema was provisioned via the Neon SQL API. Its versioned migration file already exists in Git, but Neon does not yet contain the app migration runner's `schema_migrations` history. Reconcile that history before running `npm run api:migrate` against Neon. Never run destructive local test migrations against this project.
