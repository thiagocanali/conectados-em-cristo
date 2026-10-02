# Autenticação

## Estado atual
O protótipo implementa cadastro e comparação de senha apenas no frontend; as senhas são armazenadas sem hash em `localStorage`. Não existe autenticação segura ou sessão de servidor. Essa implementação não é adequada para dados reais ou produção.

## Objetivo
Definir como identidades serão verificadas e sessões protegidas.

## Requisitos
Senha armazenada com hash forte, sessões seguras, recuperação protegida, rate limiting e logs sem segredos.

## Decisões pendentes
- Provedor e métodos adicionais de verificação.

## TODOs
- Definir fluxo de consentimento, encerramento de sessão e exclusão.

Status: autenticação de produção não implementada; requisitos e provedor pendentes.
