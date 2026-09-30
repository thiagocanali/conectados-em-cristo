<template>
  <div class="salvos-page page-narrow">
    <div class="salvos-header fade-in-up">
      <p class="eyebrow"><span aria-hidden="true">&#9733;</span> Perfis guardados</p>
      <h1>Perfis Salvos</h1>
      <p class="salvos-subtitle">Pessoas que você quer conhecer com calma e oração.</p>
    </div>

    <div v-if="salvos.length === 0" class="salvos-empty fade-in-up">
      <div class="empty-icon" aria-hidden="true">&#9733;</div>
      <p>Você ainda não salvou nenhum perfil.</p>
      <router-link to="/descoberta" class="btn-primary">Descobrir pessoas</router-link>
    </div>

    <ul v-else class="salvos-list fade-in-up">
      <li v-for="(p, i) in salvos" :key="p.nome + i" class="salvo-item">
        <div class="avatar">{{ p.nome.charAt(0) }}</div>
        <div class="salvo-info">
          <strong>{{ p.nome }}, {{ p.idade }}</strong>
          <span>{{ p.cidade }} · {{ p.denominacao }}</span>
        </div>
        <button class="remover" @click="remover(i)" :aria-label="`Remover ${p.nome} dos perfis salvos`">Remover</button>
      </li>
    </ul>

    <router-link to="/dashboard" class="back-link">&larr; Voltar ao painel</router-link>
  </div>
</template>

<script>
export default {
  data() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const storageKey = `${currentUser ? `user:${currentUser.email}:` : 'guest:'}perfisSalvos`;
    if (currentUser && users.length === 1 && users[0].email === currentUser.email && !localStorage.getItem(storageKey)) {
      const legacyValue = localStorage.getItem('perfisSalvos');
      if (legacyValue) localStorage.setItem(storageKey, legacyValue);
    }
    return {
      storageKey,
      salvos: JSON.parse(localStorage.getItem(storageKey) || '[]')
    }
  },
  methods: {
    remover(i) {
      this.salvos.splice(i, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(this.salvos));
    }
  }
}
</script>

<style scoped>
.salvos-header { margin-bottom: 32px; }
.salvos-header h1 { font-size: clamp(1.8rem, 4vw, 2.4rem); margin: 14px 0 8px; }
.salvos-subtitle { color: var(--text-muted); font-size: 0.92rem; }

.salvos-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.salvo-item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--cream-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  transition: border-color var(--t-base);
}
.salvo-item:hover { border-color: var(--terra-light); }

.avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--green-deep);
  color: var(--cream);
  font-weight: 700;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.salvo-info { flex: 1; display: flex; flex-direction: column; text-align: left; }
.salvo-info strong { color: var(--ink); font-size: 0.95rem; }
.salvo-info span { color: var(--text-muted); font-size: 0.82rem; }

.remover {
  background: none;
  border: none;
  color: var(--error);
  cursor: pointer;
  min-height: 44px;
  padding: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  transition: opacity var(--t-fast);
}
.remover:hover { opacity: 0.7; }

.salvos-empty {
  text-align: center;
  padding: 60px 20px;
}
.empty-icon { font-size: 3rem; color: var(--terra-light); margin-bottom: 16px; }
.salvos-empty p { margin-bottom: 20px; color: var(--text-muted); }

.back-link {
  display: block;
  text-align: center;
  margin-top: 32px;
  color: var(--text-dark);
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  transition: color var(--t-fast);
}
.back-link:hover { color: var(--terra); }
</style>
