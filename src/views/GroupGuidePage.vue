<template>
  <div class="learning-page page-wrapper">
    <header class="learning-header"><p class="eyebrow">Aprender e servir juntos</p><h1>Um encontro com Jesus no centro</h1><p>Prepare um roteiro para sua igreja, pequeno grupo ou roda de amigos. Abra a Bíblia juntos, escutem uns aos outros e escolham uma forma de colocar o amor em prática.</p></header>
    <form class="learning-panel guide-controls" @submit.prevent="download">
      <div class="field-group"><label class="field-label" for="guide-study">Qual estudo vocês vão fazer?</label><select id="guide-study" v-model="slug" class="field-select"><option v-for="item in studies" :key="item.slug" :value="item.slug">{{ item.title }} — {{ item.reference }}</option></select></div>
      <div class="field-group"><label class="field-label" for="guide-duration">Quanto tempo vocês têm?</label><select id="guide-duration" v-model.number="duration" class="field-select"><option v-for="minutes in meetingDurations" :key="minutes" :value="minutes">{{ minutes }} minutos</option></select></div>
      <div class="learning-actions"><button class="btn-primary" type="submit">Baixar roteiro em texto</button><button class="btn-secondary" type="button" @click="print">Imprimir roteiro</button></div>
      <p v-if="message" role="status">{{ message }}</p><p v-if="error" role="alert">{{ error }}</p>
    </form>
    <article class="meeting-print learning-panel" aria-labelledby="guide-title"><p class="eyebrow">Roteiro de encontro · {{ duration }} minutos</p><h2 id="guide-title">{{ study.title }}</h2><p><strong>Passagem bíblica: {{ study.reference }}</strong></p><p>Leiam o trecho inteiro na Bíblia que a comunidade costuma usar. O roteiro é um apoio; o texto bíblico é a referência.</p><section v-for="(part, index) in guide.sections" :key="part.title" class="meeting-part"><h3>{{ index + 1 }}. {{ part.title }} <span class="study-meta">· {{ part.minutes }} min</span></h3><p class="preserve-lines">{{ part.text }}</p></section><p class="study-meta">Guia original do Conectados em Cristo. Não há cadastro de participantes, reserva de evento ou envio automático de convites.</p></article>
    <aside class="learning-note"><h2>Um ambiente de acolhimento</h2><p>Participação livre, escuta respeitosa e cuidado com a privacidade. Não publiquem relatos de outras pessoas sem consentimento. Para questões pastorais, procurem a liderança responsável da comunidade.</p><router-link :to="`/estudos/${study.slug}`" class="learning-link">Abrir o estudo individual →</router-link></aside>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { studies, findStudy } from '@/data/studies.mjs'
import { buildMeetingGuide, meetingDurations } from '@/services/meetingGuide.mjs'
import { downloadText } from '@/utils/downloadText.mjs'
const route = useRoute()
const slug = ref(findStudy(route.query.estudo)?.slug ?? studies[0].slug)
const duration = ref(45)
const study = computed(() => findStudy(slug.value) ?? studies[0])
const guide = computed(() => buildMeetingGuide(study.value, duration.value))
const message = ref('')
const error = ref('')
function download() {
  error.value = ''; message.value = ''
  try { downloadText(guide.value.text, `encontro-${study.value.slug}-${duration.value}min.txt`); message.value = 'Roteiro preparado para download. Você pode compartilhá-lo pelos canais que seu grupo já utiliza.' }
  catch { error.value = 'Não foi possível preparar o arquivo. Você pode usar a opção de impressão.' }
}
function print() { window.print() }
</script>
