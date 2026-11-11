<template>
  <div class="salvos-page page-narrow">
    <div class="salvos-header fade-in-up">
      <p class="eyebrow"><span aria-hidden="true">&#9733;</span> Perfis guardados</p>
      <h1>Perfis Salvos</h1>
      <p class="salvos-subtitle">Pessoas que você quer conhecer com calma e oração.</p>
    </div>

    <p v-if="erro" role="alert">{{ erro }}</p>

    <div v-if="salvos.length === 0" class="salvos-empty fade-in-up">
      <div class="empty-icon" aria-hidden="true">&#9733;</div>
      <p>Você ainda não salvou nenhum perfil.</p>
      <router-link to="/descoberta" class="btn-primary">Descobrir pessoas</router-link>
    </div>

    <ul v-else class="salvos-list fade-in-up">
      <li v-for="(p, i) in salvos"  :key="(p.email || p.nome) + i" class="salvo-item">
        <div class="avatar">{{ p.nome.charAt(0) }}</div>
        <div class="salvo-info">
          <strong>{{ p.nome }}, {{ p.idade }}</strong>
          <span>{{ p.cidade }} · {{ p.denominacao }}</span>
        </div>
        <button class="remover" @click="remover(i)">Remover</button>
      </li>
    </ul>

    <router-link to="/dashboard" class="back-link">&larr; Voltar ao painel</router-link>
  </div>
</template>

<script>
import { readDemoList, updateDemoLists, normalizeDemoProfile, demoListErrorMessage } from '@/services/demoLists.mjs'

export default {
  data() {
    return {
      salvos: [],
      erro: ''
    }
  },
  created() {
    this.salvos = this.loadSavedProfiles()
  },
  methods: {
    loadSavedProfiles() {
      try {
        return readDemoList('perfisSalvos').map(normalizeDemoProfile).filter(Boolean)
      } catch (error) {
        this.erro = demoListErrorMessage(error.reason)
        return []
      }
    },
    remover(i) {
      this.erro = ''
      const target = this.salvos[i]
      if (!target) return
      const result = updateDemoLists({ perfisSalvos: items => items
        .map(normalizeDemoProfile).filter(Boolean)
        .filter(profile => target.email ? profile.email !== target.email : profile.email || profile.nome !== target.nome)
      })
      if (!result.ok) {
        this.erro = demoListErrorMessage(result.reason)
        return
      }
      this.salvos = this.loadSavedProfiles()
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
