<template>
  <div class="resultados-page page-wrapper">
    <div class="res-header fade-in-up">
      <p class="eyebrow"><span aria-hidden="true">&#9776;</span> Compatibilidade</p>
      <h1>Combinações Compatíveis</h1>
      <p class="res-subtitle">Pessoas que demonstram alinhamento com suas respostas. A decisão é sempre sua.</p>
    </div>

    <div v-if="listaCompatibilidade.length === 0" class="res-empty fade-in-up">
      <div class="empty-icon" aria-hidden="true">&#9776;</div>
      <template v-if="!hasAnswers">
        <p>Você ainda não respondeu ao questionário.</p>
        <p class="empty-sub">Complete suas respostas para ver combinações compatíveis.</p>
        <router-link to="/questionario" class="btn-primary">Responder questionário</router-link>
      </template>
      <template v-else>
        <p>Nenhuma combinação disponível por enquanto.</p>
        <p class="empty-sub">Quando outras pessoas responderem, as combinações aparecerão aqui.</p>
      </template>
    </div>

    <div v-else class="res-list fade-in-up">
      <div v-for="item in listaCompatibilidade" :key="item.email" class="res-card">
        <div class="res-card-header">
          <div class="avatar">{{ item.username.charAt(0) }}</div>
          <div>
            <h3>{{ item.username }}</h3>
            <p>Pontuação de compatibilidade: <strong>{{ item.score }} / 30</strong></p>
          </div>
        </div>
        <div class="bar" role="progressbar" :aria-label="`Compatibilidade com ${item.username}`" aria-valuemin="0" aria-valuemax="30" :aria-valuenow="item.score">
          <div class="bar-fill" :style="{ width: (item.score / 30) * 100 + '%' }"></div>
        </div>
      </div>
    </div>

    <router-link to="/dashboard" class="back-link">&larr; Voltar ao painel</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return { listaCompatibilidade: [] };
  },
  computed: {
    hasAnswers() {
      const current = JSON.parse(localStorage.getItem("currentUser") || "null");
      return Array.isArray(current?.respostas) && current.respostas.length === 10;
    }
  },
  mounted() { this.calcular(); },
  methods: {
    calcular() {
      const atual = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (!Array.isArray(atual?.respostas) || atual.respostas.length !== 10) return;

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const outros = users.filter(user => user.email !== atual.email && Array.isArray(user.respostas) && user.respostas.length === 10);

      const lista = [];
      for (const user of outros) {
        let score = 0;
        for (let i = 0; i < 10; i++) {
          const diff = Math.abs(atual.respostas[i] - user.respostas[i]);
          if (diff === 0) score += 3;
          else if (diff === 1) score += 2;
          else score += 1;
        }
        lista.push({ email: user.email, username: user.username, score });
      }
      this.listaCompatibilidade = lista.sort((a, b) => b.score - a.score);
    }
  }
};
</script>

<style scoped>
.res-header { margin-bottom: 36px; }
.res-header h1 { font-size: clamp(1.8rem, 4vw, 2.5rem); margin: 14px 0 8px; }
.res-subtitle { color: var(--text-muted); font-size: 0.92rem; max-width: 500px; }

.res-list {
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.res-card {
  background: var(--cream-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: border-color var(--t-base);
}
.res-card:hover { border-color: var(--terra-light); }

.res-card-header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
.avatar {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: var(--green-deep);
  color: var(--cream);
  font-size: 1.3rem;
  font-weight: 700;
  font-family: var(--font-serif);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.res-card-header h3 { font-size: 1.3rem; margin: 0; }
.res-card-header p { font-size: 0.85rem; color: var(--text-muted); margin: 2px 0 0; }
.res-card-header strong { color: var(--terra); }

.bar {
  width: 100%;
  height: 8px;
  background: var(--cream-dark);
  border-radius: 10px;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--terra), var(--terra-light));
  border-radius: 10px;
  transition: width 0.6s var(--ease);
}

.res-empty {
  text-align: center;
  padding: 60px 20px;
  max-width: 420px;
  margin: 0 auto;
}
.empty-icon { font-size: 3rem; color: var(--terra-light); margin-bottom: 16px; }
.empty-sub { color: var(--text-muted); font-size: 0.88rem; margin: 4px 0 0; }
.res-empty .btn-primary { margin-top: 18px; }

.back-link {
  display: block;
  text-align: center;
  margin-top: 36px;
  color: var(--text-dark);
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  transition: color var(--t-fast);
}
.back-link:hover { color: var(--terra); }
</style>
