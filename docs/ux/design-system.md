# Design system

## Objetivo

Manter uma interface consistente e acessível, coerente com a identidade cristã e com a direção comunitária do produto.

## Implementado

Os tokens e estilos compartilhados ficam em `src/assets/global.css`.

- Paleta baseada em creme, verde profundo, terracota e cores de estado.
- Tipografia: Cormorant Garamond para títulos e Inter para interface.
- Escala de espaçamento, raios, sombras e transições compartilhados.
- Componentes base: `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.card-surface`, campos e helpers de página.
- Foco visível, estados desabilitados e suporte à preferência por movimento reduzido.
- Páginas podem complementar os estilos com CSS local ou scoped.

## Limitações e decisões pendentes

- A biblioteca ainda não é um sistema de componentes formal.
- Contraste não foi auditado integralmente; não assumir conformidade WCAG.
- Há estilos locais que precisam de revisão para evitar colisões e inconsistências.
- Estados de carregamento, erro, vazio, foco e interação precisam ser padronizados.
- Responsividade deve ser validada em diferentes larguras e níveis de zoom.

## TODOs

- Documentar componentes reutilizáveis e seus estados.
- Definir regras de acessibilidade para cada componente.
- Verificar contraste e motion em todas as páginas.
- Consolidar estilos locais quando houver necessidade real.

Status: tokens iniciais implementados; design system ainda em evolução.
