# Visão geral da API — Conectados em Cristo

- Revisão: 2026-11-07
- Estado: contrato inicial proposto; somente GET /health/live está implementado localmente.
- Stack aprovada: Node.js 26 LTS + TypeScript + Fastify, monólito modular (ADR-0006).
- Prefixo aprovado: REST versionada em /api/v1.
- Contrato: [openapi.json](openapi.json), versão draft 0.1.0.

## Princípios

- A API é a autoridade para identidade, autorização, estado da conta e regras de domínio.
- O frontend nunca acessa credenciais administrativas do banco.
- Validar entrada e saída com schemas; negar por padrão.
- Aplicar autorização por usuário, recurso, comunidade, membership, visibilidade, bloqueios e estado da conta.
- Usar respostas de erro consistentes em application/problem+json.
- Usar paginação por cursor em coleções; impor limites máximos.
- Usar idempotência em operações repetíveis ou concorrentes, como reações e bloqueios.
- Não incluir dados sensíveis em logs, erros, métricas ou notificações.
- Não expor listas nominais de membros ou reatores em endpoints públicos.

## Sessão e identidade

A estratégia aprovada é autenticação gerenciada (ADR-0005), mas o fornecedor ainda não foi escolhido. O contrato OpenAPI usa cookie de sessão provisório como abstração; nome, domínio, SameSite, CSRF, CORS, expiração, rotação e revogação devem ser fechados após a comparação do provedor.

O backend deve validar sessão e estado da conta em toda requisição protegida. A sessão local do protótipo não é reutilizada como autenticação real.

## Superfícies públicas

- GET /api/v1/health/live: sinal de vida sem detalhes internos.
- GET /api/v1/communities: somente metadados públicos do catálogo (F-07).
- GET /api/v1/communities/{communityId}: detalhe público com a mesma allowlist; 404 genérico para comunidades não públicas.

Nenhum endpoint público deve retornar posts, lista nominal de membros, pedidos de oração privados, denúncias, evidências ou dados internos. O health check local não expõe versão, ambiente ou dependências.

## Erros e paginação

- Erros: Problem Details em `application/problem+json`, com `type`, `title`, `status`, `detail`, `instance` e `requestId`. O requestId é UUID gerado pelo servidor; query strings são omitidas de `instance`; mensagens internas, stack traces, SQL, tokens e conteúdo privado nunca são retornados. O bootstrap local já aplica esse padrão a 404 e erros capturados.
- Paginação: cursor opaco e limit com teto no servidor; não aceitar offsets ilimitados.
- Filtros e ordenação: allowlist por endpoint; nunca interpolar SQL diretamente.
- Rate limit: por IP, conta e operação conforme risco e capacidade.

## Segurança e autorização

A matriz em [authorization.md](../security/authorization.md) é o baseline por papel e recurso. O threat model em [threat-model.md](../security/threat-model.md) registra ameaças e controles. Cada operação deve apontar para:
- autenticação necessária;
- autorização e escopo;
- dados acessados/classificação;
- validação;
- limites/idempotência;
- evento de auditoria quando aplicável;
- testes positivos e negativos.

## Limites

A allowlist F-07 está detalhada em [community-catalog-public-contract.md](../product/community-catalog-public-contract.md). O OpenAPI é um contrato de discussão, não prova de implementação. O formato Problem Details e o requestId estão implementados no bootstrap local; as operações de domínio permanecem propostas. Schemas, campos, status HTTP, enumerações, visibilidade, limites e fluxos dependem de revisão de produto, privacidade, moderação e operação. Não iniciar integração com fornecedor, banco remoto ou dados reais nesta etapa.

**Status:** contrato inicial registrado; revisão e implementação pendentes.
