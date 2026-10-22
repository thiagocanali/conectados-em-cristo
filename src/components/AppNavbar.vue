<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="navbar-inner">
      <router-link to="/" class="brand" aria-label="Conectados em Cristo - início"><span class="brand-mark" aria-hidden="true">✦</span><span class="brand-text">Conectados <b>em Cristo</b></span></router-link>
      <nav class="nav-desktop" aria-label="Navegação principal"><router-link to="/oracoes">Orações</router-link><router-link to="/descoberta">Conexões</router-link><router-link to="/testedons">Dons</router-link><router-link to="/dashboard">Minha jornada</router-link><router-link to="/login" class="btn-nav">Entrar</router-link></nav>
      <button class="nav-toggle" @click="mobileOpen = !mobileOpen" :aria-expanded="mobileOpen" aria-label="Abrir ou fechar menu"><span :class="{ open: mobileOpen }"></span><span :class="{ open: mobileOpen }"></span><span :class="{ open: mobileOpen }"></span></button>
    </div>
    <transition name="slide-down"><nav v-if="mobileOpen" class="nav-mobile" aria-label="Navegação mobile"><router-link to="/oracoes" @click="mobileOpen = false">Orações</router-link><router-link to="/descoberta" @click="mobileOpen = false">Conexões</router-link><router-link to="/testedons" @click="mobileOpen = false">Dons espirituais</router-link><router-link to="/dashboard" @click="mobileOpen = false">Minha jornada</router-link><router-link to="/login" @click="mobileOpen = false" class="btn-nav-mobile">Entrar</router-link></nav></transition>
  </header>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const scrolled = ref(false)
const mobileOpen = ref(false)
const handleScroll = () => { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
<style scoped>
.navbar { width: 100%; background: var(--cream); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; transition: background var(--t-base), box-shadow var(--t-base); }.navbar.scrolled { background: rgba(248,246,241,.95); backdrop-filter: blur(10px); box-shadow: 0 2px 12px rgba(32,53,44,.06); }.navbar-inner { max-width: 1180px; margin: 0 auto; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }.brand { display: flex; align-items: center; gap: 10px; color: var(--green-deep); text-decoration: none; font-family: var(--font-serif); font-size: 1.15rem; letter-spacing: -.02em; white-space: nowrap; }.brand b { color: var(--terra); font-weight: 500; }.brand-mark { color: var(--terra); font-size: 1.3rem; }
.nav-desktop { display: flex; align-items: center; gap: 25px; }.nav-desktop a { color: var(--text-dark); text-decoration: none; font-size: .82rem; font-weight: 700; transition: color var(--t-fast); }.nav-desktop a:hover,.nav-desktop a.router-link-active { color: var(--terra); }.btn-nav { color: white !important; background: var(--green-deep); padding: 10px 20px; border-radius: var(--radius-sm); }.btn-nav:hover { background: var(--terra); }
.nav-toggle { display: none; flex-direction: column; gap: 5px; background: transparent; border: 0; padding: 8px; cursor: pointer; }.nav-toggle span { width: 24px; height: 2px; background: var(--green-deep); transition: transform var(--t-base), opacity var(--t-base); }.nav-toggle span.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }.nav-toggle span.open:nth-child(2) { opacity: 0; }.nav-toggle span.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }.nav-mobile { display: flex; flex-direction: column; background: var(--cream-light); border-bottom: 1px solid var(--border); padding: 8px 32px 20px; }.nav-mobile a { padding: 14px 0; color: var(--text-dark); text-decoration: none; font-weight: 700; font-size: .9rem; border-bottom: 1px solid var(--border-light); }.nav-mobile a:last-child { border-bottom: 0; }.btn-nav-mobile { margin-top: 8px; text-align: center; background: var(--green-deep); color: white !important; border-radius: var(--radius-sm); padding: 14px !important; }
.slide-down-enter-active,.slide-down-leave-active { transition: all var(--t-base); }.slide-down-enter-from,.slide-down-leave-to { opacity: 0; transform: translateY(-10px); }@media (max-width: 950px) { .nav-desktop { display: none; }.nav-toggle { display: flex; } }@media (min-width: 951px) { .nav-mobile { display: none; } }
</style>