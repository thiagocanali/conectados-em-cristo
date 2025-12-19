<template>
    <div id="app-container">

        <!-- BOAS-VINDAS -->
        <transition name="fade-slide">
            <section v-if="screen === 'welcome'" class="screen active">
                <h1>Teste de Dons Espirituais</h1>
                <p>Responda com sinceridade e descubra como servir melhor.</p>

                <button v-if="hasSavedProgress" class="btn-primary warning" @click="continueGame">
                    Continuar (Pergunta {{ savedIndex + 1 }})
                </button>

                <button v-if="hasSavedResults" class="btn-primary" @click="viewSavedResults">
                    Ver resultados anteriores
                </button>

                <button class="btn-primary" @click="startNewGame">
                    Começar novo teste
                </button>

                <button class="btn-secondary" @click="showLibrary">
                    Biblioteca de dons
                </button>
            </section>
        </transition>

        <!-- TESTE -->
        <transition name="fade-slide">
            <section v-if="screen === 'test' && currentQuestion" class="screen active">
                <div class="progress">
                    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
                </div>

                <p class="counter">
                    Pergunta {{ currentQuestionIndex + 1 }} de {{ totalQuestions }}
                </p>

                <div class="question-card">
                    {{ currentQuestion.text }}
                </div>

                <div class="answers">
                    <button @click="answer(4)">Muito</button>
                    <button @click="answer(2)">Às vezes</button>
                    <button @click="answer(1)">Raramente</button>
                    <button @click="answer(0)">Nunca</button>
                </div>
            </section>
        </transition>

        <!-- INTERSTICIAL -->
        <transition name="fade-slide">
            <section v-if="screen === 'interstitial'" class="screen active">
                <div class="question-card">
                    <h2>Você sabia?</h2>
                    <p>{{ currentCuriosity }}</p>
                    <button class="btn-primary" @click="screen = 'test'">
                        Continuar
                    </button>
                </div>
            </section>
        </transition>

        <!-- RESULTADOS / BIBLIOTECA -->
        <transition name="fade-slide">
            <section v-if="screen === 'results'" class="screen active">
                <button class="btn-secondary back" @click="goToWelcome">
                    ← Voltar
                </button>

                <h1>{{ libraryMode ? 'Biblioteca de Dons' : 'Resultados' }}</h1>

                <div class="grid">
                    <div v-for="gift in giftsList" :key="gift.key" class="gift" @click="toggleGift(gift.key)">
                        <div class="gift-header">
                            <strong>{{ gift.name }}</strong>
                            <span v-if="!libraryMode">
                                {{ gift.score }} / {{ gift.max }}
                            </span>
                        </div>

                        <ul v-if="openGifts[gift.key]">
                            <li v-for="alt in gift.alternatives" :key="alt">
                                {{ alt }}
                            </li>
                        </ul>
                    </div>
                </div>

                <button v-if="!libraryMode" class="btn-secondary" @click="restart">
                    Apagar tudo e refazer
                </button>
            </section>
        </transition>

    </div>
</template>

<script>
import testeDonsData from "@/data/testeDonsData";
import "@/assets/css/testeDons.css";

export default {
    name: "TesteDonsPage",
    data() {
        return {
            screen: "welcome",
            libraryMode: false,
            currentQuestionIndex: 0,
            scores: {},
            openGifts: {},
            ...testeDonsData
        };
    },
    computed: {
        totalQuestions() {
            return this.questions.length;
        },
        currentQuestion() {
            return this.questions[this.currentQuestionIndex] || null;
        },
        progress() {
            return (this.currentQuestionIndex / this.totalQuestions) * 100;
        },
        currentCuriosity() {
            return this.curiosities[
                Math.floor(this.currentQuestionIndex / 10) % this.curiosities.length
            ];
        },
        giftsList() {
            return Object.keys(this.gifts).map(key => ({
                key,
                name: this.gifts[key].name,
                alternatives: this.gifts[key].alternatives,
                score: this.scores[key] || 0,
                max: this.gifts[key].questions.length * 4
            }));
        },
        hasSavedProgress() {
            return !!localStorage.getItem("testeDonsProgress");
        },
        hasSavedResults() {
            const p = JSON.parse(localStorage.getItem("testeDonsProgress") || "{}");
            return p.finished;
        },
        savedIndex() {
            const p = JSON.parse(localStorage.getItem("testeDonsProgress") || "{}");
            return p.index || 0;
        }
    },
    methods: {
        initScores() {
            Object.keys(this.gifts).forEach(key => {
                this.scores[key] = 0;
                this.openGifts[key] = false;
            });
        },
        toggleGift(key) {
            this.openGifts[key] = !this.openGifts[key];
        },
        save(finished = false) {
            localStorage.setItem(
                "testeDonsProgress",
                JSON.stringify({
                    index: this.currentQuestionIndex,
                    scores: this.scores,
                    finished
                })
            );
        },
        startNewGame() {
            if (!confirm("Deseja iniciar um novo teste?")) return;
            localStorage.removeItem("testeDonsProgress");
            this.initScores();
            this.currentQuestionIndex = 0;
            this.screen = "test";
        },
        continueGame() {
            const p = JSON.parse(localStorage.getItem("testeDonsProgress"));
            this.scores = p.scores;
            this.currentQuestionIndex = p.index;
            this.screen = "test";
        },
        answer(value) {
            const question = this.currentQuestion;
            if (!question || !question.gift) {
                this.save(true);
                this.screen = "results";
                return;
            }

            this.scores[question.gift] += value;

            if (this.currentQuestionIndex < this.totalQuestions - 1) {
                this.currentQuestionIndex++;
            } else {
                this.save(true);
                this.screen = "results";
                return;
            }

            this.save();

            if (this.currentQuestionIndex % 10 === 0 && this.currentQuestionIndex < this.totalQuestions) {
                this.screen = "interstitial";
            } else {
                this.screen = "test";
            }
        },
        restart() {
            if (confirm("Apagar todos os dados?")) {
                // 1. Remove o progresso
                localStorage.removeItem("testeDonsProgress");

                // 2. Reinicializa o estado interno
                this.initScores();
                this.currentQuestionIndex = 0;

                // 3. Força que a tela de boas-vindas seja exibida corretamente
                this.libraryMode = false;
                this.screen = "welcome";

                // 4. Pequeno truque para forçar reavaliação das computed properties
                this.$nextTick(() => {
                    // nada específico aqui, só garantir que Vue reavalie
                });
            }
        },
        showLibrary() {
            this.libraryMode = true;
            this.initScores();
            this.screen = "results";
        },
        viewSavedResults() {
            const p = JSON.parse(localStorage.getItem("testeDonsProgress"));
            this.scores = p.scores;
            this.screen = "results";
        },
        goToWelcome() {
            this.libraryMode = false;
            this.screen = "welcome";
        }
    },
    mounted() {
        this.initScores();

        // Garantir que todas as perguntas tenham gift definido
        this.questions = this.questions.map((q, idx) => ({
            text: q.text,
            gift: q.gift || Object.keys(this.gifts)[idx % Object.keys(this.gifts).length]
        }));
    }
};
</script>
