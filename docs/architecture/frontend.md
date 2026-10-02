# Frontend

## Estado implementado
- SPA em Vue 3, inicializada em `src/main.js` e roteada por Vue Router 4 com `createWebHashHistory`.
- Build e servidor de desenvolvimento usam Vue CLI 5 (`vue-cli-service`); Vite não está configurado.
- `src/App.vue` fornece navegação, landmark principal e rodapé compartilhados.
- Tokens e estilos compartilhados ficam em `src/assets/global.css`; páginas usam estilos locais/scoped.
- Estado de conta, perfil e interações é gerenciado por componentes e persistido em `localStorage`/`sessionStorage`; Pinia está instalado, mas não é usado.
- Não há cliente HTTP, API ou serviço de autenticação no código atual.

## Rotas existentes
`/`, `/login`, `/cadastro`, `/questionario`, `/testedons`, `/testepersonalidade`, `/resultados`, `/dashboard`, `/perfil`, `/descoberta` e `/salvos`.

## Limites do protótipo
A persistência local não sincroniza dispositivos nem substitui autenticação ou autorização de servidor. A estrutura atual não deve ser usada para dados pessoais reais.

## Decisões pendentes
- Manter a stack Vue CLI ou aprovar uma migração; ADR-0003 está pendente.
- Definir estratégia de estado apenas se a complexidade atual exigir.
- Aprovar arquitetura de API, backend e autenticação antes de integrações remotas.
- Definir processo e ferramentas de testes automatizados.

## TODOs
- Separar UI e serviços de domínio quando a API for aprovada.
- Consolidar componentes compartilhados e validar acessibilidade em todas as rotas.

Status: protótipo implementado parcialmente; arquitetura de produção pendente.
