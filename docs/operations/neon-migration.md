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

1. Review and explicitly apply `server/deployment/0002_neon_catalog_security.sql` as a separate security rollout; verify privileges with a non-owner connection. It is intentionally excluded from automatic `api:migrate` runs because the current database integration tests exercise owner writes and require a dedicated RLS test harness.
2. Prepare Neon-based authentication with a reviewed migration and integration tests, replacing Supabase Auth assumptions.
3. Configure **branch-scoped preview** `DATABASE_URL` in Vercel secret settings, with SSL verification. Never commit or print a connection string. Keep production settings untouched.
4. Validate readiness 200, catalog 200, authorization and complete user journeys in a deliberate `[preview]` build only after CI passes.
5. Audit old Supabase dependencies, rollback plan, backup/restore and data ownership before requesting any production cutover.

The database schema was provisioned via the Neon SQL API. Its versioned migration file already exists in Git, but Neon does not yet contain the app migration runner's `schema_migrations` history. Reconcile that history before running `npm run api:migrate` against Neon. Never run destructive local test migrations against this project.

## Security validation gate

After the reviewed security script is applied, run `server/deployment/verify-neon-catalog-security.sql` as an administrative read-only query. All returned booleans must be true. This verifies role attributes, forced RLS, the catalog SELECT policy, and absence of write privileges. Separately test that a dedicated non-owner login can read listed communities but cannot access draft/unlisted rows or perform writes; a role grant audit alone does not prove end-to-end row isolation.

**CI evidence:** PR #83 commit `b3a70455` passed all six GitHub Actions checks. Later commits require their own checks before they can be marked validated.

## Bootstrap migration safety

The CLI now rejects a database where `public.communities` already exists but the migration history is empty. This applies to the Neon project created during this migration: **do not execute `npm run api:migrate` against its main branch yet**. Reconcile the baseline only after verifying the live schema against `0001_create_communities.up.sql` and recording `0001_create_communities` in `schema_migrations` through a reviewed, transactional administrative procedure. Never drop the existing table to make migrations pass. This safeguard does not replace a complete schema-drift audit.

## Baseline audit evidence (2026-11-15)

Executed `server/deployment/verify-neon-baseline.sql` against Neon project `autumn-wildflower-26404631`, database `conectados` using read-only SQL. All 11 expected column names/types/nullability, eight expected named constraints, and the catalog index returned `valid=true`. `history_table_present` returned `false`, as expected before migration history reconciliation. The query checks *existence*, not full constraint/index expressions or column length/defaults; compare full `pg_get_constraintdef`, `pg_get_indexdef`, defaults and character limits before recording the baseline. No schema or data was modified during this audit.

### Living work queue

| Priority | Task | Status | Evidence / next action |
|---|---|---|---|
| P0 | Neon baseline reconciliation | In progress | Columns, named constraints and index verified; audit expressions/defaults and then record history transactionally |
| P0 | Independent authentication | Pending | Choose and implement Better Auth + PostgreSQL, secure sessions, password reset and verification; test end to end |
| P0 | Per-user authorization | Pending | Build identity schema and non-owner integration tests before activating RLS |
| P0 | Neon preview connection | Blocked | Configure dedicated scoped secrets without touching production; run hosted readiness and catalog checks |
| P1 | Remove Supabase dependencies | Pending | Audit remaining PRs/docs and replace only after functional parity |
| P1 | Full regression and rollout | Pending | Validate latest CI SHA, preview journeys and rollback; production requires separate approval |

### Detailed schema audit (2026-11-15)

Executed `server/deployment/verify-neon-baseline-details.sql` read-only against `conectados`: all **11** full column types (including VARCHAR length limits) and defaults matched the expected baseline, and the partial catalog index predicate/ordering check passed (**12/12 true**). Separately inspected all eight constraint definitions via `pg_get_constraintdef`: primary key, slug uniqueness, slug regex, nonblank name/category and status/visibility/join-mode checks correspond to migration 0001. This does not yet record `schema_migrations`; the baseline guard remains active. Before a baseline write, ensure a reviewed transaction checks schema drift and inserts the history row atomically.

## Batch execution 2026-11-15

1. **Validated:** commit `6c76164a` had six successful GitHub Actions jobs, including Unit tests / API typecheck and build.
2. **Prepared, not applied:** `server/deployment/reconcile-neon-baseline.sql` is a transactional, fail-closed baseline history procedure. It is intentionally **not** run against Neon yet. First perform complete definition-level comparison of every constraint and default and verify no concurrent schema changes; its current count-based guard alone is insufficient to prove schema equivalence.
3. **Decision recorded:** `docs/decisions/0015-neon-better-auth.md` supersedes historical D-14 provider preference. Auth integration, email verification, MFA, CSRF and session tests remain pending.
4. **Next:** add executable baseline definition checks, test reconciliation on disposable PostgreSQL, then run it only in the isolated Neon project after verification. Do not apply against production.
5. **Next:** implement Better Auth schema and Fastify session adapter with tests. Do not claim registration/login is available before end-to-end verification.
