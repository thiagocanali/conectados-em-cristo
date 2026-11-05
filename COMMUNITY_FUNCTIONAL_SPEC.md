# Especificação Funcional — Comunidades do Conectados em Cristo

- Data: 2026-11-05
- Status: **rascunho funcional revisado; F-01 a F-06 aprovadas em 2026-11-05 (F-04 no modelo operacional geral; F-05 nos princípios gerais de minimização/governança; F-06 no modelo geral de elegibilidade 18+); F-07 a F-10 continuam pendentes**
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
- **Proposta F-10 (pendente de aprovação):** uma única reação positiva por membro/publicação, com rótulo inicial sugerido “Apoiar”.
- O membro pode adicionar ou remover a própria reação; não há troca entre tipos no modelo inicial, pois só existe um tipo. Tipos adicionais exigem decisão futura explícita.
- Reações em comentários ficam fora do escopo proposto para o MVP.
- A operação deve ser idempotente e impedir duplicidade, inclusive em solicitações concorrentes.
- Comentários e reações herdam as regras de visibilidade da publicação.
- Publicação oculta, removida ou indisponível não aceita novas interações; o agregado não deve aparecer nas superfícies comuns enquanto o conteúdo estiver oculto/removido.
- Não criar pontos, placares, rankings, medalhas ou ordenação competitiva. Contagem agregada simples só pode ser exibida se compatível com F-07 e sem expor lista nominal de reatores por padrão.

**Aceite:** toda operação é revalidada no servidor; IDs previsíveis ou chamadas diretas não permitem interagir fora do escopo autorizado. Os critérios detalhados de F-10 permanecem condicionados à aprovação da proposta.

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
| F-01 | **Aprovada (2026-11-05):** bloqueio global entre contas para descoberta e interações diretas, sem exclusão automática de conteúdo comunitário | Define autorização e visibilidade em todas as consultas |
| F-02 | Limites de caracteres, edição e exclusão de posts/comentários | Define validação, histórico e moderação |
| F-03 | Política de conteúdo e matriz de sanções | Define ações e garantias de recurso |
| F-04 | Prazo de revisão de denúncias, cobertura e responsáveis | Define operação segura do beta |
| F-05 | Retenção de denúncias, auditoria e conteúdo removido | Define privacidade e obrigações de dados |
| F-06 | **Aprovada (2026-11-05, modelo geral):** beta 18+, informação clara da idade mínima, verificação proporcional, coleta mínima e análise humana de suspeitas | Define cadastro, acesso e proteção de menores; mecanismo e fluxo jurídico ainda pendentes |
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


## 14. Matriz de permissões — proposta para revisão

Legenda: **P** permitido; **C** condicionado à regra/escopo; **N** negado. Esta matriz detalha o modelo aprovado sem ampliar os papéis.

| Ação | Visitante | Membro | Moderador atribuído | Administrador |
|---|---:|---:|---:|---:|
| Ver apresentação e catálogo listado | P | P | P | P |
| Ver metadados de comunidade não listada | N | C | C | P |
| Ver posts/comentários de comunidade | N | C¹ | C¹ | C² |
| Entrar em comunidade aberta | N | P | P | P |
| Solicitar entrada em comunidade privada | N | P | P | P |
| Aprovar/recusar solicitação | N | N | C³ | P |
| Publicar/comentar/reagir | N | C¹ | C¹ | C¹ |
| Editar/excluir próprio conteúdo | N | C⁴ | C⁴ | C⁴ |
| Denunciar conteúdo/usuário | N | P | P | P |
| Ver fila de denúncias | N | N | C⁵ | P |
| Moderar conteúdo | N | N | C⁵ | P |
| Designar/remover moderadores | N | N | N | P |
| Criar/editar/pausar/arquivar comunidade | N | N | N | P |
| Consultar trilha de auditoria | N | N | C⁶ | P |
| Alterar/apagar trilha de auditoria | N | N | N | N⁷ |

