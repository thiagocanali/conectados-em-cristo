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
  const readiness = await fetch(`${origin}/api/v1/health/ready`)
  assert.equal(readiness.status, 503)
  const readinessProblem = await readiness.json()
  assert.equal(readinessProblem.status, 503)
  assert.equal(readinessProblem.title, 'Service Unavailable')
  assert.equal(readinessProblem.instance, '/api/v1/health/ready')
  assert.match(readiness.headers.get('content-type') ?? '', /^application\\/problem\\+json/)
  assert.equal(readiness.headers.get('cache-control'), 'no-store')
  assert.ok(readiness.headers.get('x-request-id'))
  const secondReadiness = await fetch(`${origin}/api/v1/health/ready`)
  assert.equal(secondReadiness.status, 503)
  assert.notEqual(secondReadiness.headers.get('x-request-id'), readiness.headers.get('x-request-id'))
  const catalog = await fetch(`${origin}/api/v1/communities`)
  assert.equal(catalog.status, 503)
  assert.equal((await catalog.json()).status, 503)
})
