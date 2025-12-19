<template>
  <div class="home">
    <div class="card">
      <h1>Bem-vindo ao App</h1>
      <div class="buttons">
        <router-link to="/login" class="btn">Login</router-link>
        <router-link to="/cadastro" class="btn btn-secondary">Cadastrar</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Layout principal */
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
}

/* Card central */
.card {
  background: white;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

/* Título */
h1 {
  font-size: clamp(2rem, 5vw, 2.5rem);
  margin-bottom: 30px;
  color: #1a202c;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
}

/* Botões */
.buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  max-width: 180px;
  width: 100%;
  background-color: #3182ce;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.btn:hover {
  background-color: #2b6cb0;
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0,0,0,0.15);
}

/* Botão secundário */
.btn-secondary {
  background-color: #48bb78;
}

.btn-secondary:hover {
  background-color: #38a169;
}

/* Responsividade */
@media (max-width: 500px) {
  .card {
    padding: 30px 20px;
  }

  .buttons {
    flex-direction: column;
    gap: 12px;
  }

  .btn {
    max-width: 100%;
  }
}
</style>
