import { Pool } from 'pg'
import { buildApp } from './app.mjs'
import { PostgresCommunityRepository } from './communities/community-repository.mjs'

const port = Number(process.env.API_PORT ?? 3001)
const host = process.env.API_HOST ?? '127.0.0.1'
const databaseUrl = process.env.DATABASE_URL

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error('API_PORT must be an integer between 1 and 65535')
}

const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      max: 10,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30_000
    })
  : undefined

const app = buildApp({
  ...(pool ? { communityRepository: new PostgresCommunityRepository(pool) } : {})
})

if (pool) {
  app.addHook('onClose', async () => {
    await pool.end()
  })
}

try {
  await app.listen({ port, host })
} catch {
  await app.close()
  process.exitCode = 1
}
