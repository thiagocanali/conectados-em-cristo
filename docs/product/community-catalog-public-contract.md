# Contrato público do catálogo de comunidades

- Revisão: 2026-11-07
- Estado: detalhamento técnico inicial de F-07; ainda não implementado.
- Base: F-07 aprovada no modelo geral em 2026-11-05.

## Objetivo e limite

O catálogo permite descobrir comunidades curadas sem transformar participação em diretório público nem tornar posts públicos. Visibilidade do catálogo não concede membership nem autorização para ler conteúdo.

## Campos públicos permitidos

A API pública retorna somente a allowlist abaixo:

| Campo | Tipo/limite | Finalidade |
|---|---|---|
| `id` | UUID | Referência estável; nunca é credencial |
| `slug` | string, até 80 caracteres | URL legível; nunca é autorização |
| `name` | string, até 100 caracteres | Nome da comunidade |
| `category` | string curada, até 60 caracteres | Organização do catálogo |
| `description` | string, até 300 caracteres | Apresentação curta |
| `rulesSummary` | string, até 1.200 caracteres | Regras de convivência destinadas ao público |
| `joinMode` | `open` ou `approval` | Informa se a entrada exige aprovação |

Não retornar campos além dessa lista. Em particular, não retornar status interno, configuração de visibilidade, IDs de administradores/moderadores, e-mails, membership, solicitações, posts, comentários, denúncias, contagens ou dados de auditoria.

## Elegibilidade para o catálogo

- Listagem pública: somente comunidades com estado interno `active` e visibilidade interna `listed`.
- `draft`, `paused`, `archived` e `unlisted` não aparecem no catálogo público.
- O endpoint público de detalhe retorna 404 genérico para ID inexistente, comunidade não listada ou estado não público; não revelar qual condição ocorreu.
- O ID e o slug são identificadores, não tokens de acesso.
- O modo `open` não permite entrada anônima: membership exige autenticação, elegibilidade e autorização server-side.
- `approval` informa apenas o fluxo; não revela solicitações ou candidatos.

## Contagens e diretórios

**Decisão conservadora para o beta inicial:** não exibir contagens de membros, posts ou solicitações. Embora F-07 permita avaliar agregados, não há limiar ou regra anti-reidentificação aprovado. Não divulgar totais, faixas, rankings ou tendências até que finalidade, limiar mínimo, frequência de atualização e resistência a inferência sejam definidos e revisados.

Listas nominais de membros e reatores permanecem privadas por padrão. Não existe endpoint público para elas.

## Paginação e ordenação

- `limit`: padrão 20, mínimo 1, máximo 50.
- Cursor opaco, máximo 512 caracteres; não é segredo nem autorização.
- Ordenação estável por `name ASC, id ASC`.
- Não retornar total de resultados.
- Cursor inválido deve produzir erro genérico de validação, sem revelar estado de comunidades.
- Filtros públicos por status, visibilidade ou campos administrativos não são aceitos.

## Endpoints propostos

- `GET /api/v1/communities`: lista metadados das comunidades ativas/listadas.
- `GET /api/v1/communities/{communityId}`: retorna metadados de uma comunidade pública; 404 para não listada/inativa/inexistente.

Nenhum dos dois endpoints retorna posts, comentários, membros, solicitações ou conteúdo de oração. Endpoints de conteúdo exigem autenticação e autorização independentes.

## Controles e testes obrigatórios antes de considerar F-07 implementada

- allowlist de campos aplicada na camada de resposta;
- não confiar em filtros de visibilidade enviados pelo cliente;
- negar listagem e detalhe de comunidades não listadas/inativas;
- resposta indistinguível para ID inexistente e comunidade não pública;
- testar visitante, autenticado sem membership, membro e moderador fora do escopo;
- testar enumeração de IDs/slugs e cursor inválido;
- confirmar ausência de diretórios, contagens e conteúdo interno;
- rate limit e observabilidade sem registrar query strings sensíveis;
- revisar convite/autorização de comunidades não listadas antes de criar qualquer endpoint de convite.

**Limite:** este documento fecha a allowlist pública inicial e a decisão de não exibir contagens no beta. Não aprova banco/provedor, convites, membership, criação/edição administrativa ou acesso a conteúdo.
