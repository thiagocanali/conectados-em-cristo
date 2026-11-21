import test from 'node:test'
import assert from 'node:assert/strict'
import { createAuthenticatedPrincipalResolver } from '../src/auth/principal-gateway.mjs'
import { AccountUnavailableError, IdentityResolutionError, type IdentityRepository } from '../src/auth/identity.mjs'

const accountId = '11111111-1111-4111-8111-111111111111'
const identity = { provider: 'supabase', subject: '22222222-2222-4222-8222-222222222222' }

test('requires verified identity and an active persisted account', async () => {
  let lookupCount = 0
  const repository: IdentityRepository = {
    findAccountByIdentity: async value => {
      lookupCount++
      assert.deepEqual(value, identity)
      return { id: accountId, status: 'active' }
    }
  }
  const resolve = createAuthenticatedPrincipalResolver(async header => {
    assert.equal(header, 'Bearer valid')
    return identity
  }, repository)
  assert.deepEqual(await resolve('Bearer valid'), { ...identity, accountId, accountStatus: 'active' })
  assert.equal(lookupCount, 1)
})

test('provider verification failure never queries the identity repository', async () => {
  let lookups = 0
  const repository: IdentityRepository = {
    findAccountByIdentity: async () => { lookups++; return { id: accountId, status: 'active' } }
  }
  const providerError = new Error('unavailable')
  const resolve = createAuthenticatedPrincipalResolver(async () => { throw providerError }, repository)
  await assert.rejects(resolve('Bearer invalid'), error => error === providerError)
  assert.equal(lookups, 0)
})

test('unmapped identity fails closed', async () => {
  const repository: IdentityRepository = { findAccountByIdentity: async () => null }
  const resolve = createAuthenticatedPrincipalResolver(async () => identity, repository)
  await assert.rejects(resolve('Bearer valid'), IdentityResolutionError)
})

test('suspended accounts lose access on the next request', async () => {
  let status: 'active' | 'suspended' = 'active'
  let lookups = 0
  const repository: IdentityRepository = {
    findAccountByIdentity: async () => {
      lookups++
      return { id: accountId, status }
    }
  }
  const resolve = createAuthenticatedPrincipalResolver(async () => identity, repository)
  assert.equal((await resolve('Bearer valid')).accountStatus, 'active')
  status = 'suspended'
  await assert.rejects(resolve('Bearer valid'), AccountUnavailableError)
  assert.equal(lookups, 2)
})

test('malformed identity from provider adapter never queries database', async () => {
  let lookups = 0
  const repository: IdentityRepository = { findAccountByIdentity: async () => { lookups++; return null } }
  const resolve = createAuthenticatedPrincipalResolver(async () => ({ provider: '', subject: '' }), repository)
  await assert.rejects(resolve('Bearer valid'), IdentityResolutionError)
  assert.equal(lookups, 0)
})
