<template>
  <div class="auth-page">
    <div class="auth-card fade-in-up">
      <div class="auth-header">
        <p class="eyebrow"><span aria-hidden="true">&#10022;</span> Comece sua jornada</p>
        <h1>Criar Conta</h1>
        <p class="auth-subtitle">Para maiores de 18 anos. Relacionamentos com propósito.</p>
        <p class="auth-notice" role="note">Protótipo demonstrativo: os dados ficam apenas neste navegador. Não use informações reais ou senhas.</p>
      </div>

      <form @submit.prevent="register" class="auth-form">
        <div class="field-group">
          <label for="signup-name" class="field-label">Nome completo</label>
          <input id="signup-name" type="text" autocomplete="name" v-model="nome" class="field-input" placeholder="Seu nome" required />
        </div>

        <div class="field-group">
          <label for="signup-email" class="field-label">E-mail</label>
          <input id="signup-email" type="email" autocomplete="email" v-model="email" class="field-input" placeholder="seu@email.com" required />
        </div>


        <label class="auth-check">
          <input type="checkbox" v-model="maiorIdade" required />
          <span>Confirmo que tenho 18 anos ou mais</span>
        </label>

        <p v-if="error" class="auth-error" role="alert">{{ error }}</p>
        <p v-if="success" class="auth-success" role="status" aria-live="polite">{{ success }}</p>

        <button type="submit" class="btn-primary auth-submit">Criar conta</button>
      </form>

      <p class="auth-redirect">
        Já tem conta? <router-link to="/login">Entrar</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerDemoUser } from '@/services/demoAuth.mjs'

const router = useRouter()
const nome = ref('')
const email = ref('')
const maiorIdade = ref(false)
const error = ref('')
const success = ref('')

const register = () => {
  error.value = ''
  success.value = ''

  if (!maiorIdade.value) {
    error.value = 'É necessário confirmar que você tem 18 anos ou mais.'
    return
  }

  const result = registerDemoUser({
    username: nome.value.trim(),
    nome: nome.value.trim(),
    email: email.value.trim().toLowerCase(),
    respostas: []
  })

  if (!result.ok) {
    error.value = result.reason === 'email-exists'
      ? 'Este e-mail já está cadastrado neste navegador.'
      : 'Não foi possível criar o perfil demonstrativo. Verifique o armazenamento do navegador.'
    return
  }

  success.value = 'Conta criada! Redirecionando...'
  router.push('/perfil')
}
</script>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 140px);
  padding: 48px 24px;
  background: var(--cream);
}
.auth-card {
  background: var(--cream-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  max-width: 440px;
  width: 100%;
  padding: 44px 36px;
}
.auth-header { text-align: center; margin-bottom: 32px; }
.auth-header h1 { font-size: 2.2rem; margin: 14px 0 6px; }
.auth-subtitle { color: var(--text-muted); font-size: 0.85rem; }

.auth-form { display: flex; flex-direction: column; gap: 18px; }
.auth-notice { margin-top: 12px; padding: 10px 12px; border-radius: var(--radius-sm); background: var(--error-bg); color: var(--text-muted); font-size: .78rem; line-height: 1.5; }

.field-hint { font-size: 0.75rem; color: var(--text-muted); }

.auth-check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--text-dark);
  cursor: pointer;
}
.auth-check input { margin-top: 3px; accent-color: var(--terra); }

.auth-submit { width: 100%; margin-top: 8px; }

.auth-error {
  color: var(--error);
  font-size: 0.85rem;
  text-align: center;
  background: var(--error-bg);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
}
.auth-success {
  color: var(--success);
  font-size: 0.85rem;
  text-align: center;
  background: var(--success-bg);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
}

.auth-redirect {
  margin-top: 24px;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.auth-redirect a { font-weight: 700; }

@media (max-width: 480px) {
  .auth-card { padding: 32px 24px; }
  .auth-header h1 { font-size: 1.8rem; }
}
</style>
