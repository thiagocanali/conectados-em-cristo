# Deploy

## Configuração atual do repositório
- `npm run build` usa Vite 6 e gera `dist/`.
- `.github/workflows/deploy.yml` configura publicação do `dist/` no branch `gh-pages` quando há push em `main`.
- `vite.config.mjs` define base `/conectados-em-cristo/` para GitHub Pages e `/` na Vercel.
- `vercel.json` executa `npm run build`, publica `dist/` e mantém o rewrite para `index.html`.
- Há configuração para GitHub Pages e Vercel. Em 11/11/2026, a API Vercel confirmou produção READY no commit `ea5bd28fb794cfc6974b64814c6d5e8b5b5b5f57` da branch `main`, projeto `conectados-em-cristo` (`prj_xr750N8Zealf39uQVqHfegyLzgdt`).
- `https://conectados-em-cristo.vercel.app` respondeu HTTP 200, com HTML e assets do protótipo. O alias `conectadosemcristo-site.vercel.app`, retornado por `get_project`, respondeu 404 `DEPLOYMENT_NOT_FOUND`; os aliases retornados não incluem o domínio informado. A causa e o domínio canônico precisam ser reconciliados antes de alterar DNS ou aliases.
- A configuração publica apenas a SPA. A API Fastify não está implantada por esse build e chamadas `/api/...` podem receber o HTML do rewrite. Não interpretar HTTP 200 como health check de backend.

## Objetivo
Promover mudanças com rastreabilidade e rollback.

## Requisitos
Checks obrigatórios, ambientes separados, migrações reversíveis quando possível e revisão antes de produção.

## TODOs
- Confirmar o destino de produção ativo e documentar o processo operacional realmente usado.
- Definir checks, aprovações, rollback e tratamento de falha de deploy.

Status: deploy de produção Vercel confirmado; backend remoto, domínio canônico e processo operacional ainda pendentes.