Condições:
1. Exige vínculo ativo, comunidade ativa, conteúdo visível e ausência de restrição aplicável. A autorização deve ser conferida no servidor em toda leitura e operação.
2. Acesso administrativo a conteúdo de membro não deve ser automático ou irrestrito. Proposta: acesso somente quando necessário para suporte, segurança ou moderação, com justificativa e registro auditável.
3. Moderador só decide solicitações na comunidade atribuída. Se não houver moderador atribuído ou houver conflito de interesse, encaminhar ao administrador.
4. Edição/exclusão de conteúdo ainda é decisão pendente (F-02/F-09). Até aprovação, não habilitar essas ações no beta.
5. Apenas no escopo atribuído e na medida necessária para tratar a denúncia. Não permitir consulta global por conveniência.
6. Acesso limitado aos eventos necessários à comunidade atribuída; ocultar dados pessoais desnecessários e identidade de denunciantes sempre que possível.
7. Nem mesmo administrador deve editar ou apagar eventos históricos. Correções devem ocorrer por novo evento compensatório, com controle de acesso e retenção definida. A retenção e os meios de proteção contra adulteração precisam ser especificados.

### Matriz de autorização por recurso

| Recurso | Condição mínima de leitura | Condição mínima de escrita |
|---|---|---|
| Catálogo | Comunidade ativa e listada; apenas campos públicos | Apenas administrador cria/edita metadados |
| Comunidade não listada | Convite/acesso explícito ou papel administrativo autorizado | Conforme modo de entrada e vínculo |
| Membros | Próprio vínculo; para lista, regra explícita da comunidade | Administração altera vínculos; usuário pode solicitar/entrar/sair conforme regra |
| Solicitações | Solicitante vê apenas as próprias; moderador atribuído/admin vê as do escopo | Solicitante cria/cancela a própria; moderador atribuído/admin decide |
| Publicações | Membro ativo e conteúdo visível na comunidade | Membro ativo cria; ações de edição/remoção dependem de política aprovada |
| Comentários | Mesma autorização da publicação pai | Membro ativo com acesso à publicação |
| Reações | Mesma autorização da publicação pai | Membro ativo; no máximo uma reação ativa por usuário/publicação |
| Denúncias | Denunciante vê confirmação/estado mínimo da própria denúncia; equipe autorizada vê fila conforme escopo | Membro cria; equipe autorizada altera estado e registra decisão |
| Auditoria | Administrador; moderador apenas eventos do próprio escopo | Sistema registra eventos; nenhum papel edita eventos históricos |

### Regras de precedência e negação

1. Comunidade arquivada ou pausada bloqueia novas entradas e novas publicações; regras de leitura histórica dependem da política de retenção e não devem ser presumidas.
2. Vínculo `removed` ou `banned` prevalece sobre a antiga condição de membro ativo.
3. Sessão válida não substitui vínculo ativo nem permissão específica.
4. Ser moderador não concede automaticamente permissão de membro; se o moderador também participar, deverá possuir vínculo de membro separado.
5. Ser administrador não deve implicar leitura irrestrita e invisível de dados privados. Acesso excepcional deve ter finalidade, justificativa e auditoria.
6. Bloqueio, suspensão ou restrição aplicável deve ser avaliado em cada endpoint e em consultas derivadas (feed, busca, comentários, reações e notificações).
7. Em falha de consulta de permissões, serviço indisponível ou estado inconsistente, negar a ação sensível e registrar erro operacional sem expor dados.
8. Respostas de erro não devem confirmar a existência de conteúdo privado para quem não tem autorização.

## 15. Cenários negativos obrigatórios de autorização

