<template>
  <div class="questionario">
    <div class="form-container">
      <h1>Questionário de Compatibilidade</h1>

      <form @submit.prevent="salvarRespostas">
        
        <div v-for="(pergunta, index) in perguntas" :key="index" class="input-group">
          <label :for="'p' + index">{{ pergunta.texto }}</label>

          <select v-model="respostas[index]" :id="'p' + index" required>
            <option disabled value="">Selecione...</option>
            <option v-for="op in pergunta.opcoes" :key="op.valor" :value="op.valor">
              {{ op.label }}
            </option>
          </select>

        </div>

        <button type="submit">Salvar e Ver Combinações</button>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      respostas: Array(10).fill(""),
      perguntas: [
        { texto: "Como você descreve sua fé cristã?",
          opcoes: [
            { valor: 3, label: "Forte" },
            { valor: 2, label: "Média" },
            { valor: 1, label: "Fraca" },
          ]
        },
        { texto: "Com que frequência você lê a Bíblia?",
          opcoes: [
            { valor: 3, label: "Diariamente" },
            { valor: 2, label: "Algumas vezes por semana" },
            { valor: 1, label: "Raramente" },
          ]
        },
        { texto: "Você participa ativamente de algum ministério?",
          opcoes: [
            { valor: 3, label: "Sim, regularmente" },
            { valor: 2, label: "Ocasionalmente" },
            { valor: 1, label: "Não" },
          ]
        },
        { texto: "Você prefere atividades:",
          opcoes: [
            { valor: 3, label: "Musicais" },
            { valor: 2, label: "Sociais/Serviço" },
            { valor: 1, label: "Estudo/Ensino" },
          ]
        },
        { texto: "Você se considera uma pessoa mais:",
          opcoes: [
            { valor: 3, label: "Extrovertida" },
            { valor: 2, label: "Equilibrada" },
            { valor: 1, label: "Introvertida" },
          ]
        },
        { texto: "Quão importante é participar da igreja?",
          opcoes: [
            { valor: 3, label: "Muito importante" },
            { valor: 2, label: "Importante" },
            { valor: 1, label: "Pouco importante" },
          ]
        },
        { texto: "Você gosta de servir outras pessoas?",
          opcoes: [
            { valor: 3, label: "Muito" },
            { valor: 2, label: "Às vezes" },
            { valor: 1, label: "Prefiro não" },
          ]
        },
        { texto: "Sua vida de oração é:",
          opcoes: [
            { valor: 3, label: "Constante" },
            { valor: 2, label: "Moderada" },
            { valor: 1, label: "Fraca" },
          ]
        },
        { texto: "Você gosta de ensinar?",
          opcoes: [
            { valor: 3, label: "Sim" },
            { valor: 2, label: "Depende" },
            { valor: 1, label: "Não" },
          ]
        },
        { texto: "Você gosta de estudar a Bíblia?",
          opcoes: [
            { valor: 3, label: "Muito" },
            { valor: 2, label: "Às vezes" },
            { valor: 1, label: "Pouco" },
          ]
        }
      ]
    };
  },
  methods: {
    salvarRespostas() {
      const current = JSON.parse(localStorage.getItem("currentUser"));
      let users = JSON.parse(localStorage.getItem("users") || "[]");

      // Atualiza o usuário atual
      const index = users.findIndex(u => u.username === current.username);
      users[index].respostas = [...this.respostas];

      // Salva
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(users[index]));

      this.$router.push("/resultados");
    }
  }
};
</script>

<style scoped>
.questionario {
  min-height: 100vh;
  background: #eef2f7;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  background: #fff;
  padding: 40px;
  width: 500px;
  border-radius: 10px;
  box-shadow: 0 4px 10px #0003;
}

label {
  margin-bottom: 8px;
  display: block;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #aaa;
}

button {
  margin-top: 25px;
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
  background: #3182ce;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #2b6cb0;
}
</style>
