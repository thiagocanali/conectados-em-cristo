<template>
  <div class="descoberta-page">
    <div class="page-wrapper">
      <div class="desc-header fade-in-up">
        <p class="eyebrow"><span aria-hidden="true">&#9825;</span> Descoberta</p>
        <h1>Descobrir Pessoas</h1>
        <p class="desc-subtitle">Conheça com calma, com propósito e com oração.</p>
      </div>

      <div v-if="perfis.length === 0" class="desc-empty fade-in-up">
        <div class="empty-icon" aria-hidden="true">&#9825;</div>
        <p>Você viu todos os perfis disponíveis por enquanto.</p>
        <p class="empty-sub">Volte mais tarde — novas pessoas podem estar esperando.</p>
        <router-link to="/dashboard" class="btn-secondary">Voltar ao painel</router-link>
      </div>

      <div v-else class="desc-card fade-in-up">
        <div class="card-top">
          <div class="avatar">{{ atual.nome.charAt(0) }}</div>
          <div class="card-info">
            <h2>{{ atual.nome }}, {{ atual.idade }}</h2>
            <p class="cidade">{{ atual.cidade }}</p>
            <div class="tags">
              <span class="tag">{{ atual.denominacao }}</span>
              <span class="tag">{{ atual.objetivo }}</span>
            </div>
          </div>
        </div>

        <p class="sobre">{{ atual.sobre }}</p>

        <div class="acoes">
          <button class="btn-secondary desc-action" @click="passar">Passar</button>
          <button class="desc-action btn-save" @click="salvarPerfil">
            <span aria-hidden="true">&#9733;</span> Salvar
          </button>
          <button class="btn-primary desc-action" @click="demonstrarInteresse">
            Demonstrar Interesse
          </button>
        </div>

        <button class="denunciar" @click="denunciar">Denunciar ou bloquear</button>
      </div>

      <router-link to="/dashboard" class="back-link">&larr; Voltar ao painel</router-link>
    </div>
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
    atual() { return this.perfis[this.indice]; }
  },
  methods: {
    proximo() { this.indice++; },
    passar() { this.proximo(); },
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
      this.proximo();
    },
    denunciar() {
      const motivo = prompt('Descreva o motivo da denúncia (ou escreva "bloquear" para apenas bloquear):');
      if (motivo) {
        const denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];
        denuncias.push({ perfil: this.atual.nome, motivo, data: new Date().toISOString() });
        localStorage.setItem('denuncias', JSON.stringify(denuncias));
        this.proximo();
      }
    }
  }
}
</script>

<style scoped>
.descoberta-page { background: var(--cream); min-height: calc(100vh - 140px); }

.desc-header { text-align: center; margin-bottom: 40px; }
.desc-header h1 { font-size: clamp(1.8rem, 4vw, 2.5rem); margin: 14px 0 8px; }
.desc-subtitle { color: var(--text-muted); }

.desc-card {
  max-width: 480px;
  margin: 0 auto;
  background: var(--cream-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 36px 28px;
  box-shadow: var(--shadow-md);
}

.card-top { display: flex; gap: 18px; align-items: center; margin-bottom: 20px; }
.avatar {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: var(--green-deep);
  color: var(--cream);
  font-size: 1.8rem;
  font-weight: 700;
  font-family: var(--font-serif);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.card-info { text-align: left; }
.card-info h2 { font-size: 1.5rem; margin: 0 0 2px; }
.cidade { color: var(--text-muted); font-size: 0.88rem; margin: 0; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
.tag {
  background: var(--cream-dark);
  color: var(--terra-dark);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.78rem;
  font-weight: 600;
}

.sobre { color: var(--text-body); line-height: 1.65; font-size: 0.95rem; margin-bottom: 24px; }

.acoes { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.desc-action { padding: 12px 18px; font-size: 0.85rem; }
.btn-save {
  background: var(--warning-bg);
  color: var(--warning);
  border: 1.5px solid var(--warning);
}
.btn-save:hover { background: var(--warning); color: white; }

.denunciar {
  display: block;
  margin: 20px auto 0;
  background: none;
  border: none;
  color: var(--error);
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: underline;
  transition: opacity var(--t-fast);
}
.denunciar:hover { opacity: 0.7; }

.desc-empty {
  text-align: center;
  padding: 60px 20px;
  max-width: 420px;
  margin: 0 auto;
}
.empty-icon { font-size: 3rem; color: var(--terra-light); margin-bottom: 16px; }
.empty-sub { color: var(--text-muted); font-size: 0.88rem; margin: 4px 0 24px; }

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
</style>
