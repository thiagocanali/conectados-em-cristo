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

test('denies inactive community states even when membership and age are valid', async (t) => {
  for (const status of ['draft', 'paused', 'archived'] as const) {
    await t.test(status, async () => {
      const facts = repository({
        async findCommunityStatus() { return status }
      })

      const decision = await evaluateCommunityContentAccess(facts, principal, 'community-1')
      assert.deepEqual(decision, { allowed: false, reason: 'community_unavailable' })
    })
  }
})

test('denies non-active membership states even when community and age are valid', async (t) => {
  for (const status of ['pending', 'suspended', 'left', 'removed'] as const) {
    await t.test(status, async () => {
      const facts = repository({
        async findMembershipStatus() { return status }
      })

      const decision = await evaluateCommunityContentAccess(facts, principal, 'community-1')
      assert.deepEqual(decision, { allowed: false, reason: 'membership_required' })
    })
  }
})

test('denies explicitly ineligible adults rather than treating the fact as unknown or eligible', async () => {
  const facts = repository({
    async findAdultEligibility() { return 'ineligible' }
  })

  assert.deepEqual(await evaluateCommunityContentAccess(facts, principal, 'community-1'), {
    allowed: false,
    reason: 'adult_eligibility_required'
  })
})


test('loads persisted content ownership and edit facts before authorizing edits', async () => {
  const calls: string[] = []
  const facts = {
    async findOwnedContentFacts(contentId: string) {
      calls.push(contentId)
      return { ownerAccountId: 'account-1', resourceStatus: 'active' as const, editWindowOpen: true }
    }
  }
  const { evaluateOwnedContentEditAccess } = await import('../src/auth/authorization-context.mjs')

  assert.deepEqual(await evaluateOwnedContentEditAccess(facts, principal, 'content-1'), {
    allowed: true,
    reason: 'allowed'
  })
  assert.deepEqual(calls, ['content-1'])
})

test('denies edits for non-owners, hidden content, closed windows and missing records', async () => {
  const { evaluateOwnedContentEditAccess } = await import('../src/auth/authorization-context.mjs')
  const owner = { async findOwnedContentFacts() {
    return { ownerAccountId: 'account-2', resourceStatus: 'active' as const, editWindowOpen: true }
  } }
  const hidden = { async findOwnedContentFacts() {
    return { ownerAccountId: 'account-1', resourceStatus: 'hidden' as const, editWindowOpen: true }
  } }
  const closed = { async findOwnedContentFacts() {
    return { ownerAccountId: 'account-1', resourceStatus: 'active' as const, editWindowOpen: false }
  } }
  const missing = { async findOwnedContentFacts() { return null } }

  assert.equal((await evaluateOwnedContentEditAccess(owner, principal, 'content-1')).reason, 'not_owner')
  assert.equal((await evaluateOwnedContentEditAccess(hidden, principal, 'content-1')).reason, 'resource_unavailable')
  assert.equal((await evaluateOwnedContentEditAccess(closed, principal, 'content-1')).reason, 'edit_window_closed')
  assert.equal((await evaluateOwnedContentEditAccess(missing, principal, 'content-1')).reason, 'resource_unavailable')
})

test('does not query content facts for inactive principals or invalid identifiers', async () => {
  const { evaluateOwnedContentEditAccess } = await import('../src/auth/authorization-context.mjs')
  let calls = 0
  const facts = { async findOwnedContentFacts() {
    calls++
    return { ownerAccountId: 'account-1', resourceStatus: 'active' as const, editWindowOpen: true }
  } }

  assert.equal((await evaluateOwnedContentEditAccess(facts, { ...principal, accountStatus: 'suspended' }, 'content-1')).reason, 'account_unavailable')
  assert.equal((await evaluateOwnedContentEditAccess(facts, principal, '  ')).reason, 'resource_unavailable')
  assert.equal(calls, 0)
})

