# Vercel preview deployment budget

GitHub Actions is the default validation gate for every PR: lint, typecheck, API tests, PostgreSQL tests, build, audit and browser journeys.

## Current Vercel project policy

The Vercel project uses **Ignored Build Step** with this shell command:

```sh
if [ "$VERCEL_ENV" = "production" ] || [ "$VERCEL_GIT_COMMIT_REF" = "main" ]; then exit 1; fi; case "$VERCEL_GIT_COMMIT_MESSAGE" in *"[preview]"*) exit 1 ;; *) exit 0 ;; esac
```

Vercel's ignored-build exit codes are counterintuitive: **0 skips** the deployment, **1 builds**. Production and `main` are always built. Other branches are skipped unless their *latest commit message* contains the exact marker `[preview]`.

## Workflow

1. Commit and push cohesive code changes normally. GitHub Actions validates them without requiring a preview.
2. Only after CI passes and a hosted validation is necessary, push a reviewed no-op commit with `[preview]` in its message, e.g. `chore: request hosted verification [preview]`. This creates a deployment of the latest branch state.
3. Verify the exact deployed SHA and run hosted HTTP checks. READY alone does not prove database connectivity.
4. Never use production credentials for preview. If staging credentials are missing, continue local and GitHub Actions tests; do not trigger repeated previews.
5. Keep deployment-protection settings intact. Do not use force deploys to work around quota limits.

**Caveat:** This is a Vercel project setting, not a GitHub Actions gate. The Vercel platform still receives Git events and may record skipped deployments; verify the actual quota impact in the Vercel dashboard. An explicit manual deployment is a separate workflow.

**Rollback:** Remove the Ignored Build Step setting in Vercel Project Settings > Git > Ignored Build Step if the policy interferes with necessary preview validation. Do not change production branch settings.
