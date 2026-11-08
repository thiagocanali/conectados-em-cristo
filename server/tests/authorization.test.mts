import test from 'node:test'
import assert from 'node:assert/strict'
import {
  canAccessModerationCase,
  canCreateCommunityContent,
  canEditOwnedContent,
  canInteractDirectly,
  canReadCommunityContent,
  canReadPrayerRequest,
  canRemoveReaction
} from '../src/auth/authorization.mjs'

const communityAccess = {
  accountStatus: 'active' as const,
  adultEligibility: 'eligible' as const,
  communityStatus: 'active' as const,
  membershipStatus: 'active' as const
}

test('allows an eligible active member to read community content', () => {
  assert.equal(canReadCommunityContent(communityAccess).allowed, true)
})

test('requires explicit adult eligibility before community access', () => {
  assert.equal(canReadCommunityContent({ ...communityAccess, adultEligibility: 'unknown' }).reason, 'adult_eligibility_required')
  assert.equal(canReadCommunityContent({ ...communityAccess, adultEligibility: 'ineligible' }).allowed, false)
})

test('denies community access to inactive accounts, memberships and communities', () => {
  assert.equal(canReadCommunityContent({ ...communityAccess, accountStatus: 'suspended' }).reason, 'account_unavailable')
  assert.equal(canReadCommunityContent({ ...communityAccess, membershipStatus: 'removed' }).reason, 'membership_required')
  assert.equal(canReadCommunityContent({ ...communityAccess, communityStatus: 'archived' }).reason, 'community_unavailable')
})

test('creation applies the same base account, age, community and membership gates', () => {
  assert.equal(canCreateCommunityContent(communityAccess).allowed, true)
  assert.equal(canCreateCommunityContent({ ...communityAccess, membershipStatus: 'pending' }).allowed, false)
})

test('only the persisted owner can edit active content during the edit window', () => {
  const input = {
    accountStatus: 'active' as const,
    actorAccountId: 'account-a',
    ownerAccountId: 'account-a',
    resourceStatus: 'active' as const,
    editWindowOpen: true
  }
  assert.equal(canEditOwnedContent(input).allowed, true)
  assert.equal(canEditOwnedContent({ ...input, ownerAccountId: 'account-b' }).reason, 'not_owner')
  assert.equal(canEditOwnedContent({ ...input, editWindowOpen: false }).reason, 'edit_window_closed')
  assert.equal(canEditOwnedContent({ ...input, resourceStatus: 'hidden' }).reason, 'resource_unavailable')
})

test('direct interaction is denied when either account is inactive or a global block exists', () => {
  const input = {
    actorStatus: 'active' as const,
    targetStatus: 'active' as const,
    actorAccountId: 'account-a',
    targetAccountId: 'account-b',
    blockedEitherDirection: false
  }
  assert.equal(canInteractDirectly(input).allowed, true)
  assert.equal(canInteractDirectly({ ...input, blockedEitherDirection: true }).reason, 'blocked')
  assert.equal(canInteractDirectly({ ...input, targetStatus: 'suspended' }).reason, 'account_unavailable')
  assert.equal(canInteractDirectly({ ...input, targetAccountId: 'account-a' }).allowed, false)
})

test('moderators can access only assigned-community cases without a conflict', () => {
  const input = {
    actorStatus: 'active' as const,
    role: 'moderator' as const,
    actorAccountId: 'moderator-a',
    caseCommunityId: 'community-a',
    assignedCommunityIds: ['community-a'],
    hasConflictOfInterest: false
  }
  assert.equal(canAccessModerationCase(input).allowed, true)
  assert.equal(canAccessModerationCase({ ...input, caseCommunityId: 'community-b' }).reason, 'scope_mismatch')
  assert.equal(canAccessModerationCase({ ...input, hasConflictOfInterest: true }).reason, 'conflict_of_interest')
})

test('administrators need an explicit justified purpose and cannot bypass conflicts', () => {
  const input = {
    actorStatus: 'active' as const,
    role: 'administrator' as const,
    actorAccountId: 'admin-a',
    caseCommunityId: 'community-a',
    assignedCommunityIds: [],
    hasConflictOfInterest: false,
    justifiedNeed: true,
    justification: 'Review escalated safety incident'
  }
  assert.equal(canAccessModerationCase(input).allowed, true)
  assert.equal(canAccessModerationCase({ ...input, justification: '   ' }).reason, 'justification_required')
  assert.equal(canAccessModerationCase({ ...input, hasConflictOfInterest: true }).reason, 'conflict_of_interest')
})

test('members cannot access moderation cases', () => {
  assert.equal(canAccessModerationCase({
    actorStatus: 'active',
    role: 'member',
    actorAccountId: 'member-a',
    caseCommunityId: 'community-a',
    assignedCommunityIds: ['community-a'],
    hasConflictOfInterest: false
  }).reason, 'role_required')
})

test('private prayer requests are visible to their owner only', () => {
  const input = {
    actorStatus: 'active' as const,
    actorAccountId: 'owner-a',
    ownerAccountId: 'owner-a',
    visibility: 'private' as const,
    selectedAudienceAccountIds: []
  }
  assert.equal(canReadPrayerRequest(input).allowed, true)
  assert.equal(canReadPrayerRequest({ ...input, actorAccountId: 'member-b' }).reason, 'not_in_audience')
})

test('selected prayer requests require explicit audience membership and do not grant moderator bypass', () => {
  const input = {
    actorStatus: 'active' as const,
    actorAccountId: 'member-b',
    ownerAccountId: 'owner-a',
    visibility: 'selected' as const,
    selectedAudienceAccountIds: ['member-b']
  }
  assert.equal(canReadPrayerRequest(input).allowed, true)
  assert.equal(canReadPrayerRequest({ ...input, selectedAudienceAccountIds: [] }).allowed, false)
})

test('public prayer visibility remains denied until its semantics are approved', () => {
  assert.equal(canReadPrayerRequest({
    actorStatus: 'active',
    actorAccountId: 'member-b',
    ownerAccountId: 'owner-a',
    visibility: 'public',
    selectedAudienceAccountIds: []
  }).reason, 'unsupported_visibility')
})

test('inactive accounts cannot read prayer requests, including their own', () => {
  assert.equal(canReadPrayerRequest({
    actorStatus: 'suspended',
    actorAccountId: 'owner-a',
    ownerAccountId: 'owner-a',
    visibility: 'private',
    selectedAudienceAccountIds: []
  }).reason, 'account_unavailable')
})

test('members can remove only their own reactions', () => {
  const input = { accountStatus: 'active' as const, actorAccountId: 'member-a', reactionOwnerAccountId: 'member-a' }
  assert.equal(canRemoveReaction(input).allowed, true)
  assert.equal(canRemoveReaction({ ...input, reactionOwnerAccountId: 'member-b' }).reason, 'not_owner')
  assert.equal(canRemoveReaction({ ...input, accountStatus: 'restricted' }).reason, 'account_unavailable')
})
