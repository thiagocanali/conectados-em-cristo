# ADR-0007: Identidade interna independente do provedor

## Status
Proposta aceita como direção de modelagem; implementação e esquema físico pendentes.

## Contexto
O projeto aprovou autenticação gerenciada em ADR-0005, mas o fornecedor ainda não foi escolhido. O domínio precisa de identidade estável e portável para perfis, comunidades, membership, bloqueios, moderação, consentimento e auditoria. E-mail não é identificador confiável nem chave de autorização.

## Decisão proposta
Separar três conceitos:
1. **Conta interna:** UUID próprio e estado de ciclo de vida em `accounts`.
2. **Identidade externa:** vínculo `(provider, subject)` em `auth_identities`, único por provedor e subject; múltiplas identidades por conta somente com prova de controle.
3. **Perfil:** dados de apresentação e preferências em `profiles`, separados de credenciais.

O middleware valida a sessão/token com o provedor, resolve o subject para UUID interno e verifica estado da conta. A autorização continua inteiramente na API e no domínio.

Consentimentos devem ser versionados e registrados separadamente. Não armazenar senhas, tokens ou refresh tokens no banco do produto.

## Consequências
- Portabilidade entre provedores e IDs internos estáveis.
- Separação de credenciais, dados de perfil e regras de domínio.
- Exige mapeamento de identidade, fluxo seguro de vinculação e reconciliação de exclusão.
- A API precisa verificar estado interno da conta a cada request protegido.
- O esquema físico depende do provedor, da política de contato, MFA, idade e retenção.

## Segurança e privacidade
- Não fazer merge de contas por e-mail coincidente.
- Não confiar em ID externo, cookie não validado ou sessão carregada do storage do cliente.
- O provedor autentica; a API autoriza.
- F-05/F-06/F-09 continuam prevalecendo; autenticação não comprova idade.
- MFA para equipe é requisito recomendado, ainda sujeito a política operacional.

## Limites
Esta ADR não escolhe fornecedor, não autoriza provisionamento, não cria tabelas, migrations, cadastro real ou integração de login. A seleção de provedor, DPA, região, SMTP e operação permanecem pendentes.

## Referência
- [Fronteira interna de identidade](../security/identity-boundary.md)
- [Avaliação de provedores de autenticação](../security/auth-provider-evaluation.md)
