<template>
  <div class="dashboard-page page-wrapper">
    <div class="dash-header fade-in-up">
      <p class="eyebrow">✦ Sua caminhada</p>
      <h1>Olá, {{ userName }}</h1>
      <p class="dash-subtitle">Um espaço para fortalecer sua fé, cultivar amizades e caminhar com outras pessoas.</p>
    </div>
    <div class="dash-grid fade-in-up">
      <router-link to="/oracoes" class="dash-card prayer-card"><div class="dash-icon" aria-hidden="true">♡</div><h3>Pedidos de oração</h3><p>Conheça o espaço de oração e os princípios de cuidado mútuo.</p></router-link>
      <router-link to="/perfil" class="dash-card"><div class="dash-icon" aria-hidden="true">◎</div><h3>Meu perfil</h3><p>Compartilhe seus interesses e aquilo que deseja contar sobre você.</p></router-link>
      <router-link to="/descoberta" class="dash-card"><div class="dash-icon" aria-hidden="true">♧</div><h3>Conhecer pessoas</h3><p>Encontre pessoas com interesses em comum e abra espaço para novas amizades.</p></router-link>
      <router-link to="/salvos" class="dash-card"><div class="dash-icon" aria-hidden="true">☆</div><h3>Conexões salvas</h3><p>Revisite perfis que deseja conhecer melhor.</p></router-link>
      <router-link to="/testedons" class="dash-card"><div class="dash-icon" aria-hidden="true">✧</div><h3>Dons espirituais</h3><p>Explore maneiras de servir e contribuir com a comunidade.</p></router-link>
      <router-link to="/testepersonalidade" class="dash-card"><div class="dash-icon" aria-hidden="true">◈</div><h3>Autoconhecimento</h3><p>Reflita sobre sua personalidade e a forma como se relaciona.</p></router-link>
      <router-link to="/questionario" class="dash-card"><div class="dash-icon" aria-hidden="true">⌁</div><h3>Questionário</h3><p>Organize suas preferências e interesses de conexão.</p></router-link>
      <router-link to="/resultados" class="dash-card"><div class="dash-icon" aria-hidden="true">≋</div><h3>Sugestões de conexão</h3><p>Consulte os resultados com base nas respostas disponíveis.</p></router-link>
      <button @click="logout" class="dash-card dash-card-exit"><div class="dash-icon" aria-hidden="true">←</div><h3>Sair</h3><p>Encerrar sua sessão.</p></button>
    </div>
  </div>
</template>
<script>
export default {
  data() { return { currentUser: null } },
  computed: { userName() { return this.currentUser?.username || 'amigo(a)' } },
  mounted() {
    try { this.currentUser = JSON.parse(localStorage.getItem('currentUser')) } catch { this.currentUser = null }
    if (!this.currentUser) this.$router.push('/login')
  },
  methods: {
    logout() {
      localStorage.removeItem('currentUser')
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