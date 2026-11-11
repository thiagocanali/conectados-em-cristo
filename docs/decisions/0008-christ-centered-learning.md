# ADR-0008: Jesus no centro e primeira jornada útil para igrejas

## Status e data
Direção solicitada pelo responsável pelo produto em 2026-11-11. Implementada nesta entrega como estudos públicos e preparação de encontros, não como comunidade online operacional.

## Contexto
A experiência promovia testes de dons/personalidade e descoberta/compatibilidade enquanto a participação comunitária real não existia. O responsável reforçou que o núcleo precisa ajudar pessoas a conhecer Cristo, aprender e servir, com utilidade concreta para comunidades cristãs e igrejas.

## Decisão
- Priorizar aprendizado bíblico centrado em Jesus, vida comunitária e serviço. A pergunta de produto é qual problema real da caminhada e da comunidade estamos ajudando a resolver.
- Entregar uma jornada que já possa ser usada: passagem dos Evangelhos → contexto e observação → perguntas → prática → roteiro para um encontro.
- Publicar quatro guias originais referenciados, sem reproduzir uma tradução bíblica. A leitura pode usar a Bíblia da comunidade ou um link externo explicitamente identificado.
- Oferecer roteiros de 30, 45 e 60 minutos com download em texto e impressão. Não coletar participantes, relatos, pedidos de oração, notas ou histórico de leitura nesta entrega.
- Abrir os materiais sem cadastro. Preservar protótipos anteriores em `/laboratorio`, com indicação explícita de que são locais/demonstrativos e fora do foco principal. Os dados anteriores não são apagados.
- Redirecionar home, navegação e painel para estudos, encontros e uso por igrejas.
- Não comunicar aprovação divina de decisões técnicas, certificação de uma igreja ou autoridade pastoral inexistente. O software serve à comunidade e as referências devem poder ser conferidas.

## Consequências
- Igrejas e pequenos grupos podem usar um material concreto antes da implantação de identidade e participação remotas.
- Download/impressão não é reserva de evento nem envio de convites. Comunidades online, memberships, publicação e moderação continuam pendentes.
- Não há escala de fé, ranking espiritual, promessa de resultado ou mecanismo de retenção nesta jornada.
- Conteúdo pode ser expandido com autoria, fontes, revisão editorial/pastoral identificada e direitos de uso. A versão inicial não deve alegar revisão humana especializada que não ocorreu.
- O uso público de material estático não altera os requisitos de elegibilidade, privacidade e moderação para contas e participação futura.

## Validação
Testes verificam integridade dos guias e links, a soma das durações dos roteiros, acesso público e a ausência de testes/compatibilidade na navegação principal. Chromium verifica a jornada anônima completa, download, mídia de impressão, filtros, rotas inválidas e layouts móveis/desktop. Nenhuma escrita em localStorage/sessionStorage na jornada pública foi observada.
