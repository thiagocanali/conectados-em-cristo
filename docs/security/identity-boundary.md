# Fronteira interna de identidade e contas

- Revisão: 2026-11-07
- Estado: proposta arquitetural; não implementada.
- Dependências: ADR-0005/D-14 (provedor de autenticação), F-05 (privacidade), F-06 (18+) e matriz de autorização.

## Objetivo

Separar a identidade autenticada pelo provedor da conta interna do Conectados em Cristo. A aplicação precisa manter IDs próprios e regras de domínio portáveis, sem usar e-mail ou ID externo como chave de autorização.

## Modelo recomendado

### `accounts`

Identidade interna e ciclo de vida do usuário.

- `id`: UUID interno, imutável e usado como FK nos domínios.
- `status`: `pending_verification`, `active`, `restricted`, `suspended` ou `deleted`.
- `created_at`, `updated_at`, `status_changed_at`.
- Motivo e origem de restrições ficam em registro de auditoria restrito, não em campos públicos.
- Não guardar senha, access token ou refresh token.

### `auth_identities`

Vínculo entre uma conta interna e uma identidade de um provedor.

- `id`: UUID interno.
- `account_id`: FK para `accounts.id`.
- `provider`: identificador estável do provedor, por exemplo `supabase` ou `clerk`.
- `subject`: identificador de usuário fornecido pelo provedor.
- `linked_at`, `last_seen_at`, `revoked_at`.
- Restrição única em `(provider, subject)`.
- Uma conta pode ter mais de uma identidade, mas vincular outra identidade exige prova de controle de ambas; nunca fazer merge automático apenas por e-mail coincidente.

### `profiles`

Perfil de apresentação é separado de conta e autenticação. Preferências de visibilidade e dados públicos não devem ser derivados do cadastro do provedor. A exclusão ou suspensão de uma conta não pode depender de esconder o perfil no frontend.

### `consent_records`

Consentimentos e aceite de termos devem registrar finalidade/tipo, versão do documento e instante de aceite/revogação. Um booleano genérico ou a versão atual do documento não substitui histórico. Coletar apenas o necessário para demonstrar a finalidade.

## Fluxo por requisição protegida

1. O adaptador do provedor valida a sessão/token: assinatura, emissor, audiência, expiração, origem e demais claims aplicáveis.
2. Extrai o par confiável `(provider, subject)`; nunca usa e-mail como identidade primária.
3. Resolve `auth_identities` para o UUID interno da conta.
4. Verifica `accounts.status` em cada operação protegida.
5. A camada de domínio verifica papel, membership, bloqueios, visibilidade, escopo de moderação e demais regras.
6. A request recebe um principal interno mínimo, como `accountId`; tokens e dados privados não são propagados aos módulos de domínio.

O provedor autentica. A API e o banco do produto autorizam.

## Regras de segurança

- IDs externos nunca aparecem como IDs públicos nem concedem acesso.
- Não criar conta automaticamente a partir de qualquer JWT sem validar issuer/audience e estado de verificação.
- Não vincular contas automaticamente por e-mail igual, mesmo quando o provedor afirma que o e-mail foi verificado.
- Logout, revogação de identidade e mudanças de estado precisam bloquear acesso; para suspensão local, a API consulta o estado interno a cada request.
- Não persistir JWTs, refresh tokens, cookies de sessão ou segredos do provedor.
- Cookies de sessão devem ser `HttpOnly`, `Secure`, `SameSite` e acompanhados de proteção CSRF quando aplicável; CORS com allowlist de origens.
- MFA para administradores/moderadores é requisito operacional recomendado; a política final deve ser aprovada e testada.
- O mecanismo de idade mínima de 18 anos é separado de autenticação e e-mail verificado; não inferir idade a partir de claims não verificados.
- Eventos de identidade e mudanças de estado geram auditoria minimizada, com acesso restrito.

## Portabilidade e ciclo de vida

- O UUID interno permanece estável se o provedor mudar.
- Migração entre provedores cria ou religa `auth_identities` somente após prova de controle e reconciliação segura.
- Exclusão de conta deve coordenar provedor, conta interna, perfil, conteúdo e retenção excepcional conforme F-05/F-09.
- Dados de contato só devem ser replicados se uma finalidade operacional exigir; nesse caso, definir minimização, criptografia, verificação, retenção e exclusão antes de adicionar colunas.
- A conta interna não substitui os registros de membership, moderação, consentimento ou auditoria.

## Não decidido / não implementado

- Provedor, claims concretos, formato de sessão, transporte cookie/header e política de refresh.
- Campos de contato, verificação de e-mail, exclusão e exportação.
- Política de MFA e recuperação de fatores para equipe.
- Método de verificação de idade e retenção de evidências.
- Esquema final de accounts, auth_identities e consent_records.
- Webhooks e reconciliação de contas apagadas/desativadas pelo provedor.

Nenhuma migration dessas tabelas deve ser criada antes da seleção do provedor, revisão de privacidade/jurídica e definição do ciclo de vida.
