<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-mark" aria-hidden="true">&#10022;</span>
        <div>
          <p class="footer-name">Conectados em Cristo</p>
          <p class="footer-tag">Relacionamentos com propósito em Cristo.</p>
        </div>
      </div>

      <nav class="footer-links" aria-label="Links do rodapé">
        <router-link to="/questionario">Questionário</router-link>
        <router-link to="/testedons">Dons</router-link>
        <router-link to="/testepersonalidade">Personalidade</router-link>
        <router-link to="/descoberta">Descobrir</router-link>
      </nav>

      <p class="footer-verse">
        "A tua palavra é lâmpada para os meus pés e luz para o meu caminho."
        <span>&mdash; Salmos 119:105</span>
      </p>

      <div class="footer-bottom">
        <p>&copy; {{ year }} Conectados em Cristo. Feito com fé e propósito.</p>
        <p class="footer-note">Plataforma para maiores de 18 anos.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--green-deep);
  color: var(--cream);
  padding: var(--sp-7) var(--sp-4) var(--sp-4);
}
.footer-inner {
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}
.footer-mark { color: var(--terra-light); font-size: 1.6rem; }
.footer-name {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  color: var(--cream);
  margin: 0;
}
.footer-tag {
  color: rgba(248, 246, 241, 0.6);
  font-size: 0.85rem;
  margin: 2px 0 0;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.footer-links a {
  color: rgba(248, 246, 241, 0.7);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  transition: color var(--t-fast);
}
.footer-links a:hover { color: var(--terra-light); }

.footer-verse {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(248, 246, 241, 0.65);
  border-top: 1px solid rgba(248, 246, 241, 0.15);
  border-bottom: 1px solid rgba(248, 246, 241, 0.15);
  padding: var(--sp-3) 0;
  max-width: 520px;
}
.footer-verse span {
  display: block;
  font-size: 0.75rem;
  font-style: normal;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--terra-light);
  margin-top: 8px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.footer-bottom p {
  color: rgba(248, 246, 241, 0.5);
  font-size: 0.78rem;
}
.footer-note { font-size: 0.72rem !important; }

@media (max-width: 600px) {
  .footer-bottom { flex-direction: column; align-items: flex-start; }
}
</style>
