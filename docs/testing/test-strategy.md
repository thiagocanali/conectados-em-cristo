# Estratégia de testes

## Objetivo
Definir como validar comportamento, segurança e qualidade da plataforma.

## Estado atual
`package.json` disponibiliza `npm run build` e `npm run lint`. Não há script ou suíte automatizada de unidade, integração, contrato, acessibilidade ou E2E configurada. A revisão visual manual não substitui esses testes.

## Escopo planejado
Testes unitários, integração, contrato, acessibilidade, segurança e ponta a ponta.

## Princípios
- Testar regras de negócio e controles de autorização.
- Priorizar fluxos críticos do MVP.
- Reproduzir regressões com testes automatizados.
- Não usar dados reais em ambientes de teste.

## Decisões pendentes
- Frameworks e cobertura mínima.
- Dados e ambientes de teste.
- Critérios de aprovação do pipeline.

## TODOs
- Resolver o framework de testes e adicionar testes executáveis para fluxos críticos.
- Transformar os fluxos aprovados do MVP em casos de teste rastreáveis.
- Configurar execução no pipeline e critérios de aprovação.

Status: planejamento; cobertura automatizada ainda não configurada.
