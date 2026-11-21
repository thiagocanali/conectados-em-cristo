import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import { Pool, type PoolClient } from 'pg'
import { mkdtemp, writeFile, rm, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { applyMigrations } from '../src/db/migrate.mjs'
import { PostgresCommunityRepository } from '../src/communities/community-repository.mjs'
import { buildApp } from '../src/app.mjs'
import { PostgresIdentityRepository } from '../src/auth/postgres-identity-repository.mjs'
import { createAuthenticatedPrincipalResolver } from '../src/auth/principal-gateway.mjs'
import { ACCOUNT_STATUSES, AccountUnavailableError, IdentityResolutionError } from '../src/auth/identity.mjs'

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) throw new Error('DATABASE_URL is required for database integration tests')
const databaseAddress = new URL(databaseUrl)
const databaseName = decodeURIComponent(databaseAddress.pathname.slice(1))
if (!databaseName.endsWith('_test') || !['localhost', '127.0.0.1', 'postgres'].includes(databaseAddress.hostname)) {
  throw new Error('Database integration tests only run against a local database whose name ends in _test')
}

const pool = new Pool({ connectionString: databaseUrl, max: 4 })
let publicIds: string[] = []
let hiddenId = ''

before(async () => {
  // Reset dependent identity tables too: migration 0002 must run on each invocation.
  await pool.query('DROP TABLE IF EXISTS account_identities')
  await pool.query('DROP TABLE IF EXISTS accounts')
  await pool.query('DROP TABLE IF EXISTS schema_migrations CASCADE')
  await pool.query('DROP TABLE IF EXISTS communities CASCADE')
  const results = await Promise.all([applyMigrations(pool), applyMigrations(pool)])
  assert.deepEqual(results.flat(), ['0001_create_communities', '0002_create_account_identities'])

  const fixtures = [
    ['alpha', 'Alpha', 'Estudo', 'active', 'listed', 'open'],
    ['beta', 'Beta', 'Oração', 'active', 'listed', 'approval'],
    ['hidden', 'Hidden', 'Grupo', 'active', 'unlisted', 'approval'],
    ['paused', 'Paused', 'Grupo', 'paused', 'listed', 'open'],
    ['archived', 'Archived', 'Grupo', 'archived', 'listed', 'open']
  ] as const

  for (const [slug, name, category, status, visibility, joinMode] of fixtures) {
    const result = await pool.query<{ id: string }>(
      `INSERT INTO communities (slug, name, category, status, catalog_visibility, join_mode)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id::text AS id`,
      [slug, name, category, status, visibility, joinMode]
    )
    if (visibility === 'listed' && status === 'active') publicIds.push(result.rows[0].id)
    if (slug === 'hidden') hiddenId = result.rows[0].id
  }
})

after(async () => {
  await pool.end()
})

test('migration runner refuses existing catalog without baseline history', async () => {
  const existing = await pool.query("SELECT version FROM schema_migrations WHERE version = '0001_create_communities'")
  assert.equal(existing.rowCount, 1)
  const initialHistory = await pool.query('SELECT count(*)::int AS count FROM schema_migrations')
  await pool.query("DELETE FROM schema_migrations WHERE version = '0001_create_communities'")
  await pool.query("INSERT INTO schema_migrations(version) VALUES ('9999_unrelated_history')")
  try {
    await assert.rejects(
      applyMigrations(pool),
      /Existing communities schema has no migration history/
    )
    const history = await pool.query("SELECT count(*)::int AS count FROM schema_migrations")
    // Replacing the baseline with unrelated history must not mutate the other versions.
    assert.equal(history.rows[0].count, initialHistory.rows[0].count)
    const catalog = await pool.query("SELECT to_regclass('public.communities') AS name")
    assert.equal(catalog.rows[0].name, 'communities')
  } finally {
    await pool.query("DELETE FROM schema_migrations WHERE version = '9999_unrelated_history'")
    await pool.query("INSERT INTO schema_migrations (version) VALUES ('0001_create_communities') ON CONFLICT DO NOTHING")
  }
})

// Keep identity checks in this runner: two destructive suites must not reset
// the same database concurrently. Every identity fixture/role/policy rolls back.
async function withIdentityTransaction(run: (client: PoolClient) => Promise<void>) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await run(client)
  } finally {
    await client.query('ROLLBACK')
    client.release()
  }
}

async function expectSqlError(client: PoolClient, sql: string, code: string) {
  await client.query('SAVEPOINT expected_error')
  try {
    await assert.rejects(client.query(sql), { code })
  } finally {
    await client.query('ROLLBACK TO SAVEPOINT expected_error')
    await client.query('RELEASE SAVEPOINT expected_error')
  }
}

