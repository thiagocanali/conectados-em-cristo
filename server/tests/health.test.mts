import test from 'node:test'
import assert from 'node:assert/strict'
import { buildApp } from '../src/app.mjs'

test('liveness endpoint responds with a minimal status', async () => {
  const app = buildApp()
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/health/live' })
    assert.equal(response.statusCode, 200)
    assert.deepEqual(response.json(), { status: 'ok' })
    assert.equal(response.headers['cache-control'], 'no-store')
    assert.equal(response.headers['x-content-type-options'], 'nosniff')
  } finally {
    await app.close()
  }
})

test('liveness endpoint does not disclose runtime or environment details', async () => {
  const app = buildApp()
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/health/live' })
    const body = response.json()
    assert.deepEqual(Object.keys(body), ['status'])
    assert.equal(JSON.stringify(body).includes('NODE_ENV'), false)
    assert.equal(JSON.stringify(body).includes('process'), false)
  } finally {
    await app.close()
  }
})

test('unknown routes return 404 without a stack trace', async () => {
  const app = buildApp()
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/not-implemented' })
    assert.equal(response.statusCode, 404)
    assert.equal(response.body.includes('stack'), false)
  } finally {
    await app.close()
  }
})

test('bootstrap exposes no account or data mutation endpoints', async () => {
  const app = buildApp()
  try {
    const response = await app.inject({ method: 'POST', url: '/api/v1/users' })
    assert.equal(response.statusCode, 404)
  } finally {
    await app.close()
  }
})
