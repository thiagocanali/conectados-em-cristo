# Conectados em Cristo

**Comunidade primeiro. Conexões depois. Relacionamentos como consequência.**

O Conectados em Cristo é uma comunidade digital cristã pensada para aproximar pessoas por meio da fé, interesses, propósito e experiências compartilhadas. Amizades e relacionamentos amorosos podem surgir, mas ninguém precisa estar procurando namoro para encontrar valor na plataforma.

## Estado atual do projeto

Este repositório contém um **protótipo frontend**, não um MVP de produção. A aplicação é uma SPA em Vue 3 com Vue Router 4, Vite 6, CSS próprio e rotas em hash.

Cadastro, sessão, perfis, questionários e interações do frontend são demonstrativos e ficam no navegador, principalmente em `localStorage` e `sessionStorage`. O acesso demonstrativo identifica um perfil local por e-mail e **não autentica a identidade do usuário**. Senhas não são solicitadas nem persistidas. Há um backend Fastify local com health check e catálogo público somente leitura ligado a PostgreSQL quando `DATABASE_URL` está configurada; não há autenticação de servidor, administração de comunidades, memberships, conteúdo compartilhado ou moderação remota.

> **Aviso:** não use o protótipo para armazenar dados sensíveis ou informações pessoais reais. A sessão local pode ser falsificada e não protege rotas nem dados; ela existe apenas para experimentar a interface. Não reutilize senhas.

## O que o protótipo permite experimentar

- Criar um perfil demonstrativo sem senha e entrar/sair por e-mail local (não é autenticação).
- Criar e editar perfil local.
- Explorar perfis de demonstração e perfis locais.
- Registrar interesses, bloqueios, denúncias e perfis salvos localmente.
- Responder ao questionário e visualizar resultados indicativos entre contas do mesmo navegador.
- Experimentar testes locais de dons e personalidade.

Essas ações não conectam usuários reais nem enviam denúncias a uma equipe de moderação.

## Stack identificada

- Vue 3
- Vue Router 4
- Vite 6
- CSS próprio
- ESLint com parser Babel para JavaScript legado

Pinia e Tailwind aparecem nas dependências, mas não há uso identificado na interface atual. A configuração inclui GitHub Pages e Vercel; o destino de produção ativo precisa ser confirmado.

## Desenvolvimento local

Requisitos: Node.js 22, 24 ou 26 LTS e npm. Recomendado: Node.js 26 (versão definida em `.nvmrc`).

```sh
npm ci
npm run dev
```

## Validação e build

```sh
npm run lint
npm run build
```

Há testes unitários/contrato em `npm test`, testes Fastify em `npm run api:test` e integração PostgreSQL do catálogo em `npm run api:db:test`. Ainda não há cobertura de autenticação, outros domínios, componentes, acessibilidade ou E2E.

## Antes de qualquer lançamento real

O produto precisará, no mínimo, de decisões aprovadas sobre escopo e arquitetura, autenticação segura, backend e persistência, autorização por usuário, privacidade e LGPD, moderação operacional, backups, observabilidade, testes automatizados e processos de resposta a incidentes. Nenhum provedor remoto ou credencial de backend está configurado neste repositório.

## Documentação

- [Contexto do projeto](PROJECT_CONTEXT.md) — visão, princípios e estado real do protótipo.
- [Arquitetura do sistema](docs/architecture/system-architecture.md) — implementação atual e histórico da proposta.
- [Arquitetura de backend](docs/architecture/backend.md) — direção técnica aprovada e decisões de fornecedores ainda pendentes.
- [Plano do MVP](docs/product/mvp.md) — proposta ainda não aprovada.
- [Roadmap](docs/product/roadmap.md) — decisões e próximos passos sem cronograma aprovado.
- [ADRs](docs/decisions/README.md) — decisões arquiteturais e seus status.
- [Estratégia de testes](docs/testing/test-strategy.md) — capacidades atuais e plano de validação.
- [Threat model](docs/security/threat-model.md) — ameaças e controles iniciais.
- [Autorização](docs/security/authorization.md) — matriz inicial por papel e recurso.
- [Contrato OpenAPI](docs/api/openapi.json) — draft de endpoints; health check e catálogo público implementados localmente.
- [Contrato público do catálogo](docs/product/community-catalog-public-contract.md) — allowlist F-07 e limites de privacidade.
- [Esquema PostgreSQL](docs/database/communities-schema.md) — migration inicial, índices e execução local.
- [Avaliação de autenticação](docs/security/auth-provider-evaluation.md) — comparação de Supabase Auth, Clerk e Better Auth; nenhum provedor selecionado.


## API e catálogo local

O backend Fastify oferece health check e leitura pública do catálogo de comunidades. O catálogo exige PostgreSQL local; sem `DATABASE_URL`, as rotas de catálogo retornam 503 em vez de fingir uma lista vazia.

1. Instale dependências: `npm ci`.
2. Inicie um PostgreSQL local (exemplo apenas para desenvolvimento):
   ```bash
   docker run --name conectados-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=conectados_dev -p 5432:5432 -d postgres:17-alpine
   ```
3. Configure a conexão local:
   ```bash
   export DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/conectados_dev
   ```
4. Aplique o esquema: `npm run api:migrate`.
5. Inicie a API: `npm run api:dev`.
6. Consulte:
   - `GET http://127.0.0.1:3001/api/v1/health/live`
   - `GET http://127.0.0.1:3001/api/v1/communities`

O banco começa vazio; ainda não existe endpoint administrativo para cadastrar comunidades. Não use dados pessoais, dados religiosos ou pedidos de oração reais. As credenciais do exemplo são exclusivamente locais e não devem ser reutilizadas.

### Testes PostgreSQL

`npm run api:db:test` executa testes destrutivos de migration/schema e exige um banco local separado cujo nome termine em `_test` (por exemplo, `conectados_test`). O teste remove e recria as tabelas `communities` e `schema_migrations`; nunca aponte essa variável para banco de desenvolvimento ou produção. O CI usa um serviço PostgreSQL efêmero.
