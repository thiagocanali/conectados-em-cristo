<template>
  <div class="home">
    <div class="content">
      <h1>Bem-vindo ao Conectados em Cristo</h1>
      <p>Encontre sua compatibilidade com fé, valores cristãos e muito mais.</p>
      <div class="buttons">
        <router-link to="/cadastro" class="btn btn-primary">Cadastre-se</router-link>
        <router-link to="/questionario" class="btn btn-secondary">Começar Questionário</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home {
  background: linear-gradient(to right, #38b2ac, #3182ce);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.content {
  padding: 20px;
  max-width: 500px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(5px);
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: bold;
}

p {
  font-size: 1.5rem;
  margin-bottom: 30px;
}

.buttons .btn {
  display: inline-block;
  margin: 10px;
  padding: 15px 30px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #3182ce;
  color: white;
}

.btn-primary:hover {
  background-color: #2b6cb0;
}

.btn-secondary {
  background-color: transparent;
  border: 2px solid white;
  color: white;
}

.btn-secondary:hover {
  background-color: white;
  color: #3182ce;
}
</style>
