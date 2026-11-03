# Conectados em Cristo

**Comunidade primeiro. Conexões depois. Relacionamentos como consequência.**

O Conectados em Cristo é uma comunidade digital cristã pensada para aproximar pessoas por meio da fé, interesses, propósito e experiências compartilhadas. Amizades e relacionamentos amorosos podem surgir, mas ninguém precisa estar procurando namoro para encontrar valor na plataforma.

## Estado atual do projeto

Este repositório contém um **protótipo frontend**, não um MVP de produção. A aplicação é uma SPA em Vue 3 com Vue Router 4, Vue CLI 5, CSS próprio e rotas em hash.

Cadastro, sessão, perfis, questionários e interações são demonstrativos e ficam no navegador, principalmente em `localStorage` e `sessionStorage`. Não há API, backend, banco de dados, autenticação de servidor, sincronização entre dispositivos ou moderação remota.

> **Aviso:** não use o protótipo para armazenar dados sensíveis, senhas reutilizadas ou informações pessoais reais. A autenticação local não oferece segurança de produção.

## O que o protótipo permite experimentar

- Criar uma conta demonstrativa e entrar/sair.
- Criar e editar perfil local.
- Explorar perfis de demonstração e perfis locais.
- Registrar interesses, bloqueios, denúncias e perfis salvos localmente.
- Responder ao questionário e visualizar resultados indicativos entre contas do mesmo navegador.
- Experimentar testes locais de dons e personalidade.

Essas ações não conectam usuários reais nem enviam denúncias a uma equipe de moderação.

## Stack identificada

- Vue 3
- Vue Router 4
- Vue CLI 5 / `vue-cli-service`
- CSS próprio
- Babel e ESLint

Pinia e Tailwind aparecem nas dependências, mas não há uso identificado na interface atual. A configuração inclui GitHub Pages e Vercel; o destino de produção ativo precisa ser confirmado.

## Desenvolvimento local

Requisitos: Node.js e npm compatíveis com as dependências do projeto.

```sh
npm install
npm run serve
```

## Validação e build

```sh
npm run lint
npm run build
```

Não há suíte automatizada de testes unitários, integração ou E2E configurada atualmente.

## Antes de qualquer lançamento real

O produto precisará, no mínimo, de decisões aprovadas sobre escopo e arquitetura, autenticação segura, backend e persistência, autorização por usuário, privacidade e LGPD, moderação operacional, backups, observabilidade, testes automatizados e processos de resposta a incidentes. Não há provedores ou credenciais de backend configurados neste repositório.

## Documentação

- [Contexto do projeto](PROJECT_CONTEXT.md) — visão, princípios e estado real do protótipo.
- [Arquitetura do sistema](docs/architecture/system-architecture.md) — implementação atual e arquitetura futura proposta.
- [Plano do MVP](docs/product/mvp.md) — proposta ainda não aprovada.
- [Roadmap](docs/product/roadmap.md) — decisões e próximos passos sem cronograma aprovado.
- [ADRs](docs/decisions/README.md) — decisões arquiteturais e seus status.
- [Estratégia de testes](docs/testing/test-strategy.md) — capacidades atuais e plano de validação.
