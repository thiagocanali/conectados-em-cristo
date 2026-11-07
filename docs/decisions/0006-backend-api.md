# ADR-0006: Backend API — Fastify + TypeScript

## Contexto
O frontend atual é uma SPA Vue 3 + Vite. O produto requer API autoritativa para identidade, perfis, comunidades, conteúdo, denúncias, moderação e auditoria. A equipe precisa manter um monólito simples, testável e de baixo custo operacional, sem iniciar com microsserviços.

## Problema
Definir o framework e a organização da API sem escolher prematuramente banco/provedor, autenticação, storage, e-mail ou hospedagem.

## Opções consideradas
- **Fastify + TypeScript:** baixo overhead, schemas explícitos, plugins e boa composição modular.
- **NestJS + TypeScript:** convenções e DI maduras, com maior boilerplate.
- **Express + TypeScript:** ecossistema amplo, mas exige padronizar mais decisões manualmente.

## Decisão
**Aprovada em 2026-11-07:** Node.js 26 LTS + TypeScript + Fastify em monólito modular. A API será REST, versionada em `/api/v1`, com contratos OpenAPI e validação explícita de entrada/saída. Módulos iniciais:
1. Identity & Accounts
2. Profiles & Privacy
3. Communities & Memberships
4. Content & Interactions
5. Prayer & Faith Content
6. Reports & Moderation
7. Administration & Audit

A API será a autoridade para autenticação, autorização, estado da conta, bloqueios, visibilidade e regras de domínio. O frontend nunca acessará credenciais administrativas do banco.

## Limites da decisão
- PostgreSQL foi aprovado como tecnologia no ADR-0004, mas o provedor permanece pendente.
- A estratégia de autenticação gerenciada foi aprovada no ADR-0005, mas o provedor permanece pendente.
- Storage, e-mail e hospedagem da API continuam pendentes.
- Esta decisão não autoriza contratação, provisionamento, dados reais ou lançamento.
- A prova técnica local só deve usar dados sintéticos e endpoints não sensíveis, após threat model, classificação de dados e contratos mínimos.

## Consequências
- Positivas: estrutura simples, fronteiras de domínio explícitas, validação e documentação da API.
- Negativas: padrões de módulos, observabilidade, validação e persistência precisarão ser definidos e mantidos.
- Mitigações: manter monólito modular, evitar abstrações prematuras, cobrir autorização com testes negativos e documentar decisões adicionais em ADRs.

## Data
2026-11-07

## Status
Aceito — direção técnica. Prova local condicionada a threat model e contratos mínimos; fornecedores e provisionamento pendentes.

## Próximos passos
- Elaborar threat model e classificação de dados.
- Definir contratos OpenAPI iniciais e matriz de autorização.
- Criar prova técnica local com health check e testes, sem integração remota.
