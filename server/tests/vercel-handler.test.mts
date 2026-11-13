import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { once } from 'node:events'
import { buildRuntimeApp } from '../src/runtime.mjs'
import { createVercelHandler } from '../src/vercel-handler.mjs'

test('Vercel adapter serves concurrent HTTP requests through Fastify without a database', async t => {
  // Explicitly disable database access even when CI has DATABASE_URL configured.
  const app = buildRuntimeApp('')
  const handler = createVercelHandler(app)
  const server = createServer((request, response) => {
    void handler(request, response).catch(() => {
      response.statusCode = 500
      response.end()
    })
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const address = server.address()
  assert.ok(address && typeof address === 'object')
  const origin = `http://127.0.0.1:${address.port}`
  t.after(async () => {
    server.closeAllConnections()
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
    await app.close()
  })

  await t.test('cold-start requests preserve health and fail-closed catalog responses', async () => {
    const responses = await Promise.all(Array.from({ length: 12 }, (_, index) =>
      fetch(`${origin}/api/v1/${index % 2 ? 'communities' : 'health/live'}`)
    ))
    const ids = new Set<string>()
    for (const [index, response] of responses.entries()) {
      assert.equal(response.status, index % 2 ? 503 : 200)
      assert.match(response.headers.get('content-type') ?? '', /json/)
      assert.equal(response.headers.get('cache-control'), 'no-store')
      const requestId = response.headers.get('x-request-id')
      assert.ok(requestId)
      ids.add(requestId)
      const body = await response.json()
      if (index % 2) assert.equal(body.status, 503)
      else assert.deepEqual(body, { status: 'ok' })
    }
    assert.equal(ids.size, responses.length)
  })

  await t.test('API root and unknown paths return sanitized JSON instead of SPA HTML', async () => {
    for (const path of ['/api', '/api/', '/api/v1/missing?token=must-not-leak']) {
      const response = await fetch(`${origin}${path}`)
      assert.equal(response.status, 404)
      assert.match(response.headers.get('content-type') ?? '', /^application\/problem\+json/)
      const body = await response.text()
      assert.equal(body.includes('must-not-leak'), false)
      assert.equal(JSON.parse(body).instance, path.split('?')[0])
    }
  })

  await t.test('query strings and request bodies reach Fastify validation', async () => {
    const invalidQuery = await fetch(`${origin}/api/v1/communities?limit=0`)
    assert.equal(invalidQuery.status, 400)
    assert.equal((await invalidQuery.json()).status, 400)
    const invalidBody = await fetch(`${origin}/api/v1/health/live`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: '{'
    })
    assert.equal(invalidBody.status, 400)
    assert.equal((await invalidBody.json()).status, 400)
    const oversized = await fetch(`${origin}/api/v1/health/live`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify('x'.repeat(17 * 1024))
    })
    assert.equal(oversized.status, 413)
    assert.equal((await oversized.json()).status, 413)
  })
})
