# Frontend

## Estado implementado

- SPA em Vue 3, inicializada em `src/main.js`.
- Vue Router 4 com `createWebHashHistory`.
- Build e servidor de desenvolvimento usam Vue CLI 5 (`vue-cli-service`); Vite não está configurado.
- `src/App.vue` fornece navegação, atalho para o conteúdo, landmark principal e rodapé compartilhados.
- Tokens e estilos compartilhados ficam em `src/assets/global.css`; páginas usam estilos locais ou scoped.
- Estado de conta, perfil, questionário e interações é gerenciado pelos componentes e persistido em `localStorage`/ `sessionStorage`.
- Pinia está instalado, mas não há uso identificado na interface atual.
- Não há cliente HTTP, API ou serviço de autenticação no código atual.

## Rotas existentes

`/`, `/login`, `/cadastro`, `/questionario`, `/testedons`, `/testepersonalidade`, `/resultados`, `/dashboard`, `/perfil`, `/descoberta`, `/salvos` e `/oracoes`.

As rotas privadas verificam a presença de uma sessão local. Isso é uma barreira de navegação demonstrativa, não autorização segura: o usuário pode alterar dados no navegador.

## Limites do protótipo

A persistência local não sincroniza dispositivos nem substitui autenticação ou autorização de servidor. Não utilizar o protótipo para dados pessoais sensíveis ou credenciais reutilizadas.

## Decisões pendentes

- Manter Vue CLI ou aprovar migração de frontend; ADR-0003 está pendente.
- Definir estratégia de estado apenas se a complexidade atual exigir.
- Aprovar arquitetura de API, backend, autenticação e persistência antes de integrações remotas.
- Definir processo e ferramentas de testes automatizados.

## TODOs

- Separar UI e serviços de domínio quando a API for aprovada.
- Consolidar componentes compartilhados e validar acessibilidade em todas as rotas.

Status: protótipo frontend implementado parcialmente; arquitetura de produção pendente.
