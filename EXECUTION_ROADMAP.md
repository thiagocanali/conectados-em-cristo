# Roadmap de Execução — Conectados em Cristo

- Data: 2026-11-05
- Status: proposta de fases e critérios revisada; sem cronograma aprovado.
- Princípio: cada fase termina com evidência, testes, documentação e revisão de segurança.

## Fase 0 — Auditoria e planejamento

**Estado:** auditoria documental/estática e revisão de consistência concluídas; F-01, F-02 e F-03 aprovadas em 2026-11-05; F-04 aprovada no modelo operacional geral, F-05 nos princípios gerais de minimização/governança, F-06 no modelo geral de elegibilidade 18+ e F-07 no modelo geral de catálogo/visibilidade em 2026-11-05; F-08 aprovada no modelo geral de participação com impedimento por conflito de interesse em 2026-11-06; F-09 foi aprovada no modelo geral em 2026-11-06; F-10 foi aprovada no modelo geral em 2026-11-06; decisões técnicas/operacionais e detalhes de F-09/F-10 ainda aguardam definição.

Tarefas:
- [x] Inventariar estrutura, rotas, stack, workflows e documentação.
- [x] Classificar as funcionalidades atuais e identificar limites demonstrativos.
- [x] Confirmar pipeline atual (lint, 5 testes unitários, build e deploy estático).
- [x] Executar auditoria de dependências no estado do lockfile.
- [x] Registrar lacunas de produto, segurança, arquitetura e decisões.
- [x] Validar posicionamento e escopo estratégico do MVP com o responsável.
- [x] Aprovar comunidades curadas pela administração no beta inicial; criação livre por usuários fica para fase posterior.
- [x] Registrar a aprovação de F-01: bloqueio global entre contas para descoberta/interações diretas, sem exclusão automática de conteúdo comunitário.
- [x] Registrar a aprovação de F-02: texto simples, limites configuráveis, janela curta de edição pelo autor, exclusão lógica e preservação restrita de evidências de denúncia ativa.
- [x] Registrar a aprovação de F-03: escada proporcional de sanções, justificativa/auditoria, contestação e limites de autoridade local/global.
- [x] Registrar aprovação de F-04 no modelo operacional geral: beta fechado, cobertura humana declarada, priorização por risco, fila centralizada e metas realistas.
- [x] Registrar aprovação de F-05 nos princípios gerais de minimização, finalidade explícita, acesso mínimo, direitos do titular, retenção por categoria e preservação restrita de evidências.
- [x] Registrar aprovação de F-06 no modelo geral: beta 18+, informação clara da idade mínima, verificação proporcional, coleta mínima e análise humana de suspeitas.
- [ ] Definir inventário, bases legais, prazos por categoria, exceções, fluxo de direitos, backups e revisão jurídica; definir responsáveis, escala/horários, SLOs por prioridade, escalonamento e capacidade máxima do beta; detalhar mecanismo de verificação etária, fluxo humano de suspeitas e tratamento de contas inelegíveis; detalhar F-07 (campos públicos, contagens, convite/autorização e anti-vazamento); detalhar F-08 (critérios de conflito, encaminhamento/fallback, acesso pré-impedimento, auditoria e testes server-side); registrar a aprovação do modelo geral de F-09; detalhar os itens operacionais pendentes de F-09/F-10.
- [x] Registrar modelo-base aprovado de papéis, permissões, visibilidade e entrada das comunidades curadas.
- [x] Elaborar matriz detalhada preliminar de ações e cenários negativos; permanece proposta sujeita a validação.
- [ ] Fechar exceções, SLAs, apelação, retenção e operação de denúncias.
- [x] Registrar aprovação do modelo geral de F-09: edição própria por janela curta, ocultação rápida em pedido de exclusão, exclusão/anonimização conforme F-05 e retenção excepcional mínima e auditada.
- [ ] Detalhar F-09: janela de edição, histórico, fluxo de exclusão, tratamento de comentários de terceiros, critérios/prazos de evidência, comunicação, backups e revisão jurídica.
- [x] Registrar aprovação do modelo geral de F-10: reação única “Apoiar”, removível pelo autor, contagem agregada quando segura e sem lista nominal ou gamificação.
- [ ] Detalhar F-10: autorização server-side, limites antiabuso, privacidade da contagem, estados especiais, acessibilidade e testes de concorrência/idempotência.
- [ ] Aprovar ADRs de backend, banco, autenticação, storage, e-mail e hospedagem sem pressupor fornecedores.
- [ ] Definir critérios, capacidade operacional e orçamento do beta.

