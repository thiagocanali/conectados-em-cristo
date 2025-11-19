<template>
  <header class="navbar">
    <div class="logo">Conectados em Cristo</div>
    <nav>
      <router-link to="/">Início</router-link>
      <router-link to="/questionario">Questionário</router-link>
      <router-link to="/login" class="btn">Entrar</router-link>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  width: 100%;
  padding: 14px 28px;
  background: #1b3d83;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo { font-size: 1.2rem; font-weight: 700; }
nav a { margin-left: 18px; color: white; text-decoration: none; font-weight: 500; }
.btn { background: #f4d35e; padding: 8px 12px; border-radius: 6px; color: #111; }
</style>
