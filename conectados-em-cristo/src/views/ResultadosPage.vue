<template>
  <div class="resultados">
    <div class="result-container">
      <h1>Resultados do Questionário</h1>
      <p>Sua compatibilidade com outros perfis é:</p>
      
      <div v-if="compatibilidade === 'alta'" class="result high">
        Compatibilidade Alta! 🎉
      </div>
      <div v-else-if="compatibilidade === 'media'" class="result medium">
        Compatibilidade Média.
      </div>
      <div v-else class="result low">
        Compatibilidade Baixa.
      </div>

      <router-link to="/" class="btn">Voltar à Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      compatibilidade: ''
    };
  },
  mounted() {
    let score = 0;

    // Lê as 10 respostas do LocalStorage
    for (let i = 1; i <= 10; i++) {
      const resposta = localStorage.getItem(`pergunta${i}`);
      
      switch(resposta) {
        case 'forte':
        case 'musica':
        case 'sempre':
        case 'diariamente':
        case 'sociais':
        case 'liderar':
        case 'sim':
        case 'muito':
          score += 3; break;
        case 'media':
        case 'servico':
        case 'às_vezes':
        case 'ocasionalmente':
        case 'ambos':
        case 'depende':
        case 'moderado':
          score += 2; break;
        case 'fraca':
        case 'ensino':
        case 'raramente':
        case 'nao_muito':
        case 'nao':
        case 'pouco':
          score += 1; break;
      }
    }

    // Define compatibilidade
    if (score >= 25) this.compatibilidade = 'alta';
    else if (score >= 18) this.compatibilidade = 'media';
    else this.compatibilidade = 'baixa';
  }
};
</script>

<style scoped>
.resultados {
  background: #e6fffa;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.result-container {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.result {
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.high { background-color: #48bb78; color: white; }
.medium { background-color: #f6e05e; color: black; }
.low { background-color: #e53e3e; color: white; }

button, .btn {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  background-color: #3182ce;
  color: white;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

button:hover, .btn:hover {
  background-color: #2b6cb0;
}
</style>
