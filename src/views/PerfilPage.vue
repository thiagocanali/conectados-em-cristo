<template>
  <div class="perfil-page page-narrow">
    <div class="perfil-header fade-in-up">
      <p class="eyebrow"><span aria-hidden="true">&#9673;</span> Seu perfil</p>
      <h1>Meu Perfil</h1>
      <p class="perfil-subtitle">Conte um pouco sobre você, sua fé e seu propósito.</p>
    </div>

    <form @submit.prevent="salvar" class="perfil-form fade-in-up">
      <div class="field-group">
        <label for="profile-name" class="field-label">Nome completo</label>
        <input id="profile-name" v-model="perfil.nome" type="text" class="field-input" placeholder="Seu nome" required autocomplete="name" />
      </div>

      <div class="form-row">
        <div class="field-group">
          <label for="profile-age" class="field-label">Idade</label>
          <input id="profile-age" v-model.number="perfil.idade" type="number" min="18" max="99" class="field-input" placeholder="18+" required />
        </div>
        <div class="field-group">
          <label for="profile-city" class="field-label">Cidade / Estado</label>
          <input id="profile-city" v-model="perfil.cidade" type="text" class="field-input" placeholder="Ex.: São Paulo / SP" autocomplete="address-level2" />
        </div>
      </div>

      <div class="field-group">
        <label for="profile-denomination" class="field-label">Denominação</label>
        <select id="profile-denomination" v-model="perfil.denominacao" class="field-select">
          <option value="">Selecione</option>
          <option>Católica</option>
          <option>Evangélica</option>
          <option>Protestante</option>
          <option>Ortodoxa</option>
          <option>Outra</option>
        </select>
      </div>

      <div class="field-group">
        <label for="profile-faith-duration" class="field-label">Há quanto tempo é cristão(ã)?</label>
        <select id="profile-faith-duration" v-model="perfil.tempoFe" class="field-select">
          <option value="">Selecione</option>
          <option>Menos de 1 ano</option>
          <option>1 a 5 anos</option>
          <option>5 a 10 anos</option>
          <option>Mais de 10 anos</option>
          <option>Desde a infância</option>
        </select>
      </div>

      <div class="field-group">
        <label for="profile-goal" class="field-label">Objetivo de relacionamento</label>
        <select id="profile-goal" v-model="perfil.objetivo" class="field-select">
          <option value="">Selecione</option>
          <option>Amizade com propósito</option>
          <option>Namoro com propósito</option>
          <option>Casamento</option>
        </select>
      </div>

      <div class="field-group">
        <label for="profile-about" class="field-label">Sobre você</label>
        <textarea id="profile-about" v-model="perfil.sobre" rows="4" class="field-textarea" placeholder="Fale sobre sua caminhada com Deus, seus valores e o que você busca..."></textarea>
      </div>

      <button type="submit" class="btn-primary perfil-submit">
        Salvar Perfil
      </button>
      <p v-if="salvo" class="perfil-ok" role="status" aria-live="polite">
        <span aria-hidden="true">&#10003;</span> Perfil salvo com sucesso!
      </p>
    </form>

    <router-link to="/dashboard" class="back-link">&larr; Voltar ao painel</router-link>
  </div>
</template>

<script>
export default {
  data() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const profileKey = currentUser ? `perfil:${currentUser.email}` : 'perfil';
    const canMigrateLegacy = currentUser && users.length === 1 && users[0].email === currentUser.email;
    const legacyProfile = !currentUser || canMigrateLegacy ? JSON.parse(localStorage.getItem('perfil') || 'null') : null;
    return {
      salvo: false,
      profileKey,
      perfil: JSON.parse(localStorage.getItem(profileKey) || 'null') || currentUser?.perfil || legacyProfile || {
        nome: '',
        idade: null,
        cidade: '',
        denominacao: '',
        tempoFe: '',
        objetivo: '',
        sobre: ''
      }
    }
  },
  methods: {
    salvar() {
      const profile = { ...this.perfil };
      localStorage.setItem(this.profileKey, JSON.stringify(profile));
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (currentUser) {
        currentUser.perfil = profile;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex(user => user.email === currentUser.email);
        if (index !== -1) {
          users[index] = { ...users[index], perfil: profile };
          localStorage.setItem('users', JSON.stringify(users));
        }
      }
      this.salvo = true;
      setTimeout(() => { this.salvo = false; }, 3000);
    }
  }
}
</script>

<style scoped>
.perfil-header { margin-bottom: 36px; }
.perfil-header h1 { font-size: clamp(1.8rem, 4vw, 2.4rem); margin: 14px 0 8px; }
.perfil-subtitle { color: var(--text-muted); font-size: 0.92rem; }

.perfil-form { display: flex; flex-direction: column; gap: 20px; }

.form-row { display: grid; grid-template-columns: 1fr 1.4fr; gap: 16px; }

.perfil-submit { align-self: flex-start; margin-top: 8px; }

.perfil-ok {
  color: var(--success);
  background: var(--success-bg);
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
}
.perfil-ok span { margin-right: 6px; }

.back-link {
  display: block;
  text-align: center;
  margin-top: 32px;
  color: var(--text-dark);
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  transition: color var(--t-fast);
}
.back-link:hover { color: var(--terra); }

@media (max-width: 520px) {
  .form-row { grid-template-columns: 1fr; }
  .perfil-submit { align-self: stretch; }
}
</style>
