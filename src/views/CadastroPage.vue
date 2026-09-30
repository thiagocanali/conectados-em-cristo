<template>
  <div class="auth-page">
    <div class="auth-card fade-in-up">
      <div class="auth-header">
        <p class="eyebrow"><span aria-hidden="true">&#10022;</span> Comece sua jornada</p>
        <h1>Criar Conta</h1>
        <p class="auth-subtitle">Para maiores de 18 anos. Relacionamentos com propósito.</p>
      </div>

      <form @submit.prevent="register" class="auth-form">
        <div class="field-group">
          <label class="field-label">Nome completo</label>
          <input type="text" v-model="nome" class="field-input" placeholder="Seu nome" required />
        </div>

        <div class="field-group">
          <label class="field-label">E-mail</label>
          <input type="email" v-model="email" class="field-input" placeholder="seu@email.com" required />
        </div>

        <div class="field-group">
          <label class="field-label">Senha</label>
          <input type="password" v-model="senha" class="field-input" placeholder="Crie uma senha" required minlength="6" />
          <span class="field-hint">Mínimo de 6 caracteres</span>
        </div>

        <label class="auth-check">
          <input type="checkbox" v-model="maiorIdade" required />
          <span>Confirmo que tenho 18 anos ou mais</span>
        </label>

        <p v-if="error" class="auth-error">{{ error }}</p>
        <p v-if="success" class="auth-success">{{ success }}</p>

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

const router = useRouter()
const nome = ref('')
const email = ref('')
const senha = ref('')
const maiorIdade = ref(false)
const error = ref('')
const success = ref('')

const register = () => {
  error.value = ''
  success.value = ''

  const users = JSON.parse(localStorage.getItem('users') || '[]')

  if (users.find(u => u.email === email.value)) {
    error.value = 'Este e-mail já está cadastrado.'
    return
  }

  const newUser = {
    username: nome.value,
    email: email.value,
    senha: senha.value,
    respostas: []
  }

  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('currentUser', JSON.stringify(newUser))
  success.value = 'Conta criada! Redirecionando...'
  setTimeout(() => router.push('/perfil'), 1000)
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
