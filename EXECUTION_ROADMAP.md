# Roadmap de Execução — Conectados em Cristo

- Data: 2026-11-04
- Status: proposta de fases e critérios; sem cronograma aprovado.
- Princípio: cada fase termina com evidência, testes, documentação e revisão de segurança.

## Fase 0 — Auditoria e planejamento

**Estado:** auditoria documental e estática concluída nesta entrega; decisões estratégicas aguardam responsável.

Tarefas:
- [x] Inventariar estrutura, rotas, stack, workflows e documentação.
- [x] Classificar as funcionalidades atuais e identificar limites demonstrativos.
- [x] Confirmar pipeline atual (lint, 5 testes unitários, build e deploy estático).
- [x] Executar auditoria de dependências no estado do lockfile.
- [x] Registrar lacunas de produto, segurança, arquitetura e decisões.
- [x] Validar posicionamento e escopo estratégico do MVP com o responsável.
- [x] Aprovar comunidades curadas pela administração no beta inicial; criação livre por usuários fica para fase posterior.
- [ ] Aprovar ADRs de stack, persistência e autenticação.
- [x] Aprovar modelo-base de papéis, permissões, visibilidade e entrada das comunidades curadas.
- [ ] Especificar matriz detalhada de ações, exceções, SLAs, apelação e retenção de denúncias.
- [ ] Definir critérios e orçamento de beta.

Critério de saída: escopo do MVP e decisões essenciais aprovados; nenhum risco crítico de entendimento sobre dados/segurança.

## Fase 1 — Fundação tecnológica

Objetivo: criar ambientes, API, persistência e identidade reais.

Tarefas:
- Modernizar toolchain frontend com migração reversível e testes.
- Definir monólito modular Node/TypeScript.
- Configurar PostgreSQL, migrations, seed sintético e backups.
- Integrar autenticação e e-mail transacional.
- Implementar sessão, recuperação, verificação, encerramento e exclusão.
- Autorização server-side, rate limiting, validação e tratamento de erros.
- CI para lint, unit, integração, build e scan de dependências.
- Ambientes local, preview e homologação.

Dependências: decisões de stack, provedores, domínio, dados e segurança.

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
- Publicações, comentários e reações com paginação.
- Bloqueio e denúncia de conteúdo/usuário.
- Moderação e auditoria antes de abrir conteúdo a usuários externos.

Critérios: isolamento de comunidades, permissões testadas, feed paginado, conteúdo denunciável e ações moderadas rastreáveis.

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
