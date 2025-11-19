<template>
  <div id="app" class="app-container">

    <!-- NAVBAR GLOBAL -->
    <AppNavbar />

    <!-- CONTEÚDO DAS ROTAS -->
    <main class="main-content">
      <router-view />
    </main>

  </div>
</template>

<script setup>
import AppNavbar from "./components/AppNavbar.vue";
</script>

<style>
/* ===== RESET LEVE ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

/* ===== LAYOUT GERAL ===== */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f7fa;
}

/* ===== ÁREA PRINCIPAL ===== */
.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
}

/* ===== TIPOGRAFIA GLOBAL ===== */
h1, h2, h3, h4 {
  color: #333;
}

p {
  color: #555;
  line-height: 1.6;
}
</style>