async function prepareIdentityReader(client: PoolClient) {
  // Supabase role names, without credentials or Supabase services. All changes
  // live inside the surrounding transaction on the guarded local test DB.
  await client.query(`DO $$ BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'anon') THEN CREATE ROLE anon NOLOGIN; END IF;
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticated') THEN CREATE ROLE authenticated NOLOGIN; END IF;
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'cec_catalog_reader') THEN CREATE ROLE cec_catalog_reader NOLOGIN; END IF;
  END $$`)
  const sql = await readFile(new URL('../deployment/account-identity-security.sql', import.meta.url), 'utf8')
  // Execute the actual deployment body, preserving DO blocks; the test owns
  // BEGIN/ROLLBACK so the script cannot commit fixtures or roles.
  await client.query(sql.replace(/^(?:BEGIN|COMMIT);\r?$/gm, ''))
}

test('account migration enforces pending defaults, lifecycle states and identity constraints', async () => {
  await withIdentityTransaction(async client => {
    const result = await client.query('INSERT INTO accounts DEFAULT VALUES RETURNING id, status')
    const accountId = result.rows[0].id
    assert.equal(result.rows[0].status, 'pending_verification')
    for (const status of ACCOUNT_STATUSES) {
      await client.query('UPDATE accounts SET status = $1 WHERE id = $2', [status, accountId])
    }
    await expectSqlError(client, "INSERT INTO accounts (status) VALUES ('unknown')", '23514')
    await expectSqlError(client, "INSERT INTO account_identities VALUES ('other', 'subject', gen_random_uuid(), now())", '23514')
    await expectSqlError(client, "INSERT INTO account_identities VALUES ('supabase', '', gen_random_uuid(), now())", '23514')
    await expectSqlError(client, "INSERT INTO account_identities VALUES ('supabase', repeat('a', 256), gen_random_uuid(), now())", '23514')
    await expectSqlError(client, "INSERT INTO account_identities VALUES ('supabase', 'orphan', gen_random_uuid(), now())", '23503')
    await client.query("INSERT INTO account_identities (provider, subject, account_id) VALUES ('supabase', 'original', $1)", [accountId])
    await expectSqlError(client, "INSERT INTO account_identities (provider, subject, account_id) SELECT provider, subject, account_id FROM account_identities", '23505')
    await expectSqlError(client, "INSERT INTO account_identities (provider, subject, account_id) SELECT provider, 'another-subject', account_id FROM account_identities", '23505')
    await expectSqlError(client, 'DELETE FROM accounts', '23503')
  })
})

test('migration enables forced RLS and denies rows even after a SELECT grant without a policy', async () => {
  await withIdentityTransaction(async client => {
    const flags = await client.query("SELECT relrowsecurity, relforcerowsecurity FROM pg_class WHERE oid IN ('accounts'::regclass, 'account_identities'::regclass)")
    assert.equal(flags.rowCount, 2)
    assert.ok(flags.rows.every(row => row.relrowsecurity && row.relforcerowsecurity))
    const policies = await client.query("SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename IN ('accounts', 'account_identities')")
    assert.equal(policies.rowCount, 0)
    await client.query('INSERT INTO accounts DEFAULT VALUES')
    await client.query('CREATE ROLE cec_identity_denied_probe NOLOGIN NOSUPERUSER NOBYPASSRLS')
    await client.query('GRANT USAGE ON SCHEMA public TO cec_identity_denied_probe')
    await client.query('GRANT SELECT ON accounts, account_identities TO cec_identity_denied_probe')
    await client.query('SET LOCAL ROLE cec_identity_denied_probe')
    assert.equal((await client.query('SELECT * FROM accounts')).rowCount, 0)
    await expectSqlError(client, 'INSERT INTO accounts DEFAULT VALUES', '42501')
  })
})

test('real identity lookup resolves only the exact mapping and never creates an unmapped account', async () => {
  await withIdentityTransaction(async client => {
    await prepareIdentityReader(client)
    const result = await client.query("INSERT INTO accounts (status) VALUES ('active'), ('active') RETURNING id")
    const [first, second] = result.rows.map(row => row.id)
    await client.query("INSERT INTO account_identities (provider, subject, account_id) VALUES ('supabase', 'first', $1), ('supabase', 'second', $2)", [first, second])
    await client.query('SET LOCAL ROLE cec_identity_reader')
    const repository = new PostgresIdentityRepository(client)
    assert.deepEqual(await repository.findAccountByIdentity({ provider: 'supabase', subject: 'first' }), { id: first, status: 'active' })
    assert.deepEqual(await repository.findAccountByIdentity({ provider: 'supabase', subject: 'second' }), { id: second, status: 'active' })
    for (const identity of [{ provider: 'other', subject: 'first' }, { provider: 'supabase', subject: "first' OR true --" }, { provider: 'supabase', subject: 'unknown' }]) {
      assert.equal(await repository.findAccountByIdentity(identity), null)
    }
    assert.equal((await client.query('SELECT id FROM accounts')).rowCount, 2)
  })
})

