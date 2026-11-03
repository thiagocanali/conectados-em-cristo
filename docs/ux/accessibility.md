# Acessibilidade

## Objetivo

Garantir que pessoas com diferentes capacidades possam utilizar a aplicação com teclado, leitores de tela, ampliação e diferentes preferências de interação.

## Implementado parcialmente no protótipo

- Atalho para pular diretamente ao conteúdo principal.
- Landmark principal focável.
- Estilos globais de foco visível para links, botões, elementos de resumo e elementos com `tabindex`.
- Redução de animações e transições quando o sistema indica preferência por movimento reduzido.
- Labels associados aos campos de cadastro, login e perfil.
- Mensagens de erro e sucesso anunciadas em alguns formulários.
- Indicadores de progresso e estados expandidos com atributos ARIA em alguns testes e componentes.

## Limitações

- Não existe auditoria WCAG formal nem declaração de conformidade.
- Nem todas as rotas e componentes foram verificados com teclado e leitor de tela.
- Contraste de todas as combinações de cor, estados hover/focus/disabled e conteúdo dinâmico ainda não foi validado.
- Não há testes automatizados de acessibilidade configurados.

## Próximos passos

- Definir alvo WCAG e critérios de aceite.
- Auditar todas as rotas em desktop e mobile, incluindo zoom e navegação por teclado.
- Testar com leitores de tela e verificar contraste de cada combinação de tokens.
- Adicionar testes automatizados quando a ferramenta for escolhida.

Status: melhorias parciais implementadas; conformidade WCAG não verificada.
