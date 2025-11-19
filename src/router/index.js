import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import CadastroPage from '../views/CadastroPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import QuestionarioPage from '../views/QuestionarioPage.vue';
import ResultadosPage from '../views/ResultadosPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/cadastro', component: CadastroPage },
  { 
    path: '/dashboard', 
    component: DashboardPage,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/questionario', 
    component: QuestionarioPage,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/resultados', 
    component: ResultadosPage,
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Proteção de rotas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
