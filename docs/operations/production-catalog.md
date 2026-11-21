# Catálogo em produção

Data: 2026-11-13 (America/Sao_Paulo). Escopo publicado: estudos públicos e API de leitura do catálogo. Sem cadastro remoto, escrita administrativa ou participação de usuários reais.

## Destino e evidência

- GitHub: PR #80 integrado à main, commit `618ece68cf4553b14b33eb9cc8dfa30175d70491`.
- Vercel: projeto `prj_xr750N8Zealf39uQVqHfegyLzgdt`, equipe `team_TAP8765Pdj3N4a4iLUVglLj8`, deployment de produção `dpl_4tVSVH3wYJoFGGJpwnjQBoLXuXuk`, estado READY.
- Domínio verificado: https://conectados-em-cristo.vercel.app
- Supabase: `lsffipvkdpvnwgvdvtni`, São Paulo (`sa-east-1`), plano gratuito. O mesmo projeto vazio usado na prova de homologação passou a ser exclusivo de produção. Não foi criado projeto adicional nem contratado plano pago.
- Verificação HTTP no domínio: catálogo 200 JSON com `{"items":[]}`; health 200 JSON; `limit=0` retorna 400; rota inexistente retorna 404 JSON; página inicial retorna 200 HTML. A ausência de comunidades é real: o banco permanece vazio.
- Os checks do PR #80 passaram, incluindo navegador nas bases Vercel e GitHub Pages, API, PostgreSQL, build, lint e auditoria de dependências.

## Banco e credenciais

A migration remota `promote_catalog_to_production_revoke_preview_reader` aplica o SQL versionado em `server/deployment/supabase-catalog-production.sql`, depois do bootstrap do catálogo.

O papel `cec_catalog_production_reader` possui somente SELECT nas colunas necessárias do catálogo e RLS restringe a leitura a comunidades ativas/listadas. Não tem superusuário, BYPASSRLS, criação de bancos, criação de papéis nem escrita. Seu LOGIN foi habilitado em operação separada de credencial, sem gravar senha em migration ou código.

O papel anterior `cec_catalog_reader` teve LOGIN e senha removidos e grants de coluna revogados. A política RLS agora se aplica somente ao novo papel de produção. Assim, deployments antigos de preview não conservam acesso de leitura ao banco.

Na Vercel:
- `DATABASE_URL`: Secret somente de Production, com credencial exclusiva do papel de produção.
- `DATABASE_SSL_CA`: certificado CA público somente de Production; o runtime exige validação de certificado.
- As variáveis da antiga preview `docs/vercel-supabase-readiness` foram esvaziadas. Previews futuras ficam sem banco remoto e o catálogo retorna 503. Para nova homologação, usar ambiente independente ou banco efêmero no CI.

Não usar parâmetros SSL na URL junto com `DATABASE_SSL_CA`. Não desabilitar `rejectUnauthorized`. Não copiar a credencial de produção para previews, GitHub Pages, frontend ou repositório.

## Verificação de autorização

O teste remoto inseriu três fixtures sintéticas dentro de uma transação e executou consultas com SET LOCAL ROLE. O novo papel viu somente a ativa/listada; escrita e leitura de coluna interna foram recusadas. O papel da preview foi confirmado sem login e sem grant de leitura. O rollback eliminou todas as fixtures. O advisor de segurança não retornou avisos.

## Operação e rollback

Pushes na main geram deployment de produção pela integração Git Vercel. Antes de nova publicação, exigir os checks e validar os contratos JSON, frontend e assets. Migrations não fazem parte do build nem são executadas por requisição. Não executar `api:db:test` contra este banco remoto.

Para reverter a aplicação, usar um deployment conhecido e compatível com TLS. O deployment anterior a esta conexão, `dpl_92ahMX5dT2DzgBwFMFjh7mXwHoqn`, não recebia credenciais de produção: restaurá-lo preserva a SPA, mas o catálogo volta a 503. Nunca reconstruir uma versão sem suporte à CA usando a DATABASE_URL atual, pois ela poderia ignorar a configuração TLS. Não reativar automaticamente a credencial da preview durante rollback.

O esquema e os dados de produção não são revertidos junto com o deployment. Correções do banco exigem migration específica e revisão do estado atual. A conta gratuita não substitui uma política de backup/restore e disponibilidade: esses requisitos continuam pendentes para futura participação online.

## Fora deste release

Autenticação gerenciada, cadastro real, perfis persistentes, memberships, conteúdo de usuários, pedidos de oração, moderação e processos de privacidade/operação continuam sujeitos ao roadmap e seus gates. Esta publicação não declara esses recursos concluídos.
