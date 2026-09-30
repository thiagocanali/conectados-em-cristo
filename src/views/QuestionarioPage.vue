<template>
  <div class="questionario-page page-wrapper">
    <div class="quest-header fade-in-up">
      <p class="eyebrow"><span aria-hidden="true">&#10070;</span> Compatibilidade</p>
      <h1>Questionário de Compatibilidade</h1>
      <p class="quest-subtitle">Responda com sinceridade. Suas respostas ajudam a encontrar pessoas alinhadas com seus valores.</p>
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
export default {
  data() {
    return {
      respostas: Array(10).fill(""),
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
  methods: {
    salvarRespostas() {
      const current = JSON.parse(localStorage.getItem("currentUser"));
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      const index = users.findIndex(u => u.email === current.email);
      if (index !== -1) {
        users[index].respostas = [...this.respostas];
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(users[index]));
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
  .quest-submit { align-self: stretch; }
}
</style>
