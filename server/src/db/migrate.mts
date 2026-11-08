import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Pool } from 'pg'

const defaultMigrationsDirectory = fileURLToPath(new URL('../../migrations/', import.meta.url))

export async function applyMigrations(pool: Pool, migrationsDirectory = defaultMigrationsDirectory): Promise<string[]> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `)

  const files = (await readdir(migrationsDirectory))
    .filter(file => file.endsWith('.up.sql'))
    .sort()
  const appliedVersions: string[] = []

  for (const file of files) {
    const version = file.slice(0, -'.up.sql'.length)
    const sql = await readFile(resolve(migrationsDirectory, file), 'utf8')
    const client = await pool.connect()

    try {
      await client.query('BEGIN')
      const existing = await client.query(
        'SELECT version FROM schema_migrations WHERE version = $1',
        [version]
      )

      if (existing.rowCount === 0) {
        await client.query(sql)
        await client.query('INSERT INTO schema_migrations (version) VALUES ($1)', [version])
        appliedVersions.push(version)
      }

      await client.query('COMMIT')
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }

  return appliedVersions
}

async function runCli(): Promise<void> {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is required to run database migrations')
  }

  const pool = new Pool({ connectionString, max: 1, connectionTimeoutMillis: 5000 })
  try {
    const applied = await applyMigrations(pool)
    for (const version of applied) process.stdout.write(`Applied migration ${version}\n`)
    if (applied.length === 0) process.stdout.write('Database schema is up to date.\n')
  } finally {
    await pool.end()
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCli().catch(() => {
    process.stderr.write('Database migration failed. Check the database connection and migration files.\n')
    process.exitCode = 1
  })
}
