# Contrato do adaptador de identidade

- Revisão: 2026-11-08
- Estado: contrato interno implementado; provedor, schema físico e login real continuam pendentes.

## Objetivo

Criar uma fronteira pequena entre o provedor de autenticação e o domínio do Conectados em Cristo. O adaptador de cada provedor será responsável por validar sessão/token; o domínio recebe somente a identidade externa confiável e resolve a conta interna.

## Responsabilidades

### Adaptador do provedor

O adaptador deve validar, conforme o fornecedor escolhido:
- assinatura/criptografia aplicável;
- emissor e audiência;
- expiração e demais timestamps;
- origem/cookies/PKCE conforme o fluxo adotado;
- claims necessários à aplicação.

Depois da validação, deve produzir somente `{ provider, subject }`. O adaptador não decide permissões de comunidade, moderação ou acesso a dados do produto.

### Domínio de identidade

1. procura `(provider, subject)` no repositório de identidades;
2. obtém o UUID interno da conta;
3. verifica o estado da conta;
4. produz um principal interno para as camadas de autorização.

Estados diferentes de `active` são negados para operações protegidas. A autenticação externa não substitui a autorização server-side.

## Regras de segurança

- Nunca aceitar `provider`/`subject` diretamente de body, query ou parâmetro de rota como prova de autenticação.
- Nunca usar e-mail como chave de autorização ou para merge automático.
- Não armazenar senha, access token ou refresh token no domínio.
- Falha de resolução deve ser indistinguível de uma identidade inexistente para superfícies externas.
- A autorização posterior deve usar `accountId` interno e o contexto do recurso.
- Valores de `provider`/`subject` devem ser strings não vazias, validadas em runtime antes de consultar o repositório. Os valores opacos não são normalizados nem vinculados por e-mail.
- Uma conta ativa só produz principal se o identificador interno for um UUID válido. A tipagem TypeScript não substitui a validação do retorno de adapters/banco.
- Cada resolução consulta o repositório novamente; suspensão deve impedir a próxima resolução. Não reutilizar principal em cache entre requests.
- Bloqueio, papel, membership, moderação e consentimento não pertencem a este contrato.

## Limites

Este contrato não cria tabelas, não seleciona Supabase/Clerk/Better Auth, não implementa cookies/sessões, não faz chamadas externas e não autoriza cadastro real. A migration de `accounts`/`auth_identities` permanece bloqueada até a decisão do provedor e das políticas de privacidade/operação.

## Testes

A suíte cobre resolução de `(provider, subject)` para UUID interno, identidade inexistente, valores vazios ou de tipos inválidos, UUID interno inválido, suspensão entre resoluções, falha de dependência, estados de conta não ativos e ausência de autorização por e-mail. Os testes são deliberadamente provider-neutral; não comprovam revogação de sessões no provedor.
