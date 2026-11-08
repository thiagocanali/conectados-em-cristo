# Matriz de autorização detalhada — MVP

- Revisão: 2026-11-08
- Estado: contrato de engenharia proposto, derivado de F-01 a F-10, ADR-0007, `authorization.md`, `threat-model.md` e do inventário OpenAPI.
- Não é aprovação jurídica, operacional ou de lançamento. Não autoriza autenticação real, escrita de domínio ou dados reais.
- Precedência: decisões de produto aprovadas e regras de segurança explícitas prevalecem; qualquer caso não coberto é negado até decisão registrada.

## 1. Objetivo e invariantes

A API é a autoridade de autorização. Toda operação protegida deve:

1. Validar sessão/token pelo adaptador aprovado e resolver `(provider, subject)` para o UUID interno.
2. Consultar o estado atual da conta; não confiar em estado, papel, ownership ou membership enviados pelo cliente ou cache desatualizado.
3. Carregar o recurso pelo identificador e validar seu estado, visibilidade e relações no servidor.
4. Aplicar papel + escopo + ownership + membership + bloqueios + sanções + conflito de interesse + finalidade.
5. Responder com o mínimo de dados e registrar ações sensíveis sem payload privado desnecessário.

**Deny by default.** ID, slug, URL, cursor, cookie válido ou conhecimento de um identificador nunca concede permissão. Falha de autorização não pode vazar se um recurso privado existe. Guards do frontend são apenas UX.

## 2. Identidade, conta e elegibilidade

| Estado interno | Leitura de catálogo público | Leitura/edição de perfil próprio | Conteúdo e participação | Ações de segurança |
|---|---|---|---|---|
| `pending_verification` | Pública, sem sessão | Somente fluxo mínimo de verificação/recuperação; sem perfil comunitário | Negado | Fluxos de verificação e encerramento |
| `active` | Permitida | Permitida conforme campos/visibilidade | Conforme papel, membership e regras | Permitidas conforme escopo |
| `restricted` | Pública sem sessão; não usar a sessão para contornar restrição | Somente operações expressamente liberadas pela sanção | Negado por padrão; exceções precisam de política explícita | Consultar aviso/contestar sanção e encerrar sessão |
| `suspended` | Pública sem sessão | Sem acesso ao domínio; somente contestação/encerramento quando previsto | Negado | Fluxo de recurso/encerramento |
| `deleted` | Pública sem sessão | Negado; fluxo de direitos/exclusão tratado separadamente | Negado | Nenhuma ação autenticada normal |

- A tabela não define quais operações de recurso estarão disponíveis nem a duração de estados restritos; F-03 e os fluxos de recurso ainda precisam de parâmetros.
- Conta elegível para participação exige `active`, verificação exigida pelo fluxo aprovado e idade mínima de 18 anos tratada por mecanismo separado da autenticação.
- E-mail verificado não comprova idade, identidade civil, caráter ou elegibilidade por si só.
- Alteração de estado deve surtir efeito em novas requisições; invalidar/revogar sessões conforme o fluxo de identidade.

## 3. Papéis e escopo

| Papel | Escopo concedido | Limites |
|---|---|---|
| Visitante | Somente catálogo e metadados explicitamente públicos | Sem perfil restrito, conteúdo, diretório, interação ou escrita |
| Membro | Própria conta e recursos próprios; conteúdo de comunidades nas quais possui membership ativo | Sem acesso a recursos de outros membros fora da visibilidade concedida |
| Moderador | Capacidades de membro + casos e ações de moderação nas comunidades explicitamente atribuídas | Sem poderes globais; recusa obrigatória em conflito; sem acesso geral a pedidos de oração privados |
| Administrador | Gestão global de comunidades, atribuições e casos, conforme necessidade operacional | Acesso a dados pessoais/privados não é irrestrito; finalidade, necessidade, justificativa e auditoria; não pode decidir recurso próprio ou caso em que esteja envolvido |

- Papéis são atribuídos e revogados por fluxo administrativo confiável; nunca aceitos de body, query, header customizado ou claims não validados.
- Um moderador também pode ser membro, mas a permissão de membro não amplia seu escopo de moderação.
- Nenhum papel implícito de suporte, financeiro ou operador de dados está autorizado pelo MVP.
- Privilégios administrativos devem ser separados de acesso técnico a infraestrutura/segredos.

