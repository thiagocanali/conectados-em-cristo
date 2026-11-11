<template>
  <div class="dashboard-page page-wrapper">
    <div class="dash-header fade-in-up">
      <p class="eyebrow">✦ Sua caminhada</p>
      <h1>Olá, {{ userName }}</h1>
      <p class="dash-subtitle">Um espaço para fortalecer sua fé, cultivar amizades e caminhar com outras pessoas.</p>
    </div>
    <div class="dash-grid fade-in-up">
      <router-link to="/estudos" class="dash-card prayer-card"><h3>Conhecer Jesus</h3><p>Abra os Evangelhos com um guia de leitura, perguntas e uma prática para a semana.</p></router-link>
      <router-link to="/em-comunidade" class="dash-card"><h3>Preparar um encontro</h3><p>Leve um roteiro de estudo e conversa para sua comunidade.</p></router-link>
      <router-link to="/igrejas" class="dash-card"><h3>Caminhar com minha igreja</h3><p>Conheça como usar os materiais com seu grupo e o que está disponível hoje.</p></router-link>
    </div>
    <p class="study-meta">Esta sessão é demonstrativa. Os estudos e roteiros são públicos e não exigem cadastro.</p>
    <router-link to="/laboratorio" class="learning-link">Consultar protótipos anteriores</router-link>
  </div>
</template>
<script>
import { clearDemoSession, getDemoSession } from '@/services/demoAuth.mjs'

export default {
  data() { return { currentUser: null } },
  computed: { userName() { return [this.currentUser?.nome, this.currentUser?.username].find(value => typeof value === 'string' && value.trim()) || 'amigo(a)' } },
  mounted() {
    this.currentUser = getDemoSession()
    if (!this.currentUser) this.$router.push('/login')
  },
  methods: {
    logout() {
      clearDemoSession()
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>
.dash-header { margin-bottom: 36px; }.dash-header h1 { font-size: clamp(2.5rem, 5vw, 3.8rem); margin: 12px 0 8px; }.dash-subtitle { max-width: 620px; color: var(--text-body); line-height: 1.7; }
.dash-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }.dash-card { display: block; min-height: 210px; padding: 25px; text-align: left; color: var(--text-body); background: var(--cream-light); border: 1px solid var(--border); border-radius: var(--radius-lg); text-decoration: none; transition: transform var(--t-base), box-shadow var(--t-base), border-color var(--t-base); }.dash-card:hover { transform: translateY(-3px); border-color: var(--terra-light); box-shadow: var(--shadow-md); }.dash-icon { color: var(--terra); font-size: 1.8rem; margin-bottom: 18px; }.dash-card h3 { font: 1.5rem var(--font-serif); margin-bottom: 8px; }.dash-card p { font-size: .88rem; line-height: 1.65; }.prayer-card { border-color: var(--terra-light); background: #f7efe5; }.dash-card-exit { font: inherit; cursor: pointer; }.dash-card-exit:hover { background: var(--error-bg); border-color: var(--error); }
@media (max-width: 850px) { .dash-grid { grid-template-columns: repeat(2, 1fr); } } @media (max-width: 560px) { .dash-grid { grid-template-columns: 1fr; }.dash-card { min-height: 0; } }
</style>