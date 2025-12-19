<template>
  <div class="page-container">
    <div class="card">
      <h1>Criar Conta</h1>

      <form @submit.prevent="register">
        <div class="form-group">
          <label>Nome completo</label>
          <input type="text" v-model="nome" required />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" required />
        </div>

        <div class="form-group">
          <label>Senha</label>
          <input type="password" v-model="senha" required />
        </div>

        <button type="submit" class="btn btn-secondary">Cadastrar</button>
      </form>

      <p class="redirect">
        Já tem conta? <router-link to="/login">Entrar</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const nome = ref("");
const email = ref("");
const senha = ref("");

const register = () => {
  console.log("Cadastro:", nome.value, email.value, senha.value);
};
</script>

<style scoped>
.page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  background: white;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

h1 {
  font-size: clamp(1.8rem, 5vw, 2.2rem);
  margin-bottom: 25px;
  color: #1a202c;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  text-align: left;
}

label {
  margin-bottom: 6px;
  font-weight: 500;
  color: #4a5568;
}

input {
  padding: 10px 14px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.3s, box-shadow 0.3s;
}

input:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 5px rgba(49,130,206,0.3);
}

.btn {
  padding: 12px 24px;
  width: 100%;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.btn:hover {
  background-color: #2b6cb0;
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0,0,0,0.1);
}

/* Botão secundário para cadastro */
.btn-secondary {
  background-color: #48bb78;
}

.btn-secondary:hover {
  background-color: #38a169;
}

.redirect {
  margin-top: 15px;
  font-size: 0.9rem;
  color: #4a5568;
}

.redirect a {
  color: #3182ce;
  text-decoration: none;
  font-weight: 500;
}

.redirect a:hover {
  text-decoration: underline;
}
</style>