## 4. Estado de comunidade e membership

### 4.1 Comunidade

| Estado | Catálogo público | Conteúdo | Novas entradas |
|---|---|---|---|
| `draft` | Nunca | Negado | Negado |
| `active` + `listed` | Somente allowlist F-07 | Somente membership ativo | Conforme `joinMode` |
| `active` + `unlisted` | Nunca | Somente membro ativo ou convite autorizado | Convite/autorização explícita; fluxo ainda pendente |
| `active` + `private` | Nunca | Somente membro ativo | Solicitação/aprovação ou convite, conforme configuração |
| `paused` | Nunca | Negado por padrão até política explícita de leitura/saída | Negado |
| `archived` | Nunca | Negado por padrão; eventual exportação/consulta exige política futura | Negado |

- No catálogo público, apenas comunidades `active + listed` e campos da allowlist F-07. Sem contagens, posts, comentários, diretório, solicitações ou status interno.
- Não inferir que `listed` significa conteúdo público. No MVP, posts e comentários não são anônimos/públicos: exigem membership ativo.
- Respostas para comunidades inexistentes, não listadas ou não autorizadas devem seguir política anti-enumeração; detalhe público usa 404 indistinguível conforme F-07.

### 4.2 Membership

| Estado | Ler conteúdo | Publicar/comentar/reagir | Gerenciar entrada |
|---|---|---|---|
| `pending` | Não | Não | Consultar/cancelar somente a própria solicitação, quando o fluxo existir |
| `active` | Sim, se conta elegível e sem outra negação | Sim, conforme regras do recurso | Sair; não aprovar a própria entrada |
| `suspended` | Não | Não | Consultar somente informação mínima da restrição/recurso |
| `left` / `removed` | Não | Não | Sem reativação automática; nova entrada segue regra da comunidade |

- Membership pertence à conta interna e à comunidade; IDs recebidos do cliente são apenas localizadores.
- A aprovação de entrada deve ser feita por administrador ou agente explicitamente autorizado para aquela comunidade. Moderadores não ganham gestão de membership automaticamente.
- Mudança para `left`, `removed` ou `suspended` revoga acesso em novas requisições, inclusive por URLs antigas.
- O beta não implementa criação livre de comunidades por membros.

## 5. Matriz por recurso e operação

| Recurso/operação | Regra mínima de autorização |
|---|---|
| Catálogo e detalhe público | Visitante ou qualquer conta; apenas comunidade `active + listed`, allowlist F-07 |
| Perfil público | Campos explicitamente públicos pelo titular; conta/recurso elegíveis; aplicar bloqueio e anti-enumeração |
| Perfil privado/restrito | Titular; exceção de moderação somente se necessária a caso atribuído, autorizada e auditada |
| Editar perfil | Somente titular; allowlist de campos editáveis; nunca aceitar alteração de papel, status, idade verificada ou IDs de identidade |
| Solicitar/entrar em comunidade | Conta `active`, 18+ elegível; comunidade `active`; política `joinMode`; convite/approval quando exigido |
| Ler posts/comentários | Conta `active` + membership `active` + comunidade `active` + recurso visível; bloqueio não transforma conteúdo comunitário em acesso público |
| Criar post/comentário | Mesmas condições de leitura + regras de conteúdo, limites e estado de sanção; autoria definida no servidor |
| Editar próprio post/comentário | Autor interno + janela curta F-02/F-09 + recurso elegível; campos e histórico controlados no servidor |
| Excluir próprio post/comentário | Autor interno; ocultação rápida e política de exclusão/anonimização F-05/F-09; não apagar evidência ativa automaticamente |
| Moderar conteúdo de terceiros | Moderador atribuído à comunidade ou administrador autorizado; motivo, escopo, regra aplicada e auditoria; F-03 |
| Apoiar/remover Apoiar | Conta `active` + membership ativo + post visível/elegível; operação idempotente; só a própria reação pode ser removida |
| Ver reação | Nunca retornar lista nominal; agregado somente se a política anti-reidentificação F-10 for aprovada e o limite seguro definido |
| Bloquear/desbloquear | Somente o próprio bloqueio da conta autenticada; alvo resolvido no servidor; não permite consultar bloqueios de terceiros |
| Denunciar | Conta elegível; denunciante associado pelo servidor; limitar abuso; denúncia e evidências em área confidencial |
| Consultar denúncia própria | Somente estado mínimo permitido ao denunciante; sem identidade do moderador, notas internas, evidências de terceiros ou dados de outros denunciantes |
| Consultar caso/evidência | Moderador atribuído e sem conflito, no escopo da comunidade; administrador apenas com necessidade, justificativa e auditoria |
| Decidir caso | Moderador atribuído e sem conflito, dentro da autoridade local; administrador conforme política global; motivo obrigatório e sanção proporcional |
| Recorrer | Somente pessoa afetada; encaminhar a decisor diferente; autor do ato não decide o próprio recurso |
| Pedido de oração privado | Somente autor; não acessível a moderadores/admins por privilégio genérico |
| Pedido de oração compartilhado | Apenas público explicitamente selecionado pelo autor, dentro da audiência e finalidade; revogação deve bloquear acesso futuro |
| Auditoria | Acesso operacional restrito; leitura justificada, auditada e minimizada; nunca expor tokens, segredos ou conteúdo privado desnecessário |

