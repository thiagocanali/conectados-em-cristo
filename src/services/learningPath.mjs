import { learningPath } from '../data/learningPath.mjs'
import { findStudy } from '../data/studies.mjs'
import { buildMeetingGuide, meetingDurations } from './meetingGuide.mjs'

export function pathSessions() {
  return learningPath.sessions.map((session, index) => {
    const study = findStudy(session.studySlug)
    if (!study) throw new Error('Um estudo da caminhada não está disponível.')
    return { ...session, study, number: index + 1 }
  })
}

export function pathSessionFor(studySlug) {
  const sessions = pathSessions()
  const index = sessions.findIndex(session => session.studySlug === studySlug)
  return index < 0 ? null : { session: sessions[index], next: sessions[index + 1] ?? null }
}

export function readPathDuration(value) {
  return ['30', '45', '60'].includes(value) ? Number(value) : 45
}

export function buildPathMeetingGuide(studySlug, duration) {
  const context = pathSessionFor(studySlug)
  if (!context) throw new Error('Este estudo não faz parte da caminhada.')
  const { session } = context
  const guide = buildMeetingGuide(session.study, duration)
  return {
    ...guide,
    text: [
      `ENCONTRO ${session.number} — ${session.study.title}`, '',
      `Proposta: ${session.purpose}`, `Para acolher e retomar: ${session.returnPrompt}`, '',
      guide.text, '', 'ENTRE OS ENCONTROS', session.betweenMeetings,
      'PARA A PRÓXIMA CONVERSA', session.nextConversation
    ].join('\n')
  }
}

export function buildLearningPathKit(duration) {
  if (!meetingDurations.includes(duration)) throw new Error('Escolha uma duração disponível para os encontros.')
  const sessions = pathSessions()
  const text = [
    'CONECTADOS EM CRISTO — CAMINHADA EM COMUNIDADE',
    learningPath.title, learningPath.summary,
    `${sessions.length} encontros · ${duration} minutos sugeridos por encontro`, '',
    'COMO USAR',
    'Escolham o ritmo com a comunidade. A caminhada não é uma formação completa nem uma medida de fé. Confiram as passagens no contexto e adaptem a condução com a liderança responsável.',
    'Cada roteiro já inclui os cinco momentos do encontro. A retomada abaixo pode fazer parte do acolhimento, sem acrescentar minutos obrigatórios.', '',
    ...sessions.flatMap(session => [
      '='.repeat(48), buildPathMeetingGuide(session.studySlug, duration).text, ''
    ]),
    'A participação é livre. O kit contém somente materiais públicos, sem histórico, presença, notas ou relatos pessoais.'
  ].join('\n')
  return { sessions, text }
}
