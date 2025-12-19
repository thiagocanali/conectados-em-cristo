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

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/cadastro', component: CadastroPage },
  { path: '/questionario', component: QuestionarioPage },
  { path: '/testedons', component: TesteDonsPage },
  { path: '/testepersonalidade', component: TestePersonalidade },
  { path: '/resultados', component: ResultadosPage },
  { path: '/dashboard', component: DashboardPage }
]

const router = createRouter({
  history: createWebHashHistory(), // Usa hash -> mais compatível com GitHub Pages
  routes
})

export default router
