# ADR-0005: Autenticação e sessões do MVP

## Contexto
A plataforma planejada terá dados pessoais e relacionamentos entre usuários. O protótipo atual implementa cadastro e login somente no navegador, armazenando senhas sem hash em `localStorage`; isso não é autenticação segura e não deve ser usado em produção. Não há provedor ou sessão de servidor implementados.

## Problema
Como autenticar usuários sem expor dados pessoais ou criar uma solução de segurança própria prematuramente?

## Opções Consideradas
- **Provedor especializado de autenticação**: reduz código sensível e oferece fluxos de sessão e recuperação maduros.
- **Autenticação própria**: maior controle; aumenta responsabilidade sobre hashing, sessões, recuperação e abuso.
- **Login social como único método**: reduz fricção; não atende necessariamente ao público e à estratégia de e-mail verificado.

## Decisão
**Pendente:** avaliar um provedor especializado quando a stack e as integrações forem aprovadas. A menção anterior a Next.js não determina a stack do projeto. Nenhum provedor, fluxo de verificação ou mecanismo de sessão está escolhido ou implementado.

## Consequências
- Positivas: menor superfície de código sensível e melhor governança de sessões.
- Negativas: dependência de fornecedor e necessidade de configurar origens confiáveis.
- Mitigações: documentar portabilidade, aplicar autorização no servidor, limitar tentativas e registrar eventos de segurança.

## Data
2026-09-28

## Status
Pendente; provedor não escolhido.

## Próximos passos
- Confirmar provedor e integração do projeto.
- Definir fluxo de cadastro, verificação e recuperação.
- Implementar testes de sessão, autorização e abuso antes do lançamento.
