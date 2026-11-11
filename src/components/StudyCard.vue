<template>
  <article class="learning-card">
    <p class="eyebrow">{{ study.theme }}</p>
    <h2><router-link :to="`/estudos/${study.slug}`">{{ study.title }}</router-link></h2>
    <p>{{ study.summary }}</p>
    <p class="study-meta">{{ study.reference }} · Cerca de {{ study.minutes }} min</p>
    <router-link :to="`/estudos/${study.slug}`" class="learning-link">Abrir estudo <span aria-hidden="true">→</span></router-link>
  </article>
</template>
<script>
export default { props: { study: { type: Object, required: true } } }
</script>
