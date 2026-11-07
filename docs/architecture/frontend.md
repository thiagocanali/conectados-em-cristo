# Frontend

## Estado implementado

- SPA em Vue 3, inicializada em `src/main.js`.
- Vue Router 4 com `createWebHashHistory()`.
- Build e servidor de desenvolvimento usam Vite 6; Vue CLI não faz mais parte da toolchain ativa.
- JavaScript com Vue SFC; não há TypeScript configurado.
- `src/App.vue` fornece navegação, atalho para o conteúdo, landmark principal e rodapé compartilhados.
- Tokens e estilos compartilhados ficam em `src/assets/global.css`; páginas usam estilos locais ou scoped.
- O alias `@/*` aponta para `src/*` em `jsconfig.json` e é usado no router e em `TesteDonsPage.vue`.
- Estado de conta, perfil, questionário e interações é gerenciado pelos componentes e persistido em `localStorage`/ `sessionStorage`.
- Pinia está instalado, mas não há uso identificado na busca estática.
- Tailwind está instalado, mas não há configuração/uso identificado na busca estática.
- Não há cliente HTTP, API ou serviço de autenticação no código atual.

## Rotas existentes

`/`, `/login`, `/cadastro`, `/questionario`, `/testedons`, `/testepersonalidade`, `/resultados`, `/dashboard`, `/perfil`, `/descoberta`, `/salvos` e `/oracoes`.

As rotas privadas verificam a presença de uma sessão local. Isso é uma barreira de navegação demonstrativa, não autorização segura: o usuário pode alterar dados no navegador.

## Build e deploy atuais

- `index.html` na raiz é a entrada HTML processada pelo Vite e usa `%BASE_URL%` para o favicon.
- `vite.config.mjs` define base `/` na Vercel e `/conectados-em-cristo/` no build do GitHub Pages; o servidor local usa `/`.
- Vercel e GitHub Pages têm configurações de build/deploy; o destino de produção ativo ainda não está confirmado.
- O pipeline usa Node 20 e npm lockfile v3.

## Limites do protótipo

A persistência local não sincroniza dispositivos nem substitui autenticação ou autorização de servidor. Não utilizar o protótipo para dados pessoais sensíveis ou credenciais reutilizadas.

## Decisões e evolução

- A migração Vue CLI → Vite foi concluída na PR #23; lint, testes unitários, build e preview Vercel foram validados.
- Preservar Vue 3, Vue Router, hash routing, CSS próprio e comportamento atual.
- Não introduzir TypeScript em massa; avaliar adoção gradual em tarefa isolada.
- Definir estratégia de estado apenas se a complexidade atual exigir.
- Aprovar arquitetura de API, backend, autenticação e persistência antes de integrações remotas.

## TODOs

- Validar todas as 12 rotas, hash routing, assets e bases Vercel/GitHub Pages no CI e em smoke test.
- Separar UI e serviços de domínio quando a API for aprovada.
- Consolidar componentes compartilhados e validar acessibilidade em todas as rotas.

Status: protótipo frontend implementado parcialmente; arquitetura de produção pendente.
