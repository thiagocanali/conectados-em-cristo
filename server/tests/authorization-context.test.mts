import test from 'node:test'
import assert from 'node:assert/strict'
import { evaluateCommunityContentAccess, type CommunityAuthorizationFactsRepository } from '../src/auth/authorization-context.mjs'
import type { AuthenticatedPrincipal } from '../src/auth/identity.mjs'

const principal: AuthenticatedPrincipal = {
  provider: 'test',
  subject: 'subject-1',
  accountId: 'account-1',
  accountStatus: 'active'
}

function repository(overrides: Partial<CommunityAuthorizationFactsRepository> = {}): CommunityAuthorizationFactsRepository {
  return {
    async findCommunityStatus() { return 'active' },
    async findMembershipStatus() { return 'active' },
    async findAdultEligibility() { return 'eligible' },
    ...overrides
  }
}

test('allows access only after loading all trusted community authorization facts', async () => {
  const calls: string[] = []
  const facts = repository({
    async findCommunityStatus(id) { calls.push('community:' + id); return 'active' },
    async findMembershipStatus(accountId, communityId) { calls.push('membership:' + accountId + ':' + communityId); return 'active' },
    async findAdultEligibility(accountId) { calls.push('age:' + accountId); return 'eligible' }
  })

  assert.deepEqual(await evaluateCommunityContentAccess(facts, principal, 'community-1'), {
    allowed: true,
    reason: 'allowed'
  })
  assert.deepEqual(calls.sort(), [
    'age:account-1',
    'community:community-1',
    'membership:account-1:community-1'
  ])
})

test('missing community or membership records fail closed', async () => {
  const noCommunity = repository({ async findCommunityStatus() { return null } })
  const noMembership = repository({ async findMembershipStatus() { return null } })

  assert.equal((await evaluateCommunityContentAccess(noCommunity, principal, 'community-1')).reason, 'community_unavailable')
  assert.equal((await evaluateCommunityContentAccess(noMembership, principal, 'community-1')).reason, 'membership_required')
})

test('missing or unverified adult eligibility fails closed', async () => {
  const missing = repository({ async findAdultEligibility() { return null } })
  const unknown = repository({ async findAdultEligibility() { return 'unknown' } })

  assert.equal((await evaluateCommunityContentAccess(missing, principal, 'community-1')).reason, 'adult_eligibility_required')
  assert.equal((await evaluateCommunityContentAccess(unknown, principal, 'community-1')).allowed, false)
})

test('does not query domain repositories for an inactive principal', async () => {
  let calls = 0
  const facts = repository({
    async findCommunityStatus() { calls++; return 'active' },
    async findMembershipStatus() { calls++; return 'active' },
    async findAdultEligibility() { calls++; return 'eligible' }
  })
  const suspended = { ...principal, accountStatus: 'suspended' as const }

  assert.equal((await evaluateCommunityContentAccess(facts, suspended, 'community-1')).reason, 'account_unavailable')
  assert.equal(calls, 0)
})

test('rejects empty identifiers without repository access', async () => {
  let calls = 0
  const facts = repository({
    async findCommunityStatus() { calls++; return 'active' },
    async findMembershipStatus() { calls++; return 'active' },
    async findAdultEligibility() { calls++; return 'eligible' }
  })

  assert.equal((await evaluateCommunityContentAccess(facts, principal, '   ')).reason, 'resource_unavailable')
  assert.equal(calls, 0)
})

test('propagates repository failures instead of treating them as permission', async () => {
  const facts = repository({
    async findMembershipStatus() { throw new Error('database unavailable') }
  })

  await assert.rejects(
    () => evaluateCommunityContentAccess(facts, principal, 'community-1'),
    /database unavailable/
  )
})
