# Estratégia de testes

## Objetivo

Definir como validar comportamento, segurança e qualidade da plataforma.

## Estado atual

- `npm test` executa o Node.js Test Runner (`node --test`).
- `tests/safeStorage.test.mjs` cobre parsing seguro de JSON e validação do progresso do teste de dons.
- `tests/demoAuth.test.mjs` cobre cadastro demonstrativo, login/logout, remoção de credenciais legadas, limpeza da sessão e descarte seguro de storage inválido.
- `tests/demoAuthGuard.test.mjs` cobre rotas públicas/privadas, redirecionamento, retorno ao destino original e validação de sessão.
- `tests/openapi.test.mjs` valida JSON OpenAPI 3.1, referências internas, operationIds, parâmetros de rota e autenticação em operações de escrita.
- `npm run lint` executa ESLint CLI diretamente.
- `npm run build` executa `vite build`.
- O CI executa lint, testes unitários, build de produção e auditoria npm completa/de produção em jobs separados.
- A auditoria publica artefato JSON temporário por 14 dias; ela é informativa e não executa atualizações automáticas.
- Não há cobertura automatizada identificada para componentes, integração, contratos de API, acessibilidade ou E2E.

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

Status: vinte e três testes unitários executáveis; lint e build migrados para Vite/ESLint CLI; cobertura de produto ainda limitada.


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
