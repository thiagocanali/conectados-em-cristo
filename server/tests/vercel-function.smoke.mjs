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
  const ready = await fetch(`${origin}/api/v1/health/ready`)
  assert.equal(ready.status, 503)
  assert.equal((await ready.json()).status, 503)
  assert.equal(ready.headers.get('cache-control'), 'no-store')
  const catalog = await fetch(`${origin}/api/v1/communities`)
  assert.equal(catalog.status, 503)
  assert.equal((await catalog.json()).status, 503)
})
