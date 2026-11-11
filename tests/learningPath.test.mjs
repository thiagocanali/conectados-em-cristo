import test from 'node:test'
import assert from 'node:assert/strict'
import { learningPath } from '../src/data/learningPath.mjs'
import { pathSessions, pathSessionFor, buildLearningPathKit, buildPathMeetingGuide, readPathDuration } from '../src/services/learningPath.mjs'
import { meetingDurations } from '../src/services/meetingGuide.mjs'
import { createDemoAuthGuard } from '../src/router/demoAuthGuard.mjs'

test('the learning path references four unique available gospel studies in its intended order', () => {
  const sessions = pathSessions()
  assert.deepEqual(sessions.map(session => session.studySlug), ['o-convite-de-jesus', 'permanecer-em-cristo', 'aprender-a-orar', 'amar-o-proximo'])
  assert.equal(new Set(sessions.map(session => session.studySlug)).size, 4)
  for (const [index, session] of sessions.entries()) {
    assert.equal(session.number, index + 1)
    assert.equal(session.study.slug, session.studySlug)
    for (const field of ['purpose', 'returnPrompt', 'betweenMeetings', 'nextConversation']) assert.ok(session[field].length > 40)
  }
})

test('the next meeting follows the path and ends without looping or fabricating completion', () => {
  assert.equal(pathSessionFor('o-convite-de-jesus').next.studySlug, 'permanecer-em-cristo')
  assert.equal(pathSessionFor('permanecer-em-cristo').next.studySlug, 'aprender-a-orar')
  assert.equal(pathSessionFor('aprender-a-orar').next.studySlug, 'amar-o-proximo')
  assert.equal(pathSessionFor('amar-o-proximo').next, null)
  assert.equal(pathSessionFor('missing'), null)
})

test('every supported kit contains four complete meeting guides and continuity material', () => {
  for (const duration of meetingDurations) {
    const kit = buildLearningPathKit(duration)
    assert.equal(kit.sessions.length, learningPath.sessions.length)
    for (const session of kit.sessions) {
      const individual = buildPathMeetingGuide(session.studySlug, duration)
      assert.ok(individual.text.includes(session.betweenMeetings))
      assert.ok(individual.text.includes(session.returnPrompt))
      assert.ok(kit.text.includes(individual.text))
      assert.ok(kit.text.includes(`ENCONTRO ${session.number} — ${session.study.title}`))
      assert.ok(kit.text.includes(session.study.context))
      assert.ok(kit.text.includes(session.study.reference))
      assert.ok(kit.text.includes(session.betweenMeetings))
      assert.ok(kit.text.includes(session.returnPrompt))
      assert.ok(kit.text.includes(session.nextConversation))
      for (const question of session.study.questions) assert.ok(kit.text.includes(question))
    }
    assert.equal((kit.text.match(/Duração: /g) ?? []).length, 4)
    assert.equal((kit.text.match(new RegExp(`Duração: ${duration} minutos`, 'g')) ?? []).length, 4)
  }
})

test('duration recovery accepts only supported query strings and exports reject invalid choices', () => {
  for (const duration of meetingDurations) assert.equal(readPathDuration(String(duration)), duration)
  for (const invalid of [undefined, null, ['60'], '60.0', true, '999']) assert.equal(readPathDuration(invalid), 45)
  for (const invalid of [0, -1, '30', 31, NaN, null]) assert.throws(() => buildLearningPathKit(invalid))
  assert.throws(() => buildPathMeetingGuide('missing', 45))
})

test('the community learning path is available without a demo session', () => {
  const guard = createDemoAuthGuard(() => { throw new Error('Public path must not load identity') })
  assert.equal(guard({ path: '/caminhada', fullPath: '/caminhada?tempo=60' }), true)
})
