<template>
  <div class="descoberta-page">
    <div class="page-wrapper">
      <div class="desc-header fade-in-up">
        <p class="eyebrow"><span aria-hidden="true">&#9825;</span> Descoberta</p>
        <h1>Descobrir Pessoas</h1>
        <p class="desc-subtitle">Conheça com calma, com propósito e com oração.</p>
      </div>

      <p v-if="erro" role="alert">{{ erro }}</p>
      <p v-if="mensagem" role="status">{{ mensagem }}</p>

      <div v-if="!atual" class="desc-empty fade-in-up">
        <div class="empty-icon" aria-hidden="true">&#9825;</div>
        <p>{{ totalPerfis === 0 ? 'Ainda não há outros perfis completos disponíveis.' : 'Você viu todos os perfis disponíveis por enquanto.' }}</p>
        <p class="empty-sub">{{ totalPerfis === 0 ? 'Quando outras pessoas criarem um perfil neste navegador, elas poderão aparecer aqui.' : 'Volte mais tarde — novas pessoas podem estar esperando.' }}</p>
        <router-link to="/dashboard" class="btn-secondary">Voltar ao painel</router-link>
      </div>

      <div v-else class="desc-card fade-in-up">
        <div class="card-top">
          <div class="avatar">{{ atual.nome.charAt(0) }}</div>
          <div class="card-info">
            <h2>{{ atual.nome }}, {{ atual.idade }}</h2>
            <p class="cidade">{{ atual.cidade }}</p>
            <div class="tags">
              <span class="tag">{{ atual.denominacao }}</span>
              <span class="tag">{{ atual.objetivo }}</span>
            </div>
          </div>
        </div>

        <p class="sobre">{{ atual.sobre }}</p>

        <div class="acoes">
          <button class="btn-secondary desc-action" @click="passar">Passar</button>
          <button class="desc-action btn-save" @click="salvarPerfil">
            <span aria-hidden="true">&#9733;</span> Salvar
          </button>
          <button class="btn-primary desc-action" @click="demonstrarInteresse">
            Demonstrar Interesse
          </button>
        </div>

        <button class="denunciar" @click="denunciar">Denunciar ou bloquear</button>
      </div>

      <router-link to="/dashboard" class="back-link">&larr; Voltar ao painel</router-link>
    </div>
  </div>
</template>

<script>
import { getDemoSession, getDemoUsers } from '@/services/demoAuth.mjs'
import { readDemoList, updateDemoLists, normalizeDemoProfile, demoListErrorMessage } from '@/services/demoLists.mjs'