| Cenário | Resultado esperado |
|---|---|
| Visitante solicita endpoint de posts por URL direta | Negado; nenhum conteúdo retornado |
| Membro de A altera ID para acessar post de B | Negado, sem vazamento de metadados privados |
| Membro removido reutiliza sessão anterior | Leitura e escrita negadas após revalidação do vínculo |
| Moderador A tenta abrir fila de B | Negado e evento de tentativa não autorizada registrado |
| Moderador tenta designar outro moderador | Negado |
| Moderador tenta editar regras/configuração global | Negado |
| Membro tenta aprovar a própria solicitação | Negado |
| Solicitante tenta consultar solicitações de terceiros | Negado |
| Usuário repete entrada ou reação | Operação idempotente; sem duplicidade |
| Usuário bloqueado tenta interagir por endpoint direto | Negado pela regra server-side |
| Comunidade pausada recebe nova publicação | Negado |
| Comunidade arquivada recebe nova solicitação/entrada | Negado |
| Usuário tenta acessar denúncia de outra pessoa | Negado, salvo equipe autorizada no escopo |
| Papel administrativo é removido durante sessão ativa | Permissões revogadas na próxima checagem; não confiar apenas no token antigo |
| Falha ao carregar política de autorização | Negar por padrão, sem fallback permissivo |

Os testes devem verificar status/resposta, ausência de dados no corpo, ausência de efeitos colaterais e geração de auditoria quando aplicável. Não basta verificar que o botão desapareceu na interface.

## 16. Propostas de padrão para as decisões F-01 a F-10

A tabela distingue decisões de produto já aprovadas de propostas ainda pendentes. Aprovação funcional não autoriza implementação sem os controles técnicos, operacionais e de segurança correspondentes.

| ID | Padrão recomendado | Justificativa | Confirmação necessária |
|---|---|---|---|
| F-01 Bloqueio — **APROVADA** | Bloqueio global entre as duas contas para descoberta e interações diretas; não apaga automaticamente conteúdo comunitário, não substitui moderação e não concede acesso a dados privados | Comportamento previsível e consistente; preserva governança comunitária | Detalhar exceções operacionais, desbloqueio, notificações e limites antiabuso antes da implementação |
| F-02 Limites/edição — **APROVADA (2026-11-05)** | Texto simples; limites configuráveis; edição própria por janela curta; exclusão lógica; preservação restrita de evidência de denúncia ativa | Equilibra correção de erro e integridade de evidência | Definir números, janela, tratamento de conteúdo denunciado, restauração e histórico; alinhar a F-05/F-09 |
| F-03 Política/sanções — **APROVADA (2026-11-05, modelo geral)** | Escada proporcional: orientação, advertência, remoção/ocultação, restrição temporária, suspensão temporária e suspensão permanente excepcional; ações justificadas/auditáveis, contestáveis e com poderes locais/globais delimitados | Proporcionalidade, previsibilidade, segurança e possibilidade de recurso | Definir categorias, gravidade, exceções, durações, autoridade por ação e procedimento/prazos de recurso |
| F-04 Operação/SLA — **APROVADA (2026-11-05, modelo geral)** | Beta fechado e controlado; cobertura humana declarada, responsáveis/horários reais, priorização por risco, fila centralizada com histórico e indicadores; metas realistas antes de convidar usuários | Não prometer 24×7 sem equipe; vincula a abertura do beta à capacidade real de resposta | Definir responsáveis, escala/horários, prioridades operacionais, SLOs por prioridade, escalonamento e capacidade máxima; categorias P0–P3 ainda são referência proposta |
| F-05 Retenção — **APROVADA (2026-11-05, princípios gerais)** | Minimização por categoria, finalidade explícita, acesso mínimo, direitos do titular, preservação restrita/justificada de evidências e descarte/anonimização ao fim do prazo aplicável | Reduz exposição e acúmulo de dados sensíveis | Definir inventário, bases legais, prazos por categoria, exceções, fluxo dos titulares e backups; revisão jurídica obrigatória antes de dados reais |
| F-06 Elegibilidade — **APROVADA (2026-11-05, modelo geral)** | Beta inicial restrito a maiores de 18 anos; informar a regra antes do cadastro, não tratar checkbox isolado como prova efetiva, coletar apenas dados necessários e prever análise humana de suspeitas | Reduz riscos relacionados a menores sem criar falsa garantia de verificação | Definir método proporcional, critérios de verificação adicional, fluxo/prazos de revisão, tratamento de contas inelegíveis, retenção e revisão jurídica antes do beta |
| F-07 Catálogo | Público: nome, categoria, descrição, regras, modo de entrada e contagem agregada; nunca lista de membros/posts. Não listada: apenas por convite ou acesso administrativo | Separa descoberta da exposição de pessoas e conteúdo | Confirmar campos públicos e política de convite |
| F-08 Moderador-membro | Permitir que moderador seja membro, mas impedir que decida denúncia/solicitação em que esteja envolvido; encaminhar conflito a outro moderador/admin | Mantém participação sem conflito de interesse | Confirmar regra de impedimento e escalonamento |
| F-09 Conteúdo | Autor pode editar por janela curta e solicitar exclusão; remoção não elimina evidência sob denúncia ativa; registrar versões mínimas e motivo de ação administrativa | Protege autoria, correção e investigação | Definir janela, retenção e exceções |
| F-10 Reações | Proposta: uma reação positiva “Apoiar” por membro/publicação, removível pelo próprio autor; contagem agregada somente quando segura; sem lista nominal, pontos ou ranking | Menor complexidade e menor incentivo à competição | Aprovar, rejeitar ou ajustar; tipos adicionais e reações em comentários ficam fora da proposta inicial |

