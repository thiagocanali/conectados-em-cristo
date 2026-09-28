<template>
  <div class="salvos">
    <h1>Perfis Salvos</h1>
    <p class="subtitulo">Pessoas que você quer conhecer com calma e oração.</p>

    <div v-if="salvos.length === 0" class="vazio">
      <p>Você ainda não salvou nenhum perfil.</p>
      <router-link to="/descoberta" class="btn">Descobrir pessoas</router-link>
    </div>

    <ul v-else class="lista">
      <li v-for="(p, i) in salvos" :key="p.nome" class="item">
        <div class="avatar">{{ p.nome.charAt(0) }}</div>
        <div class="info">
          <strong>{{ p.nome }}, {{ p.idade }}</strong>
          <span>{{ p.cidade }} · {{ p.denominacao }}</span>
        </div>
        <button class="remover" @click="remover(i)">Remover</button>
      </li>
    </ul>

    <router-link to="/dashboard" class="voltar">← Voltar ao painel</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salvos: JSON.parse(localStorage.getItem('perfisSalvos')) || []
    }
  },
  methods: {
    remover(i) {
      this.salvos.splice(i, 1);
      localStorage.setItem('perfisSalvos', JSON.stringify(this.salvos));
    }
  }
}
</script>

<style scoped>
.salvos { max-width: 520px; margin: 0 auto; padding: 40px 20px; }
.subtitulo { color: #555; margin-bottom: 20px; }
.vazio { text-align: center; padding: 40px 0; color: #718096; }
.lista { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
.item { display: flex; align-items: center; gap: 12px; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; }
.avatar { width: 44px; height: 44px; border-radius: 50%; background-color: #3182ce; color: white; font-weight: bold; display: flex; align-items: center; justify-content: center; }
.info { flex: 1; display: flex; flex-direction: column; text-align: left; }
.info span { color: #718096; font-size: 0.85rem; }
.remover { background: none; border: none; color: #c53030; cursor: pointer; font-size: 0.85rem; }
.btn { display: inline-block; margin-top: 15px; padding: 12px 20px; background-color: #3182ce; color: white; border-radius: 5px; text-decoration: none; font-weight: bold; }
.voltar { display: inline-block; margin-top: 20px; color: #3182ce; text-decoration: none; }
</style>
