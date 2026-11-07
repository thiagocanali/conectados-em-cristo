# Arquitetura de Backend — Conectados em Cristo

## Estado atual

**Prova técnica local implementada.** Existe um servidor Fastify com apenas GET /api/v1/health/live, sem persistência ou dados de usuário. Não existe API de produto, banco remoto, autenticação real, sincronização ou autorização server-side.

## Direção técnica aprovada

Em 2026-11-07 foram aprovadas as seguintes direções:

- **Runtime:** Node.js 26 LTS.
- **Linguagem:** TypeScript no backend, independente do frontend JavaScript atual.
- **Framework:** Fastify.
- **Estilo:** monólito modular, não microsserviços.
- **API:** REST versionada em `/api/v1`, com contrato OpenAPI e validação explícita.
- **Banco:** PostgreSQL como tecnologia relacional (ADR-0004); provedor ainda não escolhido.
- **Identidade:** autenticação gerenciada (ADR-0005); provedor ainda não escolhido.

Consulte ADR-0006, ADR-0004, ADR-0005 e OPEN_DECISIONS.md para o registro canônico. Os contratos estão em docs/api/openapi.json; a matriz de acesso em docs/security/authorization.md; o threat model em docs/security/threat-model.md; e a classificação em docs/database/privacy-classification.md.

## Fronteiras de módulos

1. **Identity & Accounts:** ciclo de vida da conta, identidade, sessão e estado da conta. A integração dependerá do provedor de autenticação aprovado.
2. **Profiles & Privacy:** dados de perfil, preferências, consentimentos, visibilidade e direitos do titular.
3. **Communities & Memberships:** comunidades curadas, regras, membership e papéis.
4. **Content & Interactions:** publicações, comentários, reação “Apoiar”, bloqueios e interações permitidas.
5. **Prayer & Faith Content:** pedidos e conteúdo de oração com controles de privacidade específicos.
6. **Reports & Moderation:** denúncias, casos, evidências mínimas, sanções, recursos e encaminhamento.
7. **Administration & Audit:** operações administrativas restritas e trilhas de auditoria.

Os módulos compartilham um único deploy e uma única base lógica. Não criar serviços separados por módulo até existir necessidade mensurável.

## Regras transversais obrigatórias

- A API é a autoridade para autenticação, autorização e regras de domínio.
- Toda operação sensível verifica sessão, estado da conta, papel, membership, visibilidade, bloqueios e restrições aplicáveis.
- A autorização nunca depende apenas de controles de interface ou IDs difíceis de adivinhar.
- Validar entrada e saída com schemas; documentar contratos OpenAPI.
- Usar transações e constraints para integridade; projetar operações repetíveis com idempotência quando necessário.
- Aplicar rate limiting nos fluxos de autenticação, publicação, comentários, denúncias e interações.
- Não registrar senhas, tokens, conteúdo privado ou dados sensíveis desnecessários em logs.
- Separar dados públicos, pessoais, sensíveis, internos e de segurança conforme classificação.
- Cobrir autorização negativa, bloqueios, membership, estados de conta e privacidade com testes.
- Não permitir acesso direto do frontend a credenciais administrativas do banco.

## Decisões ainda pendentes

- **D-15:** fornecedor de object storage privado, região, URLs assinadas, processamento e remoção.
- **D-16:** fornecedor de e-mail transacional, domínio, entregabilidade, custo e limites.
- **D-17:** hospedagem da API, região, disponibilidade, secrets, logs, deploy e rollback.
- Provedor PostgreSQL e região.
- Provedor de autenticação gerenciada.
- Política de migrations, backup/restore e retenção operacional.
- Threat model, classificação de dados, matriz de autorização e revisão jurídica.

Nenhum fornecedor foi escolhido, contratado ou provisionado. Nenhum dado real deve ser usado nesta etapa.

## Próxima sequência permitida

1. [x] Registrar baseline STRIDE, classificação inicial de privacidade e matriz de autorização; revisão especializada continua pendente.
2. [x] Criar contrato OpenAPI draft com exemplos e endpoints iniciais.
3. Criar prova técnica local Fastify com health check, validação e testes, sem banco remoto ou auth real.
4. Revisar ameaça, classificação e contratos com segurança, produto e jurídico.
5. Comparar fornecedores e custos antes de provisionar qualquer ambiente.

## Fora do escopo da prova técnica inicial

- Banco remoto ou dados pessoais reais.
- Autenticação real, cadastro de usuários ou recuperação de senha.
- Upload de arquivos reais.
- Pedidos de oração reais.
- Moderação pública, beta ou lançamento.
- Serviços pagos, filas distribuídas, Redis, microsserviços ou observabilidade comercial.
