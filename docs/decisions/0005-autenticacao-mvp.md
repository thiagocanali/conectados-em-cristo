# ADR-0005: Autenticação e sessões do MVP

## Contexto
A plataforma terá dados pessoais e relações entre usuários. A documentação define verificação de e-mail, controle de sessão, autorização por recurso e MFA opcional. O protótipo atual tem apenas sessão local demonstrativa e não autentica identidade.

## Problema
Como autenticar usuários sem expor dados pessoais ou criar uma solução de segurança própria prematuramente?

## Opções Consideradas
- **Provedor especializado de autenticação**: reduz código sensível e oferece fluxos de sessão e recuperação maduros.
- **Autenticação própria**: maior controle; aumenta responsabilidade sobre hashing, sessões, recuperação e abuso.
- **Login social como único método**: reduz fricção; não atende necessariamente ao público e à estratégia de e-mail verificado.

## Decisão
**Decisão aprovada em 2026-11-07:** adotar autenticação gerenciada, evitando implementar hashing, recuperação e ciclo de vida de credenciais próprios sem necessidade. A API será a autoridade para validar identidade, sessão, estado da conta e autorização em cada operação. O fornecedor permanece pendente entre Supabase Auth, Clerk e Better Auth. A configuração deverá priorizar cookies HttpOnly, Secure e SameSite, com CSRF/CORS adequados ao fluxo escolhido. O login local atual continua sendo apenas demonstração.

## Consequências
- Positivas: menor superfície de código sensível e melhor governança de sessões.
- Negativas: dependência de fornecedor e necessidade de configurar origens confiáveis.
- Mitigações: documentar portabilidade, aplicar autorização no servidor, limitar tentativas e registrar eventos de segurança.

## Data
2026-09-28

## Status
Pendente

## Próximos passos
- Comparar fornecedores, custo, portabilidade, MFA, recuperação e exportação.
- Definir fluxo de cadastro, verificação e recuperação com revisão de segurança.
- Implementar testes de sessão, autorização e abuso antes do lançamento.
