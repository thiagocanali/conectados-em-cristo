<template>
  <header class="navbar">
    <router-link to="/" class="brand" aria-label="Conectados em Cristo - início">
      <span class="brand-mark" aria-hidden="true">✦</span>
      <span>Conectados <b>em Cristo</b></span>
    </router-link>
    <nav aria-label="Navegação principal">
      <router-link to="/questionario">Questionário</router-link>
      <router-link to="/testedons">Dons</router-link>
      <router-link to="/testepersonalidade">Personalidade</router-link>
      <router-link to="/login" class="btn">Entrar</router-link>
    </nav>
  </header>
</template>

<style scoped>
.navbar { width: 100%; padding: 18px max(24px, calc((100% - 1180px) / 2)); background: #f8f6f1; color: #294237; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e3e0d8; }
.brand { display: flex; align-items: center; gap: 10px; color: #294237; text-decoration: none; font-family: Georgia, serif; font-size: 1.1rem; letter-spacing: -.02em; white-space: nowrap; }
.brand b { color: #b06d43; font-weight: 500; }.brand-mark { color: #b06d43; font-size: 1.25rem; }
nav { display: flex; align-items: center; gap: 25px; } nav a { color: #66736b; text-decoration: none; font-size: .82rem; font-weight: 700; } nav a:hover { color: #b06d43; }
.btn { color: white !important; background: #294237; padding: 10px 18px; border-radius: 3px; }.btn:hover { background: #b06d43; }
@media (max-width: 700px) { .navbar { padding: 15px 20px; } nav { gap: 12px; } nav a:not(.btn) { display: none; } }
</style>
