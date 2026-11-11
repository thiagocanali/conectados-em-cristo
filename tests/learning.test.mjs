import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { studies, findStudy, passageUrl } from '../src/data/studies.mjs'
import { buildMeetingGuide, meetingDurations, meetingQuery, readMeetingSelection, publicMeetingUrl } from '../src/services/meetingGuide.mjs'
import { createDemoAuthGuard } from '../src/router/demoAuthGuard.mjs'

test('published guides have unique stable links, gospel references and complete study material', () => {
  const slugs = studies.map(study => study.slug)
  assert.equal(new Set(slugs).size, slugs.length)
  for (const study of studies) {
    assert.match(study.slug, /^[a-z]+(?:-[a-z]+)*$/)
    assert.match(study.reference, /^(Marcos|Mateus|Lucas|João) \d+:\d+–\d+$/)
    assert.ok(study.context.length > 100)
    assert.ok(study.observation.length > 40)
    assert.equal(study.questions.length, 3)
    assert.ok(study.questions.every(question => typeof question === 'string' && question.endsWith('?')))
    assert.ok(study.practice.length > 40)
    assert.ok(study.prayer.length > 40)
    assert.equal(findStudy(study.slug), study)
    const url = new URL(passageUrl(study))
    assert.equal(url.protocol, 'https:')
    assert.equal(url.hostname, 'www.biblegateway.com')
    assert.equal(url.searchParams.get('search'), study.passage)
  }
  assert.equal(findStudy('missing-study'), null)
  assert.equal(findStudy(['o-convite-de-jesus']), null)
})

test('meeting schedules fill every supported duration and preserve the selected passage and questions', () => {
  for (const study of studies) {
    for (const minutes of meetingDurations) {
      const guide = buildMeetingGuide(study, minutes)
      assert.equal(guide.sections.length, 5)
      assert.equal(guide.sections.reduce((sum, item) => sum + item.minutes, 0), minutes)
      assert.ok(guide.sections.every(item => item.minutes > 0))
      assert.ok(guide.text.includes(study.reference))
      assert.ok(guide.text.includes(study.context))
      assert.ok(guide.text.includes(passageUrl(study)))
      assert.ok(guide.preparation.every(item => guide.text.includes(item)))
      assert.ok(guide.text.includes(study.practice))
      for (const question of study.questions) assert.ok(guide.text.includes(question))
      assert.ok(guide.text.includes('opcional'))
    }
  }
})

test('shared meeting links round-trip the selected study and every supported duration', () => {
  for (const study of studies) {
    for (const duration of meetingDurations) {
      const query = meetingQuery(study.slug, duration)
      assert.deepEqual(readMeetingSelection(query), { slug: study.slug, duration, corrected: false })
      assert.deepEqual(Object.keys(query).sort(), ['estudo', 'tempo'])
    }
  }
})

test('invalid meeting query values recover to known choices without arbitrary conversion', () => {
  assert.deepEqual(readMeetingSelection(), { slug: studies[0].slug, duration: 45, corrected: false })
  for (const invalid of [null, true, ['60'], '60.0', '999', '', {}]) {
    const recovered = readMeetingSelection({ estudo: studies[1].slug, tempo: invalid })
    assert.equal(recovered.slug, studies[1].slug)
    assert.equal(recovered.duration, 45)
    assert.equal(recovered.corrected, true)
  }
  for (const invalid of [null, ['o-convite-de-jesus'], 'unknown', '<script>']) {
    const recovered = readMeetingSelection({ estudo: invalid, tempo: '60' })
    assert.equal(recovered.slug, studies[0].slug)
    assert.equal(recovered.duration, 60)
    assert.equal(recovered.corrected, true)
  }
  assert.equal(readMeetingSelection(null).corrected, false)
})

test('meeting links whitelist only public selection fields and reject unsupported exports', () => {
  const selected = readMeetingSelection({ estudo: studies[0].slug, tempo: '30', participante: 'private', relato: 'private' })
  assert.deepEqual(meetingQuery(selected.slug, selected.duration), { estudo: studies[0].slug, tempo: '30' })
  assert.throws(() => meetingQuery('unknown', 45))
  assert.throws(() => meetingQuery(studies[0].slug, '45'))
})

test('public share URLs preserve hosted base paths without unrelated page query or URL credentials', () => {
  const hash = '#/em-comunidade?estudo=amar-o-proximo&tempo=30'
  assert.equal(publicMeetingUrl(`/${hash}`, 'https://example.invalid/?session=private'), `https://example.invalid/${hash}`)
  assert.equal(publicMeetingUrl(`/conectados-em-cristo/?session=private${hash}`, 'https://user:secret@example.invalid/'), `https://example.invalid/conectados-em-cristo/${hash}`)
})

test('unsupported meeting durations fail instead of generating an incomplete schedule', () => {
  for (const minutes of [0, -1, 31, '45', null, NaN]) assert.throws(() => buildMeetingGuide(studies[0], minutes))
  assert.throws(() => buildMeetingGuide(null, 45))
})

test('learning, church and meeting journeys remain public without reading the demo session', () => {
  const guard = createDemoAuthGuard(() => { throw new Error('Public learning must not read a demo identity') })
  for (const path of ['/estudos', '/estudos/o-convite-de-jesus', '/em-comunidade', '/igrejas']) {
    assert.equal(guard({ path, fullPath: path }), true)
  }
})

test('primary product navigation no longer promotes tests or matching', async () => {
  for (const path of ['src/views/HomePage.vue', 'src/components/AppNavbar.vue', 'src/views/DashboardPage.vue']) {
    const source = await readFile(new URL(`../${path}`, import.meta.url), 'utf8')
    const template = source.slice(0, source.indexOf('</template>'))
    assert.doesNotMatch(template, /to="\/(testedons|testepersonalidade|questionario|resultados|descoberta)"/)
    assert.match(template, /to="\/estudos/)
  }
})
