# Estratégia de testes

## Objetivo

Definir como validar comportamento, segurança e qualidade da plataforma.

## Estado atual

- `npm test` executa o Node.js Test Runner (`node --test`).
- `tests/safeStorage.test.mjs` cobre parsing seguro de JSON e validação do progresso do teste de dons.
- `tests/demoAuth.test.mjs` cobre cadastro demonstrativo, login/logout, remoção de credenciais legadas, limpeza da sessão e descarte seguro de storage inválido.
- `tests/demoLists.test.mjs` cobre isolamento de listas por conta, leitura legada sem escrita, proteção contra sobrescrever JSON corrompido, rollback de denúncia/bloqueio, falha de rollback e projeção de cartões válidos.
- `tests/demoAuthGuard.test.mjs` cobre rotas públicas/privadas, redirecionamento, retorno ao destino original e validação de sessão.
- `tests/openapi.test.mjs` valida JSON OpenAPI 3.1, referências internas, operationIds, parâmetros de rota, autenticação em operações de escrita, privacidade por padrão de pedidos de oração e allowlist/paginação do catálogo público F-07.
- `npm run lint` executa ESLint CLI diretamente.
- `npm run build` executa `vite build`.
- O CI executa lint, testes unitários, build de produção e auditoria npm completa/de produção em jobs separados.
- A auditoria publica artefato JSON temporário por 14 dias; o job falha para vulnerabilidades altas/críticas (`npm audit --audit-level=high`) e não executa atualizações automáticas.
- A integração API/PostgreSQL agora cobre somente o catálogo público F-07 em banco efêmero. Ainda não há cobertura de autenticação, memberships, autorização de domínio, conteúdo, componentes, acessibilidade ou E2E.

A suíte atual é pequena e não representa cobertura dos fluxos completos do produto. A revisão visual/manual não substitui testes automatizados.

## Escopo planejado

- Testes unitários de regras e utilitários.
- Testes de componentes e integração.
- Testes de contrato para API quando existir.
- Testes E2E dos fluxos críticos.
- Testes de acessibilidade e segurança.
- Testes de autorização negativa para cada recurso e papel.

## Princípios

- Testar regras de negócio e controles de autorização.
- Priorizar fluxos críticos do MVP.
- Reproduzir regressões com testes automatizados.
- Não usar dados reais em ambientes de teste.
- Preservar testes existentes durante migrações de toolchain.
- Não declarar cobertura de fluxo a partir de testes isolados de utilitários.

## Decisões pendentes

- Frameworks para componentes, integração e E2E.
- Dados e ambientes de teste.
- Cobertura mínima e critérios de aprovação do pipeline.
- Estratégia de testes de acessibilidade e segurança.

## TODOs

- Expandir a suíte unitária para regras de domínio aprovadas.
- Transformar os fluxos aprovados do MVP em casos de teste rastreáveis.
- Configurar testes de componente, integração e E2E.
- Definir critérios de aprovação do pipeline.

Status em 11/11/2026: 31 testes unitários/contrato, 66 testes de API/identidade/autorização e 10 testes PostgreSQL passaram localmente em Node 24/PostgreSQL 17. O CI usa Node 26. A integração cobre migrations concorrentes, rollback/retry e cursores Unicode. Lint passa também depois do build, ignorando artefatos gerados. Verificação pontual com Chromium cobriu cadastro, perfil e questionário, sucesso e falha de quota, em viewport móvel; não há suíte E2E incorporada ao CI.


## Testes de segurança e autorização planejados para a API

Antes de qualquer beta, testes de integração devem cobrir:
- IDOR em perfil, comunidade, post, pedido de oração e denúncia;
- membership removido/suspenso, conta restrita e bloqueios globais;
- moderador fora do escopo e conflito de interesse F-08;
- privacidade de pedidos de oração e evidências de denúncia;
- reação Apoiar idempotente, concorrência e ausência de lista nominal;
- rate limit, paginação, validação e respostas sem dados internos;
- revogação de sessão e autorização após mudança de estado da conta.

O contrato OpenAPI atual é draft e não substitui testes contra a implementação real.


## Backend Fastify local

- `npm run api:typecheck`: verifica TypeScript estrito em server/.
- `npm run api:test`: executa testes Fastify inject para health check/catálogo e testes unitários de identidade, políticas e carregadores de contexto de autorização. Valida query/path, requestId não controlado pelo cliente, Problem Details e ausência de rotas de produto.
- `npm run api:build`: compila o servidor para server/dist.
- `npm run api:check`: executa typecheck, testes e build; incluído no CI.

A suíte local não testa autenticação ou autorização real. A integração PostgreSQL cobre somente migration, constraints, filtro active/listed, paginação e as rotas públicas do catálogo.


## Testes de integração PostgreSQL

- `npm run api:db:test` executa dez testes contra um PostgreSQL local/efêmero.
- Testa migrations repetíveis, defaults seguros, constraints, filtro de comunidades públicas, paginação estável, allowlist e integração Fastify/DB.
- Exige `DATABASE_URL` para banco local cujo nome termine em `_test`; o teste remove/recria as tabelas `communities` e `schema_migrations`. Nunca apontar para banco compartilhado ou produção.
- O CI usa PostgreSQL efêmero em serviço de container; nenhum provedor remoto foi selecionado.