test('loads reaction owner from persistence and only permits its owner to remove it', async () => {
  const { evaluateReactionRemovalAccess } = await import('../src/auth/authorization-context.mjs')
  const own = { async findReactionOwnerAccountId(id: string) {
    assert.equal(id, 'reaction-1')
    return 'account-1'
  } }
  const other = { async findReactionOwnerAccountId() { return 'account-2' } }
  const missing = { async findReactionOwnerAccountId() { return null } }

  assert.deepEqual(await evaluateReactionRemovalAccess(own, principal, 'reaction-1'), { allowed: true, reason: 'allowed' })
  assert.equal((await evaluateReactionRemovalAccess(other, principal, 'reaction-1')).reason, 'not_owner')
  assert.equal((await evaluateReactionRemovalAccess(missing, principal, 'reaction-1')).reason, 'resource_unavailable')
})

test('does not query reaction facts for inactive principals or invalid identifiers', async () => {
  const { evaluateReactionRemovalAccess } = await import('../src/auth/authorization-context.mjs')
  let calls = 0
  const facts = { async findReactionOwnerAccountId() { calls++; return 'account-1' } }

  assert.equal((await evaluateReactionRemovalAccess(facts, { ...principal, accountStatus: 'restricted' }, 'reaction-1')).reason, 'account_unavailable')
  assert.equal((await evaluateReactionRemovalAccess(facts, principal, '  ')).reason, 'resource_unavailable')
  assert.equal(calls, 0)
})

test('propagates content and reaction repository failures', async () => {
  const { evaluateOwnedContentEditAccess, evaluateReactionRemovalAccess } = await import('../src/auth/authorization-context.mjs')
  await assert.rejects(
    () => evaluateOwnedContentEditAccess({ async findOwnedContentFacts() { throw new Error('content store unavailable') } }, principal, 'content-1'),
    /content store unavailable/
  )
  await assert.rejects(
    () => evaluateReactionRemovalAccess({ async findReactionOwnerAccountId() { throw new Error('reaction store unavailable') } }, principal, 'reaction-1'),
    /reaction store unavailable/
  )
})


test('loads target account and bidirectional block facts before direct interaction', async () => {
  const { evaluateDirectInteractionAccess } = await import('../src/auth/authorization-context.mjs')
  const calls: string[] = []
  const facts = {
    async findAccountStatus(id: string) { calls.push('account:' + id); return 'active' as const },
    async hasBlockEitherDirection(actor: string, target: string) {
      calls.push('block:' + actor + ':' + target)
      return false
    }
  }

  assert.deepEqual(await evaluateDirectInteractionAccess(facts, principal, 'account-2'), {
    allowed: true,
    reason: 'allowed'
  })
  assert.deepEqual(calls.sort(), ['account:account-2', 'block:account-1:account-2'])
})

test('denies missing, unavailable, self and blocked direct-interaction targets', async () => {
  const { evaluateDirectInteractionAccess } = await import('../src/auth/authorization-context.mjs')
  const missing = {
    async findAccountStatus() { return null },
    async hasBlockEitherDirection() { return false }
  }
  const suspended = {
    async findAccountStatus() { return 'suspended' as const },
    async hasBlockEitherDirection() { return false }
  }
  const blocked = {
    async findAccountStatus() { return 'active' as const },
    async hasBlockEitherDirection() { return true }
  }

  assert.equal((await evaluateDirectInteractionAccess(missing, principal, 'account-2')).reason, 'account_unavailable')
  assert.equal((await evaluateDirectInteractionAccess(suspended, principal, 'account-2')).reason, 'account_unavailable')
  assert.equal((await evaluateDirectInteractionAccess(blocked, principal, 'account-2')).reason, 'blocked')
  assert.equal((await evaluateDirectInteractionAccess(blocked, principal, 'account-1')).reason, 'resource_unavailable')
})

test('does not query direct-interaction facts for inactive principals or invalid identifiers', async () => {
  const { evaluateDirectInteractionAccess } = await import('../src/auth/authorization-context.mjs')
  let calls = 0
  const facts = {
    async findAccountStatus() { calls++; return 'active' as const },
    async hasBlockEitherDirection() { calls++; return false }
  }

  assert.equal((await evaluateDirectInteractionAccess(facts, { ...principal, accountStatus: 'restricted' }, 'account-2')).reason, 'account_unavailable')
  assert.equal((await evaluateDirectInteractionAccess(facts, principal, '  ')).reason, 'resource_unavailable')
  assert.equal(calls, 0)
})

