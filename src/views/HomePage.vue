<template>
  <div class="home">
    <h1>Bem-vindo ao App</h1>
    <div class="buttons">
      <router-link to="/login" class="btn">Login</router-link>
      <router-link to="/cadastro" class="btn">Cadastrar</router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f0f4f8;
}

h1 {
  margin-bottom: 30px;
  font-size: 2rem;
}

.buttons {
  display: flex;
  gap: 20px;
}

.btn {
  padding: 12px 25px;
  background-color: #3182ce;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
}

.btn:hover {
  background-color: #2b6cb0;
}
</style>
