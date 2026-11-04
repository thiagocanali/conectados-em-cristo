# Especificação Funcional — Comunidades do Conectados em Cristo

- Data: 2026-11-04
- Status: **rascunho funcional para revisão**
- Escopo: comunidades curadas, participação, conteúdo comunitário e moderação no beta.
- Relação: complementa `PRODUCT_GAP_ANALYSIS.md`, `OPEN_DECISIONS.md`, `SECURITY_GAP_ANALYSIS.md` e `EXECUTION_ROADMAP.md`.

## 1. Objetivo e princípios

Entregar espaços cristãos organizados para convivência, aprendizado e apoio mútuo, priorizando a comunidade e não a descoberta romântica.

Princípio orientador: **Comunidade primeiro. Conexões depois. Relacionamentos como consequência.**

Requisitos transversais:
- Privacidade e segurança desde o desenho.
- Negação por padrão: nenhuma ação é permitida sem autenticação, vínculo e autorização válidos.
- Comunidade pública no catálogo não significa conteúdo público na internet.
- Moderação deve ser centralizada, rastreável e operável por pessoas autorizadas.
- A interface deve explicar estados, regras e consequências de ações.
- Não coletar dados reais no protótipo local atual.

## 2. Escopo do beta

### Incluído no escopo funcional

1. Catálogo de comunidades curadas pela administração.
2. Página de apresentação e regras de cada comunidade.
3. Entrada imediata em comunidades configuradas como públicas/abertas.
4. Solicitação e decisão de entrada em comunidades privadas/por aprovação.
5. Listagem das comunidades das quais o usuário participa.
6. Publicações de membros autorizados.
7. Comentários em publicações.
8. Reações simples às publicações.
9. Denúncia de conteúdo ou comportamento.
10. Ferramentas de moderação com escopo limitado às comunidades atribuídas.
11. Bloqueio aplicado no servidor, respeitando as regras de visibilidade e interação.
12. Saída voluntária de uma comunidade.

### Fora do beta inicial

- Criação livre de comunidades por usuários.
- Mensagens privadas ou chat em tempo real.
- Descoberta individual de pessoas ou ranking de compatibilidade.
- Recursos de namoro como núcleo do produto.
- Feed público indexável por mecanismos de busca.
- Pedidos de oração com dados reais, até que privacidade, consentimento, autorização, denúncia, moderação e exclusão sejam implementados e validados.
- Upload de arquivos/imagens por membros, até existir política de armazenamento, análise, denúncia e remoção.
- Eventos, transmissões e notificações push, salvo decisão posterior.

## 3. Papéis e limites

### Visitante
- Pode visualizar a apresentação da plataforma e os metadados explicitamente públicos do catálogo.
- Não pode visualizar publicações, comentários ou listas de membros.
- Não pode entrar, publicar, comentar, reagir, denunciar conteúdo autenticado ou solicitar participação sem autenticação.

### Membro autenticado
- Pode consultar o catálogo e as comunidades conforme sua visibilidade.
- Pode entrar em comunidade aberta conforme suas regras.
- Pode solicitar entrada em comunidade privada visível.
- Pode visualizar e interagir com conteúdo apenas nas comunidades em que tem vínculo ativo.
- Pode publicar, comentar, reagir, denunciar e sair, conforme permissões e regras.
- Não pode alterar regras, moderadores, categorias ou configurações administrativas.

### Moderador
- Atua somente nas comunidades que lhe foram atribuídas.
- Pode consultar a fila de denúncias e o conteúdo necessário à análise dentro desse escopo.
- Pode aplicar ações de moderação previstas na política, registrando motivo e resultado.
- Não pode conceder a si mesmo escopo global nem administrar outras comunidades.
- Não pode apagar trilhas de auditoria nem acessar dados privados sem necessidade operacional.

### Administrador da plataforma
- Cria, edita, arquiva e organiza comunidades.
- Define categorias, descrição, regras, visibilidade e modo de entrada.
- Designa e remove moderadores.
- Gerencia solicitações de entrada e governança global.
- Acessos administrativos devem ser protegidos, auditados e limitados a pessoas autorizadas.

## 4. Modelo de comunidade

