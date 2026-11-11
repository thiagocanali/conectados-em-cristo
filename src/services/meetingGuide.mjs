export const meetingDurations = [30, 45, 60]

export function buildMeetingGuide(study, duration) {
  if (!study || !meetingDurations.includes(duration)) throw new Error('Escolha um estudo e uma duração válida.')
  const times = { 30: [5, 5, 10, 5, 5], 45: [5, 10, 15, 10, 5], 60: [5, 15, 20, 15, 5] }[duration]
  const sections = [
    { title: 'Acolher', text: 'Recebam as pessoas e expliquem o tema. Ninguém precisa compartilhar algo pessoal ou responder a todas as perguntas.' },
    { title: 'Ler a passagem', text: `Leiam ${study.reference} na Bíblia de vocês. ${study.observation}` },
    { title: 'Conversar sobre o texto', text: study.questions.map((question, index) => `${index + 1}. ${question}`).join('\n') },
    { title: 'Levar à prática', text: study.practice },
    { title: 'Orar e encerrar', text: `Sugestão de oração, em palavras próprias: ${study.prayer}\nCombinem quando retomar a conversa. Participar da oração em voz alta é opcional.` }
  ].map((section, index) => ({ ...section, minutes: times[index] }))
  const text = [`CONECTADOS EM CRISTO — ROTEIRO DE ENCONTRO`, study.title, `Passagem: ${study.reference}`, `Duração: ${duration} minutos`, '', 'Leia a passagem bíblica em seu contexto. Este roteiro é um apoio de estudo, não substitui as Escrituras ou o acompanhamento da sua igreja.', '', ...sections.flatMap(section => [`${section.title.toUpperCase()} — ${section.minutes} min`, section.text, '']), 'Guia original do Conectados em Cristo. Referências bíblicas indicadas; nenhuma tradução bíblica foi reproduzida.'].join('\n')
  return { sections, text }
}
