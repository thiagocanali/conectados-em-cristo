// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import CadastroPage from '../views/CadastroPage.vue'
import QuestionarioPage from '../views/QuestionarioPage.vue'
import ResultadosPage from '../views/ResultadosPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import TesteDonsPage from '@/views/TesteDonsPage.vue'
import TestePersonalidade from '@/views/TestePersonalidade.vue'
import PerfilPage from '@/views/PerfilPage.vue'
import DescobertaPage from '@/views/DescobertaPage.vue'
import SalvosPage from '@/views/SalvosPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/cadastro', component: CadastroPage },
  { path: '/questionario', component: QuestionarioPage },
  { path: '/testedons', component: TesteDonsPage },
  { path: '/testepersonalidade', component: TestePersonalidade },
  { path: '/resultados', component: ResultadosPage, meta: { requiresAuth: true } },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/perfil', component: PerfilPage, meta: { requiresAuth: true } },
  { path: '/descoberta', component: DescobertaPage, meta: { requiresAuth: true } },
  { path: '/salvos', component: SalvosPage, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(to => {
  if (to.matched.some(route => route.meta.requiresAuth) && !localStorage.getItem('currentUser')) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router
