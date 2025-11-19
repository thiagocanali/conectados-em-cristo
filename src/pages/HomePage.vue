<template>
  <div class="home">
    <section class="hero">
      <h1>Encontros com Propósito</h1>
      <p>Conheça pessoas que compartilham a mesma fé e valores cristãos.</p>
      <router-link to="/cadastro" class="cta">Começar Agora</router-link>
    </section>

    <section class="features">
      <div class="card">
        <h3>Seguro</h3>
        <p>Moderação automática e comunitária.</p>
      </div>
      <div class="card">
        <h3>Compatibilidade</h3>
        <p>Questionário para achar pessoas com os mesmos valores.</p>
      </div>
      <div class="card">
        <h3>Confiável</h3>
        <p>Focado em relacionamentos sérios.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  min-height: 60vh;
  background: linear-gradient(125deg, #1b3d83, #2e5bb8);
  color: white;
  display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;
  padding: 40px 20px;
}
h1 { font-size: 2.6rem; margin: 0; }
p { margin-top: 12px; font-size: 1.05rem; max-width: 760px; }
.cta { margin-top: 18px; padding: 12px 20px; background:#f4d35e; color:#111; border-radius:8px; text-decoration:none; }

.features { display:flex; gap:18px; justify-content:center; padding: 36px 12px; flex-wrap:wrap; }
.card { background: white; padding:20px; border-radius:10px; width: 220px; box-shadow: 0 6px 18px rgba(0,0,0,0.08); color:#111; }
</style>
