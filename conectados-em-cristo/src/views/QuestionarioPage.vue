<template>
  <div class="questionario">
    <div class="form-container">
      <h1>Questionário de Compatibilidade</h1>
      <form @submit.prevent="submitForm">
        <div 
          class="input-group" 
          v-for="(pergunta, index) in perguntas" 
          :key="index"
        >
          <label :for="'pergunta' + (index + 1)">{{ pergunta.text }}</label>
          <select 
            v-model="respostas[index]" 
            :id="'pergunta' + (index + 1)" 
            required
          >
            <option 
              v-for="opcao in pergunta.opcoes" 
              :key="opcao.value" 
              :value="opcao.value"
            >
              {{ opcao.label }}
            </option>
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
      perguntas: [
        { text: "Como você descreve sua fé cristã?", opcoes: [
            { label: "Forte", value: "forte" },
            { label: "Média", value: "media" },
            { label: "Fraca", value: "fraca" },
          ] 
        },
        { text: "Qual é seu ministério preferido?", opcoes: [
            { label: "Música", value: "musica" },
            { label: "Serviço", value: "servico" },
            { label: "Ensino", value: "ensino" },
          ] 
        },
        { text: "Com que frequência você participa de atividades da igreja?", opcoes: [
            { label: "Sempre", value: "sempre" },
            { label: "Às vezes", value: "as_vezes" },
            { label: "Raramente", value: "raramente" },
          ] 
        },
        { text: "Você gosta de estudar a Bíblia regularmente?", opcoes: [
            { label: "Sim, diariamente", value: "diariamente" },
            { label: "Ocasionalmente", value: "ocasionalmente" },
            { label: "Não muito", value: "nao_muito" },
          ] 
        },
        { text: "Você prefere eventos sociais ou momentos de reflexão?", opcoes: [
            { label: "Eventos sociais", value: "sociais" },
            { label: "Reflexão", value: "reflexao" },
            { label: "Ambos", value: "ambos" },
          ] 
        },
        { text: "Você gosta de liderar ou servir?", opcoes: [
            { label: "Liderar", value: "liderar" },
            { label: "Servir", value: "servir" },
            { label: "Depende da situação", value: "depende" },
          ] 
        },
        { text: "Você participa de grupos de estudo bíblico?", opcoes: [
            { label: "Sim", value: "sim" },
            { label: "Não", value: "nao" },
            { label: "Às vezes", value: "as_vezes" },
          ] 
        },
        { text: "Quão importante é a oração na sua vida?", opcoes: [
            { label: "Muito importante", value: "muito" },
            { label: "Moderadamente", value: "moderado" },
            { label: "Pouco importante", value: "pouco" },
          ] 
        },
        { text: "Você participa de voluntariado ou serviço comunitário?", opcoes: [
            { label: "Sim, regularmente", value: "sim" },
            { label: "Ocasionalmente", value: "ocasionalmente" },
            { label: "Não", value: "nao" },
          ] 
        },
        { text: "Você gosta de compartilhar sua fé com os outros?", opcoes: [
            { label: "Sim", value: "sim" },
            { label: "Às vezes", value: "as_vezes" },
            { label: "Não", value: "nao" },
          ] 
        },
      ],
      respostas: Array(10).fill('') // Inicializa com 10 respostas vazias
    };
  },
  methods: {
    submitForm() {
      // Armazena todas as respostas no LocalStorage
      this.respostas.forEach((resposta, index) => {
        localStorage.setItem(`pergunta${index + 1}`, resposta);
      });
      // Redireciona para página de resultados
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
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  max-width: 600px;
  width: 100%;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 5px;
}

select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
}

button {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  background-color: #3182ce;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #2b6cb0;
}
</style>
