import { passageUrl } from '../data/studies.mjs'

export function buildStudySheet(study) {
  return [
    'CONECTADOS EM CRISTO — FOLHA DE ESTUDO', study.title,
    `Passagem: ${study.reference}`, `Leitura externa: ${passageUrl(study)}`, '',
    'LEIA A PASSAGEM NO SEU CONTEXTO', study.context, study.observation, '',
    'OBSERVE, PERGUNTE E CONVERSE',
    ...study.questions.map((question, index) => `${index + 1}. ${question}`), '',
    'Se estiver em grupo, deem espaço para ouvir. É permitido ter dúvidas e preferir não responder.', '',
    'LEVE A LEITURA PARA A VIDA', study.practice, '',
    'UMA SUGESTÃO DE ORAÇÃO', study.prayer,
    'Use suas próprias palavras. A proposta é responder ao texto com sinceridade.', '',
    'Use sua Bíblia para ler a passagem. Este guia é um apoio de estudo, não substitui as Escrituras ou o acompanhamento da sua igreja.',
    'Guia original do Conectados em Cristo. Referências bíblicas indicadas; nenhuma tradução bíblica foi reproduzida.'
  ].join('\n')
}
