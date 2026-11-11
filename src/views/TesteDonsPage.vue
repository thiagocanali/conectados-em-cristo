<template>
    <div id="app-container">

        <p v-if="error" role="alert">{{ error }}</p>

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
                <div class="progress" role="progressbar" :aria-valuenow="currentQuestionIndex + 1" :aria-valuemin="1" :aria-valuemax="totalQuestions" aria-label="Progresso do teste">
                    <div class="progress-bar" aria-hidden="true" :style="{ width: progress + '%' }"></div>
                </div>

                <p class="counter">
                    Pergunta {{ currentQuestionIndex + 1 }} de {{ totalQuestions }}
                </p>

                <div class="question-card">
                    {{ currentQuestion.text }}
                </div>

                <div class="answers" role="group" :aria-label="currentQuestion.text">
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
                    <article v-for="gift in giftsList" :key="gift.key" class="gift">
                        <button class="gift-toggle" type="button" @click="toggleGift(gift.key)" :aria-expanded="Boolean(openGifts[gift.key])" :aria-controls="`gift-${gift.key}`">
                            <span class="gift-header">
                                <strong>{{ gift.name }}</strong>
                                <span v-if="!libraryMode">
                                    {{ gift.score }} / {{ gift.max }}
                                </span>
                            </span>
                        </button>

                        <ul v-show="openGifts[gift.key]" :id="`gift-${gift.key}`">
                            <li v-for="alt in gift.alternatives" :key="alt">
                                {{ alt }}
                            </li>
                        </ul>
                    </article>
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
import { createDonsProgressStore, nextDonsAnswer } from "@/services/donsProgress.mjs";
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
            savedProgress: null,
            error: "",
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
            return ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
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
            return Boolean(this.savedProgress && !this.savedProgress.finished);
        },
        hasSavedResults() {
            return Boolean(this.savedProgress?.finished);
        },
        savedIndex() {
            return this.savedProgress?.index ?? 0;
        }
    },
    methods: {
        progressStore() {
            return createDonsProgressStore(this.questions, Object.keys(this.gifts));
        },
        showStorageError(reason) {
            if (reason === 'invalid-data') this.error = 'O progresso salvo é inválido. Inicie um novo teste para substituí-lo.';
            else if (reason === 'no-session') this.error = 'A sessão demonstrativa não está disponível. Entre novamente.';
            else if (reason === 'rollback-failed') this.error = 'Não foi possível restaurar todos os dados. Recarregue a página e confira o progresso.';
            else this.error = 'Não foi possível gravar ou recuperar o progresso. Verifique o armazenamento do navegador e tente novamente.';
        },
        refreshProgress() {
            const result = this.progressStore().load();
            if (!result.ok) {
                this.savedProgress = null;
                this.showStorageError(result.reason);
                return null;
            }
            this.savedProgress = result.progress;
            return result.progress;
        },
        initScores() {
            Object.keys(this.gifts).forEach(key => {
                this.scores[key] = 0;
                this.openGifts[key] = false;
            });
        },
        toggleGift(key) {
            this.openGifts[key] = !this.openGifts[key];
        },
        startNewGame() {
            if (!confirm("Deseja iniciar um novo teste?")) return;
            const progress = { index: 0, scores: Object.fromEntries(Object.keys(this.gifts).map(key => [key, 0])), finished: false };
            const result = this.progressStore().save(progress);
            if (!result.ok) { this.showStorageError(result.reason); return; }
            this.error = '';
            this.savedProgress = progress;
            this.initScores();
            this.currentQuestionIndex = 0;
            this.libraryMode = false;
            this.screen = "test";
        },
        continueGame() {
            this.error = '';
            const progress = this.refreshProgress();
            if (!progress || progress.finished) {
                if (!this.error) this.error = "Não foi possível recuperar o progresso salvo. Inicie um novo teste.";
                return;
            }

            this.scores = { ...progress.scores };
            this.currentQuestionIndex = progress.index;
            this.screen = "test";
        },
        answer(value) {
            if (this.screen !== 'test') return;
            const progress = nextDonsAnswer({ index: this.currentQuestionIndex, scores: this.scores, finished: false }, value, this.questions);
            if (!progress) return;
            const result = this.progressStore().save(progress);
            if (!result.ok) { this.showStorageError(result.reason); return; }
            this.error = '';
            this.savedProgress = progress;
            this.scores = { ...progress.scores };
            this.currentQuestionIndex = progress.index;
            this.screen = progress.finished ? 'results'
                : progress.index % 10 === 0 ? 'interstitial' : 'test';
        },
        restart() {
            if (!confirm("Apagar todos os dados deste teste?")) return;
            const result = this.progressStore().remove();
            if (!result.ok) { this.showStorageError(result.reason); return; }
            this.error = '';
            this.savedProgress = null;
            this.initScores();
            this.currentQuestionIndex = 0;
            this.libraryMode = false;
            this.screen = "welcome";
        },
        showLibrary() {
            this.libraryMode = true;
            this.initScores();
            this.screen = "results";
        },
        viewSavedResults() {
            this.error = '';
            const progress = this.refreshProgress();
            if (!progress || !progress.finished) {
                if (!this.error) this.error = "Não foi possível recuperar os resultados salvos.";
                return;
            }

            this.scores = { ...progress.scores };
            this.screen = "results";
        },
        goToWelcome() {
            this.error = '';
            this.refreshProgress();
            this.libraryMode = false;
            this.screen = "welcome";
        }
    },
    mounted() {
        this.initScores();

        this.refreshProgress();
    }
};
</script>
