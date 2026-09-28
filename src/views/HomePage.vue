<template>
  <main class="home">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span aria-hidden="true">✦</span> Uma comunidade com propósito</p>
        <h1 id="hero-title">Relacionamentos que começam pela <em>fé.</em></h1>
        <p class="hero-text">
          Conheça pessoas cristãs que também desejam construir uma história séria, com respeito, maturidade e Cristo no centro.
        </p>
        <div class="actions">
          <router-link to="/cadastro" class="primary-button">Começar agora <span aria-hidden="true">→</span></router-link>
          <router-link to="/login" class="text-link">Já tenho uma conta</router-link>
        </div>
        <p class="trust-note"><span aria-hidden="true">✓</span> Feito para maiores de 18 anos · Privacidade em primeiro lugar</p>
      </div>

      <div class="hero-art" aria-label="Ilustração de uma comunidade conectada pela fé">
        <div class="sun-glow"></div>
        <div class="arch">
          <div class="cross" aria-hidden="true"><span></span><i></i></div>
          <p class="verse">“A tua palavra é lâmpada para os meus pés e luz para o meu caminho.”</p>
          <span class="reference">Salmos 119:105</span>
        </div>
        <div class="spark spark-one" aria-hidden="true">✦</div>
        <div class="spark spark-two" aria-hidden="true">·</div>
      </div>
    </section>

    <section class="values" aria-labelledby="values-title">
      <div class="section-heading">
        <p class="eyebrow">Mais do que conhecer alguém</p>
        <h2 id="values-title">Uma jornada feita com intenção</h2>
      </div>
      <div class="value-grid">
        <article class="value-card"><span class="value-number">01</span><h3>Conhecer</h3><p>Perfis que mostram valores, fé e a pessoa por trás da primeira impressão.</p></article>
        <article class="value-card"><span class="value-number">02</span><h3>Compreender</h3><p>Perguntas e compatibilidades para conversas mais profundas e verdadeiras.</p></article>
        <article class="value-card"><span class="value-number">03</span><h3>Discernir</h3><p>Um espaço seguro para seguir no seu tempo, com clareza e propósito.</p></article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home { min-height: calc(100vh - 68px); background: #f8f6f1; color: #24352e; }
.hero { max-width: 1180px; min-height: 600px; margin: 0 auto; padding: 88px 32px 72px; display: grid; grid-template-columns: 1.05fr .95fr; align-items: center; gap: 48px; }
.hero-copy { max-width: 570px; }
.eyebrow { color: #b06d43; text-transform: uppercase; letter-spacing: .16em; font-size: .72rem; font-weight: 800; margin: 0 0 22px; }
.eyebrow span { font-size: .95rem; margin-right: 7px; }
h1 { font-family: Georgia, serif; font-size: clamp(3.3rem, 7vw, 6rem); line-height: .98; letter-spacing: -.055em; font-weight: 500; margin: 0; color: #20352c; }
h1 em { color: #b06d43; font-style: italic; }
.hero-text { max-width: 475px; color: #637069; font-size: 1.08rem; line-height: 1.7; margin: 28px 0 30px; }
.actions { display: flex; align-items: center; gap: 25px; flex-wrap: wrap; }
.primary-button { display: inline-flex; align-items: center; gap: 18px; background: #b06d43; color: white; padding: 15px 21px; border-radius: 4px; text-decoration: none; font-weight: 700; box-shadow: 0 10px 24px rgba(176,109,67,.2); transition: transform .2s, background .2s; }
.primary-button:hover { background: #955638; transform: translateY(-2px); }
.primary-button span { font-size: 1.25rem; }
.text-link { color: #496257; font-size: .9rem; font-weight: 700; text-decoration: none; border-bottom: 1px solid #b6c0b8; padding-bottom: 4px; }
.trust-note { color: #8a938c; font-size: .72rem; margin-top: 54px; }
.trust-note span { color: #b06d43; font-weight: 800; margin-right: 6px; }
.hero-art { min-height: 410px; position: relative; display: grid; place-items: center; }
.sun-glow { position: absolute; width: 320px; height: 320px; border-radius: 50%; background: #e8cfae; opacity: .55; filter: blur(1px); }
.arch { position: relative; width: min(330px, 80%); min-height: 382px; border: 1px solid rgba(176,109,67,.45); border-bottom: 0; border-radius: 170px 170px 0 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 0 38px 54px; text-align: center; background: linear-gradient(180deg, rgba(248,246,241,.1), rgba(248,246,241,.5)); }
.cross { position: absolute; top: 76px; width: 42px; height: 68px; }
.cross span { position: absolute; left: 17px; width: 8px; height: 68px; background: #b06d43; border-radius: 2px; }
.cross i { position: absolute; top: 17px; left: 0; width: 42px; height: 8px; background: #b06d43; border-radius: 2px; }
.verse { font-family: Georgia, serif; font-size: 1.15rem; line-height: 1.55; color: #496257; margin: 0 0 15px; }
.reference { color: #b06d43; font-size: .72rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.spark { position: absolute; color: #b06d43; font-size: 2rem; }
.spark-one { top: 38px; right: 14%; }.spark-two { bottom: 42px; left: 10%; font-size: 4rem; }
.values { max-width: 1180px; margin: 0 auto; padding: 66px 32px 92px; border-top: 1px solid #e3e0d8; }
.section-heading h2 { font-family: Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 500; letter-spacing: -.04em; margin: 0; }
.section-heading .eyebrow { margin-bottom: 12px; }.value-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 42px; }
.value-card { border-top: 2px solid #d7ad8a; padding: 19px 4px; }.value-number { color: #b06d43; font-size: .75rem; font-weight: 800; }.value-card h3 { font-family: Georgia, serif; font-size: 1.5rem; margin: 22px 0 9px; }.value-card p { color: #68756e; line-height: 1.6; font-size: .92rem; max-width: 280px; }
@media (max-width: 760px) { .hero { grid-template-columns: 1fr; padding-top: 62px; }.hero-art { min-height: 360px; order: -1; }.arch { min-height: 330px; }.cross { top: 58px; }.trust-note { margin-top: 36px; }.value-grid { grid-template-columns: 1fr; gap: 10px; } }
@media (max-width: 420px) { .hero, .values { padding-left: 22px; padding-right: 22px; } h1 { font-size: 3.2rem; }.actions { align-items: flex-start; flex-direction: column; gap: 17px; } }
</style>
