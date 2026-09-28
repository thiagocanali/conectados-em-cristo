<template>
  <div class="perfil">
    <h1>Meu Perfil</h1>
    <p class="subtitulo">Conte um pouco sobre você, sua fé e seu propósito.</p>

    <form @submit.prevent="salvar" class="form">
      <label>Nome completo</label>
      <input v-model="perfil.nome" type="text" placeholder="Seu nome" required />

      <label>Idade</label>
      <input v-model.number="perfil.idade" type="number" min="18" max="99" required />

      <label>Cidade / Estado</label>
      <input v-model="perfil.cidade" type="text" placeholder="Ex.: São Paulo / SP" />

      <label>Denominação</label>
      <select v-model="perfil.denominacao">
        <option value="">Selecione</option>
        <option>Católica</option>
        <option>Evangélica</option>
        <option>Protestante</option>
        <option>Ortodoxa</option>
        <option>Outra</option>
      </select>

      <label>Há quanto tempo é cristão(ã)?</label>
      <select v-model="perfil.tempoFe">
        <option value="">Selecione</option>
        <option>Menos de 1 ano</option>
        <option>1 a 5 anos</option>
        <option>5 a 10 anos</option>
        <option>Mais de 10 anos</option>
        <option>Desde a infância</option>
      </select>

      <label>Objetivo de relacionamento</label>
      <select v-model="perfil.objetivo">
        <option value="">Selecione</option>
        <option>Amizade com propósito</option>
        <option>Namoro com propósito</option>
        <option>Casamento</option>
      </select>

      <label>Sobre você</label>
      <textarea v-model="perfil.sobre" rows="4" placeholder="Fale sobre sua caminhada com Deus, seus valores e o que você busca..."></textarea>

      <button type="submit" class="btn">Salvar Perfil</button>
      <p v-if="salvo" class="ok">Perfil salvo com sucesso!</p>
    </form>

    <router-link to="/dashboard" class="voltar">← Voltar ao painel</router-link>
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
.perfil { max-width: 520px; margin: 0 auto; padding: 40px 20px; }
.subtitulo { color: #555; margin-bottom: 20px; }
.form { display: flex; flex-direction: column; gap: 8px; text-align: left; }
label { font-weight: bold; margin-top: 10px; }
input, select, textarea { padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 1rem; }
.btn { margin-top: 20px; padding: 12px; border: none; background-color: #3182ce; color: white; border-radius: 5px; cursor: pointer; font-weight: bold; }
.btn:hover { background-color: #2b6cb0; }
.ok { color: #2f855a; margin-top: 10px; }
.voltar { display: inline-block; margin-top: 20px; color: #3182ce; text-decoration: none; }
</style>
