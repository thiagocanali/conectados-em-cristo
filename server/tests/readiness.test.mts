import test from 'node:test'
import assert from 'node:assert/strict'
import { buildApp } from '../src/app.mjs'

test('readiness fails closed when database is not configured', async () => {
  const app = buildApp()
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/health/ready' })
    assert.equal(response.statusCode, 503)
    assert.equal(response.json().status, 503)
    assert.match(String(response.headers['content-type']), /^application\/problem\+json/)
  } finally {
    await app.close()
  }
})

test('readiness succeeds only after the database check completes', async () => {
  let checks = 0
  const app = buildApp({ databaseReadinessCheck: async () => { checks += 1 } })
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/health/ready' })
    assert.equal(response.statusCode, 200)
    assert.deepEqual(response.json(), { status: 'ok' })
    assert.equal(checks, 1)
  } finally {
    await app.close()
  }
})

test('readiness does not disclose connection errors or secrets', async () => {
  const app = buildApp({
    databaseReadinessCheck: async () => {
      throw new Error('postgresql://secret-password@private-host')
    }
  })
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/health/ready' })
    assert.equal(response.statusCode, 503)
    assert.equal(response.json().title, 'Service Unavailable')
    assert.equal(response.body.includes('secret-password'), false)
    assert.equal(response.body.includes('private-host'), false)
  } finally {
    await app.close()
  }
})

test('readiness rejects SQL permission failures without leaking query details', async () => {
  const app = buildApp({
    databaseReadinessCheck: async () => {
      const error = new Error('permission denied for relation communities: private-schema')
      Object.assign(error, { code: '42501' })
      throw error
    }
  })
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/health/ready' })
    assert.equal(response.statusCode, 503)
    assert.equal(response.json().status, 503)
    assert.equal(response.body.includes('private-schema'), false)
    assert.equal(response.body.includes('communities'), false)
  } finally {
    await app.close()
  }
})

test('readiness checks the database again on every request', async () => {
  let attempts = 0
  const app = buildApp({
    databaseReadinessCheck: async () => {
      attempts += 1
      if (attempts === 2) throw new Error('temporary outage')
    }
  })
  try {
    const first = await app.inject({ method: 'GET', url: '/api/v1/health/ready' })
    const second = await app.inject({ method: 'GET', url: '/api/v1/health/ready' })
    const third = await app.inject({ method: 'GET', url: '/api/v1/health/ready' })
    assert.deepEqual([first.statusCode, second.statusCode, third.statusCode], [200, 503, 200])
    assert.equal(attempts, 3)
    assert.equal(first.headers['cache-control'], 'no-store')
    assert.equal(second.headers['cache-control'], 'no-store')
  } finally {
    await app.close()
  }
})
