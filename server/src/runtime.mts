import { Pool, type PoolConfig } from 'pg'
import { buildApp } from './app.mjs'
import { PostgresCommunityRepository } from './communities/community-repository.mjs'

export function databasePoolConfig(databaseUrl: string, poolMax: number, sslCa?: string): PoolConfig {
  if (sslCa) {
    // pg replaces the entire ssl object when URL SSL options are present,
    // which can silently discard our CA or certificate validation settings.
    const parameters = new URL(databaseUrl).searchParams
    if ([...parameters.keys()].some(key => key.toLowerCase().startsWith('ssl') || key === 'uselibpqcompat')) {
      throw new Error('Remove URL SSL parameters when DATABASE_SSL_CA is configured.')
    }
  }

  return {
    connectionString: databaseUrl,
    max: poolMax,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 1000,
    allowExitOnIdle: true,
    ...(sslCa ? { ssl: { ca: sslCa, rejectUnauthorized: true } } : {})
  }
}

// One pool per application instance, shared across concurrent requests.
export function buildRuntimeApp(databaseUrl = process.env.DATABASE_URL, poolMax = 10, sslCa = process.env.DATABASE_SSL_CA) {
  const pool = databaseUrl ? new Pool(databasePoolConfig(databaseUrl, poolMax, sslCa)) : undefined

  const app = buildApp({
    ...(pool ? { communityRepository: new PostgresCommunityRepository(pool) } : {})
  })

  if (pool) {
    // Idle connection failures must not crash other in-flight requests or leak credentials.
    pool.on('error', () => { console.error('Idle database connection failed.') })
    app.addHook('onClose', async () => { await pool.end() })
  }

  return app
}
