<template>
  <div class="learning-page page-wrapper">
    <header class="learning-header"><p class="eyebrow">Jesus no centro</p><h1>Conhecer Jesus. Caminhar com ele.</h1><p>Abra a Bíblia, observe o texto e leve uma resposta concreta para a vida. Guias gratuitos para estudar sozinho, com amigos ou com sua igreja.</p></header>
    <div class="learning-filters" role="group" aria-label="Filtrar estudos por tema">
      <button v-for="item in themes" :key="item" class="btn-secondary" :aria-pressed="theme === item" @click="theme = item">{{ item }}</button>
    </div>
    <p role="status" class="study-meta">{{ filtered.length }} {{ filtered.length === 1 ? 'estudo disponível' : 'estudos disponíveis' }}</p>
    <div class="learning-grid"><StudyCard v-for="study in filtered" :key="study.slug" :study="study" /></div>
    <aside class="learning-note"><h2>Vai estudar com outras pessoas?</h2><p>Prepare um encontro com leitura, conversa, uma ação prática e oração. Você escolhe o estudo e o tempo disponível.</p><router-link to="/em-comunidade" class="btn-primary">Preparar um encontro</router-link></aside>
    <p class="study-meta">Guias originais de apoio, com referências para conferir na Bíblia. Não substituem as Escrituras nem o acompanhamento da sua igreja.</p>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { studies } from '@/data/studies.mjs'
import StudyCard from '@/components/StudyCard.vue'
const themes = ['Todos', ...new Set(studies.map(study => study.theme))]
const theme = ref('Todos')
const filtered = computed(() => studies.filter(study => theme.value === 'Todos' || study.theme === theme.value))
</script>
