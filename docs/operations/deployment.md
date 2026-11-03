# Deploy

## Configuração atual do repositório
- `npm run build` usa Vue CLI e gera `dist/`.
- `.github/workflows/deploy.yml` configura publicação do `dist/` no branch `gh-pages` quando há push em `main`.
- `vue.config.js` define base `/conectados-em-cristo/` fora da Vercel e `/` quando `VERCEL` está definido.
- `vercel.json` declara build Vue e rewrite para `index.html`.
- Há configuração para GitHub Pages e Vercel; o ambiente de produção ativo e os critérios de publicação não estão confirmados.

## Objetivo
Promover mudanças com rastreabilidade e rollback.

## Requisitos
Checks obrigatórios, ambientes separados, migrações reversíveis quando possível e revisão antes de produção.

## TODOs
- Confirmar o destino de produção ativo e documentar o processo operacional realmente usado.
- Definir checks, aprovações, rollback e tratamento de falha de deploy.

Status: configuração de build/deploy presente; operação de produção não confirmada.
