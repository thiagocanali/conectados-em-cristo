<template>
  <div class="perfil-page page-narrow">
    <div class="perfil-header fade-in-up">
      <p class="eyebrow"><span aria-hidden="true">&#9673;</span> Seu perfil</p>
      <h1>Meu Perfil</h1>
      <p class="perfil-subtitle">Conte um pouco sobre você, sua fé e seu propósito.</p>
    </div>

    <form @submit.prevent="salvar" class="perfil-form fade-in-up">
      <div class="field-group">
        <label class="field-label">Nome completo</label>
        <input v-model="perfil.nome" type="text" class="field-input" placeholder="Seu nome" required />
      </div>

      <div class="form-row">
        <div class="field-group">
          <label class="field-label">Idade</label>
          <input v-model.number="perfil.idade" type="number" min="18" max="99" class="field-input" placeholder="18+" required />
        </div>
        <div class="field-group">
          <label class="field-label">Cidade / Estado</label>
          <input v-model="perfil.cidade" type="text" class="field-input" placeholder="Ex.: São Paulo / SP" />
        </div>
      </div>

      <div class="field-group">
        <label class="field-label">Denominação</label>
        <select v-model="perfil.denominacao" class="field-select">
          <option value="">Selecione</option>
          <option>Católica</option>
          <option>Evangélica</option>
          <option>Protestante</option>
          <option>Ortodoxa</option>
          <option>Outra</option>
        </select>
      </div>

      <div class="field-group">
        <label class="field-label">Há quanto tempo é cristão(ã)?</label>
        <select v-model="perfil.tempoFe" class="field-select">
          <option value="">Selecione</option>
          <option>Menos de 1 ano</option>
          <option>1 a 5 anos</option>
          <option>5 a 10 anos</option>
          <option>Mais de 10 anos</option>
          <option>Desde a infância</option>
        </select>
      </div>

      <div class="field-group">
        <label class="field-label">Objetivo de relacionamento</label>
        <select v-model="perfil.objetivo" class="field-select">
          <option value="">Selecione</option>
          <option>Amizade com propósito</option>
          <option>Namoro com propósito</option>
          <option>Casamento</option>
        </select>
      </div>

      <div class="field-group">
        <label class="field-label">Sobre você</label>
        <textarea v-model="perfil.sobre" rows="4" class="field-textarea" placeholder="Fale sobre sua caminhada com Deus, seus valores e o que você busca..."></textarea>
      </div>

      <button type="submit" class="btn-primary perfil-submit">
        Salvar Perfil
      </button>
      <p v-if="salvo" class="perfil-ok">
        <span aria-hidden="true">&#10003;</span> Perfil salvo com sucesso!
      </p>
    </form>

    <router-link to="/dashboard" class="back-link">&larr; Voltar ao painel</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salvo: false,
      perfil: JSON.parse(localStorage.getItem('perfil')) || {
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
      localStorage.setItem('perfil', JSON.stringify(this.perfil));
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
