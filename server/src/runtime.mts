import { Pool } from 'pg'
import { buildApp } from './app.mjs'
import { PostgresCommunityRepository } from './communities/community-repository.mjs'

// One pool per application instance, shared across concurrent requests.
export function buildRuntimeApp(databaseUrl = process.env.DATABASE_URL, poolMax = 10) {
  const pool = databaseUrl
    ? new Pool({
        connectionString: databaseUrl,
        max: poolMax,
        connectionTimeoutMillis: 5000,
        idleTimeoutMillis: 1000,
        allowExitOnIdle: true
      })
    : undefined

  const communityRepository = pool ? new PostgresCommunityRepository(pool) : undefined
  const app = buildApp({
    ...(communityRepository ? {
      communityRepository,
      // Check the exact public catalog query and its column grants, not just SELECT 1.
      databaseReadinessCheck: async () => { await communityRepository.listPublic({ limit: 1 }) }
    } : {})
  })

  if (pool) {
    // Idle connection failures must not crash other in-flight requests or leak credentials.
    pool.on('error', () => { console.error('Idle database connection failed.') })
    app.addHook('onClose', async () => { await pool.end() })
  }

  return app
}
