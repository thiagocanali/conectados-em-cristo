import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { once } from 'node:events'

test('built Vercel entrypoint imports and serves JSON without listening or connecting to a database', async t => {
  process.env.DATABASE_URL = ''
  const { default: handler } = await import('../../api/index.mjs')
  const server = createServer((request, response) => {
    void handler(request, response).catch(() => {
      response.statusCode = 500
      response.end()
    })
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  t.after(async () => {
    server.closeAllConnections()
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
  })
  const origin = `http://127.0.0.1:${server.address().port}`
  const health = await fetch(`${origin}/api/v1/health/live`)
  assert.equal(health.status, 200)
  assert.deepEqual(await health.json(), { status: 'ok' })
  const catalog = await fetch(`${origin}/api/v1/communities`)
  assert.equal(catalog.status, 503)
  assert.equal((await catalog.json()).status, 503)
  assert.ok(catalog.headers.get('content-type') ?? ''.includes('application/problem+json'))
  assert.equal(catalog.headers.get('cache-control'), 'no-store')
  assert.equal(catalog.headers.get('x-content-type-options'), 'nosniff')
  assert.match(catalog.headers.get('x-request-id') ?? '', /^[0-9a-f-]{36}$/i)

  const apiRoot = await fetch(`${origin}/api`)
  assert.equal(apiRoot.status, 404)
  assert.ok(apiRoot.headers.get('content-type') ?? ''.includes('application/problem+json'))
  assert.equal((await apiRoot.json()).status, 404)

  const unknown = await fetch(`${origin}/api/v1/inexistente`)
  assert.equal(unknown.status, 404)
  assert.equal((await unknown.json()).status, 404)

  const invalidQuery = await fetch(`${origin}/api/v1/communities?limit=999`)
  assert.equal(invalidQuery.status, 400)
  assert.equal((await invalidQuery.json()).status, 400)

  const invalidId = await fetch(`${origin}/api/v1/communities/not-a-uuid`)
  assert.equal(invalidId.status, 400)
  assert.equal((await invalidId.json()).status, 400)

  const detail = await fetch(`${origin}/api/v1/communities/00000000-0000-4000-8000-000000000001`)
  assert.equal(detail.status, 503)
  assert.equal((await detail.json()).status, 503)
})
