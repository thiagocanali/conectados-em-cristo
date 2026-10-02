# CONECTADOS EM CRISTO — Contexto do Projeto

## Visão
Uma plataforma cristã de relacionamentos que conecta pessoas solteiras com propósito, focando em conhecimento profundo, compatibilidade genuína e segurança, antes de crescimento.

## Missão
Facilitar encontros significativos entre cristãos solteiros que buscam relacionamentos sérios e com propósito em Cristo.

## Slogan
"Relacionamentos com propósito em Cristo."

## Fluxo de Experiência
Conhecer → Compreender → Conversar → Discernir → Relacionar-se → Eventualmente formar uma família

## Público-alvo

### Fase Inicial
- Idade: 18-60 anos
- Estado civil: Solteiros
- Fé: Cristãos (católicos, ortodoxos, protestantes/evangélicos)
- Orientação: Heterossexual
- Localização: Global

### Idiomas Planejados
1. Português (v1)
2. Inglês (v2)
3. Espanhol (v2)
4. Outros (futuro)

## Princípios de Produto

### Prioridades
1. **Segurança antes de crescimento**
2. **Privacidade antes de monetização**
3. **Relacionamentos antes de vício**
4. **Qualidade antes de quantidade**
5. **Transparência antes de manipulação**
6. **Pessoas antes de métricas**
7. **Verdade antes de aparência**

### Valores de Comunicação
- Simplicidade na experiência
- Autenticidade nas interações
- Discernimento nas conexões
- Propósito cristão central
- Maturidade nas relações

### Pilares de Design
**PERFIL + COMPATIBILIDADE + SEGURANÇA + PROPÓSITO**

## Estado Atual da Aplicação

O repositório contém um protótipo navegável, não um MVP de produção. As funcionalidades abaixo executam no navegador e usam dados locais; não existe API, backend, banco de dados, autenticação de servidor, moderação remota ou comunidade compartilhada.

### Implementado no protótipo
- Home e navegação por hash com Vue Router.
- Cadastro e login locais; senhas ficam em texto puro no `localStorage`, portanto não há segurança de autenticação de produção.
- Perfil e respostas do questionário persistidos localmente.
- Resultados de compatibilidade calculados apenas entre contas salvas no mesmo navegador.
- Descoberta baseada em perfis fixos no código; interesse, bloqueio, denúncia e perfis salvos são registros locais, não ações enviadas a outros usuários ou moderadores.
- Testes locais de dons e personalidade.

### Ainda não implementado
- API, backend, banco de dados e compartilhamento de contas/perfis entre dispositivos.
- Autenticação segura, verificação de e-mail, recuperação de senha e autorização no servidor.
- Descoberta de usuários reais, chat, notificações, uploads, pagamentos e painel/moderação remota.
- Testes automatizados de unidade, integração e E2E.

## Funcionalidades Principais (Planejadas)

### MVP proposto, ainda não aprovado
- [ ] Autenticação segura
- [ ] Criação de perfil completo
- [ ] Questionário de compatibilidade
- [ ] Sistema de descoberta (não apenas swipe)
- [ ] Demonstração de interesse
- [ ] Bloqueio e denúncia
- [ ] Sistema de moderação básico
- [ ] Salvação de perfis

### Candidatas para fases posteriores (fase não aprovada)
- [ ] Mensagens
- [ ] Verificação de identidade
- [ ] Moderação avançada
- [ ] Notificações
- [ ] Análise comportamental
- [ ] Internacionalização

## Arquitetura

### Implementação atual
**Frontend:** Vue 3, Vue Router 4 e CSS próprio, compilados pelo Vue CLI 5. A aplicação usa `createWebHashHistory`; o estado e dados de demonstração ficam em `localStorage`/`sessionStorage`. Pinia e Tailwind estão instalados como dependências, mas não são usados. Deploy está configurado para GitHub Pages e Vercel; o destino de produção ativo precisa ser confirmado.

### Arquitetura futura proposta
Backend Node.js/TypeScript, PostgreSQL, autenticação gerenciada, armazenamento e serviços externos ainda não foram escolhidos nem implementados. Next.js/React consta apenas como hipótese de migração, sem decisão aceita.

### Decisões em Aberto
- [ ] Manter Vue CLI/Vue Router ou aprovar uma migração de frontend?
- [ ] Escolher e aprovar backend, banco de dados e provedor de autenticação antes de armazenar dados reais.
- [ ] Resolver divergências de escopo do produto: prazo do MVP (8 semanas em `docs/product/mvp.md` versus 6 meses em `docs/product/requirements.md`), idiomas no MVP (somente português versus PT/EN/ES) e momento do chat (fora do MVP em alguns documentos, presente no roadmap aspiracional de `INSTR.md`).
- [ ] Backend em Node.js ou alternativa?
- [ ] PostgreSQL em Neon, Supabase ou AWS?
- [ ] Que provedor para armazenamento de imagens?
- [ ] CDN e cache estratégia?
- [ ] Fila de processamento para moderação?

