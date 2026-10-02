# Requisitos de Produto — Conectados em Cristo

> Status: rascunho aspiracional; nenhum conjunto de requisitos foi aprovado para produção. O protótipo atual é local e não satisfaz os requisitos de backend, autenticação ou operação listados aqui.

## Conflitos que exigem decisão de produto
- Prazo do MVP: este documento indica 6 meses; `mvp.md` estima 8 semanas.
- Idiomas: este documento exige PT/EN/ES; `mvp.md` limita o MVP a português.
- Chat: `mvp.md` exclui mensagens; `INSTR.md` inclui chat no roadmap aspiracional do MVP.
- Estes conflitos permanecem sem resolução; não os tratar como escopo aprovado.

## Requisitos Funcionais do MVP

### REQ-AUTH: Autenticação
- **REQ-AUTH-001:** Usuário pode se registrar com email e senha
- **REQ-AUTH-002:** Email deve ser verificado via OTP antes de usar a plataforma
- **REQ-AUTH-003:** Usuário pode fazer login com email e senha
- **REQ-AUTH-004:** Sessão expira após 24h de inatividade
- **REQ-AUTH-005:** Usuário pode fazer logout
- **REQ-AUTH-006:** Usuário pode resetar senha via email
- **REQ-AUTH-007:** Senha deve ter mínimo 12 caracteres com maiúscula, minúscula, número e caractere especial
- **REQ-AUTH-008:** CAPTCHA em registro para evitar bots
- **REQ-AUTH-009:** Rate limit: 5 tentativas de login por hora por IP
- **REQ-AUTH-010:** Detecção de contas duplicadas (mesmo email/phone)

### REQ-PROFILE: Perfil de Usuário
- **REQ-PROFILE-001:** Usuário pode preencher dados básicos: nome, idade, cidade, país, profissão, escolaridade
- **REQ-PROFILE-002:** Usuário pode preencher dados de fé: denominação, frequência, importância da fé
- **REQ-PROFILE-003:** Usuário pode preencher dados de personalidade: introversão/extroversão, comunicação
- **REQ-PROFILE-004:** Usuário pode preencher objetivos de relacionamento: namoro, casamento, filhos
- **REQ-PROFILE-005:** Usuário pode preencher estilo de vida: trabalho, hobbies, exercícios
- **REQ-PROFILE-006:** Usuário pode adicionar múltiplas fotos (máx 6)
- **REQ-PROFILE-007:** Fotos são verificadas contra conteúdo explícito
- **REQ-PROFILE-008:** Bio/descrição de até 500 caracteres
- **REQ-PROFILE-009:** Perfil é privado até 100% preenchido
- **REQ-PROFILE-010:** Usuário pode editar qualquer dado a qualquer momento
- **REQ-PROFILE-011:** Usuário pode ver preview do seu próprio perfil como outros veriam
- **REQ-PROFILE-012:** Localização é aproximada (cidade), não exata (coordenadas)

### REQ-QUESTIONNAIRE: Questionário
- **REQ-QUESTIONNAIRE-001:** Questionário divide-se em seções: fé, valores, relacionamento, família, estilo de vida
- **REQ-QUESTIONNAIRE-002:** Perguntas usam múltipla escolha, escala, seleção múltipla
- **REQ-QUESTIONNAIRE-003:** Usuário pode salvar e continuar depois
- **REQ-QUESTIONNAIRE-004:** Respostas são usadas para cálculo de compatibilidade
- **REQ-QUESTIONNAIRE-005:** Recomendação: 15-20 minutos de tempo total
- **REQ-QUESTIONNAIRE-006:** Respostas não são visíveis em perfil, apenas usadas internamente
- **REQ-QUESTIONNAIRE-007:** Usuário pode atualizar respostas a qualquer momento

### REQ-DISCOVERY: Sistema de Descoberta
- **REQ-DISCOVERY-001:** Usuário pode navegar por perfis de pessoas interessadas no mesmo gênero
- **REQ-DISCOVERY-002:** Filtros: idade, localização (raio), fé, objetivos
- **REQ-DISCOVERY-003:** Ordenação: compatibilidade, recentemente ativo, novo
- **REQ-DISCOVERY-004:** Perfil deve mostrar foto, nome, idade, cidade, fé, objetivo de relacionamento
- **REQ-DISCOVERY-005:** Perfil deve mostrar score de compatibilidade (não como número, como descrição)
- **REQ-DISCOVERY-006:** Usuário pode clicar em perfil para ver detalhes completos
- **REQ-DISCOVERY-007:** Não é swipe para os lados - é descoberta deliberada
- **REQ-DISCOVERY-008:** Cada perfil pode ter: visualizar, demonstrar interesse, passar, salvar, bloquear, denunciar

### REQ-INTERACTION: Interações
- **REQ-INTERACTION-001:** Usuário pode demonstrar interesse em outro perfil
- **REQ-INTERACTION-002:** Usuário pode passar em outro perfil
- **REQ-INTERACTION-003:** Usuário pode salvar perfil para depois
- **REQ-INTERACTION-004:** Usuário pode bloquear perfil (esse perfil não o vê mais)
- **REQ-INTERACTION-005:** Usuário pode denunciar perfil (para moderação)
- **REQ-INTERACTION-006:** Usuário vê histórico de suas interações
- **REQ-INTERACTION-007:** Se mutual interest, notificação é enviada (ou disponível em app)
- **REQ-INTERACTION-008:** Usuário pode ver quem demonstrou interesse nele

