import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeDemoProfileForm } from '../src/utils/demoProfile.mjs'

test('malformed legacy profile fields yield editable strings instead of objects', () => {
  const fields = normalizeDemoProfileForm({ nome: {}, idade: true, cidade: ['a'], sobre: 12 }, 'Nome demonstrativo')
  assert.deepEqual(fields, { nome: 'Nome demonstrativo', idade: null, cidade: '', denominacao: '', tempoFe: '', objetivo: '', sobre: '' })
  for (const value of [null, 1, ['legacy'], 'legacy']) {
    assert.equal(normalizeDemoProfileForm(value).nome, '')
  }
})

test('profile form projects known fields and validates age without coercing booleans or arrays', () => {
  const input = { nome: 'Ana', idade: '30', cidade: 'Fictícia', tempoFe: '1 a 5 anos', password: 'secret', arbitrary: {} }
  const fields = normalizeDemoProfileForm(input)
  assert.equal(fields.idade, 30)
  assert.equal(fields.tempoFe, input.tempoFe)
  assert.equal('password' in fields, false)
  assert.equal('arbitrary' in fields, false)
  assert.equal(input.idade, '30')
  for (const idade of [null, true, [], 17, 100, 18.5, Infinity, 'invalid']) {
    assert.equal(normalizeDemoProfileForm({ idade }).idade, null)
  }
})