## Modelo de Dados Futuro (Conceitual; Não Implementado)

As entidades abaixo são ideias de domínio, não tabelas existentes ou um esquema aprovado.

### Entidades candidatas
- `users` — Dados de autenticação e conta
- `profiles` — Perfil completo do usuário
- `faith_data` — Dados sobre fé
- `personality_data` — Dados sobre personalidade
- `relationship_goals` — Objetivos relacionais
- `lifestyle_data` — Dados sobre estilo de vida
- `interactions` — Visualizações, interesse, bloqueio, denúncia
- `matches` — Sistema de compatibilidade
- `messages` — Mensagens (futuro)
- `moderation_logs` — Logs de moderação
- `verification_status` — Status de verificação

### Classificação de Privacidade
- **Público:** Nome, foto, idade, cidade (aprox), profissão
- **Restrito:** Dados de fé, personalidade, objetivos (apenas para perfis interessados)
- **Privado:** Dados pessoais sensíveis, histórico, localização exata
- **Interno:** Scores de compatibilidade, flags de segurança, histórico de moderação

## Segurança

### Requisitos de segurança futuros (não implementados)
- Email verificado
- CAPTCHA
- Rate limiting
- Detecção de contas duplicadas
- Análise comportamental
- Controle de sessão
- MFA opcional
- Logs completos
- Monitoramento ativo
- Proteção contra abuso

### Proteção contra Fraude
- Detecção de catfishing
- Análise de fotos
- Identificação de duplicatas
- Proteção contra bots
- Detecção de padrões anormais

### Importante
**Identidade verificada ≠ Caráter verificado**
Nunca comunicar que alguém é "confiável" apenas por verificação.

## Moderação Planejada (Sem Serviço Remoto Ativo)

### Políticas candidatas
- Proibição de conteúdo sexual explícito
- Proibição de golpes e manipulação
- Proibição de exploração
- Proibição de discurso de ódio
- Tolerância zero com abuso

### Mecanismos
- Relatórios de usuários
- Análise automatizada
- Review manual
- Ações progressivas
- Apelação

## Tecnologias Atuais
- **Frontend:** Vue.js 3 e Vue Router 4; CSS próprio
- **Build:** Vue CLI 5 (`vue-cli-service`), Babel e ESLint
- **Dependências sem uso identificado:** Pinia 3 e Tailwind CSS 4
- **Deploy configurado:** GitHub Pages e Vercel; ambiente de produção ativo não confirmado
- **VCS:** Git, GitHub

## Status Atual
- [x] Protótipo frontend com rotas e fluxos locais
- [x] Design system inicial aplicado
- [ ] MVP de produção aprovado
- [ ] ADRs de stack, persistência e autenticação aceitos
- [ ] Backend e banco de dados
- [ ] Autenticação segura e autorização no servidor
- [ ] Dados e perfis compartilhados entre usuários
- [ ] Descoberta e moderação remotas
- [ ] Testes automatizados e validação E2E

## Roadmap Proposto (Sem Fases Aprovadas)

A alocação de mensagens e internacionalização por fase depende da resolução das decisões listadas acima.

### Fase Atual: Protótipo local
- Interface Vue funcional com dados do navegador
- Documentação e decisões de produto/arquitetura ainda em revisão

### Próxima fase proposta: MVP de produção
- Autenticação
- Perfil
- Questionário
- Descoberta
- Moderação básica

### Fase 2: Expansão
- Mensagens
- Verificação de identidade
- Moderação avançada
- Internacionalização (EN, ES)

### Fase 3: Escalabilidade
- Análise avançada
- Recomendações
- Analytics
- Otimizações de performance

## Regras Fundamentais de Desenvolvimento

1. Entenda o objetivo antes de codificar
2. Consulte a documentação existente
3. Verifique decisões arquiteturais prévias
4. Evite soluções duplicadas
5. Atualize documentação após decisões
6. Mantenha consistência arquitetural
7. Teste segurança e UX
8. Revise antes de mergear

## Arquivos de Documentação

- `/docs/product` — Vision, requirements, roadmap
- `/docs/architecture` — Decisões técnicas
- `/docs/database` — Schema e dicionário de dados
- `/docs/security` — Modelo de segurança
- `/docs/moderation` — Políticas e processos
- `/docs/ux` — Design system, acessibilidade
- `/docs/business` — Modelo, monetização, i18n
- `/docs/legal` — Privacidade, termos, compliance
- `/docs/api` — Documentação de API
- `/docs/testing` — Estratégia de testes
- `/docs/operations` — Deploy, monitoramento, backups
- `/docs/decisions` — Architecture Decision Records (ADRs)

## Próximos Passos
1. Resolver prazo, idiomas e escopo de mensagens com o responsável pelo produto
2. Aprovar o escopo de produção do MVP
3. Avaliar e aprovar stack, persistência e autenticação nos ADRs
4. Definir modelo de dados e controles de privacidade
5. Planejar backend e testes antes de armazenar dados reais
