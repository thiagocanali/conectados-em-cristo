<template>
  <div class="learning-page page-narrow">
    <template v-if="study">
      <router-link to="/estudos" class="learning-link">← Todos os estudos</router-link>
      <header class="learning-header"><p class="eyebrow">{{ study.theme }}</p><h1>{{ study.title }}</h1><p>{{ study.summary }}</p><p class="study-meta">{{ study.reference }} · Cerca de {{ study.minutes }} min</p></header>
      <nav class="learning-filters" aria-label="Etapas do estudo"><button v-for="(label, index) in labels" :key="label" class="btn-secondary" :aria-current="step === index ? 'step' : undefined" @click="step = index">{{ index + 1 }}. {{ label }}</button></nav>
      <section ref="section" class="learning-panel" tabindex="-1" aria-labelledby="step-title">
        <template v-if="step === 0"><h2 id="step-title">Leia a passagem no seu contexto</h2><p>{{ study.context }}</p><a :href="passageUrl(study)" target="_blank" rel="noopener noreferrer" class="btn-primary">Ler {{ study.reference }} <span class="study-meta">(site externo, nova aba)</span></a><p>Você também pode abrir a passagem na Bíblia que costuma usar.</p><p>{{ study.observation }}</p></template>
        <template v-else-if="step === 1"><h2 id="step-title">Observe, pergunte e converse</h2><ol class="learning-questions"><li v-for="question in study.questions" :key="question">{{ question }}</li></ol><p>Se estiver em grupo, deem espaço para ouvir. É permitido ter dúvidas e preferir não responder.</p></template>
        <template v-else><h2 id="step-title">Leve a leitura para a vida</h2><p>{{ study.practice }}</p><h3>Uma sugestão de oração</h3><p>{{ study.prayer }}</p><p>Use suas próprias palavras. A proposta é responder ao texto com sinceridade.</p><router-link :to="`/em-comunidade?estudo=${study.slug}`" class="btn-primary">Preparar este estudo para um grupo</router-link></template>
      </section>
      <div class="learning-actions"><button v-if="step > 0" class="btn-secondary" @click="go(step - 1)">Etapa anterior</button><button v-if="step < 2" class="btn-primary" @click="go(step + 1)">{{ step === 0 ? 'Ir para as perguntas' : 'Ir para a prática' }}</button><router-link v-else to="/estudos" class="learning-link">Escolher outro estudo →</router-link></div>
      <p class="study-meta">Estude no seu ritmo e retome o texto sempre que precisar. Você não precisa criar uma conta para usar este guia.</p>
    </template>
    <template v-else><h1>Estudo não encontrado</h1><p>Escolha um dos guias disponíveis na biblioteca.</p><router-link to="/estudos" class="btn-primary">Ver estudos</router-link></template>
  </div>
</template>
<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findStudy, passageUrl } from '@/data/studies.mjs'
const route = useRoute()
const study = computed(() => findStudy(route.params.slug))
const labels = ['Ler', 'Conversar', 'Praticar']
const step = ref(0)
const section = ref(null)
watch(() => route.params.slug, () => { step.value = 0 })
async function go(index) { step.value = index; await nextTick(); section.value?.focus() }
</script>
