import test from 'node:test'
import assert from 'node:assert/strict'
import { AccountUnavailableError, IdentityResolutionError, resolveAuthenticatedPrincipal, type IdentityRepository } from '../src/auth/identity.mjs'

type Status = 'pending_verification' | 'active' | 'restricted' | 'suspended' | 'deleted'
function repository(accounts: Record<string, { id: string; status: Status }>): IdentityRepository {
  return { async findAccountByIdentity(identity) { return accounts[identity.provider + ':' + identity.subject] ?? null } }
}

test('resolves a validated external identity to the internal account', async () => {
  const principal = await resolveAuthenticatedPrincipal(repository({ 'supabase:user-123': { id: '11111111-1111-4111-8111-111111111111', status: 'active' } }), { provider: 'supabase', subject: 'user-123' })
  assert.deepEqual(principal, { provider: 'supabase', subject: 'user-123', accountId: '11111111-1111-4111-8111-111111111111', accountStatus: 'active' })
})

test('does not resolve an unknown provider subject', async () => {
  await assert.rejects(() => resolveAuthenticatedPrincipal(repository({}), { provider: 'supabase', subject: 'missing' }), IdentityResolutionError)
})

test('rejects empty identity values before repository lookup', async () => {
  await assert.rejects(() => resolveAuthenticatedPrincipal(repository({}), { provider: '', subject: 'user-123' }), IdentityResolutionError)
})

for (const status of ['pending_verification', 'restricted', 'suspended', 'deleted'] as const) {
  test('rejects non-active account status: ' + status, async () => {
    await assert.rejects(() => resolveAuthenticatedPrincipal(repository({ ['clerk:user-' + status]: { id: '22222222-2222-4222-8222-222222222222', status } }), { provider: 'clerk', subject: 'user-' + status }), AccountUnavailableError)
  })
}

test('does not authorize from an email-like value', async () => {
  const principal = await resolveAuthenticatedPrincipal(repository({ 'clerk:user-456': { id: '33333333-3333-4333-8333-333333333333', status: 'active' } }), { provider: 'clerk', subject: 'user-456' })
  assert.equal(principal.accountId, '33333333-3333-4333-8333-333333333333')
  assert.equal('email' in principal, false)
})