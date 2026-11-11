import { studies, findStudy, passageUrl } from '../data/studies.mjs'

export const meetingDurations = [30, 45, 60]

export function readMeetingSelection(query = {}) {
  const study = findStudy(query?.estudo)
  const duration = ['30', '45', '60'].includes(query?.tempo) ? Number(query.tempo) : 45
  return {
    slug: study?.slug ?? studies[0].slug,
    duration,
    corrected: (query?.estudo !== undefined && !study)
      || (query?.tempo !== undefined && !['30', '45', '60'].includes(query.tempo))
  }
}

export function meetingQuery(slug, duration) {
  if (!findStudy(slug) || !meetingDurations.includes(duration)) throw new Error('Escolha um estudo e uma duração válida.')
  return { estudo: slug, tempo: String(duration) }
}

export function publicMeetingUrl(routeHref, pageUrl) {
  const url = new URL(routeHref, pageUrl)
  // Keep the hosted base path and hash route, without unrelated page query or credentials.
  return `${url.origin}${url.pathname}${url.hash}`
}

export function buildMeetingGuide(study, duration) {
  if (!study || !meetingDurations.includes(duration)) throw new Error('Escolha um estudo e uma duração válida.')
  const times = { 30: [5, 5, 10, 5, 5], 45: [5, 10, 15, 10, 5], 60: [5, 15, 20, 15, 5] }[duration]
  const preparation = [
    'Leia a passagem inteira antes de conduzir. Confira o contexto e anote suas próprias perguntas na Bíblia ou no material que costuma usar.',
    'Deixe a referência à mão e combine quem fará a leitura. Cada pessoa pode usar sua própria Bíblia; ler em voz alta é opcional.',
    'Ajuste os tempos à conversa do grupo. Acolha dúvidas, permita o silêncio e combine uma ação possível para a semana.'
  ]
  const sections = [
    { title: 'Acolher', text: 'Recebam as pessoas e expliquem o tema. Ninguém precisa compartilhar algo pessoal ou responder a todas as perguntas.' },
    { title: 'Ler a passagem', text: `Leiam ${study.reference} na Bíblia de vocês. ${study.observation}` },
    { title: 'Conversar sobre o texto', text: study.questions.map((question, index) => `${index + 1}. ${question}`).join('\n') },
    { title: 'Levar à prática', text: study.practice },
    { title: 'Orar e encerrar', text: `Sugestão de oração, em palavras próprias: ${study.prayer}\nCombinem quando retomar a conversa. Participar da oração em voz alta é opcional.` }
  ].map((section, index) => ({ ...section, minutes: times[index] }))
  const text = [
    'CONECTADOS EM CRISTO — ROTEIRO DE ENCONTRO', study.title,
    `Passagem: ${study.reference}`, `Duração: ${duration} minutos`,
    `Leitura externa: ${passageUrl(study)}`, '',
    'Leia a passagem bíblica em seu contexto. Este roteiro é um apoio de estudo, não substitui as Escrituras ou o acompanhamento da sua igreja.', '',
    'ANTES DO ENCONTRO — preparação fora do tempo sugerido',
    ...preparation.map((item, index) => `${index + 1}. ${item}`), '',
    'CONTEXTO DA PASSAGEM', study.context, '',
    'DURANTE O ENCONTRO — tempos sugeridos, ajustáveis à conversa', '',
    ...sections.flatMap(section => [`${section.title.toUpperCase()} — ${section.minutes} min`, section.text, '']),
    'Guia original do Conectados em Cristo. Referências bíblicas indicadas; nenhuma tradução bíblica foi reproduzida.'
  ].join('\n')
  return { preparation, sections, text }
}
