# Conectados em Cristo

**Jesus no centro. Aprender juntos. Servir na vida real.**

O Conectados em Cristo ajuda pessoas e comunidades cristãs a conhecer Jesus pelas Escrituras e levar o aprendizado para o cuidado e o serviço. A primeira jornada útil oferece estudos públicos e roteiros para igrejas, pequenos grupos e amigos.

## Estado atual do projeto

Este repositório oferece **estudos bíblicos públicos e preparação de roteiros de encontro**, além de protótipos locais legados e uma prova técnica de API. Ainda não é uma comunidade online operacional. A aplicação é uma SPA em Vue 3 com Vue Router 4, Vite 6, CSS próprio e rotas em hash.

Cadastro, sessão, perfis, questionários e interações do frontend são demonstrativos e ficam no navegador, principalmente em `localStorage` e `sessionStorage`. O acesso demonstrativo identifica um perfil local por e-mail e **não autentica a identidade do usuário**. Senhas não são solicitadas nem persistidas. Há um backend Fastify local com health check e catálogo público somente leitura ligado a PostgreSQL quando `DATABASE_URL` está configurada; não há autenticação de servidor, administração de comunidades, memberships, conteúdo compartilhado ou moderação remota.

> **Aviso:** não use o protótipo para armazenar dados sensíveis ou informações pessoais reais. A sessão local pode ser falsificada e não protege rotas nem dados; ela existe apenas para experimentar a interface. Não reutilize senhas.

## O que já pode ser usado

- `/estudos`: quatro guias originais dos Evangelhos, com filtro por tema.
- `/estudos/:slug`: leitura referenciada, contexto, três perguntas e uma prática para a semana; [folha completa](docs/participant-study-sheet.md) para baixar em texto ou imprimir e levar ao encontro.
- `/caminhada`: sequência inicial de quatro encontros, propostas entre encontros e kit completo para download; a duração escolhida é mantida nos roteiros.
- `/em-comunidade`: roteiro de 30, 45 ou 60 minutos, preparação/contexto bíblico, condução por etapas, link compartilhável, download em texto e impressão completa. O link preserva estudo e duração.
- `/igrejas`: orientação para usar os materiais com a comunidade local.

Essa jornada é pública e não exige cadastro. Não grava histórico pessoal nem coleta participantes, relatos ou notas. As passagens são referências para ler na própria Bíblia ou em um site externo; os textos de apoio são originais. Veja os [critérios editoriais](docs/product/editorial-guidelines.md).

## Área experimental preservada

Os recursos abaixo ficam acessíveis por `/laboratorio` e não são o núcleo do produto:

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

Pinia e Tailwind aparecem nas dependências, mas não há uso identificado na interface atual. A configuração inclui GitHub Pages e Vercel; a Vercel possui deploy de produção confirmado; GitHub Pages também tem workflow configurado. Consulte [Deploy](docs/operations/deployment.md) para a evidência e a divergência de aliases.

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
npx playwright install --with-deps chromium
npm run test:e2e
```

Há testes unitários/contrato em `npm test`, testes Fastify em `npm run api:test` e integração PostgreSQL do catálogo em `npm run api:db:test`. Ainda não há cobertura de autenticação remota, outros domínios, componentes ou acessibilidade. A jornada pública tem testes Playwright no CI sobre builds de produção, em Chromium desktop/móvel e nas bases Vercel/GitHub Pages. Veja [execução e limites E2E](docs/testing/e2e-testing.md).

## Antes de participação online com dados reais

O produto precisará, no mínimo, de decisões aprovadas sobre escopo e arquitetura, autenticação segura, backend e persistência, autorização por usuário, privacidade e LGPD, moderação operacional, backups, observabilidade, testes automatizados e processos de resposta a incidentes. Foi provisionado um Supabase gratuito em São Paulo para homologação do catálogo, com RLS e papel restrito; a conexão da API com esse banco ainda está pendente. Veja [estado e verificações da integração](docs/operations/vercel-supabase-readiness.md). Nenhuma credencial deve ser gravada no repositório.

## Documentação

- [Revisão de engenharia de 11/11/2026](AUDIT_REPORT.md) — correções, evidências e próximos passos.

- [Contexto do projeto](PROJECT_CONTEXT.md) — visão, princípios e estado real do protótipo.
- [Arquitetura do sistema](docs/architecture/system-architecture.md) — implementação atual e histórico da proposta.
- [Arquitetura de backend](docs/architecture/backend.md) — direção técnica aprovada e decisões de fornecedores ainda pendentes.
- [Plano do MVP](docs/product/mvp.md) — direção comunitária aprovada; implementação e gates ainda pendentes.
- [Roadmap](docs/product/roadmap.md) — decisões e próximos passos sem cronograma aprovado.
- [ADRs](docs/decisions/README.md) — decisões arquiteturais e seus status, incluindo identidade interna portável.
- [Estratégia de testes](docs/testing/test-strategy.md) — capacidades atuais e plano de validação.
- [Threat model](docs/security/threat-model.md) — ameaças e controles iniciais.
- [Autorização](docs/security/authorization.md) — matriz inicial por papel e recurso.
- [Contrato OpenAPI](docs/api/openapi.json) — draft de endpoints; health check e catálogo público implementados localmente.
- [Contrato público do catálogo](docs/product/community-catalog-public-contract.md) — allowlist F-07 e limites de privacidade.
- [Esquema PostgreSQL](docs/database/communities-schema.md) — migration inicial, índices e execução local.
- [Avaliação de autenticação](docs/security/auth-provider-evaluation.md) — comparação de Supabase Auth, Clerk e Better Auth; nenhum provedor selecionado.
- [Fronteira de identidade](docs/security/identity-boundary.md) — conta interna, identidades externas e portabilidade.


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
