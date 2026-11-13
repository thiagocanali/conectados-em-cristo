# Preparação de API Vercel e PostgreSQL Supabase

Data da inspeção: 2026-11-13. Status: API validada em preview e banco de homologação provisionado; conexão Vercel → PostgreSQL pendente.

Implementação preparada nesta revisão: Function `api/index.mjs`, runtime compartilhado com o servidor local, build TypeScript no deploy e rewrite dedicado para `/api`. A preview do commit `407e2e4` foi validada por HTTP e todo o CI passou. As evidências da próxima seção descrevem o baseline anterior a esta revisão.

## Ambiente Supabase preparado

- Projeto dedicado `conectados-em-cristo`, referência `lsffipvkdpvnwgvdvtni`, organização `thiagocanali's projects`, plano gratuito, São Paulo (`sa-east-1`). Ambiente inicial de homologação, sem dados reais. O usuário autorizou pausar `taskDesk` para liberar a vaga gratuita; sua pausa foi confirmada como `INACTIVE`.
- Aplicada a migration Supabase `bootstrap_public_catalog_with_restricted_reader`, composta pelo SQL de `server/migrations/0001_create_communities.up.sql` e `server/deployment/supabase-catalog-security.sql`. O histórico remoto é mantido pelo Supabase; não executar o runner local `api:migrate` nesse ambiente sem uma reconciliação explícita dos históricos.
- Escolhido `public.communities` com RLS habilitada e forçada, sem permissões de tabela para `PUBLIC`, `anon` ou `authenticated`. A Data API não é a interface do produto. O papel `cec_catalog_reader` só pode consultar as colunas necessárias e as linhas ativas/listadas. Não é superusuário, não tem BYPASSRLS nem permissão de escrita; seu LOGIN permanece desativado até o provisionamento da credencial.
- Teste remoto transacional inseriu três fixtures sintéticas e verificou que o papel da API vê somente a ativa/listada. Escrita e leitura de `created_at` foram recusadas; `anon` e `authenticated` também não puderam ler. A transação foi desfeita e a tabela voltou a zero linhas. O advisor de segurança não retornou avisos após a alteração.
- A Vercel ainda não tem `DATABASE_URL`. Falta confirmar o hostname/porta do Transaction pooler no painel Supabase autenticado, provisionar uma senha exclusiva para esse papel fora das migrations e salvar a URL como Secret somente na preview desta branch. Nunca solicitar a senha no chat. Não compartilhar essa credencial de homologação com produção.
- Depois da configuração, gerar nova preview e exigir `GET /api/v1/communities` com 200 JSON e `items: []`, além dos testes de validação/404 e preservação do frontend. Até essa evidência, a integração ponta a ponta permanece incompleta.

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

Não seleciona provedor de autenticação, não abre participação online e não altera os gates de privacidade, segurança e operação registrados em `backend.md` e no roadmap. O ambiente de homologação foi autorizado no plano gratuito em São Paulo; ambiente e orçamento de produção continuam pendentes.

## Referências

- [Arquitetura de backend](../architecture/backend.md)
- [Operação de deploy](deployment.md)
- [Roadmap](../product/roadmap.md)
- [Fastify na Vercel](https://vercel.com/docs/frameworks/backend/fastify)
- [Configuração Vercel e ignoreCommand](https://vercel.com/docs/project-configuration/vercel-json)
- [Segurança da Data API Supabase](https://supabase.com/docs/guides/api/securing-your-api)


## Atualização de homologação — 2026-11-13 (PR #75)

- A API oferece `GET /api/v1/health/live` para liveness e, após a PR #75, `GET /api/v1/health/ready` para verificar `SELECT 1` no PostgreSQL. O readiness retorna 503 sanitizado se não houver conexão; **200 não substitui** a validação de permissões/RLS do catálogo.
- A inspeção das variáveis na Vercel encontrou `DATABASE_URL` e `DATABASE_SSL_CA` **apenas para preview da branch `docs/vercel-supabase-readiness`**. Portanto, previews de `feat/api-database-readiness` e `test/vercel-api-http-contract` não herdam automaticamente essas variáveis. Não presumir conexão por status READY do deploy.
- Antes de testar a integração, configurar uma credencial de banco exclusiva, de leitura mínima, no escopo correto de **preview/homologação**. Fazer isso no painel seguro da Vercel, sem copiar o valor para documentação, commits, logs ou frontend. Não reutilizar uma credencial administrativa ou service_role.
- Validar no preview com escopo correto: `/api/v1/health/live` → 200; `/api/v1/health/ready` → 200; `/api/v1/communities` → 200 JSON `items` (possivelmente vazio); entradas inválidas → 400; IDs desconhecidos → 404. Confirmar que o catálogo não revela linhas não listadas e que o papel do banco não pode escrever.
- Caso readiness permaneça 503, verificar no painel privado hostname/porta do pooler, TLS/CA, política de rede, usuário e privilégios; nunca registrar a string de conexão em tickets ou PRs.
- Não promover para produção nem liberar autenticação pública antes da revisão de segurança, testes RLS e moderação.
