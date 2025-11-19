<template>
  <div class="page-container">
    <div class="card">
      <h1>Criar Conta</h1>

      <form @submit.prevent="register">
        <div>
          <label>Nome completo</label>
          <input type="text" v-model="nome" required />
        </div>

        <div>
          <label>Email</label>
          <input type="email" v-model="email" required />
        </div>

        <div>
          <label>Senha</label>
          <input type="password" v-model="senha" required />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
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
