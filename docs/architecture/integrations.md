# Integrações

## Estado atual
A interface não integra API, backend, autenticação, banco, analytics, e-mail ou moderação remota. `src/assets/global.css` importa fontes do Google Fonts, gerando requisição externa do navegador ao carregar a folha de estilos; essa dependência deve ser considerada em avaliações de privacidade e disponibilidade.

## Objetivo
Catalogar serviços externos e limites de responsabilidade.

## Escopo
Toda integração deve possuir finalidade explícita, tratamento de falhas, proteção de dados e plano de substituição.

## Decisões pendentes
- Provedores de autenticação, e-mail, armazenamento e observabilidade.

## TODOs
- Registrar cada integração aprovada com dados tratados e permissões mínimas.

Status: integrações funcionais não identificadas além de Google Fonts; provedores de produto pendentes.
