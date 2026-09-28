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

## Funcionalidades Principais (Planejadas)

### MVP
- [ ] Autenticação segura
- [ ] Criação de perfil completo
- [ ] Questionário de compatibilidade
- [ ] Sistema de descoberta (não apenas swipe)
- [ ] Demonstração de interesse
- [ ] Bloqueio e denúncia
- [ ] Sistema de moderação básico
- [ ] Salvação de perfis

### V2 (Futuro)
- [ ] Mensagens
- [ ] Verificação de identidade
- [ ] Moderação avançada
- [ ] Notificações
- [ ] Análise comportamental
- [ ] Internacionalização

## Arquitetura (Decisões Pendentes)

### Stack Tecnológico
**Frontend:** Vue.js 3 (atual), avaliar Next.js/React para v2
**Backend:** Node.js + TypeScript (planejado)
**Banco:** PostgreSQL (planejado)
**Infraestrutura:** Vercel/AWS (avaliar)

### Decisões em Aberto
- [ ] Migração para Next.js/React ou manter Vue.js?
- [ ] Backend em Node.js ou alternativa?
- [ ] PostgreSQL em Neon, Supabase ou AWS?
- [ ] Que provedor para armazenamento de imagens?
- [ ] CDN e cache estratégia?
- [ ] Fila de processamento para moderação?

## Estrutura de Dados (Preliminar)

### Tabelas Principais
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

### Implementações Obrigatórias
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

## Moderação

### Políticas
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
- **Frontend:** Vue.js 3, Tailwind CSS 4, Vue Router 4, Pinia 3
- **Build:** Vite, Babel, ESLint
- **Hosting:** GitHub Pages (atual)
- **VCS:** Git, GitHub

## Status Atual
- [x] Instruções mestras definidas
- [x] Estrutura inicial (Vue.js)
- [ ] Documentação completa
- [ ] Decisões arquiteturais registradas
- [ ] Backend estruturado
- [ ] Banco de dados criado
- [ ] Autenticação implementada
- [ ] Perfil implementado
- [ ] Sistema de compatibilidade
- [ ] Moderação
- [ ] Testes

## Roadmap de Alto Nível

### Fase 0: Fundação (Atual)
- Decisões arquiteturais
- Documentação
- Setup do projeto

### Fase 1: MVP
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
1. Registrar decisões arquiteturais iniciais (ADRs)
2. Criar documentação de product e requirements
3. Definir schema do banco de dados
4. Estruturar backend
5. Implementar autenticação
