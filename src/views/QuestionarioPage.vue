<template>
  <div class="questionario-page page-wrapper">
    <div class="quest-header fade-in-up">
      <p class="eyebrow"><span aria-hidden="true">&#10070;</span> Compatibilidade</p>
      <h1>Questionário de Compatibilidade</h1>
      <p class="quest-subtitle">Responda com sinceridade. Suas respostas ajudam a encontrar pessoas alinhadas com seus valores.</p>
      <div class="quest-progress">
        <p aria-live="polite">{{ respondidas }} de {{ perguntas.length }} perguntas respondidas</p>
        <div class="quest-progress-track" role="progressbar" :aria-valuenow="respondidas" :aria-valuemin="0" :aria-valuemax="perguntas.length" :aria-label="`${respondidas} de ${perguntas.length} perguntas respondidas`">
          <span :style="{ width: (respondidas / perguntas.length) * 100 + '%' }"></span>
        </div>
      </div>
    </div>

    <form @submit.prevent="salvarRespostas" class="quest-form fade-in-up">
      <div v-for="(pergunta, index) in perguntas" :key="index" class="quest-item">
        <label :for="'p' + index" class="quest-label">
          <span class="quest-num">{{ index + 1 }}</span>
          {{ pergunta.texto }}
        </label>
        <select v-model="respostas[index]" :id="'p' + index" class="field-select" required>
          <option disabled value="">Selecione...</option>
          <option v-for="op in pergunta.opcoes" :key="op.valor" :value="op.valor">
            {{ op.label }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn-primary quest-submit">
        Salvar e Ver Combinações <span aria-hidden="true">&rarr;</span>
      </button>
    </form>
  </div>
</template>

<script>
import { getDemoSession, getDemoUsers, setDemoSession } from '@/services/demoAuth.mjs'

export default {
  data() {
    return {
      respostas: this.loadAnswers(),
      perguntas: [
        { texto: "Como você descreve sua fé cristã?", opcoes: [
          { valor: 3, label: "Forte" }, { valor: 2, label: "Média" }, { valor: 1, label: "Fraca" }
        ]},
        { texto: "Com que frequência você lê a Bíblia?", opcoes: [
          { valor: 3, label: "Diariamente" }, { valor: 2, label: "Algumas vezes por semana" }, { valor: 1, label: "Raramente" }
        ]},
        { texto: "Você participa ativamente de algum ministério?", opcoes: [
          { valor: 3, label: "Sim, regularmente" }, { valor: 2, label: "Ocasionalmente" }, { valor: 1, label: "Não" }
        ]},
        { texto: "Você prefere atividades:", opcoes: [
          { valor: 3, label: "Musicais" }, { valor: 2, label: "Sociais / Serviço" }, { valor: 1, label: "Estudo / Ensino" }
        ]},
        { texto: "Você se considera uma pessoa mais:", opcoes: [
          { valor: 3, label: "Extrovertida" }, { valor: 2, label: "Equilibrada" }, { valor: 1, label: "Introvertida" }
        ]},
        { texto: "Quão importante é participar da igreja?", opcoes: [
          { valor: 3, label: "Muito importante" }, { valor: 2, label: "Importante" }, { valor: 1, label: "Pouco importante" }
        ]},
        { texto: "Você gosta de servir outras pessoas?", opcoes: [
          { valor: 3, label: "Muito" }, { valor: 2, label: "Às vezes" }, { valor: 1, label: "Prefiro não" }
        ]},
        { texto: "Sua vida de oração é:", opcoes: [
          { valor: 3, label: "Constante" }, { valor: 2, label: "Moderada" }, { valor: 1, label: "Fraca" }
        ]},
        { texto: "Você gosta de ensinar?", opcoes: [
          { valor: 3, label: "Sim" }, { valor: 2, label: "Depende" }, { valor: 1, label: "Não" }
        ]},
        { texto: "Você gosta de estudar a Bíblia?", opcoes: [
          { valor: 3, label: "Muito" }, { valor: 2, label: "Às vezes" }, { valor: 1, label: "Pouco" }
        ]}
      ]
    };
  },
  computed: {
    respondidas() {
      return this.respostas.filter(resposta => resposta !== '' && resposta !== null).length;
    }
  },
  methods: {
    loadAnswers() {
      try {
        const current = getDemoSession()
        return Array.isArray(current?.respostas) && current.respostas.length === 10 ? [...current.respostas] : Array(10).fill('')
      } catch { return Array(10).fill('') }
    },
    salvarRespostas() {
      let current = null
      let users = []
      try {
        current = JSON.parse(localStorage.getItem('currentUser') || 'null')
        users = getDemoUsers()
      } catch { current = null; users = [] }
      if (!current || !current.email) { this.$router.push('/login'); return }
      const answers = this.respostas.map(value => Number(value))
      if (answers.length !== 10 || answers.some(value => ![1, 2, 3].includes(value))) return
      const index = users.findIndex(u => u.email === current.email);
      if (index !== -1) {
        users[index].respostas = answers;
        localStorage.setItem("users", JSON.stringify(users));
        setDemoSession(users[index]);
      } else {
        current.respostas = answers;
        setDemoSession(current);
      }
      this.$router.push("/resultados");
    }
  }
};
</script>

<style scoped>
.quest-header { margin-bottom: 40px; }
.quest-header h1 { font-size: clamp(1.8rem, 4vw, 2.5rem); margin: 14px 0 8px; }
.quest-subtitle { color: var(--text-muted); font-size: 0.95rem; max-width: 520px; }
.quest-progress { max-width: 520px; margin-top: 24px; }
.quest-progress p { color: var(--text-muted); font-size: 0.8rem; font-weight: 600; margin-bottom: 8px; }
.quest-progress-track { height: 6px; overflow: hidden; border-radius: 99px; background: var(--cream-dark); }
.quest-progress-track span { display: block; height: 100%; border-radius: inherit; background: var(--terra); transition: width var(--t-base); }

.quest-form {
  max-width: 620px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.quest-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quest-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  line-height: 1.5;
}

.quest-num {
  flex-shrink: 0;
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--terra);
  color: white;
  font-size: 0.78rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.field-select {
  margin-left: 40px;
  max-width: 400px;
}

.quest-submit { align-self: flex-start; margin-top: 8px; }

@media (max-width: 520px) {
  .field-select { margin-left: 0; max-width: 100%; }
  .quest-submit { align-self: stretch; min-height: 48px; }
}
</style>
