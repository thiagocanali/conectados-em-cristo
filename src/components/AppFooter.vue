<template>
  <footer class="footer"><div class="footer-inner">
    <div class="footer-brand"><span class="footer-mark" aria-hidden="true">✦</span><div><p class="footer-name">Conectados em Cristo</p><p class="footer-tag">Jesus no centro. Aprender juntos. Servir na vida real.</p></div></div>
    <nav class="footer-links" aria-label="Links do rodapé"><router-link to="/estudos">Estudos bíblicos</router-link><router-link to="/em-comunidade">Estudar em grupo</router-link><router-link to="/igrejas">Para igrejas</router-link><router-link to="/laboratorio">Área experimental</router-link></nav>
    <p class="footer-verse">"Levai as cargas uns dos outros e assim cumprireis a lei de Cristo."<span>— Gálatas 6:2</span></p>
    <div class="footer-bottom"><p>© {{ year }} Conectados em Cristo. Uma comunidade de fé.</p><p class="footer-note">Guias de apoio para a caminhada com Cristo e sua comunidade.</p></div>
  </div></footer>
</template>
<script setup>
const year = new Date().getFullYear()
</script>
<style scoped>
.footer { background: var(--green-deep); color: var(--cream); padding: var(--sp-7) var(--sp-4) var(--sp-4); }.footer-inner { max-width: 1180px; margin: 0 auto; display: flex; flex-direction: column; gap: var(--sp-5); }.footer-brand { display: flex; align-items: center; gap: 14px; }.footer-mark { color: var(--terra-light); font-size: 1.6rem; }.footer-name { font: 1.3rem var(--font-serif); color: var(--cream); margin: 0; }.footer-tag { color: rgba(248,246,241,.7); font-size: .85rem; margin-top: 2px; }.footer-links { display: flex; flex-wrap: wrap; gap: 24px; }.footer-links a { color: rgba(248,246,241,.75); text-decoration: none; font-size: .82rem; font-weight: 600; }.footer-links a:hover { color: var(--terra-light); }.footer-verse { font: italic 1.1rem/1.6 var(--font-serif); color: rgba(248,246,241,.75); border-top: 1px solid rgba(248,246,241,.15); border-bottom: 1px solid rgba(248,246,241,.15); padding: var(--sp-3) 0; max-width: 560px; }.footer-verse span { display: block; font: .75rem var(--font-sans); letter-spacing: .1em; text-transform: uppercase; color: var(--terra-light); margin-top: 8px; }.footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }.footer-bottom p { color: rgba(248,246,241,.6); font-size: .78rem; }@media (max-width: 600px) { .footer-bottom { flex-direction: column; align-items: flex-start; } }
</style>