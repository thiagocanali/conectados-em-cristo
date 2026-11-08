# Conectados em Cristo

**Comunidade primeiro. Conexões depois. Relacionamentos como consequência.**

O Conectados em Cristo é uma comunidade digital cristã pensada para aproximar pessoas por meio da fé, interesses, propósito e experiências compartilhadas. Amizades e relacionamentos amorosos podem surgir, mas ninguém precisa estar procurando namoro para encontrar valor na plataforma.

## Estado atual do projeto

Este repositório contém um **protótipo frontend**, não um MVP de produção. A aplicação é uma SPA em Vue 3 com Vue Router 4, Vite 6, CSS próprio e rotas em hash.

Cadastro, sessão, perfis, questionários e interações são demonstrativos e ficam no navegador, principalmente em `localStorage` e `sessionStorage`. O acesso demonstrativo identifica um perfil local por e-mail e **não autentica a identidade do usuário**. Senhas não são solicitadas nem persistidas. Não há API, backend, banco de dados, autenticação de servidor, sincronização entre dispositivos ou moderação remota.

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

Há testes unitários executados por `npm test` (Node.js Test Runner), incluindo utilitários de armazenamento e o serviço de sessão demonstrativa. Ainda não há cobertura automatizada de componentes, integração, acessibilidade ou E2E.

## Antes de qualquer lançamento real

O produto precisará, no mínimo, de decisões aprovadas sobre escopo e arquitetura, autenticação segura, backend e persistência, autorização por usuário, privacidade e LGPD, moderação operacional, backups, observabilidade, testes automatizados e processos de resposta a incidentes. Não há provedores ou credenciais de backend configurados neste repositório.

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
- [Contrato OpenAPI](docs/api/openapi.json) — draft de endpoints, não implementado.
- [Contrato público do catálogo](docs/product/community-catalog-public-contract.md) — allowlist F-07 e limites de privacidade.


## API local (prova técnica)

O backend ainda é somente uma prova local com Fastify. Para iniciar:

1. Instale as dependências com `npm ci`.
2. Execute `npm run api:dev`.
3. Consulte `http://127.0.0.1:3001/api/v1/health/live`.

O único endpoint disponível é o health check. Não há autenticação real, banco, cadastro, dados compartilhados ou rotas de comunidade. Não use dados pessoais ou pedidos de oração reais.