export default {
  data() {
    return { indice: 0, perfis: [], totalPerfis: 0, erro: '', mensagem: '' }
  },
  created() {
    this.perfis = this.loadProfiles()
    this.totalPerfis = this.perfis.length
  },
  computed: {
    atual() { return this.perfis[this.indice] || null; }
  },
  methods: {
    loadProfiles() {
      let current = null
      let users = []
      try {
        current = getDemoSession()
        users = getDemoUsers()
      } catch { return [] }
      if (!current || !current.email) return []
      try {
        const blocked = readDemoList('bloqueados')
        const reports = readDemoList('denuncias')
        const currentEmail = String(current.email).trim().toLowerCase()
        const excluded = new Set(blocked.map(item => String(item?.email || '').trim().toLowerCase()).filter(Boolean))
        reports.forEach(item => { if (item?.bloqueado === true && item.email) excluded.add(String(item.email).trim().toLowerCase()) })
        return users
          .filter(user => typeof user.email === 'string' && user.email.trim())
          .map(user => normalizeDemoProfile({ ...user.perfil, email: user.email }))
          .filter(profile => profile && profile.email !== currentEmail && !excluded.has(profile.email))
      } catch (error) {
        this.erro = demoListErrorMessage(error.reason)
        return []
      }
    },
    proximo() { if (this.indice < this.perfis.length) this.indice++; },
    passar() { this.proximo(); },
    applyUpdates(updates, message = '') {
      this.erro = ''
      this.mensagem = ''
      const result = updateDemoLists(updates)
      if (!result.ok) {
        this.erro = demoListErrorMessage(result.reason)
        return
      }
      this.mensagem = message
      this.proximo()
    },
    salvarPerfil() {
      if (!this.atual) return
      const target = this.atual
      this.applyUpdates({ perfisSalvos: items => {
        const profiles = items.map(normalizeDemoProfile).filter(Boolean)
        if (!profiles.some(p => p.email === target.email || (!p.email && p.nome === target.nome))) profiles.push(target)
        return profiles
      } })
    },
    demonstrarInteresse() {
      if (!this.atual) return
      const target = this.atual
      this.applyUpdates({ interesses: items => {
        const exists = items.some(item => item && typeof item === 'object'
          ? String(item.email || '').trim().toLowerCase() === target.email : item === target.nome)
        return exists ? items : [...items, { email: target.email, nome: target.nome, data: new Date().toISOString() }]
      } })
    },
    denunciar() {
      if (!this.atual) return
      const motivo = prompt('Registro apenas neste navegador, sem envio à moderação. Descreva o motivo; para bloquear, comece com bloquear:')
      if (!motivo?.trim()) return
      const target = this.atual
      const bloquear = /^bloquear(?:\s|:|$)/i.test(motivo.trim())
      const descricao = motivo.trim().replace(/^bloquear\s*:*/i, '').trim()
      const data = new Date().toISOString()
      const updates = {
        denuncias: items => [...items, { email: target.email, perfil: target.nome, motivo: bloquear ? (descricao || 'Bloqueio solicitado') : motivo.trim(), bloqueado: bloquear, data }]
      }
      if (bloquear) updates.bloqueados = items => items.some(item => String(item?.email || '').trim().toLowerCase() === target.email)
        ? items : [...items, { email: target.email, nome: target.nome, data }]
      this.applyUpdates(updates, 'Registro salvo apenas neste navegador. Nenhuma denúncia foi enviada a uma equipe de moderação.')
    }
  }
}
</script>

<style scoped>
.descoberta-page { background: var(--cream); min-height: calc(100vh - 140px); }

.desc-header { text-align: center; margin-bottom: 40px; }
.desc-header h1 { font-size: clamp(1.8rem, 4vw, 2.5rem); margin: 14px 0 8px; }
.desc-subtitle { color: var(--text-muted); }

.desc-card {
  max-width: 480px;
  margin: 0 auto;
  background: var(--cream-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 36px 28px;
  box-shadow: var(--shadow-md);
}

.card-top { display: flex; gap: 18px; align-items: center; margin-bottom: 20px; }
.avatar {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: var(--green-deep);
  color: var(--cream);
  font-size: 1.8rem;
  font-weight: 700;
  font-family: var(--font-serif);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.card-info { text-align: left; }
.card-info h2 { font-size: 1.5rem; margin: 0 0 2px; }
.cidade { color: var(--text-muted); font-size: 0.88rem; margin: 0; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
.tag {
  background: var(--cream-dark);
  color: var(--terra-dark);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.78rem;
  font-weight: 600;
}

.sobre { color: var(--text-body); line-height: 1.65; font-size: 0.95rem; margin-bottom: 24px; }

.acoes { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.desc-action { padding: 12px 18px; font-size: 0.85rem; }
.btn-save {
  background: var(--warning-bg);
  color: var(--warning);
  border: 1.5px solid var(--warning);
}
.btn-save:hover { background: var(--warning); color: white; }

.denunciar {
  display: block;
  margin: 20px auto 0;
  background: none;
  border: none;
  color: var(--error);
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: underline;
  transition: opacity var(--t-fast);
}
.denunciar:hover { opacity: 0.7; }

.desc-empty {
  text-align: center;
  padding: 60px 20px;
  max-width: 420px;
  margin: 0 auto;
}
.empty-icon { font-size: 3rem; color: var(--terra-light); margin-bottom: 16px; }
.empty-sub { color: var(--text-muted); font-size: 0.88rem; margin: 4px 0 24px; }

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
