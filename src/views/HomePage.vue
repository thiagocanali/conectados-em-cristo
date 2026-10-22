<template>
  <main class="home">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy fade-in-up">
        <p class="eyebrow"><span aria-hidden="true">✦</span> Relações com propósito</p>
        <h1 id="hero-title">A sua história pode começar com <em>fé.</em></h1>
        <p class="hero-text">Uma comunidade para cristãos que desejam conhecer alguém com intenção, respeito e Cristo no centro.</p>
        <div class="actions">
          <router-link to="/cadastro" class="btn-primary">Começar minha jornada <span aria-hidden="true">→</span></router-link>
          <router-link to="/login" class="text-link">Já tenho uma conta</router-link>
        </div>
        <div class="hero-proof" aria-label="Informações de confiança">
          <div class="avatar-stack" aria-hidden="true"><span>R</span><span>M</span><span>A</span><span>+</span></div>
          <p><strong>Comunidade que cresce com propósito</strong><br>Feito para maiores de 18 anos</p>
        </div>
      </div>
      <div class="hero-visual fade-in-up" aria-label="Versículo sobre relacionamentos e propósito">
        <div class="visual-orbit orbit-one"></div><div class="visual-orbit orbit-two"></div>
        <div class="profile-card card-back"><span class="mini-avatar">L</span><strong>Larissa, 28</strong><small>São Paulo · 92% alinhamento</small></div>
        <div class="scripture-card">
          <span class="scripture-mark" aria-hidden="true">“</span>
          <p>Melhor serem dois do que um, porque maior é a recompensa do trabalho de duas pessoas.</p>
          <small>ECLESIASTES 4:9</small>
        </div>
        <div class="profile-card card-front"><span class="mini-avatar avatar-green">D</span><strong>Daniel, 31</strong><small>Minas Gerais · 88% alinhamento</small><span class="verified">✓ Verificado</span></div>
        <span class="visual-star star-one" aria-hidden="true">✦</span><span class="visual-star star-two" aria-hidden="true">✦</span>
      </div>
    </section>

    <section class="intro-strip" aria-label="O que torna a comunidade especial">
      <p>Uma forma mais consciente de se conectar</p><span></span><p>Sem pressa. Sem jogos. Com propósito.</p>
    </section>

    <section class="values" aria-labelledby="values-title">
      <div class="section-heading"><p class="eyebrow">Um caminho diferente</p><h2 id="values-title">Conhecer alguém é mais do que um match.</h2><p class="heading-copy">Criamos cada parte da experiência para que você possa conversar com profundidade e discernir com tranquilidade.</p></div>
      <div class="value-grid">
        <article class="value-card"><span class="value-number">01</span><div><h3>Conhecer de verdade</h3><p>Perfis que mostram fé, valores e a pessoa por trás da primeira impressão.</p></div></article>
        <article class="value-card"><span class="value-number">02</span><div><h3>Conversar com intenção</h3><p>Perguntas e interesses em comum que abrem espaço para boas conversas.</p></div></article>
        <article class="value-card"><span class="value-number">03</span><div><h3>Discernir no seu tempo</h3><p>Sem swipe ansioso. Você decide os próximos passos com liberdade e clareza.</p></div></article>
      </div>
    </section>

    <section class="features" aria-labelledby="features-title">
      <div class="section-heading center"><p class="eyebrow">Tudo começa por você</p><h2 id="features-title">Uma jornada pensada para conexões reais</h2></div>
      <div class="feature-grid">
        <article class="feature-card feature-highlight"><span class="feature-icon">◎</span><h3>Seu perfil, sua história</h3><p>Compartilhe o que importa: sua fé, seus sonhos, seu jeito de viver e o que procura.</p><router-link to="/cadastro" class="card-link">Criar meu perfil <span aria-hidden="true">→</span></router-link></article>
        <article class="feature-card"><span class="feature-icon">◇</span><h3>Compatibilidade genuína</h3><p>Encontre pontos de alinhamento que ajudam a começar conversas honestas.</p></article>
        <article class="feature-card"><span class="feature-icon">♡</span><h3>Segurança primeiro</h3><p>Verificação, privacidade por padrão e ferramentas para você se sentir seguro.</p></article>
      </div>
    </section>

    <section class="security-banner" aria-labelledby="security-title"><div class="security-inner"><div class="security-content"><p class="eyebrow light">Construído com cuidado</p><h2 id="security-title">A fé também está nos detalhes.</h2><p class="security-text">Você merece um espaço que respeite sua história. Por isso, transparência, segurança e moderação fazem parte da nossa base.</p><ul class="security-list"><li><span>✓</span> Privacidade por padrão</li><li><span>✓</span> E-mail verificado</li><li><span>✓</span> Bloqueio e denúncia</li><li><span>✓</span> Moderação ativa</li></ul></div><div class="security-seal" aria-hidden="true"><span>✦</span><strong>CRISTO<br>NO CENTRO</strong><small>desde o primeiro passo</small></div></div></section>

    <section class="faq" aria-labelledby="faq-title"><div class="section-heading center"><p class="eyebrow">Ainda ficou alguma dúvida?</p><h2 id="faq-title">Perguntas frequentes</h2></div><div class="faq-list"><details v-for="(item, i) in faqItems" :key="i" class="faq-item"><summary>{{ item.q }}</summary><p>{{ item.a }}</p></details></div></section>

    <section class="cta"><div class="cta-inner"><span class="cta-cross" aria-hidden="true">✝</span><p class="eyebrow">O próximo capítulo começa aqui</p><h2>Abra espaço para uma história com propósito.</h2><p>Crie seu perfil gratuitamente e dê o primeiro passo.</p><router-link to="/cadastro" class="btn-primary cta-btn">Começar agora <span aria-hidden="true">→</span></router-link></div></section>
  </main>