## 6. Bloqueio global (F-01)

- Bloqueio é uma relação entre duas contas internas e é verificado no servidor em descoberta, perfis/interações diretas, comentários, reações e notificações aplicáveis.
- Para as superfícies afetadas, a experiência deve evitar revelar a existência ou direção do bloqueio.
- Bloqueio não apaga posts/comentários comunitários, não remove membership automaticamente e não concede acesso a conteúdo privado.
- Conteúdo comunitário compartilhado permanece sujeito às regras da comunidade e à moderação; interações diretas entre as contas bloqueadas são negadas.
- Não permitir que IDs alternativos, paginação, endpoints secundários ou notificações contornem a regra.
- Bloqueio não substitui denúncia, sanção ou proteção contra ameaça; os fluxos devem poder coexistir.

## 7. Moderação e conflito de interesse (F-03/F-08)

- A atribuição de moderador deve ser explícita, temporalmente válida e restrita à comunidade.
- Antes de exibir caso/evidência ou aceitar decisão, verificar conflito: moderador é denunciante, denunciado, autor do conteúdo, alvo da sanção, parte do recurso ou possui envolvimento pessoal relevante.
- Em conflito, negar acesso operacional ao caso e encaminhar a outro moderador/admin; não basta esconder o botão.
- Se não houver substituto disponível, o caso permanece na fila restrita e segue escalonamento operacional; não conceder bypass automático ao moderador impedido.
- Administrador envolvido também deve se declarar impedido; o fluxo de substituição/fallback precisa de responsável independente.
- Ações exigem ator interno, alvo, comunidade/caso, ação, motivo, instante e correlação; registrar somente evidência necessária.
- Sanções globais e recursos exigem autoridade separada e trilha auditável. Classificação automática não decide punição grave.

## 8. Pedidos de oração e dados sensíveis

- Pedido é privado por padrão e pode conter dados sensíveis do autor ou de terceiros.
- Não incluir texto de oração em logs, analytics, busca geral, notificações por padrão, previews públicos ou mensagens de erro.
- Audiência compartilhada deve ser explícita, compreensível e revogável; a semântica exata de "comunidade" versus "membros selecionados" ainda precisa ser definida antes de implementação.
- Acesso excepcional para resposta a denúncia/risco não pode ser criado por uma permissão ampla de administrador; exige política específica, base/finalidade, pessoa autorizada, registro e revisão jurídica.
- Não coletar pedidos reais até concluir inventário, finalidade, bases legais, retenção, direitos, backups e revisão jurídica F-05.

## 9. Respostas e anti-enumeração

- `401`: sessão ausente/inválida para rota protegida.
- `403`: identidade conhecida sem permissão, quando a resposta não revelar recurso protegido.
- `404`: recurso inexistente ou cuja existência não deve ser revelada (ex.: comunidade não listada/privada a visitante, caso não atribuído, pedido privado de terceiro).
- `409`: conflito de estado, duplicidade não permitida ou impedimento por conflito de interesse quando apropriado sem revelar detalhes.
- `400/422`: entrada inválida, sem ecoar conteúdo sensível.
- Respostas de erro seguem Problem Details sanitizado, sem SQL, stack, tokens, payload privado ou detalhes internos.

