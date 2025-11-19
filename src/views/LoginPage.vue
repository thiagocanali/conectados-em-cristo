<template>
  <div class="page-container">
    <div class="card">
      <h1>Entrar</h1>

      <form @submit.prevent="login">
        <div>
          <label>Email</label>
          <input type="email" v-model="email" required />
        </div>

        <div>
          <label>Senha</label>
          <input type="password" v-model="password" required />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const login = () => {
  console.log("login:", email.value, password.value);
};
</script>