test('propagates direct-interaction repository failures', async () => {
  const { evaluateDirectInteractionAccess } = await import('../src/auth/authorization-context.mjs')
  await assert.rejects(
    () => evaluateDirectInteractionAccess({
      async findAccountStatus() { throw new Error('account store unavailable') },
      async hasBlockEitherDirection() { return false }
    }, principal, 'account-2'),
    /account store unavailable/
  )
})


test('loads moderation case scope, role and conflict facts before authorizing access', async () => {
  const { evaluateModerationCaseAccess } = await import('../src/auth/authorization-context.mjs')
  const calls: string[] = []
  const facts = {
    async findCaseCommunityId(id: string) { calls.push('case:' + id); return 'community-1' },
    async findPlatformRole(id: string) { calls.push('role:' + id); return 'moderator' as const },
    async findAssignedCommunityIds(id: string) { calls.push('assignments:' + id); return ['community-1'] },
    async hasModerationConflict(account: string, caseId: string) { calls.push('conflict:' + account + ':' + caseId); return false }
  }
  assert.deepEqual(await evaluateModerationCaseAccess(facts, principal, 'case-1'), { allowed: true, reason: 'allowed' })
  assert.deepEqual(calls.sort(), ['assignments:account-1','case:case-1','conflict:account-1:case-1','role:account-1'])
})

test('fails closed for missing cases, non-moderators, scope mismatch and conflicts', async () => {
  const { evaluateModerationCaseAccess } = await import('../src/auth/authorization-context.mjs')
  const base = {
    async findCaseCommunityId() { return 'community-1' },
    async findPlatformRole() { return 'member' as const },
    async findAssignedCommunityIds() { return [] as string[] },
    async hasModerationConflict() { return false }
  }
  assert.equal((await evaluateModerationCaseAccess({ ...base, async findCaseCommunityId() { return null } }, principal, 'case-1')).reason, 'resource_unavailable')
  assert.equal((await evaluateModerationCaseAccess(base, principal, 'case-1')).reason, 'role_required')
  assert.equal((await evaluateModerationCaseAccess({ ...base, async findPlatformRole() { return 'moderator' as const } }, principal, 'case-1')).reason, 'scope_mismatch')
  assert.equal((await evaluateModerationCaseAccess({ ...base, async findPlatformRole() { return 'moderator' as const }, async findAssignedCommunityIds() { return ['community-1'] }, async hasModerationConflict() { return true } }, principal, 'case-1')).reason, 'conflict_of_interest')
})

test('administrators require explicit justification before global moderation access', async () => {
  const { evaluateModerationCaseAccess } = await import('../src/auth/authorization-context.mjs')
  const facts = {
    async findCaseCommunityId() { return 'community-1' },
    async findPlatformRole() { return 'administrator' as const },
    async findAssignedCommunityIds() { return [] as string[] },
    async hasModerationConflict() { return false }
  }
  assert.equal((await evaluateModerationCaseAccess(facts, principal, 'case-1')).reason, 'justification_required')
  assert.deepEqual(await evaluateModerationCaseAccess(facts, principal, 'case-1', 'Auditoria de segurança'), { allowed: true, reason: 'allowed' })
})

test('does not query moderation facts for inactive principals or invalid identifiers', async () => {
  const { evaluateModerationCaseAccess } = await import('../src/auth/authorization-context.mjs')
  let calls = 0
  const facts = {
    async findCaseCommunityId() { calls++; return 'community-1' },
    async findPlatformRole() { calls++; return 'moderator' as const },
    async findAssignedCommunityIds() { calls++; return ['community-1'] },
    async hasModerationConflict() { calls++; return false }
  }
  assert.equal((await evaluateModerationCaseAccess(facts, { ...principal, accountStatus: 'suspended' }, 'case-1')).reason, 'account_unavailable')
  assert.equal((await evaluateModerationCaseAccess(facts, principal, '  ')).reason, 'resource_unavailable')
  assert.equal(calls, 0)
})