Critério de saída: escopo do MVP e decisões bloqueadoras de produto, operação e arquitetura aprovados; ADRs registrados; nenhum risco crítico de entendimento sobre dados/segurança.

## Fase 1 — Fundação tecnológica

Objetivo: criar ambientes, API, persistência e identidade reais.

Tarefas:
- Modernizar toolchain frontend com migração reversível e testes.
- Selecionar e registrar em ADR a arquitetura de backend (monólito modular é uma alternativa a avaliar, não uma decisão tomada).
- Selecionar e registrar em ADR o banco e a estratégia de migrations, seed sintético e backups (PostgreSQL é uma alternativa a avaliar, não uma decisão tomada).
- Selecionar provedores de autenticação e e-mail transacional após avaliação de requisitos, custo, privacidade e operação.
- Implementar sessão, recuperação, verificação, encerramento e exclusão.
- Autorização server-side, rate limiting, validação e tratamento de erros.
- CI para lint, unit, integração, build e scan de dependências.
- Ambientes local, preview e homologação.

Dependências: aprovação das decisões D-12 a D-17, ADRs, domínio, classificação de dados e requisitos de segurança.

Critérios de aceite:
- Nenhuma senha/credencial de usuário em localStorage.
- Usuário não acessa dados de outra conta por ID alterado.
- Sessões podem ser revogadas.
- Migrações reproduzíveis em ambiente limpo.
- Backup e restore testados.
- Pipeline obrigatório verde.

## Fase 2 — Experiência do usuário

Objetivo: cadastro progressivo e perfil com privacidade.

Tarefas:
- Onboarding com progresso e retomada.
- Perfil mínimo: nome de exibição, idade/faixa quando necessária, cidade aproximada, bio e interesses.
- Dados religiosos opcionais, com finalidade/visibilidade explícitas.
- Preferências e consentimentos versionados.
- Upload seguro de imagem, limites, moderação e remoção.
- Preview e controles por campo.
- Exportação, correção e exclusão de dados.

Critérios: perfil persistente em backend, validação server-side, campos opcionais, privacidade testada e direitos do titular implementados conforme revisão jurídica.

## Fase 3 — Comunidade e participação (prioridade de produto)

Objetivo: entregar valor sem depender de namoro.

Tarefas:
- Catálogo de comunidades e categorias, inicialmente criadas e curadas pela administração.
- Comunidades públicas descobertas no catálogo, com entrada conforme regras; privadas com solicitação e aprovação.
- Visitantes consultam somente informações públicas de apresentação/catálogo; publicações exigem autenticação e autorização.
- Designação administrativa de moderadores e publicação de regras antes de abrir cada comunidade.
- Criação de comunidades por usuários permanece fora do beta inicial.
- Papéis separados: administrador global, moderador limitado às comunidades atribuídas e membro com participação autorizada.
- Denúncias persistidas em fila central restrita e auditável; bloqueios efetivos server-side.
- Entrar/sair e convites/aprovação.
- Publicações, comentários e reações com paginação, conforme decisões F-02/F-09/F-10, respeitando o status individual de aprovação de cada pacote.
- Bloqueio e denúncia de conteúdo/usuário.
- Moderação e auditoria antes de abrir conteúdo a usuários externos.

Critérios: isolamento de comunidades, permissões testadas, feed paginado, conteúdo denunciável e ações moderadas rastreáveis. Não iniciar publicação/interação antes de identidade e vínculo estarem seguros; implementar F-01, F-02 e F-03 somente após autenticação, autorização server-side, auditoria e testes; F-05 teve os princípios gerais aprovados, mas nenhum dado real poderá ser coletado/retido até inventário, bases legais, prazos por categoria, exceções, direitos do titular, backups e revisão jurídica estarem definidos; F-04 teve o modelo geral aprovado, mas seu fluxo operacional não pode ser considerado pronto até definir cobertura, responsáveis, prioridades, SLOs, escalonamento e capacidade; não implementar F-05 a F-10 sem aprovação explícita do pacote correspondente e fechamento de seus pré-requisitos; F-09 e F-10 tiveram aprovação apenas dos modelos gerais, não dos parâmetros operacionais; F-05 e F-06 têm aprovação apenas geral e continuam bloqueadas para dados reais até a conclusão das condições listadas. F-07 tem aprovação apenas do modelo geral e continua bloqueada para implementação até detalhamento dos campos, contagens, autorização e controles anti-vazamento. Para F-03, definir categorias, critérios, durações, autoridade e recurso antes de codificar as regras. Para F-02, limites numéricos e janela devem estar definidos, e retenção/exclusão devem estar alinhadas a F-05/F-09.

