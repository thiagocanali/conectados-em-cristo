<template>
  <div class="auth-page">
    <div class="auth-card fade-in-up">
      <div class="auth-header">
        <p class="eyebrow"><span aria-hidden="true">&#10022;</span> Bem-vindo de volta</p>
        <h1>Acessar protótipo</h1>
        <p class="auth-subtitle">Que Deus guie seus passos hoje.</p>
        <p class="auth-notice" role="note">Acesso demonstrativo por e-mail, sem autenticação real. Não use dados pessoais ou senhas.</p>
      </div>

      <form @submit.prevent="login" class="auth-form">
        <div class="field-group">
          <label for="login-email" class="field-label">E-mail</label>
          <input id="login-email" type="email" autocomplete="username" v-model="email" class="field-input" placeholder="seu@email.com" required />
        </div>


        <p v-if="error" class="auth-error" role="alert">{{ error }}</p>

        <button type="submit" class="btn-primary auth-submit">Continuar</button>
      </form>

      <p class="auth-redirect">
        Ainda não criou um perfil? <router-link to="/cadastro">Criar perfil demonstrativo</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginDemoUser } from '@/services/demoAuth.mjs'

const router = useRouter()
const email = ref('')
const error = ref('')

const login = () => {
  error.value = ''
  const result = loginDemoUser(email.value)

  if (result.ok) {
    const redirect = router.currentRoute.value.query.redirect
    router.push(typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/dashboard')
  } else {
    error.value = result.reason === 'storage-unavailable'
      ? 'Não foi possível salvar a sessão. Verifique o armazenamento do navegador e tente novamente.'
      : 'Perfil não encontrado neste navegador. Crie um perfil demonstrativo primeiro.'
  }
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
  max-width: 420px;
  width: 100%;
  padding: 44px 36px;
}
.auth-header { text-align: center; margin-bottom: 32px; }
.auth-header h1 { font-size: 2.2rem; margin: 14px 0 6px; }
.auth-subtitle { color: var(--text-muted); font-size: 0.88rem; }

.auth-form { display: flex; flex-direction: column; gap: 18px; }
.auth-notice { margin-top: 12px; padding: 10px 12px; border-radius: var(--radius-sm); background: var(--error-bg); color: var(--text-muted); font-size: .78rem; line-height: 1.5; }
.auth-submit { width: 100%; margin-top: 8px; }

.auth-error {
  color: var(--error);
  font-size: 0.85rem;
  text-align: center;
  background: var(--error-bg);
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
