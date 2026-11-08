import test from 'node:test'
import assert from 'node:assert/strict'
import { buildApp } from '../src/app.mjs'
import { InvalidCommunityCursorError, type CommunityRepository, type PublicCommunity } from '../src/communities/community-repository.mjs'

const community: PublicCommunity = {
  id: '3f3c6b31-8a21-4f45-8d6c-8bda0c32b002',
  slug: 'estudo-biblico',
  name: 'Estudo Bíblico',
  category: 'Estudo',
  description: 'Comunidade para estudar a Bíblia.',
  rulesSummary: 'Respeito e diálogo.',
  joinMode: 'approval'
}

function createRepository(overrides: Partial<CommunityRepository> = {}): CommunityRepository {
  return {
    listPublic: async () => ({ items: [community] }),
    getPublicById: async id => id === community.id ? community : null,
    ...overrides
  }
}

test('public catalog returns only the approved metadata allowlist', async () => {
  let receivedLimit = 0
  const repository = createRepository({
    listPublic: async options => {
      receivedLimit = options.limit
      return { items: [community] }
    }
  })
  const app = buildApp({ communityRepository: repository })
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/communities' })
    assert.equal(response.statusCode, 200)
    assert.equal(receivedLimit, 20)
    assert.deepEqual(Object.keys(response.json().items[0]).sort(), [
      'category', 'description', 'id', 'joinMode', 'name', 'rulesSummary', 'slug'
    ])
    assert.equal(response.json().items[0].joinMode, 'approval')
  } finally {
    await app.close()
  }
})

test('public catalog forwards bounded pagination options', async () => {
  let receivedCursor = ''
  let receivedLimit = 0
  const repository = createRepository({
    listPublic: async options => {
      receivedCursor = options.cursor ?? ''
      receivedLimit = options.limit
      return { items: [community], nextCursor: 'opaque-next-cursor' }
    }
  })
  const app = buildApp({ communityRepository: repository })
  try {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/communities?cursor=eyJuYW1lIjoiQSIsImlkIjoiM2YzYzZiMzEtOGEyMS00ZjQ1LThkNmMtOGJkYTBjMzJiMDAyIn0&limit=7'
    })
    assert.equal(response.statusCode, 200)
    assert.ok(receivedCursor.length > 0)
    assert.equal(receivedLimit, 7)
    assert.equal(response.json().nextCursor, 'opaque-next-cursor')
  } finally {
    await app.close()
  }
})

test('invalid query parameters return sanitized Problem Details', async () => {
  const app = buildApp({ communityRepository: createRepository() })
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/communities?limit=51' })
    assert.equal(response.statusCode, 400)
    assert.equal(response.json().title, 'Bad Request')
    assert.equal(response.body.includes('limit'), false)
  } finally {
    await app.close()
  }
})

test('public community detail returns 404 for unknown or non-public IDs', async () => {
  const app = buildApp({ communityRepository: createRepository() })
  try {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/communities/3f3c6b31-8a21-4f45-8d6c-8bda0c32b099'
    })
    assert.equal(response.statusCode, 404)
    assert.equal(response.json().title, 'Not Found')
    assert.equal(response.json().detail, 'The request could not be processed.')
  } finally {
    await app.close()
  }
})

test('public community detail rejects malformed UUIDs before repository access', async () => {
  let called = false
  const repository = createRepository({
    getPublicById: async () => {
      called = true
      return null
    }
  })
  const app = buildApp({ communityRepository: repository })
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/communities/not-a-uuid' })
    assert.equal(response.statusCode, 400)
    assert.equal(called, false)
  } finally {
    await app.close()
  }
})

test('catalog is unavailable rather than silently empty when PostgreSQL is not configured', async () => {
  const app = buildApp()
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/communities' })
    assert.equal(response.statusCode, 503)
    assert.equal(response.json().title, 'Service Unavailable')
  } finally {
    await app.close()
  }
})

test('invalid repository cursors become generic client errors', async () => {
  const repository = createRepository({
    listPublic: async () => {
      throw new InvalidCommunityCursorError()
    }
  })
  const app = buildApp({ communityRepository: repository })
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/communities?cursor=YWJj' })
    assert.equal(response.statusCode, 400)
    assert.equal(response.json().detail, 'The request could not be processed.')
    assert.equal(response.body.includes('Invalid community cursor'), false)
  } finally {
    await app.close()
  }
})
