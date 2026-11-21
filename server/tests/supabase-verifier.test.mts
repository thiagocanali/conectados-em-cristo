import test from 'node:test'
import assert from 'node:assert/strict'
import {
  createSupabaseIdentityVerifier, InvalidBearerTokenError, AuthProviderUnavailableError
} from '../src/auth/supabase-verifier.mjs'

const url = 'https://example.supabase.co'
const key = 'sb_publishable_test'
const id = '11111111-1111-4111-8111-111111111111'

test('rejects malformed authorization before contacting the provider', async () => {
  let requests = 0
  const verify = createSupabaseIdentityVerifier(url, key, async () => {
    requests++
    return new Response('{}')
  })
  for (const value of [undefined, '', 'Basic abc', 'Bearer ', 'Bearer abc def', 'bearer abc', 'Bearer a\\nb']) {
    await assert.rejects(verify(value), InvalidBearerTokenError)
  }
  assert.equal(requests, 0)
})

test('only a provider-verified UUID becomes a trusted external identity', async () => {
  let calls = 0
  const verify = createSupabaseIdentityVerifier(url, key, async (input, init) => {
    calls++
    assert.equal(String(input), url + '/auth/v1/user')
    assert.equal(new Headers(init?.headers).get('apikey'), key)
    assert.equal(new Headers(init?.headers).get('authorization'), 'Bearer valid-token')
    assert.equal(init?.redirect, 'error')
    return Response.json({ id, user_metadata: { role: 'admin' } })
  })
  assert.deepEqual(await verify('Bearer valid-token'), { provider: 'supabase', subject: id })
  assert.equal(calls, 1)
})

test('expired tokens, provider outages and malformed responses fail closed', async () => {
  for (const status of [401, 403]) {
    const verify = createSupabaseIdentityVerifier(url, key, async () => new Response(null, { status }))
    await assert.rejects(verify('Bearer token'), InvalidBearerTokenError)
  }
  for (const status of [429, 500]) {
    const verify = createSupabaseIdentityVerifier(url, key, async () => new Response(null, { status }))
    await assert.rejects(verify('Bearer token'), AuthProviderUnavailableError)
  }
  for (const body of [{ id: 'not-a-uuid' }, { user_metadata: { sub: id } }, null]) {
    const verify = createSupabaseIdentityVerifier(url, key, async () => Response.json(body))
    await assert.rejects(verify('Bearer token'), AuthProviderUnavailableError)
  }
  const verify = createSupabaseIdentityVerifier(url, key, async () => { throw new Error('private host') })
  await assert.rejects(verify('Bearer token'), AuthProviderUnavailableError)
})

test('rejects untrusted auth endpoints and invalid configuration', () => {
  for (const origin of ['http://example.supabase.co', 'https://evil.example', 'https://example.supabase.co.evil.com', 'https://user:pass@example.supabase.co', 'https://example.supabase.co/other']) {
    assert.throws(() => createSupabaseIdentityVerifier(origin, key))
  }
  assert.throws(() => createSupabaseIdentityVerifier(url, ''))
})
