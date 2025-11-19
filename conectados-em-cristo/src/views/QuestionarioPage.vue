<template>
  <div class="questionario">
    <div class="form-container">
      <h1>Questionário de Compatibilidade</h1>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="pergunta1">Como você descreve sua fé cristã?</label>
          <select v-model="pergunta1" id="pergunta1" required>
            <option value="forte">Forte</option>
            <option value="media">Média</option>
            <option value="fraca">Fraca</option>
          </select>
        </div>
        <div class="input-group">
          <label for="pergunta2">Qual é seu ministério preferido?</label>
          <select v-model="pergunta2" id="pergunta2" required>
            <option value="musica">Música</option>
            <option value="servico">Serviço</option>
            <option value="ensino">Ensino</option>
          </select>
        </div>
        <button type="submit" class="btn">Ver Resultados</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pergunta1: '',
      pergunta2: ''
    };
  },
  methods: {
    submitForm() {
      this.$router.push('/resultados');
    }
  }
};
</script>

<style scoped>
.questionario {
  background: #f0fdf4;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.form-container {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
}

label {
  font-size: 1.1rem;
  margin-bottom: 10px;
  display: block;
}

select {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-top: 5px;
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
