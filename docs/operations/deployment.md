# Deploy

## Configuração atual do repositório
- `npm run build` usa Vite 6 e gera `dist/`.
- `.github/workflows/deploy.yml` configura publicação do `dist/` no branch `gh-pages` quando há push em `main`.
- `vite.config.mjs` define base `/conectados-em-cristo/` para GitHub Pages e `/` na Vercel.
- `vercel.json` executa `npm run build && npm run api:build`, publica `dist/` e encaminha `/api` e `/api/*` para `api/index.mjs` antes do fallback da SPA.
- Há configuração para GitHub Pages e Vercel. Em 11/11/2026, a API Vercel confirmou produção READY no commit `ea5bd28fb794cfc6974b64814c6d5e8b5b5b5f57` da branch `main`, projeto `conectados-em-cristo` (`prj_xr750N8Zealf39uQVqHfegyLzgdt`).
- `https://conectados-em-cristo.vercel.app` respondeu HTTP 200, com HTML e assets do protótipo. O alias `conectadosemcristo-site.vercel.app`, retornado por `get_project`, respondeu 404 `DEPLOYMENT_NOT_FOUND`; os aliases retornados não incluem o domínio informado. A causa e o domínio canônico precisam ser reconciliados antes de alterar DNS ou aliases.
- A produção inspecionada ainda usa a configuração anterior, que publica apenas a SPA. Esta revisão prepara a Function Fastify; sua presença no código não comprova que a produção já a publicou. Não interpretar HTTP 200 com HTML como health check de backend.

## Function Fastify preparada nesta revisão

- `api/index.mjs` importa o backend compilado e reutiliza uma instância Fastify por processo, sem chamar `listen()` nem executar migrations.
- O entrypoint usa um pool de no máximo uma conexão por instância; a concorrência total da plataforma ainda precisa ser dimensionada antes de conectar banco remoto. Conexões ociosas expiram após um segundo; a aplicação standalone também usa esse timeout.
- Sem `DATABASE_URL`, `/api/v1/health/live` retorna 200 JSON e o catálogo retorna 503 JSON. O health check confirma o processo, não a disponibilidade do banco.
- `npm run api:check` inclui typecheck, testes, compilação e smoke test HTTP do entrypoint compilado. Esse smoke test desativa explicitamente a conexão com banco, inclusive no CI.
- Para validar a preview: conferir health 200, catálogo 503 sem banco, `/api` e `/api/v1/inexistente` com 404 JSON, parâmetros inválidos com 400 JSON e assets/frontend preservados.
- Não configurar banco de produção em previews. A preparação Supabase e seus gates estão em [vercel-supabase-readiness.md](vercel-supabase-readiness.md). Nenhuma migration remota é executada pelo build.
- Em caso de falha da aplicação, restaurar o deployment anterior; esta revisão não altera o esquema de banco. A promoção de produção deve ocorrer somente depois da validação da preview e revisão do PR.

## Objetivo
Promover mudanças com rastreabilidade e rollback.

## Requisitos
Checks obrigatórios, ambientes separados, migrações reversíveis quando possível e revisão antes de produção.

## TODOs
- Confirmar o destino de produção ativo e documentar o processo operacional realmente usado.
- Definir checks, aprovações, rollback e tratamento de falha de deploy.

Status: deploy de produção Vercel confirmado; backend remoto, domínio canônico e processo operacional ainda pendentes.
