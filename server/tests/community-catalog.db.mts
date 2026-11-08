import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import { Pool } from 'pg'
import { applyMigrations } from '../src/db/migrate.mjs'
import { PostgresCommunityRepository } from '../src/communities/community-repository.mjs'
import { buildApp } from '../src/app.mjs'

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
  await pool.query('DROP TABLE IF EXISTS schema_migrations CASCADE')
  await pool.query('DROP TABLE IF EXISTS communities CASCADE')
  const applied = await applyMigrations(pool)
  assert.deepEqual(applied, ['0001_create_communities'])

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

test('migration runner is repeatable and does not reapply an existing migration', async () => {
  const applied = await applyMigrations(pool)
  assert.deepEqual(applied, [])
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
