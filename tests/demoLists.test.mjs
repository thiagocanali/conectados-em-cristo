import test, { beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { readDemoList, updateDemoLists, normalizeDemoProfile } from '../src/services/demoLists.mjs'

const values = new Map()
let failWrite = () => false
globalThis.localStorage = {
  getItem: key => values.get(key) ?? null,
  setItem: (key, value) => {
    if (failWrite(key)) throw new Error('Quota exceeded')
    values.set(key, String(value))
  },
  removeItem: key => values.delete(key)
}

beforeEach(() => {
  values.clear()
  failWrite = () => false
  values.set('currentUser', JSON.stringify({ email: 'ANA@example.invalid' }))
})

test('lists are scoped to the current account and never import unscoped data', () => {
  values.set('perfisSalvos', JSON.stringify([{ nome: 'Unrelated account' }]))
  values.set('perfisSalvos:b@example.invalid', '["other-account"]')
  assert.deepEqual(readDemoList('perfisSalvos'), [])
  assert.equal(updateDemoLists({ interesses: items => [...items, 'local'] }).ok, true)
  assert.equal(values.get('interesses:ana@example.invalid'), '["local"]')
  assert.equal(values.has('interesses'), false)
})

test('legacy casing can be read without attempting to write during a read', () => {
  values.set('perfisSalvos:ANA@example.invalid', '["legacy"]')
  failWrite = () => true
  assert.deepEqual(readDemoList('perfisSalvos'), ['legacy'])
  assert.equal(values.has('perfisSalvos:ana@example.invalid'), false)
})

test('corrupted or non-array storage is never replaced by an empty list during updates', () => {
  for (const raw of ['{broken', '{}', 'null']) {
    values.set('interesses:ana@example.invalid', raw)
    assert.throws(() => readDemoList('interesses'), error => error.reason === 'invalid-data')
    assert.equal(updateDemoLists({ interesses: items => [...items, 'new'] }).reason, 'invalid-data')
    assert.equal(values.get('interesses:ana@example.invalid'), raw)
  }
})

test('a later quota failure restores the exact previous report list', () => {
  const previous = '[ { "motivo": "old" } ]'
  values.set('denuncias:ana@example.invalid', previous)
  failWrite = key => key.startsWith('bloqueados:')
  const result = updateDemoLists({ denuncias: items => [...items, { motivo: 'new' }], bloqueados: items => [...items, { email: 'b@example.invalid' }] })
  assert.equal(result.ok, false)
  assert.equal(result.reason, 'storage-unavailable')
  assert.equal(values.get('denuncias:ana@example.invalid'), previous)
  assert.equal(values.has('bloqueados:ana@example.invalid'), false)
})

test('rollback removes a new key while preserving legacy data', () => {
  values.set('denuncias:ANA@example.invalid', '["legacy"]')
  failWrite = key => key.startsWith('bloqueados:')
  assert.equal(updateDemoLists({ denuncias: items => [...items, 'new'], bloqueados: () => ['new'] }).ok, false)
  assert.equal(values.has('denuncias:ana@example.invalid'), false)
  assert.equal(values.get('denuncias:ANA@example.invalid'), '["legacy"]')
})

test('all reads and transformations complete before any storage write', () => {
  values.set('bloqueados:ana@example.invalid', '{broken')
  assert.equal(updateDemoLists({ denuncias: () => ['new'], bloqueados: items => items }).reason, 'invalid-data')
  assert.equal(values.has('denuncias:ana@example.invalid'), false)
})

test('rollback failure is reported explicitly instead of claiming a full restoration', () => {
  values.set('denuncias:ana@example.invalid', '["old"]')
  let writes = 0
  failWrite = () => ++writes >= 2
  assert.equal(updateDemoLists({ denuncias: () => ['new'], bloqueados: () => ['new'] }).reason, 'rollback-failed')
})

test('no session means no list access or mutation', () => {
  values.delete('currentUser')
  assert.throws(() => readDemoList('perfisSalvos'), error => error.reason === 'no-session')
  assert.equal(updateDemoLists({ perfisSalvos: () => [] }).reason, 'no-session')
  assert.equal(values.size, 0)
})

test('profile cards reject malformed data and expose only presentation fields', () => {
  for (const value of [null, [], 42, {}, { nome: 1, idade: 30 }, { nome: 'Ana', idade: true }, { nome: 'Ana', idade: 17 }, { nome: 'Ana', idade: 101 }]) {
    assert.equal(normalizeDemoProfile(value), null)
  }
  const profile = normalizeDemoProfile({ nome: ' Bia ', idade: '30', email: ' B@example.invalid ', cidade: {}, sobre: 'Teste', password: 'secret', respostas: [1, 2, 3] })
  assert.deepEqual(profile, { nome: 'Bia', idade: 30, email: 'b@example.invalid', cidade: '', denominacao: '', objetivo: '', sobre: 'Teste' })
})