### REQ-COMPATIBILITY: Sistema de Compatibilidade
- **REQ-COMPATIBILITY-001:** Compatibilidade é calculada baseada em: fé, objetivos, estilo de vida, valores
- **REQ-COMPATIBILITY-002:** Compatibilidade é explicada: "Vocês demonstram alinhamento em fé, objetivos e localização"
- **REQ-COMPATIBILITY-003:** Nunca dizer "X% compatíveis" ou "Vocês devem ficar juntos"
- **REQ-COMPATIBILITY-004:** Mostrar: pontos de alinhamento, pontos de atenção, informações ainda desconhecidas
- **REQ-COMPATIBILITY-005:** Score interno (0-100) usado apenas para ordenação, não mostrado ao usuário
- **REQ-COMPATIBILITY-006:** Compatibilidade recalculada se usuário atualizar respostas

### REQ-MODERATION: Moderação
- **REQ-MODERATION-001:** Sistema de denúncia para: fraude, fake profile, conteúdo sexual, abuso
- **REQ-MODERATION-002:** Admin pode revisar denúncias em painel
- **REQ-MODERATION-003:** Admin pode avisar usuário, suspender, ou banir
- **REQ-MODERATION-004:** Usuário banido não pode se registrar novamente com mesmo email/phone
- **REQ-MODERATION-005:** Logs de moderação mantidos para auditoria
- **REQ-MODERATION-006:** Ações de moderação levam em consideração contexto
- **REQ-MODERATION-007:** Usuário pode apelar banimento

### REQ-SAFETY: Segurança de Dados
- **REQ-SAFETY-001:** Todos os dados transmitidos via HTTPS
- **REQ-SAFETY-002:** Senhas armazenadas com hash bcrypt/Argon2
- **REQ-SAFETY-003:** Sessão com token JWT assinado
- **REQ-SAFETY-004:** Cookie httpOnly, Secure, SameSite=Strict
- **REQ-SAFETY-005:** Usuário pode pedir download de seus dados
- **REQ-SAFETY-006:** Usuário pode deletar sua conta (soft delete, com retenção mínima para logs)
- **REQ-SAFETY-007:** Conformidade LGPD: consentimento explícito, direito de acesso, direito ao esquecimento
- **REQ-SAFETY-008:** Backup criptografado diário

### REQ-PRIVACY: Privacidade
- **REQ-PRIVACY-001:** Dados público: nome, foto, idade, cidade (aprox), profissão
- **REQ-PRIVACY-002:** Dados restrito: fé, personalidade, objetivos (visível apenas após mútuo interesse)
- **REQ-PRIVACY-003:** Dados privado: email, phone, localização exata (apenas o usuário)
- **REQ-PRIVACY-004:** Dados interno: score compatibilidade, flags de segurança (sistema)
- **REQ-PRIVACY-005:** Usuário pode controlar visibilidade de cada campo
- **REQ-PRIVACY-006:** Nenhum compartilhamento de dados com terceiros sem consentimento explícito

## Requisitos Não-Funcionais

### Performance
- **REQ-PERF-001:** Carregamento de página < 3 segundos (p95)
- **REQ-PERF-002:** API responde < 200ms (p95)
- **REQ-PERF-003:** Discovery carrega com scroll infinito sem lag
- **REQ-PERF-004:** Suporta 10.000 requisições/min sem degradação

### Escalabilidade
- **REQ-SCALE-001:** Arquitetura permite crescimento para 1M usuários
- **REQ-SCALE-002:** Banco de dados suporta sharding se necessário
- **REQ-SCALE-003:** Cache em múltiplas camadas (CDN, Redis, browser)

### Confiabilidade
- **REQ-RELIABILITY-001:** Uptime 99.5%
- **REQ-RELIABILITY-002:** Recovery Time Objective (RTO): 1 hora
- **REQ-RELIABILITY-003:** Recovery Point Objective (RPO): 1 hora
- **REQ-RELIABILITY-004:** Backup testado mensalmente

### Usabilidade
- **REQ-USABILITY-001:** Interface compatível com desktop e mobile
- **REQ-USABILITY-002:** Acessibilidade WCAG 2.1 AA
- **REQ-USABILITY-003:** Tempo para completar onboarding < 10 minutos
- **REQ-USABILITY-004:** Sem jargão técnico, linguagem simples

### Manutenibilidade
- **REQ-MAINTAIN-001:** Código com testes unitários (>80% coverage)
- **REQ-MAINTAIN-002:** Documentação atualizada
- **REQ-MAINTAIN-003:** Revisão de código obrigatória antes de merge

## Restrições

- **CONST-001:** MVP deve ser completado em 6 meses
- **CONST-002:** Budget MVP: $XXX (a definir)
- **CONST-003:** Time: 3 devs + 1 PM + 1 designer
- **CONST-004:** Suportar português, inglês, espanhol
- **CONST-005:** Conformidade LGPD obrigatória

## Métricas de Sucesso

- Taxa de conclusão do onboarding: >70%
- Taxa de preenchimento completo de perfil: >80%
- Taxa de demonstração de interesse: >30%
- Taxa de mutual interest conversão em conversas: >50% (v2)
- Taxa de usuário que sai da plataforma para namorar: >20%
- NPS score: >50
- Zero incidentes de segurança crítica
- Taxa de usuários reportando satisfação: >75%

## Status

- Requisitos são rascunho
- Sujeitos a mudanças baseadas em feedback
- Priorização em MVP será feita em próxima fase
- Estimativas a fazer após priorização

## Próximos Passos

1. [ ] Priorizar requisitos para MVP
2. [ ] Estimar esforço
3. [ ] Definir timeline
4. [ ] Assignar tasks
