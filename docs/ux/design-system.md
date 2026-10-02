# Design system

## Objetivo
Manter interface consistente, acessível e coerente com fé, propósito e segurança.

## Implementado
Os tokens e estilos compartilhados ficam em `src/assets/global.css`.
- Paleta: creme, verde profundo, terracota e cores de estado.
- Tipografia: Cormorant Garamond para títulos e Inter para interface.
- Espaçamento em incrementos de 8 px, raios, sombras e transições compartilhados.
- Componentes base: `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.card-surface`, campos e helpers de página.
- Foco visível, estados desabilitados e preferência por movimento reduzido.
- Contraste medido nos tokens centrais: texto auxiliar 4,67:1, terracota sobre creme 4,62:1 e texto branco em botão terracota 4,99:1. Isso não substitui auditoria WCAG de todas as combinações e estados.

## Decisões pendentes
- Alvo WCAG e auditoria completa de contraste em páginas, estados e conteúdo dinâmico.
- Normalizar estilos locais remanescentes, especialmente os testes.
- Revisar motion e tokens conforme validação com usuários.

## TODOs
- Verificar os componentes e estados em viewport desktop, tablet e mobile.
- Adicionar testes automatizados de acessibilidade quando o framework for definido.

Status: tokens iniciais implementados; sistema ainda não auditado integralmente.
