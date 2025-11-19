<template>
  <div class="resultados">
    <div class="result-container">
      <h1>Combinações Compatíveis</h1>

      <p class="intro">
        Aqui estão os usuários mais compatíveis com você, com base nas suas respostas:
      </p>

      <div v-if="listaCompatibilidade.length === 0">
        Nenhum outro usuário respondeu ao questionário ainda.
      </div>

      <div
        v-for="(item, index) in listaCompatibilidade"
        :key="index"
        class="card"
      >
        <h3>{{ item.username }}</h3>
        <p>Pontuação de compatibilidade: <strong>{{ item.score }} / 30</strong></p>

        <div class="bar">
          <div
            class="bar-fill"
            :style="{ width: (item.score / 30) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <router-link class="btn" to="/dashboard">Voltar</router-link>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listaCompatibilidade: []
    };
  },
  mounted() {
    this.calcular();
  },
  methods: {
    calcular() {
      const atual = JSON.parse(localStorage.getItem("currentUser"));
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const outros = users.filter(u => u.username !== atual.username && u.respostas.length > 0);

      const lista = [];

      for (const user of outros) {
        let score = 0;

        for (let i = 0; i < 10; i++) {
          const diff = Math.abs(atual.respostas[i] - user.respostas[i]);

          if (diff === 0) score += 3;
          else if (diff === 1) score += 2;
          else score += 1;
        }

        lista.push({ username: user.username, score });
      }

      // Ordenar do mais compatível para o menos
      this.listaCompatibilidade = lista.sort((a, b) => b.score - a.score);
    }
  }
};
</script>

<style scoped>
.resultados {
  min-height: 100vh;
  background: #e6fffa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.result-container {
  background: #fff;
  width: 600px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 10px #0003;
}

.intro {
  margin-bottom: 25px;
}

.card {
  background: #f7fafc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.bar {
  width: 100%;
  height: 12px;
  background: #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
}

.bar-fill {
  height: 12px;
  background: #38b2ac;
}

.btn {
  display: block;
  margin-top: 20px;
  padding: 10px;
  text-align: center;
  background: #3182ce;
  color: white;
  border-radius: 6px;
  text-decoration: none;
}
.btn:hover {
  background: #2b6cb0;
}
</style>
