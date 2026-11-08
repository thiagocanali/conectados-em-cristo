import test from 'node:test'
import assert from 'node:assert/strict'
import { validate as isUuid } from 'uuid'
import { buildApp } from '../src/app.mjs'

test('liveness endpoint responds with a minimal status', async () => {
  const app = buildApp()
  try {
    const response = await app.inject({ method: 'GET', url: '/api/v1/health/live' })
    assert.equal(response.statusCode, 200)
    assert.deepEqual(response.json(), { status: 'ok' })
    assert.equal(response.headers['cache-control'], 'no-store')
    assert.equal(response.headers['x-content-type-options'], 'nosniff')
    assert.ok(isUuid(response.headers['x-request-id']))
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

test('unknown routes return sanitized Problem Details without query strings', async () => {
  const app = buildApp()
  try {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/not-implemented?access_token=must-not-leak',
      headers: { 'request-id': 'client-controlled-id' }
    })
    const body = response.json()
    assert.equal(response.statusCode, 404)
    assert.match(response.headers['content-type'], /^application\/problem\+json/)
    assert.equal(body.type, 'about:blank')
    assert.equal(body.title, 'Not Found')
    assert.equal(body.status, 404)
    assert.equal(body.detail, 'The request could not be processed.')
    assert.equal(body.instance, '/api/v1/not-implemented')
    assert.equal(body.requestId, response.headers['x-request-id'])
    assert.notEqual(body.requestId, 'client-controlled-id')
    assert.equal(response.body.includes('must-not-leak'), false)
    assert.equal(response.body.includes('stack'), false)
  } finally {
    await app.close()
  }
})

test('unexpected errors return generic details without exception messages', async () => {
  const app = buildApp()
  app.get('/__test/error', async () => {
    throw new Error('database password must-not-leak')
  })
  try {
    const response = await app.inject({ method: 'GET', url: '/__test/error' })
    const body = response.json()
    assert.equal(response.statusCode, 500)
    assert.match(response.headers['content-type'], /^application\/problem\+json/)
    assert.equal(body.title, 'Internal Server Error')
    assert.equal(body.detail, 'An unexpected error occurred.')
    assert.equal(response.body.includes('database password'), false)
    assert.equal(response.body.includes('stack'), false)
  } finally {
    await app.close()
  }
})

test('malformed JSON is rejected with a sanitized client error', async () => {
  const app = buildApp()
  try {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/health/live',
      headers: { 'content-type': 'application/json' },
      payload: '{'
    })
    assert.equal(response.statusCode, 400)
    assert.match(response.headers['content-type'], /^application\/problem\+json/)
    assert.equal(response.json().title, 'Bad Request')
    assert.equal(response.body.includes('Unexpected end'), false)
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