test('principal resolver rechecks persisted lifecycle and deleted mappings on every call', async () => {
  await withIdentityTransaction(async client => {
    await prepareIdentityReader(client)
    const accountId = (await client.query("INSERT INTO accounts (status) VALUES ('active') RETURNING id")).rows[0].id
    await client.query("INSERT INTO account_identities (provider, subject, account_id) VALUES ('supabase', 'verified-subject', $1)", [accountId])
    const identity = { provider: 'supabase', subject: 'verified-subject' }
    // Provider is deliberately stubbed: these are DB integration tests, not an
    // assertion of remote token/session verification or an operational login.
    const resolve = createAuthenticatedPrincipalResolver(async () => identity, new PostgresIdentityRepository(client))
    await client.query('SET LOCAL ROLE cec_identity_reader')
    assert.equal((await resolve('Bearer synthetic')).accountId, accountId)
    for (const status of ACCOUNT_STATUSES.filter(value => value !== 'active')) {
      await client.query('RESET ROLE')
      await client.query('UPDATE accounts SET status = $1 WHERE id = $2', [status, accountId])
      await client.query('SET LOCAL ROLE cec_identity_reader')
      await assert.rejects(resolve('Bearer synthetic'), AccountUnavailableError)
    }
    await client.query('RESET ROLE')
    await client.query("UPDATE accounts SET status = 'active' WHERE id = $1", [accountId])
    await client.query('SET LOCAL ROLE cec_identity_reader')
    assert.equal((await resolve('Bearer synthetic')).accountId, accountId)
    await client.query('RESET ROLE')
    await client.query('DELETE FROM account_identities WHERE account_id = $1', [accountId])
    await client.query('SET LOCAL ROLE cec_identity_reader')
    await assert.rejects(resolve('Bearer synthetic'), IdentityResolutionError)
  })
})

test('deployment script revokes legacy table and column grants and restricts the identity reader', async () => {
  await withIdentityTransaction(async client => {
    await client.query('CREATE ROLE anon NOLOGIN')
    await client.query('GRANT SELECT (id) ON accounts TO anon')
    await client.query('GRANT SELECT ON account_identities TO PUBLIC')
    await prepareIdentityReader(client)
    const audit = await readFile(new URL('../deployment/verify-account-identity-security.sql', import.meta.url), 'utf8')
    assert.deepEqual((await client.query(audit)).rows, [])
    for (const role of ['anon', 'authenticated', 'cec_catalog_reader']) {
      await client.query(`SET LOCAL ROLE ${role}`)
      await expectSqlError(client, 'SELECT id FROM accounts', '42501')
      await expectSqlError(client, 'SELECT subject FROM account_identities', '42501')
      await client.query('RESET ROLE')
    }
    await client.query('SET LOCAL ROLE cec_identity_reader')
    await client.query('SELECT id, status FROM accounts')
    await client.query('SELECT provider, subject, account_id FROM account_identities')
    for (const sql of ['SELECT * FROM accounts', 'SELECT created_at FROM account_identities', 'INSERT INTO accounts DEFAULT VALUES', "UPDATE accounts SET status = 'active'", 'DELETE FROM accounts', 'TRUNCATE accounts CASCADE']) {
      await expectSqlError(client, sql, '42501')
    }
  })
})

test('security audit detects a leaked column grant and removal of forced RLS', async () => {
  await withIdentityTransaction(async client => {
    await prepareIdentityReader(client)
    const audit = await readFile(new URL('../deployment/verify-account-identity-security.sql', import.meta.url), 'utf8')
    await client.query('GRANT SELECT (subject) ON account_identities TO anon')
    await client.query('ALTER TABLE accounts NO FORCE ROW LEVEL SECURITY')
    const issues = (await client.query(audit)).rows
    assert.ok(issues.some(row => row.issue === 'forbidden_column_privilege' && row.object_name === 'account_identities.subject:anon:SELECT'))
    assert.ok(issues.some(row => row.issue === 'missing_rls' && row.object_name === 'accounts'))
    await client.query('DROP TABLE account_identities, accounts')
    const missing = (await client.query(audit)).rows.filter(row => row.issue === 'missing_table')
    assert.deepEqual(missing.map(row => row.object_name).sort(), ['account_identities', 'accounts'])
  })
})

