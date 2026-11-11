# Requisitos de Produto — Conectados em Cristo

> **Prioridade reforçada em 2026-11-11:** Jesus Cristo no centro; aprendizado bíblico, vida comunitária e serviço, com utilidade concreta para igrejas e pequenos grupos. Testes de dons/personalidade e compatibilidade não são a porta de entrada nem o núcleo. A primeira jornada pública já oferece quatro estudos dos Evangelhos e roteiros de encontro para download/impressão. Participação remota e controles de segurança continuam dependências reais.
> **Status: requisitos de trabalho, não inventário de implementação.** Este documento foi reconciliado com a direção aprovada em 2026-11. O produto segue “Comunidade primeiro. Conexões depois. Relacionamentos como consequência.” Requisitos antigos de namoro, matching, prazos, equipe e orçamento não constituem compromisso.

## 1. Conta e identidade

- **REQ-AUTH-001:** cadastro real deve usar provedor de autenticação aprovado.
- **REQ-AUTH-002:** e-mail deve poder ser verificado antes do uso das funcionalidades protegidas.
- **REQ-AUTH-003:** login e logout devem criar/encerrar sessão real.
- **REQ-AUTH-004:** sessões devem ser revogáveis e protegidas contra roubo/reuso.
- **REQ-AUTH-005:** recuperação de acesso deve ser segura.
- **REQ-AUTH-006:** a API deve resolver a identidade externa para uma conta interna UUID.
- **REQ-AUTH-007:** estado da conta deve ser considerado em cada operação protegida.
- **REQ-AUTH-008:** nenhuma credencial ou token de aplicação deve ser persistido em localStorage/sessionStorage.

## 2. Perfil e privacidade

- **REQ-PROFILE-001:** usuário deve possuir perfil mínimo persistente.
- **REQ-PROFILE-002:** campos opcionais devem ter finalidade definida.
- **REQ-PROFILE-003:** visibilidade de informações pessoais deve ser controlável.
- **REQ-PROFILE-004:** informações religiosas não devem ser públicas por padrão.
- **REQ-PROFILE-005:** localização exata, telefone e e-mail devem permanecer privados por padrão.
- **REQ-PROFILE-006:** edição, correção, exportação e exclusão devem respeitar os requisitos jurídicos aprovados.
- **REQ-PROFILE-007:** o servidor deve validar autorização para leitura e alteração de perfil.

## 3. Comunidades e memberships

- **REQ-COMMUNITY-001:** comunidades do beta devem ser criadas/curadas pela administração.
- **REQ-COMMUNITY-002:** comunidades devem possuir estado, categoria, regras e modo de entrada.
- **REQ-COMMUNITY-003:** catálogo público deve expor somente a allowlist aprovada de metadados.
- **REQ-COMMUNITY-004:** comunidades não listadas não devem ser enumeráveis por usuários não autorizados.
- **REQ-COMMUNITY-005:** entrada, saída, solicitação e aprovação devem ser persistentes.
- **REQ-COMMUNITY-006:** memberships devem ser verificados server-side antes de conteúdo/interação.
- **REQ-COMMUNITY-007:** moderadores devem possuir escopo explícito de comunidade.

## 4. Conteúdo e interação

- **REQ-CONTENT-001:** publicações iniciais serão predominantemente texto.
- **REQ-CONTENT-002:** autor pode criar, editar dentro de janela definida e excluir conforme política aprovada.
- **REQ-CONTENT-003:** comentários exigem autenticação e autorização.
- **REQ-CONTENT-004:** reação “Apoiar” deve ser única por membro/publicação e removível pelo próprio autor.
- **REQ-CONTENT-005:** conteúdo não deve ser público para a internet por padrão.
- **REQ-CONTENT-006:** paginação e limites de entrada devem existir no servidor.
- **REQ-CONTENT-007:** bloqueios devem ser aplicados a interações relevantes no servidor.

## 5. Segurança e moderação

- **REQ-SAFETY-001:** autorização deve ser deny-by-default.
- **REQ-SAFETY-002:** IDs enviados pelo cliente nunca são prova de identidade ou ownership.
- **REQ-SAFETY-003:** operações protegidas devem carregar fatos confiáveis do servidor.
- **REQ-SAFETY-004:** denúncias devem ser persistentes, restritas e auditáveis.
- **REQ-SAFETY-005:** ações de moderação devem respeitar papel, escopo, conflito de interesse e justificativa quando exigida.
- **REQ-SAFETY-006:** sanções devem ser proporcionais e auditáveis.
- **REQ-SAFETY-007:** rate limiting e controles antiabuso devem existir antes do beta.
- **REQ-SAFETY-008:** logs não devem registrar segredos, tokens ou dados privados desnecessários.

## 6. Administração

- **REQ-ADMIN-001:** administração deve ser protegida por autorização server-side.
- **REQ-ADMIN-002:** administradores devem poder gerenciar comunidades, categorias e moderadores conforme escopo aprovado.
- **REQ-ADMIN-003:** denúncias devem possuir fila central restrita.
- **REQ-ADMIN-004:** ações administrativas relevantes devem gerar trilha de auditoria.
- **REQ-ADMIN-005:** acesso de administrador a dados sensíveis deve ter necessidade e justificativa quando aplicável.

## 7. Fé e pedidos de oração

- **REQ-FAITH-001:** conteúdo editorial deve possuir autoria/referência e requisitos de licença quando aplicável.
- **REQ-FAITH-002:** pedidos de oração devem possuir controle explícito de audiência.
- **REQ-FAITH-003:** pedidos de oração não devem receber dados reais antes de privacidade, consentimento, autorização, denúncia, moderação e exclusão estarem operacionais.
- **REQ-FAITH-004:** acesso a oração deve ser negado por padrão quando fatos de audiência forem ausentes ou desconhecidos.

## 8. Requisitos não funcionais

### Segurança
- HTTPS em ambientes reais.
- Segredos fora do Git.
- Ambientes separados.
- Validação server-side.
- Proteção de sessão.
- Dependências auditadas continuamente.
- Testes negativos de autorização, enumeração, revogação e concorrência.

### Privacidade
- Minimização de dados.
- Finalidade e retenção documentadas.
- Direitos do titular operacionalizados.
- Dados potencialmente sensíveis tratados com proteção adequada.
- Backups e evidências com acesso restrito.

### Qualidade
- Testes unitários, integração e E2E para fluxos críticos antes do beta.
- CI obrigatório.
- Acessibilidade revisada.
- Builds reproduzíveis e migrations versionadas.

### Operação
- Backup/restore testado.
- Monitoramento e alertas.
- Runbooks e resposta a incidentes.
- Rollback documentado.
- Capacidade de moderação conhecida antes de abrir o beta.

## 9. Fora do primeiro MVP

Não são requisitos de lançamento inicial:
- chat privado;
- descoberta romântica;
- matching/compatibilidade algorítmica;
- interesse romântico;
- criação livre de comunidades;
- eventos;
- notificações avançadas;
- internacionalização além do português brasileiro inicial.

Esses recursos permanecem no backlog e exigem nova decisão antes de promoção.

## 10. Metas e restrições

Não existem metas numéricas aprovadas para prazo, equipe, orçamento, cobertura de usuários, latência ou escala máxima.

Não usar os valores antigos de “8 semanas”, “6 meses”, “3 devs + PM + designer”, “100+ beta testers”, NPS ou metas de matching como requisitos.

Metas operacionais devem ser definidas depois de escopo, orçamento, capacidade de moderação e critérios jurídicos estarem fechados.
