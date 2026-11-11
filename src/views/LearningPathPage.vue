<template>
  <div class="learning-page page-wrapper">
    <header class="learning-header">
      <p class="eyebrow">Uma caminhada em comunidade</p>
      <h1>{{ learningPath.title }}</h1>
      <p>{{ learningPath.summary }}</p>
      <p>Vocês podem se encontrar semanalmente ou no ritmo que fizer sentido. Não é preciso cadastrar um grupo para usar os materiais.</p>
    </header>
    <section class="learning-panel guide-controls" aria-labelledby="path-prepare-title">
      <h2 id="path-prepare-title">Preparem a caminhada</h2>
      <p>O kit reúne a preparação e os quatro roteiros completos, com perguntas para retomar a conversa e propostas para a semana.</p>
      <label class="field-label" for="path-duration">Duração sugerida de cada encontro</label>
      <select id="path-duration" class="field-select" :value="duration" @change="changeDuration">
        <option v-for="minutes in meetingDurations" :key="minutes" :value="minutes">{{ minutes }} minutos por encontro</option>
      </select>
      <p v-if="invalidDuration" class="study-meta">A duração do link não foi reconhecida. Usamos 45 minutos; você pode escolher outra opção.</p>
      <div class="learning-actions">
        <button class="btn-primary" type="button" @click="download">Baixar kit dos quatro encontros</button>
        <router-link :to="meetingLocation(sessions[0])" class="btn-secondary">Preparar o primeiro encontro</router-link>
      </div>
      <p v-if="message" role="status">{{ message }}</p><p v-if="error" role="alert">{{ error }}</p>
      <p class="study-meta">A duração aparece no endereço desta página. O kit é público; nenhum dado de participantes é incluído.</p>
    </section>
    <ol class="path-session-list" aria-label="Encontros da caminhada">
      <li v-for="session in sessions" :key="session.studySlug" class="learning-panel path-session">
        <p class="eyebrow">Encontro {{ session.number }} de {{ sessions.length }} · {{ duration }} minutos sugeridos</p>
        <h2>{{ session.study.title }}</h2>
        <p class="study-meta">{{ session.study.reference }}</p>
        <p>{{ session.purpose }}</p>
        <h3>Para acolher e retomar</h3><p>{{ session.returnPrompt }}</p>
        <h3>Entre os encontros</h3><p>{{ session.betweenMeetings }}</p>
        <details class="meeting-context"><summary>Levar à próxima conversa</summary><p>{{ session.nextConversation }}</p></details>
        <div class="learning-actions">
          <router-link :to="meetingLocation(session)" class="btn-primary">Preparar encontro {{ session.number }}</router-link>
          <router-link :to="`/estudos/${session.studySlug}`" class="learning-link">Ler estudo individual</router-link>
        </div>
      </li>
    </ol>
    <aside class="learning-note"><h2>Uma proposta para continuar caminhando</h2><p>Os quatro encontros são um começo. Ao final, conversem com a comunidade sobre dúvidas, necessidades próximas e próximas leituras. O objetivo é seguir aprendendo com Cristo e servindo juntos.</p><router-link to="/igrejas" class="learning-link">Usar os materiais com minha igreja →</router-link></aside>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { learningPath } from '@/data/learningPath.mjs'
import { pathSessions, readPathDuration, buildLearningPathKit } from '@/services/learningPath.mjs'
import { meetingDurations, meetingQuery } from '@/services/meetingGuide.mjs'
import { downloadText } from '@/utils/downloadText.mjs'
const route = useRoute()
const router = useRouter()
const sessions = pathSessions()
const duration = computed(() => readPathDuration(route.query.tempo))
const invalidDuration = computed(() => route.query.tempo !== undefined && !['30', '45', '60'].includes(route.query.tempo))
const message = ref('')
const error = ref('')
function meetingLocation(session) { return { path: '/em-comunidade', query: meetingQuery(session.studySlug, duration.value) } }
async function changeDuration(event) {
  message.value = ''; error.value = ''
  const minutes = readPathDuration(event.target.value)
  try { await router.replace({ path: '/caminhada', query: { tempo: String(minutes) } }) }
  catch { error.value = 'Não foi possível atualizar a duração. Tente novamente.' }
}
function download() {
  message.value = ''; error.value = ''
  try {
    downloadText(buildLearningPathKit(duration.value).text, `caminhada-${learningPath.slug}-${duration.value}min.txt`)
    message.value = 'Kit preparado para download, com os quatro roteiros e as propostas entre encontros.'
  } catch { error.value = 'Não foi possível preparar o arquivo. Os roteiros individuais continuam disponíveis abaixo.' }
}
</script>
