<template>
  <div class="resultados">
    <div class="result-container">
      <h1>Resultados do Questionário</h1>
      <p>Sua compatibilidade com outros perfis é:</p>
      <div v-if="compatibilidade === 'alta'" class="result high">
        Compatibilidade Alta! 🎉
      </div>
      <div v-if="compatibilidade === 'media'" class="result medium">
        Compatibilidade Média.
      </div>
      <div v-if="compatibilidade === 'baixa'" class="result low">
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
      compatibilidade: 'alta'  // Ajuste a lógica conforme as respostas
    };
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
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

.high {
  background-color: #48bb78;
  color: white;
}

.medium {
  background-color: #f6e05e;
  color: black;
}

.low {
  background-color: #e53e3e;
  color: white;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
}

button:hover {
  background-color: #2b6cb0;
}
</style>
