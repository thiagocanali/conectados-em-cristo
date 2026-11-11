<template>
  <div class="learning-page page-wrapper meeting-page">
    <header class="learning-header">
      <p class="eyebrow">Aprender e servir juntos</p>
      <h1>Um encontro com Jesus no centro</h1>
      <p>Prepare um roteiro para sua igreja, pequeno grupo ou roda de amigos. Abra a Bíblia juntos, escutem uns aos outros e escolham uma forma de colocar o amor em prática.</p>
    </header>

    <form v-show="!conducting" class="learning-panel guide-controls" @submit.prevent="download">
      <p v-if="corrected" class="meeting-advice">O link tinha opções não reconhecidas. Confira o estudo e a duração selecionados abaixo.</p>
      <div class="field-group">
        <label class="field-label" for="guide-study">Qual estudo vocês vão fazer?</label>
        <select id="guide-study" v-model="slug" class="field-select" @change="updateSelection">
          <option v-for="item in studies" :key="item.slug" :value="item.slug">{{ item.title }} — {{ item.reference }}</option>
        </select>
      </div>
      <div class="field-group">
        <label class="field-label" for="guide-duration">Quanto tempo vocês têm?</label>
        <select id="guide-duration" v-model.number="duration" class="field-select" @change="updateSelection">
          <option v-for="minutes in meetingDurations" :key="minutes" :value="minutes">{{ minutes }} minutos</option>
        </select>
      </div>
      <div class="learning-actions">
        <button class="btn-primary" type="button" @click="start">Conduzir encontro por etapas</button>
        <button class="btn-secondary" type="submit">Baixar roteiro em texto</button>
        <button class="btn-secondary" type="button" @click="print">Imprimir roteiro</button>
      </div>
      <div class="meeting-share">
        <label class="field-label" for="meeting-link">Link para este roteiro e duração</label>
        <input id="meeting-link" class="field-input" type="url" :value="shareUrl" readonly @focus="selectLink" />
        <button class="btn-secondary" type="button" @click="copyLink">Copiar link do roteiro</button>
        <p class="study-meta">O link abre o material público escolhido. Você decide para quem enviá-lo pelos canais do grupo.</p>
      </div>
      <p v-if="message" role="status">{{ message }}</p>
      <p v-if="error" role="alert">{{ error }}</p>
    </form>

    <section v-if="conducting" ref="activePanel" class="learning-panel meeting-conductor" tabindex="-1" aria-labelledby="active-title">
      <div class="meeting-heading">
        <p class="eyebrow">{{ study.title }} · Etapa {{ partIndex + 1 }} de {{ guide.sections.length }}</p>
        <button class="learning-link meeting-back" type="button" @click="stop">Ver roteiro completo</button>
      </div>
      <p class="study-meta">Passagem: {{ study.reference }} · Encontro de {{ duration }} minutos</p>
      <h2 id="active-title">{{ activePart.title }}</h2>
      <p class="study-meta">Tempo sugerido para esta etapa: {{ activePart.minutes }} minutos. Ajuste à conversa.</p>
      <p class="preserve-lines">{{ activePart.text }}</p>
      <p v-if="partIndex === 0 && pathContext"><strong>Se estiverem seguindo a caminhada:</strong> {{ pathContext.session.returnPrompt }}</p>
      <section v-if="partIndex === 4 && pathContext" aria-labelledby="week-practice-title">
        <h3 id="week-practice-title">Uma proposta para a semana</h3><p>{{ pathContext.session.betweenMeetings }}</p>
        <h3>Para retomar a conversa</h3><p>{{ pathContext.session.nextConversation }}</p>
      </section>
      <template v-if="partIndex === 1">
        <a :href="passageUrl(study)" target="_blank" rel="noopener noreferrer" class="learning-link">Abrir {{ study.reference }} (site externo, nova aba)</a>
        <details class="meeting-context"><summary>Rever o contexto da passagem</summary><p>{{ study.context }}</p></details>
      </template>
      <div class="learning-actions">
        <button v-if="partIndex > 0" class="btn-secondary" type="button" @click="go(partIndex - 1)">Etapa anterior</button>
        <button v-if="partIndex < guide.sections.length - 1" class="btn-primary" type="button" @click="go(partIndex + 1)">Próxima etapa: {{ guide.sections[partIndex + 1].title }}</button>
        <button v-else class="btn-primary" type="button" @click="stop">Voltar ao roteiro completo</button>
      </div>
      <p class="study-meta">A condução fica apenas nesta tela; recarregar volta ao roteiro. Não há controle de presença nem registro do que foi compartilhado.</p>
    </section>

    <article v-show="!conducting" ref="fullGuide" class="meeting-print learning-panel" tabindex="-1" aria-labelledby="guide-title">
      <p class="eyebrow">Roteiro de encontro · {{ duration }} minutos</p>
      <h2 id="guide-title">{{ study.title }}</h2>
      <p><strong>Passagem bíblica: {{ study.reference }}</strong></p>
      <p>Leiam o trecho inteiro na Bíblia que a comunidade costuma usar. O roteiro é um apoio; o texto bíblico é a referência.</p>
      <section class="meeting-preparation" aria-labelledby="preparation-title">
        <h3 id="preparation-title">Antes do encontro</h3>
        <p class="study-meta">Preparação de quem conduz, fora do tempo sugerido para a reunião.</p>
        <ol class="learning-questions"><li v-for="item in guide.preparation" :key="item">{{ item }}</li></ol>
        <h3>Contexto da passagem</h3><p>{{ study.context }}</p>
        <a :href="passageUrl(study)" target="_blank" rel="noopener noreferrer" class="learning-link">Ler {{ study.reference }} (site externo, nova aba)</a>
      </section>
      <section v-for="(part, index) in guide.sections" :key="part.title" class="meeting-part">
        <h3>{{ index + 1 }}. {{ part.title }} <span class="study-meta">· {{ part.minutes }} min sugeridos</span></h3>
        <p class="preserve-lines">{{ part.text }}</p>
        <p v-if="index === 0 && pathContext"><strong>Se estiverem seguindo a caminhada:</strong> {{ pathContext.session.returnPrompt }}</p>
      </section>
      <section v-if="pathContext" class="meeting-part" aria-labelledby="between-title">
        <h3 id="between-title">Entre os encontros</h3><p>{{ pathContext.session.betweenMeetings }}</p>
        <h3>Para a próxima conversa</h3><p>{{ pathContext.session.nextConversation }}</p>
      </section>
      <p class="study-meta">Guia original do Conectados em Cristo. Não há cadastro de participantes, reserva de evento ou envio automático de convites.</p>
    </article>
    <aside v-if="!conducting && pathContext" class="learning-note" aria-labelledby="path-next-title">
      <p class="eyebrow">Encontro {{ pathContext.session.number }} da caminhada</p>
      <h2 id="path-next-title">Dar continuidade à conversa</h2>
      <p>Se quiserem seguir a sequência, o kit reúne os quatro encontros e as propostas para a semana. Adaptem o ritmo à comunidade.</p>
      <router-link v-if="pathContext.next" :to="{ path: '/em-comunidade', query: meetingQuery(pathContext.next.studySlug, duration) }" class="btn-primary">Preparar próximo encontro: {{ pathContext.next.study.title }}</router-link>
      <p v-else>Este é o último roteiro desta proposta. Conversem com a comunidade sobre como continuar aprendendo e servindo.</p>
      <p><router-link :to="{ path: '/caminhada', query: { tempo: String(duration) } }" class="learning-link">Ver os quatro encontros e baixar o kit →</router-link></p>
    </aside>
    <aside class="learning-note">
      <h2>Um ambiente de acolhimento</h2>
      <p>Participação livre, escuta respeitosa e cuidado com a privacidade. Não publiquem relatos de outras pessoas sem consentimento. Para questões pastorais, procurem a liderança responsável da comunidade.</p>
      <router-link :to="`/estudos/${study.slug}`" class="learning-link">Abrir o estudo individual →</router-link>
    </aside>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { studies, findStudy, passageUrl } from '@/data/studies.mjs'
