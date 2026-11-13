# Preparação de API Vercel e PostgreSQL Supabase

Data da inspeção: 2026-11-13. Status: proposta técnica; nenhuma implantação de API, migration remota ou contratação executada.

Implementação preparada nesta revisão: Function `api/index.mjs`, runtime compartilhado com o servidor local, build TypeScript no deploy e rewrite dedicado para `/api`. Os testes exercitam o adaptador via HTTP real e o entrypoint compilado sem banco. Isso não conclui a integração Supabase: provisionamento, isolamento de schema, credenciais e validação remota continuam pendentes. As evidências abaixo descrevem o baseline anterior a esta revisão.

## Evidências

- O frontend Vue/Vite publica `dist/`. `vercel.json` não publica o backend e seu rewrite abrangente pode responder HTML a `/api/...`.
- `server/src/server.mts` inicia Fastify, usa `DATABASE_URL` opcional e cria um pool PostgreSQL de até dez conexões por processo. Sem banco, o catálogo retorna 503; o health de processo continua 200.
- A migration `0001_create_communities.up.sql` cria `communities` sem qualificação de schema e sem configuração de RLS. O runner também cria `schema_migrations` sem schema explícito. A implantação Supabase precisa definir isolamento e permissões antes de executar esse SQL.
- A API oferece apenas leitura pública do catálogo. Não há login remoto nem endpoints administrativos de escrita.
- Na Vercel, a produção da branch `main`, commit `6343295b382c0a5e918cef8ec81ace08fff0827b`, estava READY. A tentativa posterior de construir `gh-pages` falhou ao executar `vue-cli-service build`.
- A API Vercel aceitou em 13/11 a alteração de Ignored Build Step para `[ "$VERCEL_GIT_COMMIT_REF" = "gh-pages" ]`. Pela semântica documentada, exit 0 ignora essa branch e exit 1 permite as demais. A efetividade em um novo evento Git ainda não foi observada. O conector de leitura não retorna esse campo para confirmação independente.
- Os projetos Supabase acessíveis eram `meaprovae`, `MonsYs` e `pokemon-tracker`; nenhum vínculo com este produto foi confirmado. Não reutilizar um banco de outro produto por inferência de propriedade.

## Escopo da primeira implantação proposta

Publicar apenas health check e catálogo público existente, inicialmente com dados sintéticos. Manter a aplicação Fastify como autoridade de acesso ao banco. Escolher Supabase PostgreSQL não implica selecionar Supabase Auth nem disponibilizar cadastro real.

## Sequência de implementação

1. Registrar a decisão de hospedagem, projeto Supabase dedicado, ambiente, região e limite de custo. Separar homologação e produção; previews não devem receber credenciais de produção.
2. Preparar um entrypoint Fastify suportado pela Vercel. Avaliar Functions ou Services com documentação vigente e uma preview antes de alterar o roteamento de produção. O caminho atual `.mts`, os imports `.mjs`, o build TypeScript e o ciclo de vida do pool precisam ser comprovados pelo build da plataforma.
3. Encaminhar `/api` e `/api/*` para a API antes do fallback da SPA. Assets, favicon e rotas do frontend devem continuar funcionando. Rotas desconhecidas da API devem responder JSON 404, nunca `index.html`.
4. Configurar conexão PostgreSQL server-side, com TLS validado, pooler apropriado ao runtime e limites de conexão calculados para a concorrência. Não usar `rejectUnauthorized: false`. Separar credencial de migration da credencial de leitura da aplicação.
5. Escolher schema privado fora dos schemas expostos pela Data API; ajustar SQL e runner para nomes qualificados. Se usar schema exposto, habilitar RLS e rever GRANTs de cada tabela, incluindo o histórico de migrations. Nenhum acesso de `anon` ou `authenticated` deve ser criado sem necessidade explícita.
6. Guardar `DATABASE_URL` somente no ambiente servidor. Não criar variável `VITE_*` com credencial de banco. Executar migrations como etapa controlada, nunca automaticamente em cada requisição ou durante builds de preview.
7. Aplicar a migration em homologação vazia, inserir somente fixtures sintéticas e testar a cadeia HTTP → Fastify → PostgreSQL → JSON. Não executar `api:db:test` contra banco remoto: a suíte remove tabelas e exige banco local separado `_test`.
8. Promover somente depois da validação, com identificação do commit, procedimento de rollback de aplicação e estratégia de recuperação do banco. Migrações futuras devem priorizar compatibilidade com a versão anterior.

## Critérios de aceitação

- Lint, testes unitários, `api:check`, integração PostgreSQL em banco efêmero e E2E da jornada pública aprovados.
- `GET /api/v1/health/live`: 200, JSON `{"status":"ok"}`; esse resultado não comprova conexão com banco.
- Catálogo sem `DATABASE_URL`: 503 JSON. Com banco configurado e vazio: 200 JSON com `items: []`.
- Fixtures públicas ativas aparecem; rascunhos e itens não listados não aparecem. Detalhe de item não público retorna 404.
- Paginação, parâmetros inválidos, UUID inválido e indisponibilidade do banco preservam os contratos existentes.
- `/api/v1/inexistente` e `/api` não retornam HTML da SPA. Assets e rotas públicas do frontend continuam acessíveis.
- Verificar isolamento da Data API e permissões de runtime/migration; nenhuma credencial aparece no bundle ou em logs.
- Próximo evento `gh-pages` é ignorado; branch de desenvolvimento continua gerando preview; `main` mantém o fluxo de produção.

## Decisões que esta preparação não toma

Não seleciona provedor de autenticação, não abre participação online e não altera os gates de privacidade, segurança e operação registrados em `backend.md` e no roadmap. Região, orçamento e destino Supabase ainda precisam ser definidos antes de provisionar.

## Referências

- [Arquitetura de backend](../architecture/backend.md)
- [Operação de deploy](deployment.md)
- [Roadmap](../product/roadmap.md)
- [Fastify na Vercel](https://vercel.com/docs/frameworks/backend/fastify)
- [Configuração Vercel e ignoreCommand](https://vercel.com/docs/project-configuration/vercel-json)
- [Segurança da Data API Supabase](https://supabase.com/docs/guides/api/securing-your-api)
