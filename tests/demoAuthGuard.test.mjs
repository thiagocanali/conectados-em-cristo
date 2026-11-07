import test from 'node:test'
import assert from 'node:assert/strict'
import { createDemoAuthGuard, protectedRoutePaths } from '../src/router/demoAuthGuard.mjs'

test('protected routes include every authenticated demo area', () => {
  assert.deepEqual([...protectedRoutePaths].sort(), [
    '/dashboard',
    '/descoberta',
    '/perfil',
    '/questionario',
    '/resultados',
    '/salvos',
    '/testedons',
    '/testepersonalidade'
  ])
})

test('public routes remain accessible without a demo session', () => {
  const guard = createDemoAuthGuard(() => null)
  for (const path of ['/', '/login', '/cadastro', '/oracoes']) {
    assert.equal(guard({ path, fullPath: path }), true)
  }
})

test('private routes redirect anonymous visitors and preserve the requested URL', () => {
  const guard = createDemoAuthGuard(() => null)
  const result = guard({ path: '/perfil', fullPath: '/perfil?tab=interesses' })
  assert.deepEqual(result, {
    path: '/login',
    query: { redirect: '/perfil?tab=interesses' }
  })
})

test('a valid demo session grants access to protected routes', () => {
  let reads = 0
  const guard = createDemoAuthGuard(() => {
    reads += 1
    return { email: 'demo@example.com' }
  })
  assert.equal(guard({ path: '/dashboard', fullPath: '/dashboard' }), true)
  assert.equal(reads, 1)
})

test('a malformed session without an email is treated as anonymous', () => {
  const guard = createDemoAuthGuard(() => ({ nome: 'Perfil sem email' }))
  const result = guard({ path: '/resultados', fullPath: '/resultados' })
  assert.equal(result.path, '/login')
})

test('public navigation does not read session storage', () => {
  let reads = 0
  const guard = createDemoAuthGuard(() => {
    reads += 1
    return null
  })
  assert.equal(guard({ path: '/oracoes', fullPath: '/oracoes' }), true)
  assert.equal(reads, 0)
})

test('guard rejects a missing session reader', () => {
  assert.throws(() => createDemoAuthGuard(null), TypeError)
})