test('identity baseline down/up scripts are reversible in an isolated empty schema', async () => {
  await withIdentityTransaction(async client => {
    const down = await readFile(new URL('../migrations/0002_create_account_identities.down.sql', import.meta.url), 'utf8')
    const up = await readFile(new URL('../migrations/0002_create_account_identities.up.sql', import.meta.url), 'utf8')
    await client.query(down)
    assert.equal((await client.query("SELECT to_regclass('accounts') AS relation")).rows[0].relation, null)
    await client.query(up)
    assert.equal((await client.query('SELECT count(*)::integer AS total FROM accounts')).rows[0].total, 0)
    assert.equal((await client.query('SELECT count(*)::integer AS total FROM account_identities')).rows[0].total, 0)
    assert.notEqual((await client.query("SELECT to_regclass('communities') AS relation")).rows[0].relation, null)
  })
})

test('migration runner is repeatable and does not reapply an existing migration', async () => {
  const applied = await applyMigrations(pool)
  assert.deepEqual(applied, [])
})

test('failed migration batch rolls back schema and history and can be retried', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'conectados-migrations-'))
  try {
    await writeFile(join(directory, '9001_test.up.sql'), 'CREATE TABLE migration_atomicity_probe (id integer);')
    await writeFile(join(directory, '9002_test.up.sql'), 'SELECT intentionally_invalid_sql;')
    await assert.rejects(applyMigrations(pool, directory))
    const table = await pool.query("SELECT to_regclass('migration_atomicity_probe') AS name")
    assert.equal(table.rows[0].name, null)
    const history = await pool.query("SELECT version FROM schema_migrations WHERE version LIKE '900%'")
    assert.equal(history.rowCount, 0)
    await writeFile(join(directory, '9002_test.up.sql'), 'ALTER TABLE migration_atomicity_probe ADD COLUMN value text;')
    assert.deepEqual(await applyMigrations(pool, directory), ['9001_test', '9002_test'])
  } finally {
    await pool.query('DROP TABLE IF EXISTS migration_atomicity_probe')
    await pool.query("DELETE FROM schema_migrations WHERE version IN ('9001_test', '9002_test')")
    await rm(directory, { recursive: true, force: true })
  }
})

test('database defaults keep new communities draft, unlisted and approval-only', async () => {
  const result = await pool.query(
    `INSERT INTO communities (slug, name, category)
     VALUES ('safe-defaults', 'Safe Defaults', 'Geral')
     RETURNING status, catalog_visibility, join_mode`
  )
  assert.deepEqual(result.rows[0], {
    status: 'draft',
    catalog_visibility: 'unlisted',
    join_mode: 'approval'
  })
})

test('schema rejects invalid slugs and duplicate slugs', async () => {
  await assert.rejects(
    pool.query(`INSERT INTO communities (slug, name, category) VALUES ('Bad Slug', 'Bad', 'Geral')`)
  )
  await assert.rejects(
    pool.query(`INSERT INTO communities (slug, name, category) VALUES ('alpha', 'Duplicate', 'Geral')`)
  )
})

test('public catalog query filters inactive and unlisted communities and paginates stably', async () => {
  const repository = new PostgresCommunityRepository(pool)
  const firstPage = await repository.listPublic({ limit: 1 })
  assert.equal(firstPage.items.length, 1)
  assert.equal(firstPage.items[0].name, 'Alpha')
  assert.ok(firstPage.nextCursor)

  const secondPage = await repository.listPublic({ limit: 1, cursor: firstPage.nextCursor })
  assert.equal(secondPage.items.length, 1)
  assert.equal(secondPage.items[0].name, 'Beta')
  assert.equal(secondPage.nextCursor, undefined)

  assert.deepEqual(
    [...firstPage.items, ...secondPage.items].map(item => item.id).sort(),
    publicIds.sort()
  )
})

test('public detail hides unlisted and inactive communities', async () => {
  const repository = new PostgresCommunityRepository(pool)
  assert.equal(await repository.getPublicById(hiddenId), null)
  const visible = await repository.getPublicById(publicIds[0])
  assert.equal(visible?.id, publicIds[0])
})

