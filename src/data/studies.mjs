// Original study guides. Bible passages are referenced, not reproduced as a translation.
export const studies = [
  {
    slug: 'o-convite-de-jesus', title: 'O convite de Jesus', theme: 'Conhecer Jesus',
    reference: 'Marcos 1:14–20', passage: 'Marcos 1:14-20', minutes: 15,
    summary: 'Conheça a mensagem de Jesus e reflita sobre o que significa responder ao seu chamado.',
    context: 'Marcos apresenta Jesus anunciando a chegada do Reino de Deus e chamando pessoas a uma resposta de arrependimento e fé. Em seguida, ele encontra trabalhadores em sua rotina e os convida a segui-lo. O centro da passagem é quem chama e a resposta a esse convite.',
    observation: 'Leia a passagem inteira. Observe o que Jesus anuncia, o que pede e como os primeiros discípulos respondem. Considere o que o texto diz antes de aplicá-lo à sua própria situação.',
    questions: ['O que Jesus anuncia nos versículos 14 e 15?', 'O que o convite para seguir Jesus revela sobre a relação com ele?', 'Que passo concreto de aprendizado e obediência faz sentido para você nesta semana?'],
    practice: 'Separe um momento para reler esta passagem e converse com alguém de sua igreja sobre uma dúvida ou descoberta a respeito de Jesus.',
    prayer: 'Senhor Jesus, ajuda-nos a ouvir teu chamado, compreender tua mensagem e responder com fé e obediência. Ensina-nos a caminhar contigo.'
  },
  {
    slug: 'permanecer-em-cristo', title: 'Permanecer em Cristo', theme: 'Caminhar com Jesus',
    reference: 'João 15:1–12', passage: 'João 15:1-12', minutes: 20,
    summary: 'Reflita sobre a imagem da videira, a dependência de Cristo e o mandamento de amar.',
    context: 'Na conversa com seus discípulos antes da crucificação, Jesus usa a imagem da videira e dos ramos para falar da relação com ele. A passagem liga permanecer em Cristo à sua palavra, ao amor e à obediência. O fruto não é apresentado como uma competição entre pessoas.',
    observation: 'Leia os versículos 1 a 12 em conjunto. Observe as repetições de permanecer e amor e como o versículo 12 se relaciona com a imagem inicial.',
    questions: ['O que a imagem da videira e dos ramos ajuda a compreender?', 'Como Jesus relaciona permanecer nele, sua palavra e o amor?', 'Como seu grupo pode cultivar uma rotina de escuta das Escrituras e cuidado mútuo?'],
    practice: 'Escolha um momento da semana para ler esta passagem com alguém e combine uma forma simples de cuidado mútuo, sem cobrança de desempenho espiritual.',
    prayer: 'Jesus, queremos permanecer em ti. Forma em nós um amor que se expresse no cuidado com as pessoas e na atenção à tua palavra.'
  },
  {
    slug: 'amar-o-proximo', title: 'Quem se fez próximo?', theme: 'Servir com amor',
    reference: 'Lucas 10:25–37', passage: 'Lucas 10:25-37', minutes: 20,
    summary: 'Escute a parábola do bom samaritano e transforme a conversa em uma atitude de misericórdia.',
    context: 'Em resposta a uma conversa sobre a vida eterna e o amor ao próximo, Jesus conta a história de uma pessoa ferida e de quem se aproxima para cuidar dela. Ao final, a atenção se volta para aquele que agiu com misericórdia. Leia também as perguntas que dão início e encerram o diálogo.',
    observation: 'Observe as ações dos personagens e o cuidado concreto oferecido à pessoa ferida. Evite transformar o estudo em acusações a pessoas ou grupos da sua comunidade.',
    questions: ['Que pergunta provoca a parábola e que pergunta Jesus faz ao final?', 'Quais atitudes tornam a misericórdia visível nessa história?', 'Que necessidade próxima seu grupo pode escutar e atender com respeito?'],
    practice: 'Conversem com uma equipe de serviço da igreja e escolham uma ação possível. Escutem quem será atendido e respeitem sua vontade e privacidade.',
    prayer: 'Senhor Jesus, abre nossos olhos para as necessidades ao redor. Ensina-nos a amar com misericórdia e a servir com humildade e respeito.'
  },
  {
    slug: 'aprender-a-orar', title: 'Aprender a orar com Jesus', theme: 'Orar e confiar',
    reference: 'Mateus 6:5–15', passage: 'Mateus 6:5-15', minutes: 15,
    summary: 'Leia o ensino de Jesus sobre a oração, a confiança no Pai e o perdão.',
    context: 'No Sermão do Monte, Jesus trata da oração e critica a busca por aparência e reconhecimento. Ele ensina seus discípulos a se dirigirem ao Pai, apresentando necessidades e tratando do perdão. O texto convida a olhar tanto para a relação com Deus quanto para a relação com as pessoas.',
    observation: 'Leia o trecho antes e depois da oração ensinada por Jesus. Observe quais atitudes ele questiona e quais assuntos estão presentes em seu ensino.',
    questions: ['Que atitudes Jesus questiona ao falar de oração?', 'O que a oração ensinada por ele revela sobre Deus e nossas necessidades?', 'Como orar juntos sem pressionar ninguém a expor assuntos pessoais?'],
    practice: 'Reserve um momento de oração a partir desta passagem. Em grupo, permita que cada pessoa participe em silêncio ou em voz alta, livremente.',
    prayer: 'Pai, ensina-nos a orar com sinceridade e confiança. Orienta nossa vida para tua vontade e ajuda-nos a tratar as pessoas com graça e perdão.'
  }
]

export function findStudy(slug) { return studies.find(study => study.slug === slug) ?? null }
export function passageUrl(study) {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(study.passage)}&version=ARC`
}
