<template>
  <div class="dashboard-page page-wrapper">
    <div class="dash-header fade-in-up">
      <p class="eyebrow"><span aria-hidden="true">&#10022;</span> Seu espaço</p>
      <h1>Olá, {{ userName }}</h1>
      <p class="dash-subtitle">Escolha o que você deseja fazer hoje.</p>
    </div>

    <div class="dash-grid fade-in-up">
      <router-link to="/perfil" class="dash-card">
        <div class="dash-icon" aria-hidden="true">&#9673;</div>
        <h3>Meu Perfil</h3>
        <p>Edite suas informações pessoais, fé e propósito.</p>
      </router-link>

      <router-link to="/descoberta" class="dash-card">
        <div class="dash-icon" aria-hidden="true">&#9825;</div>
        <h3>Descobrir Pessoas</h3>
        <p>Conheça perfis com calma, propósito e oração.</p>
      </router-link>

      <router-link to="/salvos" class="dash-card">
        <div class="dash-icon" aria-hidden="true">&#9733;</div>
        <h3>Perfis Salvos</h3>
        <p>Pessoas que você quer conhecer com mais calma.</p>
      </router-link>

      <router-link to="/questionario" class="dash-card">
        <div class="dash-icon" aria-hidden="true">&#10070;</div>
        <h3>Questionário</h3>
        <p>Responda perguntas para encontrar compatibilidades.</p>
      </router-link>

      <router-link to="/resultados" class="dash-card">
        <div class="dash-icon" aria-hidden="true">&#9776;</div>
        <h3>Combinações</h3>
        <p>Veja pessoas compatíveis com suas respostas.</p>
      </router-link>

      <router-link to="/testedons" class="dash-card">
        <div class="dash-icon" aria-hidden="true">&#10022;</div>
        <h3>Dons Espirituais</h3>
        <p>Descubra como Deus te capacitou para servir.</p>
      </router-link>

      <router-link to="/testepersonalidade" class="dash-card">
        <div class="dash-icon" aria-hidden="true">&#9774;</div>
        <h3>Personalidade</h3>
        <p>Entenda melhor como você se relaciona.</p>
      </router-link>

      <button @click="logout" class="dash-card dash-card-exit">
        <div class="dash-icon" aria-hidden="true">&larr;</div>
        <h3>Sair</h3>
        <p>Encerrar sua sessão com segurança.</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: null
    }
  },
  computed: {
    userName() {
      return this.currentUser?.username || 'amigo(a)'
    }
  },
  mounted() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!this.currentUser) {
      this.$router.push('/login')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('currentUser')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.dash-header { margin-bottom: 40px; }
.dash-header h1 { font-size: clamp(2rem, 5vw, 2.8rem); margin: 14px 0 6px; }
.dash-subtitle { color: var(--text-muted); font-size: 0.95rem; }

.dash-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
}

.dash-card {
  background: var(--cream-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: transform var(--t-base), box-shadow var(--t-base), border-color var(--t-base);
  text-align: left;
  font-family: inherit;
  color: inherit;
}
.dash-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--terra-light);
}
.dash-icon { font-size: 1.6rem; color: var(--terra); margin-bottom: 8px; }
.dash-card h3 { font-size: 1.3rem; margin: 0; }
.dash-card p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }

.dash-card-exit {
  border-color: var(--border);
  cursor: pointer;
}
.dash-card-exit .dash-icon { color: var(--text-muted); }
.dash-card-exit:hover { border-color: var(--error); }
.dash-card-exit:hover .dash-icon { color: var(--error); }
</style>
