import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CadastroPage from '../views/CadastroPage.vue';
import QuestionarioPage from '../views/QuestionarioPage.vue';  // Verifique o caminho
import ResultadosPage from '../views/ResultadosPage.vue';  // Verifique o caminho

const routes = [
  { path: '/', component: HomePage },
  { path: '/cadastro', component: CadastroPage },
  { path: '/questionario', component: QuestionarioPage },
  { path: '/resultados', component: ResultadosPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
