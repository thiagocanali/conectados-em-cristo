<template>
  <div id="app" class="app-container">
    <button class="skip-link" type="button" @click="focusMainContent">Pular para o conteúdo</button>
    <AppNavbar />
    <main id="main-content" ref="mainContent" class="main-content" tabindex="-1">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppNavbar from "./components/AppNavbar.vue";
import AppFooter from "./components/AppFooter.vue";

const mainContent = ref(null);
const focusMainContent = () => mainContent.value?.focus();
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--cream);
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>
