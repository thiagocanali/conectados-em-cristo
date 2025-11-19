<template>
  <div class="cadastro">
    <div class="form-container">
      <h2>Crie sua conta</h2>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="nome" required />
        </div>
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <button type="submit" class="btn">Criar Conta</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nome: '',
      email: ''
    };
  },
  methods: {
    submitForm() {
      console.log("Cadastro realizado:", this.nome, this.email);
      this.$router.push('/questionario');
    }
  }
};
</script>

<style scoped>
.cadastro {
  background: #e6f7f1;
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

h2 {
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

input {
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
