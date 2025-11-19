<template>
  <div class="auth-form">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Usuário" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Login</button>
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
    login() {
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === this.username && u.password === this.password);

      if (!user) {
        alert("Usuário ou senha inválidos!");
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      this.$router.push('/dashboard');
    }
  }
}
</script>
