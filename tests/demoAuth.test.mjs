import test from 'node:test'
import assert from 'node:assert/strict'

const values = new Map()
globalThis.localStorage = {
  getItem: key => values.has(key) ? values.get(key) : null,
  setItem: (key, value) => values.set(key, String(value)),
  removeItem: key => values.delete(key)
}

const auth = await import('../src/services/demoAuth.mjs')

test('registration never persists credentials and creates a demo session', () => {
  values.clear()
  const result = auth.registerDemoUser({ nome: 'Ana', email: 'ANA@example.com', senha: 'secret' })
  assert.equal(result.ok, true)
  assert.equal(values.get('users').includes('secret'), false)
  assert.equal(values.get('currentUser').includes('senha'), false)
  assert.equal(auth.getDemoSession().email, 'ana@example.com')
})

test('legacy plaintext credentials are removed when demo users are read', () => {
  values.clear()
  values.set('users', JSON.stringify([{ nome: 'Bia', email: 'bia@example.com', senha: 'legacy-secret' }]))
  const users = auth.getDemoUsers()
  assert.equal(users[0].senha, undefined)
  assert.equal(values.get('users').includes('legacy-secret'), false)
})

test('demo login identifies an existing local profile by email only', () => {
  values.clear()
  values.set('users', JSON.stringify([{ nome: 'Caio', email: 'caio@example.com', senha: 'old' }]))
  const result = auth.loginDemoUser(' CAIO@example.com ')
  assert.equal(result.ok, true)
  assert.equal(auth.getDemoSession().nome, 'Caio')
})

test('login rejects unknown local profiles and logout clears the session', () => {
  values.clear()
  assert.equal(auth.loginDemoUser('missing@example.com').reason, 'user-not-found')
  auth.setDemoSession({ email: 'a@example.com', senha: 'do-not-store' })
  auth.clearDemoSession()
  assert.equal(auth.getDemoSession(), null)
})

test('reading a legacy session removes its plaintext credential from storage', () => {
  values.clear()
  values.set('currentUser', JSON.stringify({ nome: 'Dani', email: 'dani@example.com', senha: 'legacy-session-secret' }))
  assert.equal(auth.getDemoSession().email, 'dani@example.com')
  assert.equal(values.get('currentUser').includes('legacy-session-secret'), false)
})

test('malformed or invalid sessions are removed instead of retained', () => {
  values.clear()
  values.set('currentUser', '{invalid-json')
  assert.equal(auth.getDemoSession(), null)
  assert.equal(values.has('currentUser'), false)

  values.set('currentUser', JSON.stringify({ senha: 'orphaned-secret' }))
  assert.equal(auth.getDemoSession(), null)
  assert.equal(values.has('currentUser'), false)
})

test('malformed user storage is cleared safely', () => {
  values.clear()
  values.set('users', '{invalid-json')
  assert.deepEqual(auth.getDemoUsers(), [])
  assert.equal(values.has('users'), false)
})

test('updating answers preserves profile fields and ignores attempts to change account email', () => {
  values.clear()
  auth.registerDemoUser({ nome: 'Ana', email: 'ana@example.com', perfil: { cidade: 'Teste' } })
  const result = auth.updateDemoUser({ respostas: [1, 2, 3], email: 'other@example.com', senha: 'secret' })
  assert.equal(result.ok, true)
  assert.equal(result.user.email, 'ana@example.com')
  assert.deepEqual(result.user.perfil, { cidade: 'Teste' })
  assert.deepEqual(auth.getDemoSession().respostas, [1, 2, 3])
  assert.deepEqual(auth.getDemoUsers()[0], auth.getDemoSession())
  assert.equal(values.get('users').includes('secret'), false)
})

test('an update requires a current demo session', () => {
  values.clear()
  assert.equal(auth.updateDemoUser({ nome: 'Ana' }).reason, 'no-session')
  assert.equal(values.has('users'), false)
})

test('registration rolls back the new account when saving the session fails', () => {
  values.clear()
  const originalSet = localStorage.setItem
  localStorage.setItem = (key, value) => {
    if (key === 'currentUser') throw new Error('Storage quota exceeded')
    originalSet(key, value)
  }
  try {
    assert.equal(auth.registerDemoUser({ email: 'ana@example.com' }).reason, 'storage-unavailable')
    assert.deepEqual(auth.getDemoUsers(), [])
    assert.equal(auth.getDemoSession(), null)
  } finally {
    localStorage.setItem = originalSet
  }
})

test('failed updates retain the previous account and session', () => {
  values.clear()
  auth.registerDemoUser({ nome: 'Ana', email: 'ana@example.com' })
  const previousUsers = values.get('users')
  const previousSession = values.get('currentUser')
  const originalSet = localStorage.setItem
  localStorage.setItem = (key, value) => {
    if (key === 'currentUser') throw new Error('Storage quota exceeded')
    originalSet(key, value)
  }
  try {
    assert.equal(auth.updateDemoUser({ nome: 'Novo' }).reason, 'storage-unavailable')
    assert.equal(values.get('users'), previousUsers)
    assert.equal(values.get('currentUser'), previousSession)
  } finally {
    localStorage.setItem = originalSet
  }
})