Cada comunidade deve possuir, no mínimo:
- Identificador estável.
- Nome e slug únicos.
- Descrição curta e apresentação.
- Categoria.
- Regras e diretrizes de convivência.
- Estado: rascunho, ativa, pausada ou arquivada.
- Visibilidade do catálogo: listada ou não listada.
- Modo de entrada: aberta ou mediante aprovação.
- Criador administrativo e datas de criação/atualização.
- Moderadores atribuídos.
- Contagens derivadas de membros e publicações, sem expor listas privadas.

**Distinção obrigatória:** visibilidade no catálogo e autorização para ler conteúdo são controles diferentes. Mesmo uma comunidade listada não expõe publicações a visitantes nem a membros não autorizados.

Uma comunidade pausada não aceita novas entradas nem novas publicações; conteúdo histórico permanece sujeito às regras de acesso e retenção definidas. Uma comunidade arquivada deixa de aceitar novas interações. A política de preservação ou remoção do histórico precisa ser aprovada antes da implementação.

## 5. Fluxos principais

### 5.1 Descobrir e visualizar catálogo
1. Usuário abre a área de comunidades.
2. Sistema lista somente comunidades ativas e listadas.
3. Exibe nome, categoria, descrição, modo de entrada e regras/resumo público.
4. Não exibe publicações, comentários, membros ou dados de perfil.
5. Comunidades não listadas só aparecem a usuários com autorização ou convite válido, conforme regra futura.

**Aceite:** visitante e membro não autorizado recebem apenas metadados públicos; chamadas diretas a endpoints de conteúdo não contornam a regra.

### 5.2 Entrar em comunidade aberta
1. Usuário precisa estar autenticado.
2. Sistema verifica se a comunidade está ativa, aberta e aceita membros.
3. Sistema verifica bloqueios, restrições e elegibilidade aplicáveis.
4. Se permitido, cria vínculo ativo de membro de forma idempotente.
5. Atualiza a lista de comunidades do usuário.
6. Registra evento de auditoria.

**Aceite:** repetição da ação não cria vínculos duplicados; comunidade pausada/arquivada ou usuário impedido não aceita entrada.

### 5.3 Solicitar entrada em comunidade privada
1. Usuário autenticado visualiza a comunidade, se ela estiver listada ou acessível por convite.
2. Solicita participação.
3. Sistema cria solicitação pendente e impede duplicatas ativas.
4. Moderador autorizado ou administrador analisa a solicitação.
5. Decisão de aprovar ou recusar exige ator autorizado; motivo interno pode ser registrado.
6. Ao aprovar, cria vínculo ativo; ao recusar, encerra solicitação sem expor notas internas ao solicitante.
7. A decisão é auditada.

**Aceite:** apenas moderadores atribuídos ou administradores podem decidir; solicitações não revelam dados de outros candidatos; usuário não acessa conteúdo antes da aprovação.

### 5.4 Sair de comunidade
1. Membro seleciona sair.
2. Sistema confirma a ação e explica que o acesso ao conteúdo restrito será encerrado.
3. Sistema encerra o vínculo ativo e registra auditoria.
4. Solicitações pendentes do mesmo usuário são encerradas quando aplicável.
5. Conteúdo publicado anteriormente segue política de autoria, retenção e moderação; não se presume exclusão automática.

**Aceite:** após a saída, chamadas de leitura e escrita são negadas, inclusive com sessão/tokens antigos; reentrada depende das regras atuais.

### 5.5 Publicar
1. Membro abre o formulário na comunidade.
2. Sistema valida vínculo ativo, estado da comunidade e permissões.
3. Autor envia texto dentro dos limites definidos pela política de conteúdo.
4. Backend valida e armazena o conteúdo; o cliente não decide autorização.
5. Publicação recebe autor, comunidade, estado de moderação e timestamps.
6. Publicação aparece somente a membros autorizados.

**Aceite:** não membros, visitantes, membros removidos e usuários bloqueados não conseguem publicar nem ler conteúdo restrito; conteúdo inválido é rejeitado no servidor.

### 5.6 Comentar e reagir
- Comentários exigem acesso autorizado à publicação e permissão ativa na comunidade.
- Reações são limitadas a opções simples definidas pelo produto; no beta, não criar reações personalizadas.
- O sistema deve impedir duplicidade da mesma reação por usuário/publicação, permitindo alterá-la ou removê-la.
- Comentários e reações herdam as regras de visibilidade da publicação.
- Publicação removida/oculta não aceita novas interações.

