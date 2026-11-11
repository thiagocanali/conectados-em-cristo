import test, { beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import data from '../src/data/testeDonsData.js'
import { createDonsProgressStore, nextDonsAnswer } from '../src/services/donsProgress.mjs'

const questions = [{ gift: 'faith' }, { gift: 'service' }]
const store = createDonsProgressStore(questions, ['faith', 'service'])
const initial = () => ({ index: 0, scores: { faith: 0, service: 0 }, finished: false })
const values = new Map()
let failSet = () => false
let failRemove = () => false
globalThis.localStorage = {
  getItem: key => values.get(key) ?? null,
  setItem: (key, value) => {
    if (failSet(key)) throw new Error('Quota exceeded')
    values.set(key, String(value))
  },
  removeItem: key => {
    if (failRemove(key)) throw new Error('Storage unavailable')
    values.delete(key)
  }
}
beforeEach(() => {
  values.clear()
  failSet = failRemove = () => false
  values.set('currentUser', JSON.stringify({ email: 'A@example.invalid' }))
})

test('every question belongs to exactly one gift and result maxima match the scoring map', () => {
  const assigned = new Set()
  for (const [key, gift] of Object.entries(data.gifts)) {
    for (const index of gift.questions) {
      assert.equal(assigned.has(index), false)
      assert.equal(data.questions[index].gift, key)
      assigned.add(index)
    }
  }
  assert.equal(assigned.size, data.questions.length)
})

test('answer transitions do not mutate the prior state and completion is saved at the final index', () => {
  const previous = initial()
  const first = nextDonsAnswer(previous, 4, questions)
  assert.deepEqual(previous, initial())
  assert.deepEqual(first, { index: 1, scores: { faith: 4, service: 0 }, finished: false })
  const final = nextDonsAnswer(first, 2, questions)
  assert.deepEqual(final, { index: 1, scores: { faith: 4, service: 2 }, finished: true })
  assert.equal(store.save(final).ok, true)
  assert.deepEqual(store.load().progress, final)
  assert.equal(nextDonsAnswer(final, 4, questions), null)
  for (const value of [-1, 3, 5, NaN, '4']) assert.equal(nextDonsAnswer(previous, value, questions), null)
})

test('impossible score bounds, fractional values and premature results are not recovered', () => {
  const invalid = [
    { ...initial(), scores: { faith: 1, service: 0 } },
    { index: 1, scores: { faith: 5, service: 0 }, finished: false },
    { index: 1, scores: { faith: 1.5, service: 0 }, finished: false },
    { index: 1, scores: { faith: 4, service: 1 }, finished: false },
    { ...initial(), finished: true },
    { ...initial(), scores: { faith: 0, service: 0, extra: 0 } }
  ]
  for (const progress of invalid) {
    const raw = JSON.stringify(progress)
    values.set('testeDonsProgress:a@example.invalid', raw)
    assert.equal(store.load().reason, 'invalid-data')
    assert.equal(values.get('testeDonsProgress:a@example.invalid'), raw)
  }
})

test('quota failure leaves the previous answer state intact for retry', () => {
  store.save(initial())
  failSet = key => key.startsWith('testeDonsProgress:')
  assert.equal(store.save(nextDonsAnswer(initial(), 4, questions)).ok, false)
  assert.deepEqual(store.load().progress, initial())
  failSet = () => false
  assert.equal(store.save(nextDonsAnswer(initial(), 4, questions)).ok, true)
  assert.equal(store.load().progress.scores.faith, 4)
})

test('progress is scoped and legacy casing loads without a migration write', () => {
  values.set('testeDonsProgress', JSON.stringify({ ...initial(), finished: true }))
  values.set('testeDonsProgress:b@example.invalid', JSON.stringify(initial()))
  assert.equal(store.load().progress, null)
  values.set('testeDonsProgress:A@example.invalid', JSON.stringify(initial()))
  failSet = () => true
  assert.deepEqual(store.load().progress, initial())
  assert.equal(values.has('testeDonsProgress:a@example.invalid'), false)
})

test('failed deletion restores the canonical progress and successful reset deletes both casing variants', () => {
  const raw = JSON.stringify(initial())
  values.set('testeDonsProgress:a@example.invalid', raw)
  values.set('testeDonsProgress:A@example.invalid', raw)
  failRemove = key => key === 'testeDonsProgress:A@example.invalid'
  assert.equal(store.remove().ok, false)
  assert.equal(values.get('testeDonsProgress:a@example.invalid'), raw)
  failRemove = () => false
  assert.equal(store.remove().ok, true)
  assert.equal(store.load().progress, null)
})

test('corrupt progress is preserved and an unavailable session cannot write global progress', () => {
  values.set('testeDonsProgress:a@example.invalid', '{broken')
  assert.equal(store.load().reason, 'invalid-data')
  assert.equal(values.get('testeDonsProgress:a@example.invalid'), '{broken')
  values.delete('currentUser')
  assert.equal(store.save(initial()).reason, 'no-session')
  assert.equal(store.remove().reason, 'no-session')
  assert.equal(values.has('testeDonsProgress'), false)
})
