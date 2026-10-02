# Conectados em Cristo

## Estado atual

Este repositório contém um protótipo navegável em Vue 3, com Vue Router em modo hash e estilos CSS próprios. Cadastro, sessão, perfil, respostas e interações são armazenados no navegador; não há backend, banco de dados, provedor de autenticação ou moderação remota. A senha de cadastro é armazenada localmente sem proteção de servidor. Não use senhas reutilizadas nem dados pessoais sensíveis neste protótipo.

A configuração de build é Vue CLI (`vue-cli-service`), não Vite. Tailwind e Pinia aparecem nas dependências, mas não são usados pela interface atual.

## Desenvolvimento

```sh
npm install
npm run serve
```

## Validação e build

```sh
npm run lint
npm run build
```

Não há suíte automatizada de testes configurada no `package.json`.

## Deploy

`vue.config.js` define o caminho-base para GitHub Pages e Vercel; `.github/workflows/deploy.yml` publica o build do branch `main` no branch `gh-pages`. `vercel.json` configura build e rewrites para Vercel. Confirme o destino de produção ativo antes de publicar.

## Documentação

- [Contexto do projeto](PROJECT_CONTEXT.md): implementação atual e pendências
- [Arquitetura do sistema](docs/architecture/system-architecture.md): alvo proposto e limites atuais
- [Plano do MVP](docs/product/mvp.md): escopo proposto, não aprovado
- [ADRs](docs/decisions/README.md): decisões técnicas e respectivos status
