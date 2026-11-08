# Autorização — Conectados em Cristo

- Revisão: 2026-11-08
- Estado: baseline resumido; matriz detalhada de engenharia em [authorization-matrix-detailed.md](authorization-matrix-detailed.md). A matriz detalhada permanece proposta para validação de produto, privacidade e operação. Funções puras de política e testes unitários estão implementados em `server/src/auth/authorization.mts` e `server/tests/authorization.test.mts`; a integração server-side por rota permanece pendente até identidade, papéis, memberships e estados confiáveis existirem.
- Regra: em divergência, aplicar deny by default e registrar decisão antes de liberar acesso.

## 1. Princípios

- Deny by default: negar quando uma permissão não estiver explicitamente concedida.
- Autorização é aplicada na API em toda requisição; esconder botão ou rota no frontend não protege recurso.
- Combinar papel (RBAC) com atributos/relacionamentos (ABAC): conta ativa, membership, comunidade, autoria, visibilidade, bloqueios, sanções e conflito de interesse.
- IDs opacos não substituem autorização.
- Menor privilégio, segregação de funções e auditoria de ações sensíveis.
- Moderadores só atuam nas comunidades atribuídas; administradores possuem escopo global, com justificativa e auditoria.
- Dados de oração e evidências de moderação exigem controles especiais e acesso por finalidade.

## 2. Papéis de referência

| Papel | Escopo |
|---|---|
| Visitante | Catálogo e metadados explicitamente públicos; sem conteúdo de comunidade ou interação |
| Membro | Própria conta/perfil e conteúdo permitido nas comunidades em que tem membership ativo |
| Moderador | Permissões de membro + fila/casos das comunidades atribuídas; sem poder administrativo global |
| Administrador da plataforma | Gestão global de comunidades, membros, papéis e casos; acesso a dados privados somente quando estritamente necessário, justificado e auditado |

Suporte, financeiro e outros papéis não estão aprovados para o beta e não devem ser implementados implicitamente.

## 3. Matriz inicial de autorização

Legenda: **P** = permitido conforme visibilidade; **O** = somente próprio recurso; **C** = somente comunidade atribuída/caso autorizado; **G** = global com justificativa e auditoria; **—** = negado.

| Recurso/ação | Visitante | Membro | Moderador | Administrador |
|---|---:|---:|---:|---:|
| Ler catálogo público de comunidades (metadados) | P | P | P | P |
| Ler posts/lista nominal de membros via catálogo público | — | — | — | — |
| Ler perfil público | P | P | P | P |
| Ler perfil restrito | — | O / autorizado pelo titular | C, se necessário a caso | G, somente necessidade justificada |
| Editar próprio perfil | — | O | O | O |
| Consultar/alterar dados de outra conta | — | — | C, mínimo necessário | G, mínimo necessário |
| Solicitar membership em comunidade | — | P | P | G |
| Ler conteúdo de comunidade pública | — | P se membro conforme regra | C se atribuído; P se membro | G, quando necessário |
| Ler conteúdo de comunidade privada | — | P se membro ativo | C se atribuído | G, quando necessário |
| Criar post/comentário | — | P se membro ativo e conta elegível | P se membro ativo e conta elegível | P se membro ativo e conta elegível |
| Editar/excluir próprio conteúdo | — | O, dentro das regras F-02/F-09 | O, dentro das regras F-02/F-09 | O, dentro das regras F-02/F-09 |
| Remover conteúdo de terceiros | — | — | C, segundo F-03 | G, segundo F-03 |
| Reagir “Apoiar” | — | P se membro e post elegível | P se membro e post elegível | P se membro e post elegível |
| Ver lista nominal de reatores | — | — | — | — |
| Ver agregado de reações | — | P se seguro e permitido | P se seguro e permitido | P se seguro e permitido |
| Criar denúncia | — | O | O | O |
| Consultar denúncia própria | — | O, apenas estado permitido | O, apenas estado permitido | O, apenas estado permitido |
| Consultar caso/evidência de moderação | — | — | C, se atribuído e sem conflito | G, com justificativa e auditoria |
| Decidir caso de moderação | — | — | C, se atribuído e sem conflito | G, conforme política |
| Recorrer de sanção própria | — | O | O | O |
| Decidir recurso próprio ou caso em que está envolvido | — | — | — | — |
| Criar/remover próprio bloqueio | — | O | O | O |
| Consultar pedidos de oração privados de terceiros | — | — | — | — |
| Ler pedido de oração compartilhado explicitamente | — | P conforme público escolhido | C apenas se ligado a caso autorizado | G apenas em exceção justificada e auditada |
| Acessar logs/segredos | — | — | — | G restrito a operadores técnicos autorizados; não expor payload sensível |

Esta matriz é baseline de engenharia. A política final deve ser detalhada por endpoint, recurso, estado e finalidade antes de implementação.

## 4. Regras obrigatórias

### Conta e sessão
- Conta não verificada, suspensa, encerrada ou restrita recebe somente permissões previstas para seu estado.
- Cada endpoint sensível valida sessão, status, escopo e finalidade.
- A API não aceita userId, role, communityId ou moderatorId fornecidos pelo cliente como prova de autorização.

### Membership e conteúdo
- Conteúdo de comunidade exige membership ativo e visibilidade compatível.
- Membership removido ou suspenso perde acesso imediatamente em novas requisições.
- Catálogo público nunca expõe posts ou diretório de membros (F-07).
- Editar conteúdo exige autoria e janela aprovada; moderação de terceiros exige papel e escopo (F-02/F-03/F-09).

### Bloqueio
- Aplicar bloqueio global em descoberta e interações diretas entre contas (F-01).
- Bloqueio não apaga automaticamente conteúdo comunitário e não concede acesso a conteúdo privado.
- Verificar bloqueios em busca, perfis, interações, comentários, reações e notificações aplicáveis.

### Moderação e conflitos
- Moderador só acessa casos das comunidades atribuídas.
- Se envolvido no caso, conta, conteúdo, denúncia ou recurso, deve recusar e encaminhar a outro moderador/admin (F-08).
- Ações relevantes exigem motivo, ator, alvo, data, escopo e registro de auditoria.
- Sanções seguem a escala proporcional F-03; sanção global fica com administrador.

### Oração e privacidade
- Pedido privado é visível ao autor por padrão.
- Compartilhamento é explícito e revogável conforme a política.
- Moderador/admin não recebe acesso geral a pedidos privados; exceção requer finalidade, autorização específica e auditoria.
- Não retornar conteúdo privado em listagens, busca, notificações, analytics ou logs.

## 5. Casos negativos obrigatórios de teste

- Membro A tenta acessar perfil restrito, post, membership ou denúncia de B por ID alterado.
- Membro removido/suspenso tenta acessar conteúdo por URL antiga.
- Visitante tenta criar post, comentário, reação, bloqueio ou denúncia.
- Moderador tenta atuar fora de sua comunidade.
- Moderador tenta decidir caso próprio ou de alguém com quem tem conflito.
- Usuário bloqueado tenta localizar ou interagir com quem o bloqueou.
- Administrador tenta consultar pedido de oração privado sem justificativa/escopo permitido.
- Usuário tenta ler lista nominal de reatores ou diretório de membros.
- Conta suspensa tenta chamar diretamente endpoints de escrita.
- Requisição repetida/concorrente tenta duplicar reação, membership ou denúncia.

**Status:** matriz inicial registrada; validação de produto, revisão jurídica/operacional e implementação server-side pendentes.
