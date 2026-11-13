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
