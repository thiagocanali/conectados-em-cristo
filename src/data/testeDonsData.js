export default {
  curiosities: [
    "Os dons espirituais são concedidos pelo Espírito Santo para edificação da igreja.",
    "Nenhum dom é mais importante que outro; todos se complementam.",
    "Os dons devem ser exercidos com amor e humildade.",
    "Descobrir seus dons ajuda você a servir melhor."
  ],

  gifts: {
    sabedoria: {
      name: "Palavra de Sabedoria",
      alternatives: [
        "Direcionamento divino",
        "Conselhos inspirados",
        "Aplicação prática da Palavra"
      ],
      questions: [0, 20, 40, 60, 80, 100]
    },

    conhecimento: {
      name: "Palavra de Conhecimento",
      alternatives: [
        "Compreensão espiritual",
        "Ensino bíblico",
        "Conhecimento revelado"
      ],
      questions: [1, 21, 41, 61, 81, 101]
    },

    fe: {
      name: "Fé",
      alternatives: [
        "Confiança sobrenatural",
        "Certeza nas promessas",
        "Esperança firme"
      ],
      questions: [2, 22, 42, 62, 82, 102]
    },

    curas: {
      name: "Dons de Curas",
      alternatives: [
        "Oração pelos enfermos",
        "Compaixão ativa",
        "Crença em milagres"
      ],
      questions: [3, 23, 43, 63, 83, 103]
    },

    milagres: {
      name: "Operação de Milagres",
      alternatives: [
        "Intervenção sobrenatural",
        "Autoridade espiritual",
        "Ação poderosa de Deus"
      ],
      questions: [4, 24, 44, 64, 84, 104]
    },

    profecia: {
      name: "Profecia",
      alternatives: [
        "Mensagem inspirada",
        "Exortação espiritual",
        "Edificação da igreja"
      ],
      questions: [5, 25, 45, 65, 85, 105]
    },

    discernimento: {
      name: "Discernimento de Espíritos",
      alternatives: [
        "Sensibilidade espiritual",
        "Percepção do bem e do mal",
        "Clareza espiritual"
      ],
      questions: [6, 26, 46, 66, 86, 106]
    },

    linguas: {
      name: "Variedade de Línguas",
      alternatives: [
        "Oração espiritual",
        "Expressão sobrenatural",
        "Comunhão com Deus"
      ],
      questions: [7, 27, 47, 67, 87, 107]
    },

    interpretacao: {
      name: "Interpretação de Línguas",
      alternatives: [
        "Compreensão espiritual",
        "Edificação coletiva",
        "Tradução inspirada"
      ],
      questions: [8, 28, 48, 68, 88, 108]
    },

    ensino: {
      name: "Ensino",
      alternatives: [
        "Didática bíblica",
        "Clareza ao explicar",
        "Formação espiritual"
      ],
      questions: [9, 29, 49, 69, 89, 109]
    },

    exortacao: {
      name: "Exortação",
      alternatives: [
        "Encorajamento",
        "Consolo espiritual",
        "Motivação cristã"
      ],
      questions: [10, 30, 50, 70, 90, 110]
    },

    contribuicao: {
      name: "Contribuição",
      alternatives: [
        "Generosidade",
        "Apoio financeiro",
        "Desapego material"
      ],
      questions: [11, 31, 51, 71, 91, 111]
    },

    lideranca: {
      name: "Liderança",
      alternatives: [
        "Visão",
        "Organização",
        "Influência positiva"
      ],
      questions: [12, 32, 52, 72, 92, 112]
    },

    misericordia: {
      name: "Misericórdia",
      alternatives: [
        "Empatia",
        "Compaixão",
        "Cuidado com o próximo"
      ],
      questions: [13, 33, 53, 73, 93, 113]
    },

    servico: {
      name: "Serviço",
      alternatives: [
        "Disposição para ajudar",
        "Apoio prático",
        "Humildade"
      ],
      questions: [14, 34, 54, 74, 94, 114]
    },

    apostolado: {
      name: "Apostolado",
      alternatives: [
        "Envio missionário",
        "Fundação de obras",
        "Expansão do Reino"
      ],
      questions: [15, 35, 55, 75, 95, 115]
    },

    evangelismo: {
      name: "Evangelismo",
      alternatives: [
        "Compartilhar a fé",
        "Alcançar pessoas",
        "Paixão por almas"
      ],
      questions: [16, 36, 56, 76, 96, 116]
    },

    pastoreio: {
      name: "Pastoreio",
      alternatives: [
        "Cuidado espiritual",
        "Acompanhamento",
        "Proteção do rebanho"
      ],
      questions: [17, 37, 57, 77, 97, 117]
    },

    intercessao: {
      name: "Intercessão",
      alternatives: [
        "Oração constante",
        "Carga espiritual",
        "Clamor pelo próximo"
      ],
      questions: [18, 38, 58, 78, 98, 118]
    },

    administracao: {
      name: "Administração",
      alternatives: [
        "Organização",
        "Gestão",
        "Planejamento"
      ],
      questions: [19, 39, 59, 79, 99, 119]
    }
  },

  questions: Array.from({ length: 120 }, (_, i) => {
    const texts = [
      "Costumo dar conselhos sábios",
      "Gosto de estudar profundamente a Palavra",
      "Confio plenamente em Deus",
      "Sinto compaixão por quem sofre",
      "Creio que Deus pode agir de forma sobrenatural",
      "Sinto liberdade ao transmitir mensagens espirituais",
      "Percebo facilmente influências espirituais",
      "Tenho experiências profundas em oração",
      "Consigo entender mensagens espirituais complexas",
      "Tenho facilidade em ensinar",
      "Gosto de encorajar pessoas",
      "Sinto alegria em contribuir financeiramente",
      "Consigo liderar pessoas",
      "Me compadeço facilmente do sofrimento alheio",
      "Gosto de servir nos bastidores",
      "Sinto chamado missionário",
      "Tenho facilidade em falar de Jesus",
      "Cuido espiritualmente das pessoas",
      "Sinto forte chamado para orar",
      "Gosto de organizar e planejar"
    ];
    return {
      text: texts[i % 20],
      gift: Object.keys(this?.gifts || {})[i % 20]
    };
  })
};
