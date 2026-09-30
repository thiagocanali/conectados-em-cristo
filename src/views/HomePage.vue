<template>
  <main class="home">
    <!-- HERO -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy fade-in-up">
        <p class="eyebrow"><span aria-hidden="true">&#10022;</span> Uma comunidade com propósito</p>
        <h1 id="hero-title">Relacionamentos que começam pela <em>fé.</em></h1>
        <p class="hero-text">
          Conheça pessoas cristãs que também desejam construir uma história séria,
          com respeito, maturidade e Cristo no centro.
        </p>
        <div class="actions">
          <router-link to="/cadastro" class="btn-primary">Começar agora <span aria-hidden="true">&rarr;</span></router-link>
          <router-link to="/login" class="text-link">Já tenho uma conta</router-link>
        </div>
        <p class="trust-note"><span aria-hidden="true">&#10003;</span> Feito para maiores de 18 anos · Privacidade em primeiro lugar</p>
      </div>

      <div class="hero-art fade-in-up" aria-label="Ilustração de uma comunidade conectada pela fé">
        <div class="sun-glow"></div>
        <div class="arch">
          <div class="cross" aria-hidden="true"><span></span><i></i></div>
          <p class="verse">"A tua palavra é lâmpada para os meus pés e luz para o meu caminho."</p>
          <span class="reference">Salmos 119:105</span>
        </div>
        <div class="spark spark-one" aria-hidden="true">&#10022;</div>
        <div class="spark spark-two" aria-hidden="true">.</div>
      </div>
    </section>

    <!-- VALUES -->
    <section class="values" aria-labelledby="values-title">
      <div class="section-heading">
        <p class="eyebrow">Mais do que conhecer alguém</p>
        <h2 id="values-title">Uma jornada feita com intenção</h2>
      </div>
      <div class="value-grid">
        <article class="value-card">
          <span class="value-number">01</span>
          <h3>Conhecer</h3>
          <p>Perfis que mostram valores, fé e a pessoa por trás da primeira impressão.</p>
        </article>
        <article class="value-card">
          <span class="value-number">02</span>
          <h3>Compreender</h3>
          <p>Perguntas e compatibilidades para conversas mais profundas e verdadeiras.</p>
        </article>
        <article class="value-card">
          <span class="value-number">03</span>
          <h3>Discernir</h3>
          <p>Um espaço seguro para seguir no seu tempo, com clareza e propósito.</p>
        </article>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="features" aria-labelledby="features-title">
      <div class="section-heading center">
        <p class="eyebrow">Como funciona</p>
        <h2 id="features-title">Conexões com significado</h2>
      </div>
      <div class="feature-grid">
        <article class="feature-card">
          <div class="feature-icon" aria-hidden="true">&#9673;</div>
          <h3>Perfil completo</h3>
          <p>Compartilhe sua fé, valores, estilo de vida e o que você busca em um relacionamento.</p>
        </article>
        <article class="feature-card">
          <div class="feature-icon" aria-hidden="true">&#10070;</div>
          <h3>Compatibilidade genuína</h3>
          <p>Veja pontos de alinhamento e atenção — não um número frio, mas uma conversa honesta.</p>
        </article>
        <article class="feature-card">
          <div class="feature-icon" aria-hidden="true">&#9888;</div>
          <h3>Segurança primeiro</h3>
          <p>Verificação de e-mail, denúncias e moderação para um ambiente seguro e respeitoso.</p>
        </article>
        <article class="feature-card">
          <div class="feature-icon" aria-hidden="true">&#9825;</div>
          <h3>Descoberta sem pressa</h3>
          <p>Salve perfis, pense com calma e ore antes de decidir. Sem swipe ansioso.</p>
        </article>
      </div>
    </section>

    <!-- SECURITY BANNER -->
    <section class="security-banner">
      <div class="security-inner">
        <div class="security-content">
          <p class="eyebrow light">Segurança e privacidade</p>
          <h2>Um espaço onde você pode confiar no processo</h2>
          <p class="security-text">
            Não prometemos que verificação significa caráter. Mas oferecemos ferramentas
            para que você conheça pessoas com mais clareza e segurança — no seu tempo.
          </p>
          <ul class="security-list">
            <li><span aria-hidden="true">&#10003;</span> E-mail verificado</li>
            <li><span aria-hidden="true">&#10003;</span> Bloqueio e denúncia</li>
            <li><span aria-hidden="true">&#10003;</span> Moderação ativa</li>
            <li><span aria-hidden="true">&#10003;</span> Privacidade por padrão</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq" aria-labelledby="faq-title">
      <div class="section-heading center">
        <p class="eyebrow">Perguntas frequentes</p>
        <h2 id="faq-title">O que você talvez queira saber</h2>
      </div>
      <div class="faq-list">
        <details v-for="(item, i) in faqItems" :key="i" class="faq-item">
          <summary>{{ item.q }}</summary>
          <p>{{ item.a }}</p>
        </details>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="cta-inner">
        <h2>Pronto para começar?</h2>
        <p>Crie sua conta e dê o primeiro passo com propósito.</p>
        <router-link to="/cadastro" class="btn-primary cta-btn">Criar conta gratuita <span aria-hidden="true">&rarr;</span></router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