</template>

<script setup>
const faqItems = [
  { q: 'O Conectados em Cristo é gratuito?', a: 'Sim. Cadastro, perfil, questionário e descoberta são gratuitos. Segurança nunca será bloqueada por pagamento.' },
  { q: 'Quem pode usar a plataforma?', a: 'Cristãos solteiros com 18 anos ou mais que buscam relacionamentos sérios e com propósito.' },
  { q: 'É como um aplicativo de namoro comum?', a: 'Não. O foco é conhecer, compreender e discernir antes de decidir. Perfis são detalhados e a compatibilidade vai além da aparência.' },
  { q: 'Minhas informações estão seguras?', a: 'Privacidade é prioridade. Você controla o que aparece no seu perfil e informações sensíveis não são expostas.' },
  { q: 'Posso bloquear ou denunciar alguém?', a: 'Sim. Todo perfil pode ser bloqueado ou denunciado a qualquer momento. Nossa equipe analisa cada denúncia.' }
]
</script>

<style scoped>
.home { background: var(--cream); color: var(--ink); overflow: hidden; }
.hero { max-width: 1240px; min-height: 650px; margin: 0 auto; padding: 92px 40px 80px; display: grid; grid-template-columns: 1.02fr .98fr; align-items: center; gap: 40px; }
.hero-copy { max-width: 580px; }
h1 { font-family: var(--font-serif); font-size: clamp(3.4rem, 7vw, 6.3rem); line-height: .91; letter-spacing: -.06em; font-weight: 500; margin: 0; color: var(--ink); }
h1 em { color: var(--terra); font-style: italic; }
.hero-text { max-width: 470px; color: var(--text-body); font-size: 1.08rem; line-height: 1.75; margin: 30px 0; }
.actions { display: flex; align-items: center; gap: 26px; flex-wrap: wrap; }.text-link { color: var(--text-dark); font-size: .88rem; font-weight: 700; border-bottom: 1px solid var(--border); padding-bottom: 4px; }.text-link:hover { color: var(--terra); border-color: var(--terra); }
.hero-proof { display: flex; align-items: center; gap: 13px; margin-top: 48px; }.hero-proof p { color: var(--text-muted); font-size: .7rem; line-height: 1.55; }.hero-proof strong { color: var(--text-dark); font-size: .76rem; }.avatar-stack { display: flex; padding-left: 8px; }.avatar-stack span { width: 30px; height: 30px; margin-left: -8px; border: 2px solid var(--cream); border-radius: 50%; display: grid; place-items: center; color: var(--green-deep); background: var(--terra-pale); font-size: .68rem; font-weight: 800; }.avatar-stack span:nth-child(2) { background: #c8d4c7; }.avatar-stack span:nth-child(3) { background: #dec0a8; }.avatar-stack span:last-child { background: var(--green-deep); color: var(--cream); }
.hero-visual { min-height: 475px; position: relative; display: grid; place-items: center; }.visual-orbit { position: absolute; border: 1px solid var(--terra-pale); border-radius: 50%; transform: rotate(-20deg); }.orbit-one { width: 430px; height: 250px; }.orbit-two { width: 330px; height: 430px; transform: rotate(32deg); border-color: var(--border); }.scripture-card { position: relative; z-index: 2; width: min(285px, 72%); min-height: 320px; padding: 68px 34px 34px; display: flex; flex-direction: column; justify-content: flex-end; background: var(--green-deep); color: var(--cream); border-radius: 145px 145px 12px 12px; box-shadow: var(--shadow-lg); transform: rotate(-3deg); }.scripture-mark { position: absolute; top: 30px; left: 33px; color: var(--terra-light); font-family: var(--font-serif); font-size: 5rem; line-height: .6; }.scripture-card p { color: var(--cream); font-family: var(--font-serif); font-size: 1.28rem; line-height: 1.25; }.scripture-card small { color: var(--terra-light); font-size: .62rem; letter-spacing: .16em; font-weight: 800; margin-top: 20px; }.profile-card { position: absolute; z-index: 3; width: 190px; padding: 14px; background: var(--cream-light); border: 1px solid var(--border); border-radius: 10px; box-shadow: var(--shadow-md); display: grid; grid-template-columns: 36px 1fr; column-gap: 10px; align-items: center; }.profile-card strong { color: var(--ink); font-size: .78rem; }.profile-card small { grid-column: 2; color: var(--text-muted); font-size: .58rem; line-height: 1.3; }.card-back { top: 25px; right: 0; transform: rotate(7deg); }.card-front { bottom: 20px; left: 5px; transform: rotate(-6deg); }.mini-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--terra-pale); color: var(--terra-dark); display: grid; place-items: center; font-family: var(--font-serif); font-size: 1.3rem; }.avatar-green { background: #c8d4c7; color: var(--green-deep); }.verified { grid-column: 1 / -1; color: var(--success); font-size: .58rem; font-weight: 800; margin-top: 8px; }.visual-star { position: absolute; color: var(--terra); font-size: 1.6rem; }.star-one { top: 28px; left: 12%; }.star-two { bottom: 32px; right: 10%; font-size: .9rem; }
.intro-strip { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); max-width: 1240px; margin: 0 auto; padding: 20px 40px; display: flex; justify-content: center; align-items: center; gap: 24px; color: var(--text-muted); text-transform: uppercase; letter-spacing: .12em; font-size: .63rem; font-weight: 800; }.intro-strip span { width: 4px; height: 4px; background: var(--terra); border-radius: 50%; }
.values { max-width: 1240px; margin: 0 auto; padding: 105px 40px 120px; }.section-heading { max-width: 660px; }.section-heading h2 { font-size: clamp(2.2rem, 4.5vw, 3.7rem); line-height: .98; }.heading-copy { max-width: 450px; margin-top: 22px; color: var(--text-body); line-height: 1.7; }.value-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 70px; }.value-card { display: flex; gap: 20px; padding-top: 18px; border-top: 2px solid var(--terra-light); }.value-number { color: var(--terra); font-size: .72rem; font-weight: 800; letter-spacing: .1em; }.value-card h3 { font-size: 1.45rem; margin-bottom: 9px; }.value-card p { color: var(--text-body); line-height: 1.6; font-size: .9rem; max-width: 260px; }
.features { background: var(--cream-dark); padding: 105px max(40px, calc((100vw - 1160px) / 2)) 120px; }.center { text-align: center; margin: 0 auto; }.section-heading.center .eyebrow { justify-content: center; }.feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 62px; }.feature-card { min-height: 285px; background: var(--cream-light); border: 1px solid var(--border); border-radius: 14px; padding: 30px 26px; transition: transform var(--t-base), box-shadow var(--t-base); }.feature-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }.feature-highlight { background: var(--green-deep); border-color: var(--green-deep); }.feature-icon { display: block; color: var(--terra); font-size: 2.2rem; margin-bottom: 24px; }.feature-card h3 { font-size: 1.45rem; margin-bottom: 12px; }.feature-highlight h3, .feature-highlight p { color: var(--cream); }.feature-card p { font-size: .9rem; line-height: 1.65; }.card-link { display: inline-flex; gap: 10px; margin-top: 25px; color: var(--terra-light); font-size: .78rem; font-weight: 800; }.card-link:hover { color: white; }
.security-banner { background: var(--green-deep); padding: 92px 40px; }.security-inner { max-width: 1160px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 50px; }.security-content { max-width: 620px; }.security-content h2 { color: var(--cream); font-size: clamp(2.2rem, 4vw, 3.4rem); line-height: .98; margin: 14px 0 20px; }.security-text { color: rgba(248,246,241,.72); line-height: 1.7; font-size: .98rem; margin-bottom: 28px; }.security-list { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }.security-list li { color: rgba(248,246,241,.88); font-size: .82rem; font-weight: 600; display: flex; gap: 8px; }.security-list span { color: var(--terra-light); }.eyebrow.light { color: var(--terra-light); }.security-seal { width: 190px; height: 190px; border: 1px solid rgba(215,173,138,.6); border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; transform: rotate(9deg); flex-shrink: 0; }.security-seal span { color: var(--terra-light); font-size: 1.4rem; }.security-seal strong { color: var(--cream); font-family: var(--font-serif); font-size: 1.3rem; line-height: .9; margin: 8px 0; }.security-seal small { color: var(--terra-light); font-size: .55rem; }
.faq { max-width: 780px; margin: 0 auto; padding: 110px 32px; }.faq-list { margin-top: 50px; display: flex; flex-direction: column; gap: 10px; }.faq-item { background: var(--cream-light); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }.faq-item[open] { border-color: var(--terra-light); }.faq-item summary { padding: 21px 22px; font-weight: 700; font-size: .9rem; color: var(--ink); cursor: pointer; list-style: none; display: flex; justify-content: space-between; }.faq-item summary::-webkit-details-marker { display: none; }.faq-item summary::after { content: '+'; color: var(--terra); font-size: 1.2rem; }.faq-item[open] summary::after { transform: rotate(45deg); }.faq-item p { padding: 0 22px 21px; font-size: .87rem; line-height: 1.65; }
.cta { padding: 0 32px 120px; }.cta-inner { max-width: 750px; margin: 0 auto; text-align: center; background: var(--terra-pale); border-radius: 16px; padding: 72px 30px; position: relative; overflow: hidden; }.cta-inner::before { content: ''; position: absolute; width: 280px; height: 280px; border: 1px solid rgba(149,86,56,.2); border-radius: 50%; top: -150px; left: -80px; }.cta-cross { display: block; color: var(--terra-dark); font-size: 1.2rem; margin-bottom: 18px; }.cta-inner h2 { max-width: 530px; margin: 0 auto 14px; font-size: clamp(2.2rem, 4vw, 3.3rem); line-height: .98; }.cta-inner p:not(.eyebrow) { color: var(--text-dark); margin-bottom: 28px; }.cta-btn { margin: 0 auto; }
@media (max-width: 900px) { .hero { grid-template-columns: 1fr; padding-top: 65px; }.hero-copy { max-width: 620px; }.hero-visual { min-height: 430px; max-width: 570px; }.value-grid, .feature-grid { grid-template-columns: 1fr; }.value-card { max-width: 500px; }.feature-card { min-height: 220px; }.security-inner { align-items: flex-start; }.security-seal { margin-top: 20px; } }
@media (max-width: 600px) { .hero, .values { padding-left: 22px; padding-right: 22px; }.hero { padding-top: 55px; }.hero-visual { min-height: 390px; transform: scale(.9); margin: -15px -30px; }.intro-strip { padding: 18px 22px; text-align: center; }.intro-strip p:first-child { display: none; }.values { padding-top: 80px; padding-bottom: 85px; }.value-grid { margin-top: 45px; }.features { padding: 80px 22px; }.security-banner { padding: 75px 22px; }.security-inner { flex-direction: column; }.security-seal { align-self: center; }.security-list { grid-template-columns: 1fr; }.faq { padding: 80px 22px; }.cta { padding: 0 22px 85px; }.cta-inner { padding: 55px 22px; }.actions { align-items: flex-start; flex-direction: column; gap: 17px; } }
</style>