## Fase 4 — Segurança operacional e administração

Objetivo: operar com segurança e capacidade de resposta.

Tarefas:
- Painel de denúncias e fila de revisão.
- Matriz de severidade, SLAs e apelação.
- Advertência, restrição, suspensão e reversão.
- RBAC para admin/moderador/suporte.
- Audit log imutável/append-only conforme desenho.
- Antispam e rate limiting contextual.
- Procedimentos de incidentes e suporte.

Critérios: ação sensível exige permissão, motivo e registro; usuário pode contestar quando aplicável; nenhuma punição grave baseada apenas em classificação automática incerta.

## Fase 5 — Fé, conteúdo e oração

Objetivo: aprofundar a experiência espiritual com fontes verificáveis.

Tarefas:
- Devocional editorial e referências bíblicas verificadas.
- Planos de leitura e progresso.
- Estudos e favoritos.
- Pedidos de oração com público definido, consentimento e controles de remoção.
- Grupos de oração, se a moderação e privacidade estiverem prontas.
- Licenças e direitos de tradução bíblica revisados.

Critérios: conteúdo tem fonte/referência e licença; conteúdo de oração respeita escopo de acesso; denúncias e moderação funcionam.

## Fase 6 — Descoberta, conexões e eventos

Objetivo: ampliar encontros comunitários de forma responsável.

Tarefas:
- Pesquisa e descoberta de pessoas com filtros mínimos.
- Explicação de recomendações e informações desconhecidas.
- Interesse/reciprocidade opt-in; compatibilidade só após validação de requisitos.
- Eventos online/presenciais, organizadores, inscrições, capacidade e cancelamentos.
- Localização aproximada e proteção de endereço exato.

Critérios: nenhuma recomendação promete sucesso; bloqueios são server-side; eventos não expõem localização privada; testes de autorização e abuso aprovados.

## Fase 7 — Mensagens e notificações (decisão pendente)

Tarefas condicionais:
- Chat persistente e conversas individuais.
- Bloqueio, denúncia de mensagens, silenciamento e retenção.
- Proteção contra spam/links e limites de envio.
- Preferências de notificação e controles de frequência.

Critérios: ameaça e capacidade de moderação revisadas; controles de privacidade e exclusão documentados; teste de abuso e autorização aprovado.

## Fase 8 — Qualidade, beta e lançamento

Tarefas:
- Testes unitários, integração e E2E de jornadas críticas.
- Revisão manual mobile/desktop e leitores de tela.
- Auditoria de contraste e acessibilidade.
- SAST, DAST, dependências e pentest proporcional ao risco.
- Load test baseado em metas realistas.
- Backups/restore, alertas, incident response e rollback.
- Revisão jurídica LGPD, termos, privacidade e conteúdo.
- Beta fechado com suporte e moderação disponíveis.

Critérios de lançamento:
- Sem vulnerabilidade crítica/alta sem tratamento formal aprovado.
- Nenhuma funcionalidade crítica depende de localStorage como fonte de verdade.
- Denúncias chegam a operadores e possuem SLA.
- Direitos de privacidade operacionais.
- Monitoramento e backup testados.
- Fluxos críticos e acessibilidade aprovados.

## Fase 9 — Evolução

- Inglês e espanhol, após validação de mercado e operação.
- Recursos avançados de descoberta/compatibilidade.
- Comunidades e eventos ampliados.
- Monetização ética, se aprovada.
- Escala horizontal e cache somente quando métricas justificarem.

## Regras de governança

- Cada fase terá PRs pequenas e reversíveis.
- Não executar migrações destrutivas em produção sem aprovação.
- Atualizar README, PROJECT_CONTEXT e documentação afetada.
- Não marcar tarefa como concluída sem evidência de código/teste/deploy.
- Cronograma será estimado depois de escopo, orçamento, disponibilidade e capacidade de moderação.