const faqItems = [
  {
    q: 'O Conectados em Cristo é gratuito?',
    a: 'Sim. Cadastro, perfil, questionário e descoberta são gratuitos. Recursos adicionais podem ser oferecidos no futuro, mas segurança nunca será bloqueada por pagamento.'
  },
  {
    q: 'Quem pode usar a plataforma?',
    a: 'Cristãos solteiros com 18 anos ou mais. A plataforma é aberta a católicos, ortodoxos e protestantes/evangélicos que buscam relacionamentos sérios.'
  },
  {
    q: 'É como um aplicativo de namoro comum?',
    a: 'Não. O foco é conhecer, compreender e discernir antes de decidir. Perfis são detalhados e a compatibilidade vai além da aparência.'
  },
  {
    q: 'Minhas informações estão seguras?',
    a: 'Privacidade é prioridade. Seus dados são classificados e você controla o que aparece no seu perfil. Informações sensíveis não são expostas.'
  },
  {
    q: 'Posso bloquear ou denunciar alguém?',
    a: 'Sim. Todo perfil pode ser bloqueado ou denunciado a qualquer momento. Nossa equipe de moderação analisa cada denúncia.'
  }
]
</script>

<style scoped>
.home { background: var(--cream); color: var(--ink); }

/* ===== HERO ===== */
.hero {
  max-width: 1180px;
  min-height: 600px;
  margin: 0 auto;
  padding: 88px 32px 72px;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  align-items: center;
  gap: 48px;
}
.hero-copy { max-width: 570px; }
h1 {
  font-family: var(--font-serif);
  font-size: clamp(3.3rem, 7vw, 6rem);
  line-height: 0.98;
  letter-spacing: -0.055em;
  font-weight: 500;
  margin: 0;
  color: var(--ink);
}
h1 em { color: var(--terra); font-style: italic; }
.hero-text {
  max-width: 475px;
  color: var(--text-body);
  font-size: 1.08rem;
  line-height: 1.7;
  margin: 28px 0 30px;
}
.actions { display: flex; align-items: center; gap: 25px; flex-wrap: wrap; }
.text-link {
  color: var(--text-dark);
  font-size: 0.9rem;
  font-weight: 700;
  border-bottom: 1px solid var(--border);
  padding-bottom: 4px;
  transition: color var(--t-fast), border-color var(--t-fast);
}
.text-link:hover { color: var(--terra); border-color: var(--terra); }
.trust-note { color: var(--text-muted); font-size: 0.72rem; margin-top: 54px; }
.trust-note span { color: var(--terra); font-weight: 800; margin-right: 6px; }

