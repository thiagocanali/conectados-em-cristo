# Autenticação da API

## Objetivo
Registrar os requisitos de autenticação e sessão para os consumidores da API.

## Escopo
Criação de conta, login, verificação de email, recuperação de acesso, encerramento de sessão e proteção contra abuso.

## Requisitos
- Sessões devem ser protegidas e revogáveis.
- Endpoints devem aplicar autorização além de autenticação.
- Tokens e credenciais nunca devem aparecer em logs.
- Rate limiting e validação devem ser aplicados nos fluxos de acesso.

## Decisões pendentes
- Provedor e mecanismo de sessão.
- MFA no MVP ou fase posterior.
- Política de expiração e rotação.

## TODOs
- Alinhar este documento ao modelo de autenticação escolhido.

Status: rascunho.