## 10. Testes obrigatórios antes de habilitar escrita

### Identidade e estados
- Sessão sem identidade interna, identidade revogada ou conta `pending_verification`, `restricted`, `suspended` ou `deleted` não executa escrita.
- Cliente envia `accountId`, `role`, `provider`, `subject`, `membershipStatus` ou `moderatorId` forjados; servidor ignora/rejeita e usa contexto resolvido.
- Suspensão/revogação aplicada bloqueia requisição subsequente sem depender de logout no navegador.

### Comunidades e conteúdo
- Visitante não lê posts nem diretório, mesmo em comunidade listed.
- Membro A não lê comunidade privada/unlisted ou post de B sem membership ativo.
- Membro removido tenta usar URL/cursor/ID antigo; acesso negado.
- Moderador da comunidade A não lê/modera casos da comunidade B.
- Conta sem membership ativo não cria post, comentário ou reação.
- Autor B não pode ser substituído por ID enviado por A; A não edita/exclui conteúdo de B.
- Comunidade draft, paused ou archived não fica acessível por endpoint direto.

### Bloqueios e reações
- A bloqueia B; B não consegue descobrir/interagir diretamente com A por endpoints alternativos.
- Bloqueio não concede leitura de conteúdo privado nem apaga conteúdo comunitário.
- Requisições concorrentes de Apoiar não criam reações duplicadas; remoção afeta somente a reação do ator.
- Nenhuma resposta contém lista nominal de reatores.

### Denúncia, moderação e oração
- Denunciante não acessa evidências/notas internas nem dados de outros denunciantes.
- Moderador impedido não lista, abre, altera ou decide caso próprio; tentativa gera evento de segurança mínimo e encaminhamento.
- Moderador atribuído sem conflito só atua em seu escopo.
- Administrador não lê pedido privado de oração por privilégio genérico.
- Pedido compartilhado não aparece a audiência não selecionada e deixa de ser acessível após revogação.
- Autor de decisão não decide o próprio recurso.

### Propriedades transversais
- Testar cada rota diretamente, sem depender da UI; incluir IDs aleatórios, IDs válidos de outro usuário, cursor, paginação, concorrência e estados de transição.
- Testar negação sem vazamento por status, corpo, tamanho de resposta, contagens ou timing grosseiramente distinto.
- Auditar ações sensíveis sem registrar texto privado, tokens, cookies ou evidências integrais.
- Cobrir autorização em testes de integração com PostgreSQL e principal interno simulado; não usar sessão demo como prova de identidade.

## 11. Pendências que bloqueiam implementação

1. **F-04:** responsáveis, cobertura, SLAs, escalonamento e capacidade máxima da fila de moderação.
2. **F-05/F-09:** inventário, finalidade/base legal, retenção por categoria, exceções, exclusão/anônimização, backup/restore e revisão jurídica.
3. **F-06/D-19:** mecanismo de verificação de idade, critérios de suspeita e tratamento de inelegíveis.
4. **F-07:** fluxo seguro de convite/autorização para comunidades unlisted e anti-vazamento em execução.
5. **F-08:** critérios objetivos de conflito, fallback independente, acesso pré-impedimento e auditoria.
6. **F-02/F-09:** limites e janela de edição, estados de conteúdo, comentários de terceiros e preservação de evidência.
7. **F-10:** limite seguro de agregação, antiabuso, concorrência/idempotência e acessibilidade.
8. **D-14:** provedor e sessão reais, MFA da equipe, cookies/CSRF/CORS, revogação e rate limits.
9. **OpenAPI:** alinhar schemas, códigos e respostas de cada endpoint a esta matriz antes de implementar operações de domínio.

**Próximo passo técnico permitido:** transformar as regras estáveis e independentes de fornecedor em funções puras de política e testes unitários, sem sessão real, banco de domínio ou efeitos colaterais. Casos dependentes das pendências acima permanecem explicitamente bloqueados.