/* Hero art */
.hero-art { min-height: 410px; position: relative; display: grid; place-items: center; }
.sun-glow {
  position: absolute;
  width: 320px; height: 320px;
  border-radius: 50%;
  background: var(--terra-pale);
  opacity: 0.55;
  filter: blur(1px);
}
.arch {
  position: relative;
  width: min(330px, 80%);
  min-height: 382px;
  border: 1px solid rgba(176, 109, 67, 0.45);
  border-bottom: 0;
  border-radius: 170px 170px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0 38px 54px;
  text-align: center;
  background: linear-gradient(180deg, rgba(248,246,241,.1), rgba(248,246,241,.5));
}
.cross { position: absolute; top: 76px; width: 42px; height: 68px; }
.cross span { position: absolute; left: 17px; width: 8px; height: 68px; background: var(--terra); border-radius: 2px; }
.cross i { position: absolute; top: 17px; left: 0; width: 42px; height: 8px; background: var(--terra); border-radius: 2px; }
.verse {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  line-height: 1.55;
  color: var(--text-dark);
  margin: 0 0 15px;
}
.reference {
  color: var(--terra);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.spark { position: absolute; color: var(--terra); font-size: 2rem; }
.spark-one { top: 38px; right: 14%; }
.spark-two { bottom: 42px; left: 10%; font-size: 4rem; }

/* ===== VALUES ===== */
.values {
  max-width: 1180px;
  margin: 0 auto;
  padding: 66px 32px 92px;
  border-top: 1px solid var(--border);
}
.value-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-top: 42px;
}
.value-card { border-top: 2px solid var(--terra-light); padding: 19px 4px; }
.value-number { color: var(--terra); font-size: 0.75rem; font-weight: 800; }
.value-card h3 { font-family: var(--font-serif); font-size: 1.5rem; margin: 22px 0 9px; }
.value-card p { color: var(--text-body); line-height: 1.6; font-size: 0.92rem; max-width: 280px; }

/* ===== FEATURES ===== */
.features {
  max-width: 1180px;
  margin: 0 auto;
  padding: 60px 32px 80px;
}
.section-heading.center { text-align: center; }
.section-heading.center .eyebrow { justify-content: center; }
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 44px;
}
.feature-card {
  background: var(--cream-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 22px;
  transition: transform var(--t-base), box-shadow var(--t-base);
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.feature-icon {
  font-size: 1.8rem;
  color: var(--terra);
  margin-bottom: 14px;
}
.feature-card h3 { font-size: 1.3rem; margin-bottom: 10px; }
.feature-card p { font-size: 0.88rem; line-height: 1.55; }

/* ===== SECURITY BANNER ===== */
.security-banner {
  background: var(--green-deep);
  padding: 64px 32px;
}
.security-inner { max-width: 1180px; margin: 0 auto; }
.security-content { max-width: 620px; }
.security-content h2 {
  color: var(--cream);
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  margin: 14px 0 16px;
}
.security-text {
  color: rgba(248, 246, 241, 0.75);
  line-height: 1.7;
  font-size: 1rem;
  margin-bottom: 24px;
}
.security-list {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.security-list li {
  color: rgba(248, 246, 241, 0.85);
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}
.security-list span { color: var(--terra-light); font-weight: 800; }
.eyebrow.light { color: var(--terra-light); }

/* ===== FAQ ===== */
.faq {
  max-width: 780px;
  margin: 0 auto;
  padding: 80px 32px;
}
.faq-list {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.faq-item {
  background: var(--cream-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--t-base);
}
.faq-item[open] { border-color: var(--terra-light); }
.faq-item summary {
  padding: 20px 22px;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--ink);
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background var(--t-fast);
}
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after {
  content: '+';
  font-size: 1.3rem;
  color: var(--terra);
  font-weight: 600;
  transition: transform var(--t-base);
}
.faq-item[open] summary::after { transform: rotate(45deg); }
.faq-item summary:hover { background: var(--cream-dark); }
.faq-item p {
  padding: 0 22px 20px;
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--text-body);
}

/* ===== CTA ===== */
.cta {
  padding: 80px 32px 100px;
}
.cta-inner {
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
  background: var(--cream-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 56px 32px;
  box-shadow: var(--shadow-sm);
}
.cta-inner h2 { font-size: clamp(1.8rem, 4vw, 2.5rem); margin-bottom: 12px; }
.cta-inner p { color: var(--text-body); margin-bottom: 28px; }
.cta-btn { margin: 0 auto; }

/* ===== RESPONSIVE ===== */
@media (max-width: 960px) {
  .feature-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 760px) {
  .hero { grid-template-columns: 1fr; padding-top: 62px; }
  .hero-art { min-height: 360px; order: -1; }
  .arch { min-height: 330px; }
  .cross { top: 58px; }
  .trust-note { margin-top: 36px; }
  .value-grid { grid-template-columns: 1fr; gap: 10px; }
  .security-list { grid-template-columns: 1fr; }
}
@media (max-width: 520px) {
  .hero, .values, .features, .faq, .cta { padding-left: 22px; padding-right: 22px; }
  h1 { font-size: 3.2rem; }
  .actions { flex-direction: column; align-items: flex-start; gap: 17px; }
  .feature-grid { grid-template-columns: 1fr; }
  .cta-inner { padding: 40px 22px; }
}
</style>