import { buildMeetingGuide, meetingDurations, meetingQuery, readMeetingSelection, publicMeetingUrl } from '@/services/meetingGuide.mjs'
import { downloadText } from '@/utils/downloadText.mjs'
import { pathSessionFor, buildPathMeetingGuide } from '@/services/learningPath.mjs'

const route = useRoute()
const router = useRouter()
const initial = readMeetingSelection(route.query)
const slug = ref(initial.slug)
const duration = ref(initial.duration)
const corrected = ref(initial.corrected)
const conducting = ref(false)
const partIndex = ref(0)
const activePanel = ref(null)
const fullGuide = ref(null)
const message = ref('')
const error = ref('')
const study = computed(() => findStudy(slug.value) ?? studies[0])
const pathContext = computed(() => pathSessionFor(study.value.slug))
const guide = computed(() => pathContext.value
  ? buildPathMeetingGuide(study.value.slug, duration.value)
  : buildMeetingGuide(study.value, duration.value))
const activePart = computed(() => guide.value.sections[partIndex.value])
const shareUrl = computed(() => publicMeetingUrl(router.resolve({ path: '/em-comunidade', query: meetingQuery(study.value.slug, duration.value) }).href, window.location.href))

watch(() => route.query, query => {
  const next = readMeetingSelection(query)
  slug.value = next.slug
  duration.value = next.duration
  corrected.value = next.corrected
  conducting.value = false
  partIndex.value = 0
  message.value = ''; error.value = ''
})

async function updateSelection() {
  message.value = ''; error.value = ''
  try { await router.replace({ path: '/em-comunidade', query: meetingQuery(slug.value, duration.value) }) }
  catch { error.value = 'Não foi possível atualizar o link. Tente selecionar o roteiro novamente.' }
}
async function start() { message.value = ''; error.value = ''; conducting.value = true; partIndex.value = 0; await nextTick(); activePanel.value?.focus() }
async function go(index) {
  if (index < 0 || index >= guide.value.sections.length) return
  partIndex.value = index
  await nextTick()
  activePanel.value?.focus()
}
async function stop() { conducting.value = false; await nextTick(); fullGuide.value?.focus() }
function selectLink(event) { event.target.select() }
async function copyLink() {
  error.value = ''; message.value = ''
  try { await navigator.clipboard.writeText(shareUrl.value); message.value = 'Link copiado. Ele preserva o estudo e a duração escolhidos.' }
  catch { error.value = 'Não foi possível copiar automaticamente. Selecione o link acima e copie pelo seu dispositivo.' }
}
function download() {
  error.value = ''; message.value = ''
  try { downloadText(guide.value.text, `encontro-${study.value.slug}-${duration.value}min.txt`); message.value = 'Roteiro preparado para download. Você pode compartilhá-lo pelos canais que seu grupo já utiliza.' }
  catch { error.value = 'Não foi possível preparar o arquivo. Você pode usar a opção de impressão.' }
}
function print() { window.print() }
</script>
