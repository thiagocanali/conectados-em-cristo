# Frontend

## Estado implementado

- SPA em Vue 3, inicializada em `src/main.js`.
- Vue Router 4 com `createWebHashHistory()`.
- Build e servidor de desenvolvimento usam Vue CLI 5 (`@vue/cli-service@5.0.9`); Vite ainda não está configurado.
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

- `public/index.html` é a entrada HTML do Vue CLI e contém o placeholder `<%= BASE_URL %>`.
- `vue.config.js` define base `/conectados-em-cristo/` fora da Vercel e `/` quando `VERCEL` está definido.
- Vercel e GitHub Pages têm configurações de build/deploy; o destino de produção ativo ainda não está confirmado.
- O pipeline usa Node 20 e npm lockfile v3.

## Limites do protótipo

A persistência local não sincroniza dispositivos nem substitui autenticação ou autorização de servidor. Não utilizar o protótipo para dados pessoais sensíveis ou credenciais reutilizadas.

## Decisões e evolução

- A recomendação de modernização Vue CLI → Vite foi detalhada em `docs/architecture/vue-cli-to-vite-migration-plan.md`; execução ainda depende de revisão/aprovação.
- Preservar Vue 3, Vue Router, hash routing, CSS próprio e comportamento atual.
- Não introduzir TypeScript em massa na mesma PR da migração de build.
- Definir estratégia de estado apenas se a complexidade atual exigir.
- Aprovar arquitetura de API, backend, autenticação e persistência antes de integrações remotas.

## TODOs

- Executar a migração isolada após aprovação do plano.
- Separar UI e serviços de domínio quando a API for aprovada.
- Consolidar componentes compartilhados e validar acessibilidade em todas as rotas.

Status: protótipo frontend implementado parcialmente; arquitetura de produção pendente.
