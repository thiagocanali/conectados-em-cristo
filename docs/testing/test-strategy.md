# Estratégia de testes

## Objetivo

Definir como validar comportamento, segurança e qualidade da plataforma.

## Estado atual

- `npm test` executa o Node.js Test Runner (`node --test`).
- Existe uma suíte em `tests/safeStorage.test.js` com cinco casos para parsing seguro de JSON e validação do progresso do teste de dons.
- `npm run lint` executa ESLint por meio de `vue-cli-service lint`.
- `npm run build` executa o build Vue CLI.
- O CI executa lint, testes unitários e build de produção em jobs separados.
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

Status: cinco testes unitários de utilitários executáveis; cobertura de produto ainda limitada.
