<template>
  <div class="dashboard">
    <h1>Olá, {{ currentUser.username }}</h1>
    <div class="buttons">
      <router-link to="/questionario" class="btn">Preencher Questionário</router-link>
      <router-link to="/resultados" class="btn">Ver Combinações</router-link>
      <button @click="logout" class="btn">Sair</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('currentUser'))
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('currentUser');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.dashboard { text-align: center; padding: 50px; }
.buttons { display: flex; flex-direction: column; gap: 15px; margin-top: 20px; }
.btn { padding: 12px; border: none; background-color: #3182ce; color: white; border-radius: 5px; cursor: pointer; text-decoration: none; font-weight: bold; }
.btn:hover { background-color: #2b6cb0; }
</style>
