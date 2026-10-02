# Acessibilidade

## Objetivo
Garantir que pessoas com diferentes capacidades possam usar a plataforma.

## Requisitos
HTML semântico, teclado, foco visível, contraste, leitores de tela, mensagens de erro e responsividade.

## Implementado parcialmente
- Landmark principal e link de salto para conteúdo.
- Foco visível compartilhado, movimento reduzido e associação explícita de labels nos formulários de acesso/perfil.
- Estados de progresso e anúncios de erro/sucesso em alguns fluxos.
- Contrastes centrais medidos nos tokens; ver `design-system.md`.

## TODOs
- Definir alvo WCAG; AA é requisito proposto em `docs/product/requirements.md`, ainda sem validação formal.
- Auditar todas as rotas, combinações de cores, zoom, teclado e leitores de tela.
- Adicionar testes automatizados e registrar resultados de testes manuais.

Status: melhorias parciais no protótipo; conformidade WCAG não verificada.
