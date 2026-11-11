<template>
  <div class="learning-page page-wrapper"><header class="learning-header"><p class="eyebrow">Área experimental</p><h1>Protótipos anteriores</h1><p>Estes recursos locais foram preservados para consulta. O foco do produto agora é conhecer Jesus, aprender em comunidade e servir. Aqui não há autenticação real, conexão entre pessoas ou envio de denúncias a moderadores.</p><router-link to="/estudos" class="btn-primary">Voltar aos estudos</router-link></header><div class="learning-grid"><router-link v-for="item in items" :key="item.path" :to="item.path" class="learning-card"><h2>{{ item.title }}</h2><p>Demonstração local. Não use informações reais.</p></router-link></div></div>
</template>
<script setup>
const items = [{ path: '/testedons', title: 'Teste de dons' }, { path: '/testepersonalidade', title: 'Personalidade' }, { path: '/descoberta', title: 'Descoberta de perfis' }, { path: '/questionario', title: 'Questionário' }, { path: '/resultados', title: 'Compatibilidade' }, { path: '/salvos', title: 'Perfis salvos' }, { path: '/perfil', title: 'Perfil demonstrativo' }]
</script>
