# Conectados em Cristo

**Comunidade primeiro. Conexões depois. Relacionamentos como consequência.**

O Conectados em Cristo é uma comunidade digital cristã pensada para aproximar pessoas por meio da fé, interesses, propósito e experiências compartilhadas. Amizades e relacionamentos amorosos podem surgir, mas ninguém precisa estar procurando namoro para encontrar valor na plataforma.

## Estado atual do projeto

Este repositório contém um **protótipo frontend**, não um MVP de produção. A aplicação é uma SPA em Vue 3 com Vue Router 4, Vite 6, CSS próprio e rotas em hash.

Alguns perfis, questionários e interações antigas permanecem demonstrativos e locais. Cadastro e login foram desabilitados até existir autenticação server-side; rotas com dados de perfil redirecionam para essa tela informativa. Não há API, backend, banco de dados, sincronização entre dispositivos ou moderação remota.

> **Aviso:** não use o protótipo para armazenar dados sensíveis, senhas reutilizadas ou informações pessoais reais. A autenticação local não oferece segurança de produção.

## O que o protótipo permite experimentar

- Visualizar páginas informativas de apresentação e oração.
- Experimentar os testes locais de dons e personalidade, sem valor clínico ou diagnóstico.
- Navegar para cadastro e login e ver que estão indisponíveis até a implementação do backend.

Essas ações não conectam usuários reais nem enviam denúncias a uma equipe de moderação.

## Stack identificada

- Vue 3
- Vue Router 4
- Vite 6
- CSS próprio
- ESLint com parser Babel para JavaScript legado

Pinia e Tailwind aparecem nas dependências, mas não há uso identificado na interface atual. GitHub Pages está configurado e o GitHub declara `conectadosemcristo-site.vercel.app` como homepage; a URL alternativa `conectados-em-cristo.vercel.app` não existe (404). A equipe ainda precisa confirmar formalmente o destino oficial.

## Desenvolvimento local

Requisitos: Node.js e npm compatíveis com as dependências do projeto.

```sh
npm ci
npm run serve
```

## Validação e build

```sh
npm run lint
npm run build
```

Há uma suíte pequena de sete testes unitários executados por `npm test` (Node.js Test Runner), focada em utilitários de armazenamento e remoção de senhas legadas. Ainda não há cobertura automatizada de componentes, integração, acessibilidade ou E2E.

## Antes de qualquer lançamento real

O produto precisará, no mínimo, de decisões aprovadas sobre escopo e arquitetura, autenticação segura, backend e persistência, autorização por usuário, privacidade e LGPD, moderação operacional, backups, observabilidade, testes automatizados e processos de resposta a incidentes. Não há provedores ou credenciais de backend configurados neste repositório.

## Documentação

- [Contexto do projeto](PROJECT_CONTEXT.md) — visão, princípios e estado real do protótipo.
- [Relatório de auditoria](AUDIT_REPORT.md) — evidências e lacunas técnicas verificadas.
- [Arquitetura do sistema](docs/architecture/system-architecture.md) — implementação atual e arquitetura futura proposta.
- [Plano do MVP](docs/product/mvp.md) — proposta ainda não aprovada.
- [Roadmap](docs/product/roadmap.md) — decisões e próximos passos sem cronograma aprovado.
- [ADRs](docs/decisions/README.md) — decisões arquiteturais e seus status.
- [Estratégia de testes](docs/testing/test-strategy.md) — capacidades atuais e plano de validação.