### Regra para transformar proposta em decisão

O responsável pelo produto deve aprovar, rejeitar ou ajustar individualmente cada F-01 a F-10. F-01, F-02 e F-03 foram aprovadas em 2026-11-05; F-04 foi aprovada no modelo operacional geral; F-05 foi aprovada nos princípios gerais de minimização e governança; F-06 foi aprovada no modelo geral de elegibilidade 18+ e proteção de menores. F-07 a F-10 permanecem propostas não vinculantes até decisão explícita. Para F-04, horários, responsáveis, cobertura, SLOs e escalonamento concretos continuam pendentes. Para F-05, inventário, bases legais, prazos por categoria, exceções, atendimento a direitos e comportamento dos backups continuam pendentes e exigem revisão jurídica; nenhum prazo numérico foi aprovado. Para F-06, o método de verificação de idade, critérios para verificações adicionais, fluxo humano de suspeitas, tratamento de contas inelegíveis, retenção e validação jurídica continuam pendentes; a aprovação do modelo geral não autoriza o beta com usuários reais. Toda aprovação deve ser registrada em `OPEN_DECISIONS.md` e refletida nesta especificação.

## 17. Dependências para iniciar implementação comunitária

A matriz não elimina os bloqueadores técnicos e operacionais já registrados. Antes de dados reais:
- autenticação e sessão reais;
- modelo de autorização server-side e testes de isolamento;
- banco e migrações com constraints para impedir vínculos, solicitações e reações duplicadas;
- trilha de auditoria com acesso restrito;
- fila persistente de denúncias e processo humano de resposta;
- política de privacidade, retenção, exclusão e revisão jurídica;
- monitoramento, backup e restauração;
- revisão de segurança e acessibilidade.

A primeira fatia vertical recomendada, após decisões e arquitetura aprovadas, é catálogo + detalhe de comunidade + entrada/solicitação, com API, persistência, autorização e testes negativos. Publicações e moderação devem vir depois que a base de identidade e vínculos estiver segura.


## 18. Revisão de consistência documental — 2026-11-05

Esta revisão compara a especificação funcional, o registro de decisões e o roadmap. Ela não aprova automaticamente recomendações nem autoriza implementação.

### Alinhamentos realizados