test('catalog rows contain only public metadata and schema has no count columns', async () => {
  const repository = new PostgresCommunityRepository(pool)
  const page = await repository.listPublic({ limit: 10 })
  assert.deepEqual(Object.keys(page.items[0]).sort(), [
    'category', 'description', 'id', 'joinMode', 'name', 'rulesSummary', 'slug'
  ])

  const columns = await pool.query<{ column_name: string }>(
    `SELECT column_name
     FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = 'communities'`
  )
  const names = columns.rows.map(row => row.column_name)
  assert.equal(names.includes('member_count'), false)
  assert.equal(names.includes('post_count'), false)
  assert.equal(names.includes('request_count'), false)
})

test('Fastify catalog endpoints read only public PostgreSQL rows', async () => {
  const repository = new PostgresCommunityRepository(pool)
  const app = buildApp({ communityRepository: repository })
  try {
    const list = await app.inject({ method: 'GET', url: '/api/v1/communities?limit=1' })
    assert.equal(list.statusCode, 200)
    assert.equal(list.json().items.length, 1)
    assert.equal(list.json().items[0].name, 'Alpha')
    assert.equal('memberCount' in list.json().items[0], false)

    const hidden = await app.inject({
      method: 'GET',
      url: `/api/v1/communities/${hiddenId}`
    })
    assert.equal(hidden.statusCode, 404)
    assert.equal(hidden.json().title, 'Not Found')
  } finally {
    await app.close()
  }
})

test('catalog pagination round-trips names with 100 supplementary Unicode characters', async () => {
  const ids: string[] = []
  const app = buildApp({ communityRepository: new PostgresCommunityRepository(pool) })
  try {
    for (const [slug, name] of [['unicode-one', '😀'.repeat(100)], ['unicode-two', '😁'.repeat(100)]]) {
      const result = await pool.query<{ id: string }>(
        `INSERT INTO communities (slug, name, category, status, catalog_visibility)
         VALUES ($1, $2, 'Teste', 'active', 'listed') RETURNING id`, [slug, name]
      )
      ids.push(result.rows[0].id)
    }
    const startCursor = Buffer.from(JSON.stringify({ name: 'Z', id: publicIds[0] })).toString('base64url')
    const first = await app.inject(`/api/v1/communities?limit=1&cursor=${startCursor}`)
    assert.equal(first.statusCode, 200)
    assert.equal(first.json().items[0].id, ids[0])
    assert.ok(first.json().nextCursor.length > 512)
    const second = await app.inject(`/api/v1/communities?limit=1&cursor=${first.json().nextCursor}`)
    assert.equal(second.statusCode, 200)
    assert.equal(second.json().items[0].id, ids[1])
    assert.equal(second.json().nextCursor, undefined)
  } finally {
    await pool.query('DELETE FROM communities WHERE id = ANY($1::uuid[])', [ids])
    await app.close()
  }
})

test('cursor names PostgreSQL cannot represent are rejected as client errors', async () => {
  const app = buildApp({ communityRepository: new PostgresCommunityRepository(pool) })
  try {
    for (const name of ['bad\u0000name', '\ud800', 'a'.repeat(101)]) {
      const cursor = Buffer.from(JSON.stringify({ name, id: publicIds[0] })).toString('base64url')
      const response = await app.inject(`/api/v1/communities?cursor=${cursor}`)
      assert.equal(response.statusCode, 400)
      assert.equal(response.json().detail, 'The request could not be processed.')
    }
  } finally {
    await app.close()
  }
})

test('readiness executes the actual PostgreSQL catalog query through Fastify', async () => {
  const repository = new PostgresCommunityRepository(pool)
  const app = buildApp({
    communityRepository: repository,
    databaseReadinessCheck: async () => { await repository.listPublic({ limit: 1 }) }
  })
  try {
    const ready = await app.inject({ method: 'GET', url: '/api/v1/health/ready' })
    assert.equal(ready.statusCode, 200)
    assert.deepEqual(ready.json(), { status: 'ok' })
    const catalog = await app.inject({ method: 'GET', url: '/api/v1/communities?limit=1' })
    assert.equal(catalog.statusCode, 200)
    assert.equal(catalog.json().items.length, 1)
  } finally {
    await app.close()
  }
})

test('readiness reports 503 when PostgreSQL catalog query cannot execute', async () => {
  const app = buildApp({
    databaseReadinessCheck: async () => {
      await pool.query('SELECT missing_readiness_relation FROM nonexistent_readiness_table')
    }
  })
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/health/ready' })
    assert.equal(response.statusCode, 503)
    assert.equal(response.json().status, 503)
    assert.equal(response.body.includes('nonexistent_readiness_table'), false)
  } finally {
    await app.close()
  }
})
