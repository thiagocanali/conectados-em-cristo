<template>
  <div class="page-container">
    <div class="card">
      <h1>Teste de Personalidade</h1>

      <!-- Quiz -->
      <div v-if="!finished">
        <!-- Pergunta atual -->
        <p class="prompt">{{ currentPrompt.prompt }}</p>

        <!-- Opções empilhadas -->
        <div class="btn-vertical-group">
          <button
            v-for="option in prompt_values"
            :key="option.value"
            class="btn btn-block"
            :class="[selected === option.value ? 'active' : '', option.class]"
            @click="select(option.value)"
          >
            {{ option.value }}
          </button>
        </div>

        <!-- Barra de progresso -->
        <div class="progress-bar-container">
          <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
        </div>

        <!-- Botão Próxima/Enviar -->
        <div class="buttons">
          <button
            class="btn btn-primary"
            :disabled="!selected"
            @click="next"
          >
            {{ isLast ? 'Enviar' : 'Próxima' }}
          </button>
        </div>
      </div>

      <!-- Resultados -->
      <div v-if="finished" class="results">
        <p v-html="resultText"></p>
        <div class="buttons">
          <button class="btn btn-secondary" @click="reset">Refazer Teste</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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
  { prompt: 'Freqüentemente não sinto necessidade de me justificar com os outros', weight: 1 },
  { prompt: 'Prefiro improvisar do que gastar tempo elaborando um plano detalhado', weight: 1 }
];

const prompt_values = [
  { value: 'Concordo Fortemente', class: 'btn-strongly-agree', weight: 5 },
  { value: 'Concordo', class: 'btn-agree', weight: 3 },
  { value: 'Neutro', class: 'btn-neutral', weight: 0 },
  { value: 'Discordo', class: 'btn-disagree', weight: -3 },
  { value: 'Discordo Fortemente', class: 'btn-strongly-disagree', weight: -5 }
];

const currentIndex = ref(0);
const selected = ref(null);
const answers = ref([]);
const finished = ref(false);
const resultText = ref('');

const currentPrompt = computed(() => prompts[currentIndex.value]);
const isLast = computed(() => currentIndex.value === prompts.length - 1);
const progress = computed(() => ((currentIndex.value) / prompts.length) * 100);

function select(value) {
  selected.value = value;
}

function next() {
  answers.value.push(selected.value);
  selected.value = null;

  if (isLast.value) {
    calculateResult();
    finished.value = true;
  } else {
    currentIndex.value++;
  }
}

function calculateResult() {
  let total = 0;
  answers.value.forEach((val, i) => {
    if (val) {
      const option = prompt_values.find(o => o.value === val);
      total += option.weight * prompts[i].weight;
    }
  });

  if(total < 0) {
    resultText.value = `<b>Você é introvertido!</b><br><br>
      Introvertidos gostam de pensar antes de falar, preferem grupos pequenos de amigos e precisam de tempo sozinhos para recarregar energia.`;
  } else if(total > 0) {
    resultText.value = `<b>Você é extrovertido!</b><br><br>
      Extrovertidos se energizam ao estar com outras pessoas e gostam de socializar para recarregar suas energias.`;
  } else {
    resultText.value = `<b>Você é ambivertido!</b><br><br>
      Ambivertidos apresentam características de introversão e extroversão, equilibrando socialização e tempo sozinho.`;
  }
}

function reset() {
  currentIndex.value = 0;
  selected.value = null;
  answers.value = [];
  finished.value = false;
  resultText.value = '';
}
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  background: white;
  padding: 30px 25px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

h1 {
  font-size: clamp(1.8rem, 4vw, 2.2rem);
  margin-bottom: 25px;
  color: #1a202c;
}

.prompt {
  font-size: 1.1rem;
  margin-bottom: 15px;
  font-weight: 500;
  text-align: left;
}

/* Opções empilhadas verticalmente */
.btn-vertical-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-block {
  width: 100%;
}

.btn {
  padding: 12px 15px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn.active {
  box-shadow: inset 0 0 0 2px #3182ce;
}

/* Cores */
.btn-strongly-agree { background-color: #89d298; color: white; }
.btn-agree { background-color: #c6f1c6; color: #1a202c; }
.btn-neutral { background-color: #e2e8f0; color: #1a202c; }
.btn-disagree { background-color: #f6b8b8; color: #1a202c; }
.btn-strongly-disagree { background-color: #e28181; color: white; }

.buttons {
  margin-top: 20px;
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-primary { background-color: #3182ce; color: white; }
.btn-primary:hover { background-color: #2b6cb0; }

.btn-secondary { background-color: #48bb78; color: white; }
.btn-secondary:hover { background-color: #38a169; }

/* Barra de progresso */
.progress-bar-container {
  width: 100%;
  height: 10px;
  background-color: #e2e8f0;
  border-radius: 5px;
  margin: 15px 0;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: #3182ce;
  width: 0%;
  transition: width 0.3s ease;
}

.results {
  text-align: left;
  line-height: 1.6;
  margin-top: 20px;
}
</style>