- O escopo aprovado do MVP (cadastro, perfis, comunidades, publicações, comentários e reações) foi mantido separado das regras detalhadas ainda pendentes.
- A seção 5.6 reflete a proposta F-10 ainda pendente: reação única “Apoiar”, removível pelo próprio membro, sem troca entre tipos no modelo inicial, sem reações em comentários e sem gamificação.
- F-01 foi aprovada em 2026-11-05 e sincronizada entre `OPEN_DECISIONS.md`, a seção de bloqueio e a tabela de propostas; sua implementação continua condicionada aos pré-requisitos técnicos.
- F-02 foi aprovada em 2026-11-05 no modelo geral de texto simples, limites configuráveis, janela curta de edição e exclusão lógica; números e regras operacionais continuam pendentes, com dependência explícita de F-05/F-09.
- F-03 foi aprovada em 2026-11-05 no modelo geral de sanções proporcionais, ações justificadas/auditáveis e contestáveis, com moderadores limitados às comunidades atribuídas e suspensões globais reservadas à administração; categorias, gravidade, prazos, autoridade detalhada e rito de recurso permanecem pendentes.
- F-04 foi aprovada em 2026-11-05 no modelo operacional geral: beta fechado, cobertura humana declarada, priorização por risco, fila centralizada, histórico/indicadores e metas realistas; responsáveis, horários, prioridades finais, SLOs, escalonamento e capacidade máxima permanecem pendentes.
- F-06 foi aprovada em 2026-11-05 no modelo geral: beta 18+, informação clara da idade mínima, verificação proporcional, coleta mínima e análise humana de suspeitas; mecanismo, critérios, fluxo/prazos, tratamento de contas inelegíveis e revisão jurídica permanecem pendentes.
- A tabela de decisões pendentes e a tabela-resumo F-01 a F-10 foram ajustadas para não sugerir que F-10 já está aprovada.
- A matriz de permissões continua identificada como proposta; as condições de edição/exclusão devem respeitar o modelo F-02 aprovado e os detalhes ainda pendentes de F-05/F-09.

### Pontos que continuam bloqueando implementação com dados reais

1. F-04 teve o modelo operacional geral aprovado, mas horários, responsáveis, cobertura, SLOs, escalonamento e capacidade do beta ainda precisam ser definidos; F-05 teve apenas os princípios gerais aprovados e F-06 teve o modelo geral 18+ aprovado, ambos ainda com requisitos jurídicos/operacionais bloqueadores; F-07 a F-10 aguardam aprovação explícita. F-01, F-02 e F-03 já foram aprovadas, mas exigem implementação server-side, governança detalhada e testes antes de dados reais.
2. Decisões técnicas D-12 a D-17 e ADRs de backend, banco, autenticação, storage, e-mail e hospedagem. Nenhuma stack ou fornecedor está selecionado por este documento.
3. Decisões operacionais D-18 a D-22, incluindo capacidade humana de moderação, método de verificação etária e fluxo de proteção de menores, revisão jurídica, orçamento e critérios de beta.
4. Política de conteúdo, SLAs, apelações, detalhamento de retenção e direitos dos titulares, com revisão jurídica antes de dados reais.
5. Implementação e testes de autenticação, autorização server-side, persistência, auditoria, bloqueio e fila de denúncias antes de qualquer dado real.

### Ordem recomendada de trabalho

- Primeiro: resolver decisões de produto e operação que afetam autorização, dados e moderação; registrar aprovações em `OPEN_DECISIONS.md`.
- Segundo: comparar alternativas técnicas e aprovar ADRs sem pressupor fornecedor ou serviço.
- Terceiro: implementar identidade, sessão, persistência e autorização server-side com testes negativos.
- Quarto: implementar catálogo, detalhe e entrada/solicitação de comunidades como primeira fatia vertical.
- Quinto: somente após a base de identidade e vínculos estar segura, implementar publicações, comentários, reações e moderação conforme decisões aprovadas.

### Limites desta revisão

A revisão foi documental. Não altera o protótipo, não executa migrações, não provisiona serviços, não valida segurança em execução e não substitui revisão jurídica, testes automatizados ou auditoria manual.
