<template>
  <div class="auth-form">
    <h2>Cadastrar</h2>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Usuário" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register() {
      let users = JSON.parse(localStorage.getItem('users') || '[]');

      if (users.find(u => u.username === this.username)) {
        alert("Usuário já existe!");
        return;
      }

      users.push({ username: this.username, password: this.password, respostas: [] });
      localStorage.setItem('users', JSON.stringify(users));
      alert("Cadastro realizado!");
      this.$router.push('/login');
    }
  }
}
</script>