**Aceite:** toda operação é revalidada no servidor; IDs previsíveis ou chamadas diretas não permitem interagir fora do escopo autorizado.

### 5.7 Denunciar
1. Membro autenticado seleciona denunciar em conteúdo ou perfil/interação elegível.
2. Escolhe uma categoria de motivo e pode adicionar contexto opcional, sem exigir exposição desnecessária de dados sensíveis.
3. Sistema cria denúncia persistente com referência ao alvo, autor da denúncia, horário e estado.
4. Denunciante recebe confirmação sem acesso à fila interna.
5. Denúncia fica disponível apenas para moderadores da comunidade e equipe autorizada conforme escopo.
6. Denúncias relacionadas podem ser agrupadas sem revelar a identidade de denunciantes a usuários comuns.

**Aceite:** denúncia não é apenas local; é persistida no backend, protegida contra acesso indevido e gera evento de auditoria. Denunciado não recebe identidade do denunciante por padrão.

### 5.8 Revisar denúncia e moderar
1. Moderador abre fila limitada às comunidades atribuídas.
2. Consulta contexto estritamente necessário.
3. Pode marcar como em análise, resolvida, improcedente ou escalada.
4. Ações possíveis devem ser previamente definidas: ocultar conteúdo, restaurar conteúdo, advertir, restringir temporariamente ou encaminhar à administração.
5. Ação exige justificativa e registro do ator, horário, alvo, escopo e decisão.
6. Casos fora do escopo ou graves são escalados à administração.
7. Usuário afetado recebe comunicação apropriada, sem dados privados de terceiros.

**Aceite:** moderador não consegue atuar em comunidade não atribuída; toda ação é auditada; a trilha não pode ser editada pelo próprio moderador.

### 5.9 Bloquear usuário
- Bloqueio deve ser persistido e aplicado no servidor em descoberta, conteúdo e interações relevantes.
- O usuário bloqueado não deve contornar a restrição por URL direta ou chamadas de API.
- A regra de bloqueio não deve conceder ao usuário bloqueador acesso a dados privados.
- Escopo exato (global entre comunidades ou limitado a interações entre as duas contas) requer decisão antes da implementação.

**Aceite:** não basta ocultar elementos no frontend; endpoints verificam o bloqueio e retornam resposta que não vaza a existência de conteúdo protegido.

## 6. Regras de conteúdo e convivência

Antes de abrir o beta, a plataforma precisa publicar regras claras sobre:
- Respeito entre tradições e denominações cristãs.
- Assédio, ameaças, discriminação, perseguição e exposição de terceiros.
- Spam, golpes, pedidos financeiros e conteúdo comercial.
- Conteúdo sexual explícito e abordagens não solicitadas.
- Divulgação de informações pessoais ou dados sensíveis.
- Direitos autorais de textos, imagens, estudos e materiais bíblicos.
- Conteúdo de crise/risco: limites da plataforma e canais de ajuda apropriados.

A política de conteúdo, critérios de remoção, sanções e recurso precisam de revisão humana e jurídica adequada. Esta especificação não substitui termos de uso ou aconselhamento jurídico.

## 7. Estados mínimos sugeridos

| Entidade | Estados |
|---|---|
| Comunidade | draft, active, paused, archived |
| Vínculo de membro | active, left, removed, banned |
| Solicitação | pending, approved, rejected, cancelled |
| Publicação | visible, hidden, removed |
| Denúncia | open, reviewing, resolved, dismissed, escalated |
| Ação de moderação | recorded, reversed |

Estados e nomes são proposta técnica/funcional; devem ser alinhados ao modelo de dados e às regras finais.

## 8. Privacidade, segurança e auditoria

- Autenticação real e autorização server-side são pré-requisitos; localStorage não é mecanismo de segurança.
- Senhas não podem ser armazenadas em texto puro no cliente.
- Verificar autorização em cada endpoint, não somente na interface.
- Aplicar rate limiting em login, solicitação de entrada, publicação, comentário, reação e denúncia.
- Validar e normalizar entradas no backend; escapar conteúdo na renderização e impedir XSS.
- Proteger sessões, cookies, CSRF quando aplicável, segredos e logs.
- Registrar ações administrativas e de moderação sem gravar senhas, tokens ou conteúdo sensível desnecessário.
- Definir minimização, finalidade, base legal, consentimento quando aplicável, acesso, retenção e exclusão de dados pessoais; crença religiosa é dado pessoal sensível pela LGPD.
- Preparar fluxo para exportação/exclusão e tratamento de denúncias, sujeito a obrigações de retenção justificadas.
- Criar backups e testar restauração antes do beta.
- Separar ambientes de desenvolvimento, teste e produção; não usar dados reais em ambientes de desenvolvimento.

