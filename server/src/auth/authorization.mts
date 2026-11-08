import type { AccountStatus } from './identity.mjs'

export type AdultEligibility = 'eligible' | 'unknown' | 'ineligible'
export type MembershipStatus = 'pending' | 'active' | 'suspended' | 'left' | 'removed'
export type CommunityStatus = 'draft' | 'active' | 'paused' | 'archived'
export type CommunityVisibility = 'listed' | 'unlisted' | 'private'
export type PlatformRole = 'member' | 'moderator' | 'administrator'
export type PrayerVisibility = 'private' | 'selected' | 'public'
export type PolicyReason =
  | 'allowed'
  | 'account_unavailable'
  | 'adult_eligibility_required'
  | 'membership_required'
  | 'community_unavailable'
  | 'not_owner'
  | 'edit_window_closed'
  | 'resource_unavailable'
  | 'role_required'
  | 'scope_mismatch'
  | 'conflict_of_interest'
  | 'justification_required'
  | 'not_in_audience'
  | 'unsupported_visibility'
  | 'blocked'

export interface PolicyDecision {
  allowed: boolean
  reason: PolicyReason
}

function allow(): PolicyDecision {
  return { allowed: true, reason: 'allowed' }
}

function deny(reason: Exclude<PolicyReason, 'allowed'>): PolicyDecision {
  return { allowed: false, reason }
}

export interface CommunityContentPolicyInput {
  accountStatus: AccountStatus
  adultEligibility: AdultEligibility
  communityStatus: CommunityStatus
  membershipStatus: MembershipStatus
}

/**
 * Inputs must come from trusted server-side identity and repositories.
 * Never pass role, ownership, age eligibility, membership or resource state
 * directly from an untrusted request payload.
 */
export function canReadCommunityContent(input: CommunityContentPolicyInput): PolicyDecision {
  if (input.accountStatus !== 'active') return deny('account_unavailable')
  if (input.adultEligibility !== 'eligible') return deny('adult_eligibility_required')
  if (input.communityStatus !== 'active') return deny('community_unavailable')
  if (input.membershipStatus !== 'active') return deny('membership_required')
  return allow()
}

export function canCreateCommunityContent(input: CommunityContentPolicyInput): PolicyDecision {
  return canReadCommunityContent(input)
}

export interface OwnedContentPolicyInput {
  accountStatus: AccountStatus
  actorAccountId: string
  ownerAccountId: string
  resourceStatus: 'active' | 'hidden' | 'deleted'
  editWindowOpen: boolean
}

/** Ownership is checked against the persisted owner, never a client-supplied author ID. */
export function canEditOwnedContent(input: OwnedContentPolicyInput): PolicyDecision {
  if (input.accountStatus !== 'active') return deny('account_unavailable')
  if (input.actorAccountId !== input.ownerAccountId) return deny('not_owner')
  if (input.resourceStatus !== 'active') return deny('resource_unavailable')
  if (!input.editWindowOpen) return deny('edit_window_closed')
  return allow()
}

export interface DirectInteractionPolicyInput {
  actorStatus: AccountStatus
  targetStatus: AccountStatus
  actorAccountId: string
  targetAccountId: string
  blockedEitherDirection: boolean
}

/** Global blocks deny direct interaction in either direction, not community-content visibility. */
export function canInteractDirectly(input: DirectInteractionPolicyInput): PolicyDecision {
  if (input.actorStatus !== 'active' || input.targetStatus !== 'active') return deny('account_unavailable')
  if (input.actorAccountId === input.targetAccountId) return deny('resource_unavailable')
  if (input.blockedEitherDirection) return deny('blocked')
  return allow()
}

export interface ModerationPolicyInput {
  actorStatus: AccountStatus
  role: PlatformRole
  actorAccountId: string
  caseCommunityId: string
  assignedCommunityIds: readonly string[]
  hasConflictOfInterest: boolean
  /** Required for global administrator access; must be a server-validated purpose. */
  justifiedNeed?: boolean
  justification?: string
}

/** Moderation role and assignments must be loaded from trusted persistence. */
export function canAccessModerationCase(input: ModerationPolicyInput): PolicyDecision {
  if (input.actorStatus !== 'active') return deny('account_unavailable')
  if (input.role !== 'moderator' && input.role !== 'administrator') return deny('role_required')
  if (input.hasConflictOfInterest) return deny('conflict_of_interest')

  if (input.role === 'moderator') {
    return input.assignedCommunityIds.includes(input.caseCommunityId)
      ? allow()
      : deny('scope_mismatch')
  }

  if (!input.justifiedNeed || !input.justification?.trim()) return deny('justification_required')
  return allow()
}

export interface PrayerRequestPolicyInput {
  actorStatus: AccountStatus
  actorAccountId: string
  ownerAccountId: string
  visibility: PrayerVisibility
  selectedAudienceAccountIds: readonly string[]
}

/**
 * Public prayer visibility is deliberately denied until its audience semantics
 * and privacy review are approved. Moderators/admins receive no implicit bypass.
 */
export function canReadPrayerRequest(input: PrayerRequestPolicyInput): PolicyDecision {
  if (input.actorStatus !== 'active') return deny('account_unavailable')
  if (input.actorAccountId === input.ownerAccountId) return allow()
  if (input.visibility === 'private') return deny('not_in_audience')
  if (input.visibility === 'public') return deny('unsupported_visibility')
  if (!input.selectedAudienceAccountIds.includes(input.actorAccountId)) return deny('not_in_audience')
  return allow()
}

export interface ReactionRemovalPolicyInput {
  accountStatus: AccountStatus
  actorAccountId: string
  reactionOwnerAccountId: string
}

/** A member can remove only their own reaction. */
export function canRemoveReaction(input: ReactionRemovalPolicyInput): PolicyDecision {
  if (input.accountStatus !== 'active') return deny('account_unavailable')
  if (input.actorAccountId !== input.reactionOwnerAccountId) return deny('not_owner')
  return allow()
}
