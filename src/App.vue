<template>
  <div id="app" class="app-container">
    <button class="skip-link" type="button" @click="focusMainContent">Pular para o conteúdo</button>
    <AppNavbar />
    <main id="main-content" ref="mainContent" class="main-content" tabindex="-1">
      <aside v-if="isLegacy" class="legacy-notice" aria-label="Recurso experimental"><strong>Protótipo anterior, fora do foco principal.</strong> Estes dados ficam neste navegador. <router-link to="/estudos">Conheça os estudos sobre Jesus</router-link>.</aside>
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import AppNavbar from "./components/AppNavbar.vue";
import AppFooter from "./components/AppFooter.vue";

const route = useRoute();
const isLegacy = computed(() => ['/testedons', '/testepersonalidade', '/questionario', '/resultados', '/descoberta', '/salvos', '/perfil', '/login', '/cadastro'].includes(route.path));
const mainContent = ref(null);
const focusMainContent = () => mainContent.value?.focus();
</script>

<style>
.legacy-notice { padding: 16px 24px; background: var(--cream-dark); color: var(--ink); font-size: .88rem; }
.legacy-notice a { color: var(--green-deep); text-decoration: underline; }
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