## 9. Requisitos de UX e acessibilidade

- Estados vazios explicam como encontrar comunidades e por que não há conteúdo.
- Ações destrutivas ou de consequência relevante pedem confirmação e explicam impacto.
- Solicitações exibem estados pendente/aprovada/recusada sem revelar notas internas.
- Formulários apresentam erros próximos aos campos e mensagens anunciáveis por tecnologia assistiva.
- Fluxos operáveis por teclado, foco visível, labels e semântica apropriada.
- Não depender apenas de cor para comunicar estados.
- Interface responsiva e legível em dispositivos móveis.
- Não usar contagens ou rankings para incentivar engajamento compulsivo.

## 10. Critérios de aceite do beta comunitário

O beta comunitário não está pronto até que:
1. Visitantes só vejam metadados públicos.
2. Autenticação e autorização sejam reais e server-side.
3. Catálogo respeite listagem e estado da comunidade.
4. Entrada aberta e aprovação privada funcionem com autorização.
5. Membros só leiam e interajam em espaços permitidos.
6. Publicações, comentários e reações persistam no backend.
7. Denúncias cheguem à fila central restrita.
8. Moderadores tenham escopo limitado e ações auditadas.
9. Bloqueios sejam aplicados no servidor.
10. Exclusão, retenção e privacidade estejam documentadas e implementadas conforme revisão necessária.
11. Testes automatizados cubram permissões positivas e negativas, incluindo tentativas de acesso direto/IDOR.
12. Backup/restore, monitoramento e processo de resposta a incidentes estejam testados.
13. Termos, política de privacidade e regras comunitárias tenham revisão apropriada.
14. Haja pessoas responsáveis e capacidade operacional para revisar denúncias.

Build bem-sucedido, isoladamente, não representa aprovação para beta.

## 11. Decisões ainda necessárias antes da implementação

| ID | Decisão pendente | Por que bloqueia |
|---|---|---|
| F-01 | Escopo global ou por comunidade do bloqueio entre usuários | Define autorização e visibilidade em todas as consultas |
| F-02 | Limites de caracteres, edição e exclusão de posts/comentários | Define validação, histórico e moderação |
| F-03 | Política de conteúdo e matriz de sanções | Define ações e garantias de recurso |
| F-04 | Prazo de revisão de denúncias, cobertura e responsáveis | Define operação segura do beta |
| F-05 | Retenção de denúncias, auditoria e conteúdo removido | Define privacidade e obrigações de dados |
| F-06 | Critérios de elegibilidade e idade mínima | Define cadastro e acesso |
| F-07 | Metadados públicos do catálogo e convites para comunidades não listadas | Define privacidade e descoberta |
| F-08 | Possibilidade de moderador também ser membro e tratamento de conflitos de interesse | Define governança e controles |
| F-09 | Se membro pode editar/apagar conteúdo e como preservar evidências de denúncia | Define integridade e histórico |
| F-10 | Se reações terão uma única opção inicial ou conjunto limitado | Define interação e modelo de dados |

## 12. Plano de validação

Antes de implementar:
- Revisar esta especificação com o responsável pelo produto.
- Validar regras e linguagem com potenciais membros e moderadores.
- Fechar as decisões bloqueadoras e atualizar o registro de decisões.
- Produzir matriz de permissões por papel/ação e diagramas de fluxo.
- Registrar ADRs de backend, banco, autenticação, storage e hospedagem.
- Planejar testes de autorização, privacidade, moderação e acessibilidade.

Durante a implementação:
- Desenvolver por fatias verticais pequenas.
- Cada fluxo deve incluir UI, API, persistência, autorização e testes.
- Não considerar mocks ou localStorage como implementação funcional de segurança.
- Não habilitar funcionalidades no beta antes dos critérios de aceite correspondentes.

## 13. Fora do escopo desta especificação

Este documento não escolhe fornecedores, não aprova custos, não define arquitetura final, não provisiona serviços e não autoriza migração ou alteração de dados. Também não afirma que qualquer recurso descrito já esteja implementado.
