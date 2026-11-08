# Esquema inicial de comunidades — PostgreSQL

- Revisão: 2026-11-07
- Estado: migration local implementada; nenhum banco remoto/provedor provisionado.
- Migration: `server/migrations/0001_create_communities.up.sql`.

## Escopo

A primeira migration cria somente o cadastro administrativo de comunidades. Não cria contas, memberships, convites, posts, comentários, reações, pedidos de oração ou moderação. Esses domínios dependem de identidade, regras adicionais e revisão de privacidade.

## Tabela `communities`

| Coluna | Tipo | Regra |
|---|---|---|
| id | UUID | PK, gerado no banco |
| slug | varchar(80) | único, lowercase e hífen entre palavras |
| name | varchar(100) | obrigatório, não vazio |
| category | varchar(60) | obrigatório, rótulo curado |
| description | varchar(300) | público, vazio por padrão |
| rules_summary | varchar(1200) | público, vazio por padrão |
| status | varchar(16) | draft, active, paused ou archived; default draft |
| catalog_visibility | varchar(16) | listed ou unlisted; default unlisted |
| join_mode | varchar(16) | open ou approval; default approval |
| created_at / updated_at | timestamptz | gerados no banco |

Restrições de banco garantem slug, unicidade, valores de estado e campos obrigatórios. Índice parcial atende somente comunidades `active` + `listed`, ordenadas por `name COLLATE "C", id`.

**Não existem colunas de contagem.** Não armazenar `member_count`, `post_count` ou `request_count`; agregados não estão liberados no beta inicial.

## Migrações

- `npm run api:migrate` aplica migrations `.up.sql` em ordem e registra versões em `schema_migrations`.
- Cada migration e seu registro são executados em transação.
- `server/migrations/*.down.sql` documenta rollback manual; o executor não roda down automaticamente.
- O executor exige `DATABASE_URL` e não imprime a connection string.
- O teste de integração remove/recria as tabelas do domínio; só pode rodar contra host local e nome de banco terminado em `_test`.

## Repositório e API

`PostgresCommunityRepository` consulta somente campos da allowlist F-07, sempre filtrando `status = 'active'` e `catalog_visibility = 'listed'`. A ordenação é estável por nome e UUID; cursor base64url contém apenas o último nome/ID público e não é token de autorização.

- Sem `DATABASE_URL`, health check continua disponível e as rotas do catálogo retornam 503, nunca uma lista vazia simulada.
- Comunidade inexistente, não listada, pausada ou arquivada retorna o mesmo 404 público.
- A migration não cria dados de exemplo nem usuários administrativos.
- Ainda não há endpoints para criar/editar/arquivar comunidades, nem autenticação administrativa. Não publicar ou operar comunidades reais.

## Limites

PostgreSQL é a tecnologia aprovada; região, provedor, credenciais, backups, RLS, operação, custo e ambiente continuam pendentes. A API é a autoridade planejada, mas ainda não existe autenticação ou autorização administrativa real. Nenhum dado pessoal ou sensível deve ser inserido.
