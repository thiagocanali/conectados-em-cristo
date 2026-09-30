<template>
  <div class="personalidade-page">
    <div class="pers-card fade-in-up" v-if="!finished">
      <div class="pers-header">
        <p class="eyebrow"><span aria-hidden="true">&#9774;</span> Autoconhecimento</p>
        <h1>Teste de Personalidade</h1>
      </div>

      <p class="prompt" role="heading" aria-level="2">{{ currentPrompt.prompt }}</p>

      <div class="options" role="group" :aria-label="currentPrompt.prompt">
        <button
          v-for="option in prompt_values"
          :key="option.value"
          class="option-btn"
          :class="[selected === option.value ? 'active' : '', option.class]"
          :aria-pressed="selected === option.value"
          @click="select(option.value)"
        >
          {{ option.value }}
        </button>
      </div>

      <div class="progress-bar-container" role="progressbar" :aria-valuenow="currentIndex + 1" :aria-valuemin="1" :aria-valuemax="prompts.length" aria-label="Progresso do teste">
        <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
      </div>

      <div class="pers-actions">
        <button class="btn-primary" :disabled="!selected" @click="next">
          {{ isLast ? 'Enviar' : 'Próxima' }}
        </button>
      </div>
    </div>

    <div class="pers-card fade-in-up" v-if="finished">
      <div class="pers-header">
        <p class="eyebrow"><span aria-hidden="true">&#9774;</span> Resultado</p>
        <h1>Sua Personalidade</h1>
      </div>
      <div class="result-box" aria-live="polite">
        <strong>{{ resultTitle }}</strong>
        <p>{{ resultDescription }}</p>
      </div>
      <div class="pers-actions">
        <button class="btn-secondary" @click="reset">Refazer Teste</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const prompts = [
  { prompt: 'Tenho dificuldade em me apresentar para outras pessoas', weight: -1 },
  { prompt: 'Fico tão perdido em meus pensamentos que ignoro ou esqueço o que está ao meu redor', weight: -1 },
  { prompt: 'Normalmente não inicio conversas', weight: -1 },
  { prompt: 'Prefiro não interagir com pessoas que parecem zangadas ou chateadas', weight: -1 },
  { prompt: 'Escolho meus amigos com cuidado', weight: -1 },
  { prompt: 'Tenho dificuldade em contar histórias sobre mim mesmo', weight: -1 },
  { prompt: 'Normalmente sou muito motivado e energético', weight: 1 },
  { prompt: 'Acho fácil me aproximar de um grupo de pessoas e participar da conversa', weight: 1 },
  { prompt: 'Ser adaptável é mais importante do que ser organizado', weight: 1 },
  { prompt: 'Me importo mais em não deixar ninguém chateado do que em ganhar um debate', weight: 1 },
  { prompt: 'Frequentemente não sinto necessidade de me justificar com os outros', weight: 1 },
  { prompt: 'Prefiro improvisar do que gastar tempo elaborando um plano detalhado', weight: 1 }
]

const prompt_values = [
  { value: 'Concordo Fortemente', class: 'opt-strong-agree', weight: 5 },
  { value: 'Concordo', class: 'opt-agree', weight: 3 },
  { value: 'Neutro', class: 'opt-neutral', weight: 0 },
  { value: 'Discordo', class: 'opt-disagree', weight: -3 },
  { value: 'Discordo Fortemente', class: 'opt-strong-disagree', weight: -5 }
]

const currentIndex = ref(0)
const selected = ref(null)
const answers = ref([])
const finished = ref(false)
const resultTitle = ref('')
const resultDescription = ref('')

const currentPrompt = computed(() => prompts[currentIndex.value])
const isLast = computed(() => currentIndex.value === prompts.length - 1)
const progress = computed(() => ((currentIndex.value + 1) / prompts.length) * 100)

function select(value) { selected.value = value }

function next() {
  answers.value.push(selected.value)
  selected.value = null
  if (isLast.value) {
    calculateResult()
    finished.value = true
  } else {
    currentIndex.value++
  }
}

function calculateResult() {
  let total = 0
  answers.value.forEach((val, i) => {
    if (val) {
      const option = prompt_values.find(o => o.value === val)
      total += option.weight * prompts[i].weight
    }
  })
  if (total < 0) {
    resultTitle.value = 'Você é introvertido!'
    resultDescription.value = 'Introvertidos gostam de pensar antes de falar, preferem grupos pequenos de amigos e precisam de tempo sozinhos para recarregar energia.'
  } else if (total > 0) {
    resultTitle.value = 'Você é extrovertido!'
    resultDescription.value = 'Extrovertidos se energizam ao estar com outras pessoas e gostam de socializar para recarregar suas energias.'
  } else {
    resultTitle.value = 'Você é ambivertido!'
    resultDescription.value = 'Ambivertidos apresentam características de introversão e extroversão, equilibrando socialização e tempo sozinho.'
  }
}

function reset() {
  currentIndex.value = 0
  selected.value = null
  answers.value = []
  finished.value = false
  resultTitle.value = ''
  resultDescription.value = ''
}
</script>

<style scoped>
.personalidade-page {
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 140px);
  padding: 48px 24px;
  background: var(--cream);
}
.pers-card {
  background: var(--cream-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  max-width: 580px;
  width: 100%;
  padding: 40px 32px;
}

.pers-header { margin-bottom: 28px; }
.pers-header h1 { font-size: clamp(1.6rem, 4vw, 2.2rem); margin: 12px 0 0; }

.prompt {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ink);
  text-align: left;
  margin-bottom: 18px;
  line-height: 1.5;
}

.options { display: flex; flex-direction: column; gap: 8px; }

.option-btn {
  width: 100%;
  padding: 13px 16px;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: transform var(--t-fast), box-shadow var(--t-fast);
}
.option-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}
.option-btn.active {
  box-shadow: inset 0 0 0 2px var(--terra);
}

.opt-strong-agree { background: var(--success-bg); color: var(--success); }
.opt-agree { background: #e8f0ea; color: var(--green-deep); }
.opt-neutral { background: var(--cream-dark); color: var(--text-dark); }
.opt-disagree { background: #f5e6e4; color: #a04038; }
.opt-strong-disagree { background: var(--error-bg); color: var(--error); }

.progress-bar-container {
  width: 100%;
  height: 6px;
  background: var(--cream-dark);
  border-radius: 10px;
  margin: 20px 0;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--terra), var(--terra-light));
  border-radius: 10px;
  transition: width 0.3s var(--ease);
}

.pers-actions { display: flex; gap: 14px; justify-content: center; }
.pers-actions button { min-height: 48px; }

.result-box {
  text-align: left;
  line-height: 1.7;
  font-size: 0.98rem;
  color: var(--text-body);
  background: var(--cream);
  border-radius: var(--radius-md);
  padding: 24px;
  margin-bottom: 20px;
}
.result-box strong {
  display: block;
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 12px;
}
.result-box p { line-height: inherit; }

@media (max-width: 480px) {
  .pers-card { padding: 32px 22px; }
  .pers-actions { flex-direction: column; }
}
</style>
