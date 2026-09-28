# ADR-0005: Autenticação e sessões do MVP

## Contexto
A plataforma terá dados pessoais e relacionamentos entre usuários. A documentação define verificação de e-mail, controle de sessão, autorização por recurso e MFA opcional, mas a implementação ainda não começou.

## Problema
Como autenticar usuários sem expor dados pessoais ou criar uma solução de segurança própria prematuramente?

## Opções Consideradas
- **Provedor especializado de autenticação**: reduz código sensível e oferece fluxos de sessão e recuperação maduros.
- **Autenticação própria**: maior controle; aumenta responsabilidade sobre hashing, sessões, recuperação e abuso.
- **Login social como único método**: reduz fricção; não atende necessariamente ao público e à estratégia de e-mail verificado.

## Decisão
**Proposta, ainda não aceita:** usar uma solução especializada compatível com Next.js, mantendo e-mail e senha como fluxo base, e tratando MFA e provedores adicionais como etapas posteriores. A solução concreta depende da integração aprovada e da revisão de segurança.

## Consequências
- Positivas: menor superfície de código sensível e melhor governança de sessões.
- Negativas: dependência de fornecedor e necessidade de configurar origens confiáveis.
- Mitigações: documentar portabilidade, aplicar autorização no servidor, limitar tentativas e registrar eventos de segurança.

## Data
2026-09-28

## Status
Proposto

## Próximos passos
- Confirmar provedor e integração do projeto.
- Definir fluxo de cadastro, verificação e recuperação.
- Implementar testes de sessão, autorização e abuso antes do lançamento.
