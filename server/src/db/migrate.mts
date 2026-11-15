import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Pool } from 'pg'

const defaultMigrationsDirectory = fileURLToPath(new URL('../../migrations/', import.meta.url))

export async function applyMigrations(pool: Pool, migrationsDirectory = defaultMigrationsDirectory): Promise<string[]> {
  const files = (await readdir(migrationsDirectory))
    .filter(file => file.endsWith('.up.sql'))
    .sort()
  const appliedVersions: string[] = []
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    // Serialize runners before creating the history table, including on an empty database.
    // The transaction lock is released automatically on commit or rollback.
    await client.query('SELECT pg_advisory_xact_lock(19088743, 20261111)')
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `)

    // Reject untracked pre-existing schemas instead of attempting a destructive or
    // partially conflicting bootstrap migration. Neon was provisioned separately.
    const history = await client.query('SELECT count(*)::int AS count FROM schema_migrations')
    if (history.rows[0].count === 0 && files.includes('0001_create_communities.up.sql')) {
      const existingCatalog = await client.query("SELECT to_regclass('public.communities') AS name")
      if (existingCatalog.rows[0].name !== null) {
        throw new Error('Existing communities schema has no migration history; reconcile baseline before running migrations')
      }
    }\n
    for (const file of files) {
      const version = file.slice(0, -'.up.sql'.length)
      const existing = await client.query(
        'SELECT version FROM schema_migrations WHERE version = $1',
        [version]
      )

      if (existing.rowCount === 0) {
        const sql = await readFile(resolve(migrationsDirectory, file), 'utf8')
        await client.query(sql)
        await client.query('INSERT INTO schema_migrations (version) VALUES ($1)', [version])
        appliedVersions.push(version)
      }
    }

    await client.query('COMMIT')
    return appliedVersions
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

async function runCli(): Promise<void> {
  // Prefer a direct Neon connection for schema migrations; the application may use PgBouncer.
  const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL_UNPOOLED or DATABASE_URL is required to run database migrations')
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
