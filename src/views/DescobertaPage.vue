<template>
  <div class="descoberta">
    <h1>Descobrir Pessoas</h1>
    <p class="subtitulo">Conheça com calma, com propósito e com oração.</p>

    <div v-if="perfis.length === 0" class="vazio">
      <p>Você viu todos os perfis disponíveis por enquanto. Volte mais tarde!</p>
    </div>

    <div v-else class="card">
      <div class="avatar">{{ atual.nome.charAt(0) }}</div>
      <h2>{{ atual.nome }}, {{ atual.idade }}</h2>
      <p class="cidade">{{ atual.cidade }}</p>
      <p class="tag">{{ atual.denominacao }} · {{ atual.objetivo }}</p>
      <p class="sobre">{{ atual.sobre }}</p>

      <div class="acoes">
        <button class="btn secundario" @click="passar">Passar</button>
        <button class="btn salvar" @click="salvarPerfil">Salvar</button>
        <button class="btn" @click="demonstrarInteresse">Demonstrar Interesse</button>
      </div>
      <button class="denunciar" @click="denunciar">Denunciar ou bloquear</button>
    </div>

    <router-link to="/dashboard" class="voltar">← Voltar ao painel</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indice: 0,
      perfis: [
        { nome: 'Mariana', idade: 27, cidade: 'Curitiba / PR', denominacao: 'Evangélica', objetivo: 'Casamento', sobre: 'Sirvo no ministério de louvor e amo estudar a Palavra. Busco um relacionamento com propósito e diálogo aberto.' },
        { nome: 'Lucas', idade: 30, cidade: 'São Paulo / SP', denominacao: 'Protestante', objetivo: 'Namoro com propósito', sobre: 'Engenheiro, líder de jovens na igreja. Valorizo família, honestidade e crescimento mútuo na fé.' },
        { nome: 'Ana Clara', idade: 25, cidade: 'Belo Horizonte / MG', denominacao: 'Católica', objetivo: 'Amizade com propósito', sobre: 'Apaixonada por missões e por café. Acredito que todo bom relacionamento começa com uma boa amizade.' }
      ]
    }
  },
  computed: {
    atual() {
      return this.perfis[this.indice];
    }
  },
  methods: {
    proximo() {
      this.indice++;
    },
    passar() {
      this.proximo();
    },
    salvarPerfil() {
      const salvos = JSON.parse(localStorage.getItem('perfisSalvos')) || [];
      if (!salvos.find(p => p.nome === this.atual.nome)) {
        salvos.push(this.atual);
        localStorage.setItem('perfisSalvos', JSON.stringify(salvos));
      }
      this.proximo();
    },
    demonstrarInteresse() {
      const interesses = JSON.parse(localStorage.getItem('interesses')) || [];
      interesses.push(this.atual.nome);
      localStorage.setItem('interesses', JSON.stringify(interesses));
      alert(`Você demonstrou interesse em ${this.atual.nome}. Se for mútuo, vocês poderão conversar!`);
      this.proximo();
    },
    denunciar() {
      const motivo = prompt('Descreva o motivo da denúncia (ou escreva "bloquear" para apenas bloquear):');
      if (motivo) {
        const denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];
        denuncias.push({ perfil: this.atual.nome, motivo, data: new Date().toISOString() });
        localStorage.setItem('denuncias', JSON.stringify(denuncias));
        alert('Denúncia registrada. Nossa equipe de moderação irá analisar.');
        this.proximo();
      }
    }
  }
}
</script>

<style scoped>
.descoberta { max-width: 480px; margin: 0 auto; padding: 40px 20px; text-align: center; }
.subtitulo { color: #555; margin-bottom: 20px; }
.card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 30px 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.avatar { width: 72px; height: 72px; border-radius: 50%; background-color: #3182ce; color: white; font-size: 2rem; font-weight: bold; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; }
.cidade { color: #718096; }
.tag { display: inline-block; background: #ebf5ff; color: #2b6cb0; border-radius: 20px; padding: 4px 12px; font-size: 0.85rem; margin: 8px 0; }
.sobre { margin: 15px 0; color: #4a5568; }
.acoes { display: flex; gap: 10px; justify-content: center; margin-top: 15px; flex-wrap: wrap; }
.btn { padding: 10px 16px; border: none; background-color: #3182ce; color: white; border-radius: 5px; cursor: pointer; font-weight: bold; }
.btn:hover { background-color: #2b6cb0; }
.btn.secundario { background-color: #e2e8f0; color: #4a5568; }
.btn.secundario:hover { background-color: #cbd5e0; }
.btn.salvar { background-color: #d69e2e; }
.btn.salvar:hover { background-color: #b7791f; }
.denunciar { margin-top: 15px; background: none; border: none; color: #c53030; cursor: pointer; font-size: 0.85rem; text-decoration: underline; }
.vazio { padding: 40px 0; color: #718096; }
.voltar { display: inline-block; margin-top: 20px; color: #3182ce; text-decoration: none; }
</style>
