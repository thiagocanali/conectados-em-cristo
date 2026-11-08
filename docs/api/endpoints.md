# Inventário inicial de endpoints

- Revisão: 2026-11-07
- Estado: propostas documentadas em [openapi.json](openapi.json); health check e leitura pública do catálogo estão implementados localmente, com PostgreSQL configurado.
- Prefixo: /api/v1.
- Contrato canônico: OpenAPI 3.1 draft 0.1.0.

| Método | Endpoint | Autenticação | Regra de autorização principal | Classe de dados |
|---|---|---|---|---|
| GET | /health/live | Não | Não expor dependências, segredos ou detalhes internos | Público/operacional — implementado localmente |
| GET | /me | Sim | Somente contexto mínimo da própria conta | Pessoal |
| PATCH | /me/profile | Sim | Alterar apenas campos próprios e editáveis; validar visibilidade | Pessoal/sensível por campo |
| GET | /communities | Não | Allowlist F-07; somente active + listed; sem contagens, posts ou membros | Público — implementado localmente com PostgreSQL |
| GET | /communities/{communityId} | Não | Mesmo metadado público; 404 indistinguível para inexistente/não listado/inativo | Público — implementado localmente com PostgreSQL |
| GET | /communities/{communityId}/posts | Sim | Membership ativo, visibilidade, conta elegível e bloqueios | Conteúdo comunitário |
| POST | /communities/{communityId}/posts | Sim | Membership ativo, conta elegível, limites e regras F-02 | Conteúdo comunitário |
| PUT | /posts/{postId}/reactions/support | Sim | Membro ativo e post visível; idempotente; F-10 | Pessoal/interno |
| DELETE | /posts/{postId}/reactions/support | Sim | Remover somente a própria reação | Pessoal/interno |
| PUT | /blocks/{userId} | Sim | Criar bloqueio global entre a conta atual e o alvo; F-01 | Pessoal |
| DELETE | /blocks/{userId} | Sim | Remover somente o próprio bloqueio | Pessoal |
| POST | /reports | Sim | Denunciante autenticado; limitar abuso; criar caso restrito | Confidencial de moderação |
| POST | /prayer-requests | Sim | Autor autenticado; privado por padrão; compartilhamento explícito | Sensível |
| GET | /me/prayer-requests | Sim | Somente pedidos próprios | Sensível |
| GET | /moderation/cases | Sim | Moderador atribuído ou administrador; sem conflito | Confidencial de moderação |
| POST | /moderation/cases/{caseId}/decisions | Sim | Escopo, papel, conflito, sanção permitida e motivo obrigatório | Confidencial de moderação |

## Regras comuns

- Sessão ausente/inválida: 401.
- Conta, membership ou recurso sem permissão: 403 ou 404 conforme política anti-enumeração a ser definida.
- Entrada inválida: 400/422 conforme contrato, com Problem Details genérico sem ecoar dados sensíveis.
- Erros e rotas inexistentes: `application/problem+json` com UUID `requestId` gerado pelo servidor; `instance` contém apenas o caminho, sem query string.
- Erro inesperado: 500 genérico; nunca retornar mensagem de exceção ou stack trace. Esse comportamento está implementado no bootstrap local.
- Conflito de estado, idempotência ou impedimento de conflito de interesse: 409 quando apropriado.
- Coleções usam cursor e limite máximo.
- Escritas sensíveis geram audit log sem armazenar payload privado desnecessário.

## Pendências antes de implementação

- Validar nomes de recursos, campos, limites e códigos de resposta com requisitos do MVP.
- Definir estados de conta, membership, post, pedido de oração e caso de moderação.
- Fechar matriz de autorização e casos negativos por endpoint.
- Definir cookie/sessão e proteção CSRF/CORS após escolha do provedor de auth.
- Definir política de rate limit, idempotência, requestId e audit log.
- Revisão de privacidade e jurídica para dados sensíveis e pedidos de oração.

O contrato público detalhado está em [community-catalog-public-contract.md](../product/community-catalog-public-contract.md). Não criar endpoints para chat, pagamentos, descoberta romântica, ranking, upload público ou analytics sensível sem decisão de produto e segurança.
