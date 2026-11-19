import test from 'node:test'
import assert from 'node:assert/strict'
import type { Pool } from 'pg'
import { PostgresIdentityRepository } from '../src/auth/postgres-identity-repository.mjs'

const id = '11111111-1111-4111-8111-111111111111'

test('identity lookup binds provider and subject as separate SQL parameters', async () => {
  let calls = 0
  const pool = {
    query: async (sql: string, params: unknown[]) => {
      calls++
      assert.match(sql, /JOIN accounts AS a ON a.id = i.account_id/)
      assert.match(sql, /i.provider = \$1/)
      assert.match(sql, /i.subject = \$2/)
      assert.deepEqual(params, ['supabase', "abc' OR true --"])
      assert.equal(sql.includes("abc' OR true --"), false)
      return { rows: [{ id, status: 'active' }] }
    }
  } as unknown as Pick<Pool, 'query'>
  const repository = new PostgresIdentityRepository(pool)
  assert.deepEqual(await repository.findAccountByIdentity({ provider: 'supabase', subject: "abc' OR true --" }), { id, status: 'active' })
  assert.equal(calls, 1)
})

test('missing mapping does not create an account', async () => {
  const pool = { query: async () => ({ rows: [] }) } as unknown as Pick<Pool, 'query'>
  assert.equal(await new PostgresIdentityRepository(pool).findAccountByIdentity({ provider: 'supabase', subject: 'unknown' }), null)
})

test('database errors propagate and cannot authorize the user', async () => {
  const error = new Error('database unavailable')
  const pool = { query: async () => { throw error } } as unknown as Pick<Pool, 'query'>
  await assert.rejects(new PostgresIdentityRepository(pool).findAccountByIdentity({ provider: 'supabase', subject: 'abc' }), value => value === error)
})
