# Decisões em Aberto — Conectados em Cristo

- Data: 2026-11-04
- Status: direção estratégica inicial aprovada em 2026-11-04; decisões de execução, segurança, operação e fornecedores permanecem pendentes.
- Regra: somente as decisões explicitamente registradas na seção 10 estão aprovadas. Recomendações restantes não autorizam contratação, provisionamento ou migração.

## 1. Posicionamento e público

### D-01 — Público inicial

**Pergunta:** a plataforma atende adultos cristãos em geral ou começa com um recorte específico?

- A — Comunidade ampla para adultos cristãos, sem exigir intenção romântica. Grupos temáticos podem incluir solteiros.
- B — Comunidade ampla, mas beta inicial limitado a uma região/igrejas convidadas.
- C — Público inicial de solteiros cristãos, mantendo áreas comunitárias para todos os participantes elegíveis.

**Recomendação:** A, com beta geograficamente/organizacionalmente controlado. Isso preserva a promessa comunitária e permite operar com segurança.

### D-02 — Modelo de comunidades no beta

**Status: APROVADA EM 2026-11-04.**

**Decisão:** comunidades curadas pela administração no beta inicial. A equipe será responsável por criar e organizar comunidades, definir categorias e regras e designar moderadores. Participantes poderão entrar ou solicitar participação conforme a configuração de cada comunidade. A criação livre por usuários fica para uma fase posterior, condicionada à capacidade de moderação, controles de segurança e revisão operacional.

**Pergunta original:** quais espaços devem existir primeiro?

- A — Comunidades temáticas com membros, regras, publicações, comentários e denúncia.
- B — Um espaço comunitário central moderado, sem criação de grupos pelos usuários.
- C — Grupos curados por administradores/igrejas no beta, evoluindo para criação aberta depois.

**Recomendação:** C para o beta, depois A quando houver capacidade de moderação. Reduz abuso e complexidade inicial.

## 2. Fé, oração e conteúdo

### D-03 — Escopo espiritual inicial

- A — Conteúdo editorial (devocional/estudo) revisado pela equipe, com referência bíblica e licença.
- B — Pedidos de oração privados/por grupo, com controle de público e denúncia.
- C — Ambos, com conteúdo editorial e oração em grupos pequenos moderados.

**Recomendação:** começar por A; habilitar B quando permissões, moderação e exclusão estiverem operacionais. Não aceitar pedidos com dados sensíveis antes disso.

### D-04 — Tradições cristãs

**Pergunta:** como a plataforma representará católicos, ortodoxos, protestantes/evangélicos e outras tradições?

- A — Comunidade ampla, com identificação voluntária de tradição e regras de respeito.
- B — MVP limitado a uma tradição específica.
- C — Comunidades separadas por tradição, com áreas de convivência comum.

**Recomendação:** A, salvo decisão explícita de foco pastoral/comunitário mais restrito. Conteúdo doutrinário deve indicar autoria/tradição quando pertinente e evitar apresentar opinião como consenso cristão.

## 3. Descoberta e relacionamentos

### D-05 — Descoberta de pessoas

- A — Não incluir descoberta individual no primeiro MVP; priorizar comunidades e atividades.
- B — Perfil pesquisável e conexões por interesse/amizade, sem score romântico.
- C — Área opcional de relacionamento, opt-in e separada da experiência comunitária.

**Recomendação:** A no primeiro MVP; B em fase seguinte; C somente após pesquisa e revisão de segurança.

### D-06 — Compatibilidade

- A — Adiar score até pesquisa e validação.
- B — Mostrar apenas afinidades descritivas (interesses/grupos em comum).
- C — Criar compatibilidade opcional para quem escolher relacionamento.

**Recomendação:** B antes de C. Não usar score atual 0–30 como recomendação real.

## 4. Mensagens e notificações

### D-07 — Mensagens no MVP

- A — Sem mensagens privadas no MVP.
- B — Mensagens apenas após conexão mútua e controles de segurança.
- C — Chat desde o primeiro lançamento.

**Recomendação:** A. Chat aumenta risco de assédio, golpes, spam, exposição e carga de moderação.

### D-08 — Notificações

- A — Notificações dentro da plataforma e e-mails transacionais essenciais.
- B — Push e notificações em tempo real no MVP.
- C — Apenas e-mail.

**Recomendação:** A, com preferências claras e sem notificações manipulativas.

## 5. Idiomas e lançamento

### D-09 — Idiomas do MVP

- A — Português brasileiro primeiro; arquitetura preparada para i18n.
- B — Português, inglês e espanhol no lançamento.
- C — Português e espanhol; inglês posteriormente.

**Recomendação:** A. Tradução de interface e conteúdo requer revisão humana e suporte por idioma.

### D-10 — Região do beta

**Pergunta:** Brasil inteiro ou grupo piloto limitado?

- A — Piloto fechado em Blumenau/região, com convite e suporte conhecido.
- B — Beta fechado nacional.
- C — Lançamento público no Brasil.

**Recomendação:** A, condicionado à capacidade real de moderação e suporte. A escolha depende do responsável e de pesquisa.

## 6. Arquitetura e fornecedores

### D-11 — Frontend

- A — Manter Vue 3 e modernizar Vue CLI para Vite, introduzindo TypeScript gradualmente.
- B — Migrar para Next.js/React/TypeScript.
- C — Manter Vue CLI temporariamente e corrigir vulnerabilidades sem migração imediata.

**Recomendação:** A em etapa isolada, após corrigir vulnerabilidades e comprovar equivalência. B não tem justificativa atual. C pode ser transição curta.

### D-12 — Backend

- A — Node.js + TypeScript + Fastify, monólito modular.
- B — NestJS + TypeScript, monólito modular.
- C — Express + TypeScript.

**Recomendação:** A por simplicidade e baixo overhead; B se o projeto priorizar convenções/estrutura e aceitar maior boilerplate.

### D-13 — Banco

- A — Supabase PostgreSQL.
- B — Neon PostgreSQL.
- C — PostgreSQL gerenciado em outro provedor.

**Recomendação:** comparar preço atual, backups, região, conexão, RLS, migrações e limites. PostgreSQL é recomendado; fornecedor pendente.

### D-14 — Autenticação

- A — Supabase Auth.
- B — Clerk.
- C — Better Auth/autenticação própria revisada.

**Recomendação:** comparar preço, cookies/sessões, MFA, e-mail, recuperação, portabilidade e integração com backend. Não implementar auth própria sem necessidade.

### D-15 — Imagens

- A — Supabase Storage.
- B — S3-compatible (ex.: Cloudflare R2).
- C — Outro storage gerenciado.

**Recomendação:** selecionar junto ao banco/auth considerando URL assinada, privacidade, moderação, remoção e egress.

### D-16 — E-mail

- A — Resend.
- B — Postmark.
- C — SendGrid ou equivalente.

**Recomendação:** prova de entregabilidade, preço e requisitos de domínio antes da escolha.

### D-17 — Hospedagem

- Frontend: manter Vercel como opção; GitHub Pages como demo/preview.
- API: serviço gerenciado compatível com Node.
- Banco/storage: serviço gerenciado com ambientes separados.

**Pergunta:** há preferência de fornecedor ou limite mensal de custo?

**Recomendação:** manter arquitetura independente de fornecedor e escolher após orçamento.

## 7. Operação e segurança

### D-18 — Capacidade de moderação

**Pergunta:** quem será responsável por revisar denúncias, em que horários e com qual prazo de resposta?

Sem uma pessoa/processo responsável, não abrir publicação pública, chat ou grupos criados livremente.

### D-19 — Idade mínima

**Status: APROVADA EM 2026-11-05 — regra geral do beta.** Idade mínima de 18 anos, com informação clara antes do cadastro. O mecanismo de verificação, os critérios para verificação adicional e o fluxo de suspeitas permanecem sujeitos a definição operacional e revisão jurídica antes do beta.

### D-20 — Documentos legais

**Pergunta:** haverá assessoria jurídica para revisar LGPD, termos, privacidade, regras comunitárias e conteúdo bíblico/licenças?

**Recomendação:** não lançar publicamente sem revisão especializada.

## 8. Prazo, orçamento e critérios de lançamento

### D-21 — Prazo e orçamento

Não há base confiável para confirmar 8 semanas ou 6 meses. O esforço depende do MVP, disponibilidade de desenvolvimento, operação de moderação, fornecedores e testes.

**Pergunta:** qual disponibilidade semanal e teto mensal de infraestrutura/serviços são aceitáveis?

### D-22 — Critério de beta

**Recomendação:** beta fechado somente após auth real, perfis, comunidades curadas, denúncia/moderação, privacidade, backup/restore, monitoramento e testes de autorização. Não lançar só porque o build passa.

## 9. Registro de aprovação

As decisões devem ser respondidas pelo identificador (D-01 a D-22). Respostas podem ser aprovadas, rejeitadas ou ajustadas. Após aprovação:
1. Atualizar ADRs 0003–0005 ou criar ADRs específicas.
2. Atualizar `docs/product/mvp.md`, `docs/product/roadmap.md`, `PROJECT_CONTEXT.md` e `README.md`.
3. Só então iniciar a fase de fundação e provisionar serviços.

**Estado atual:** decisões parciais aprovadas e registradas na seção 10. Os demais itens continuam pendentes.

## 10. Registro de decisões aprovadas — 2026-11-04

Após revisão da direção proposta, o responsável pelo produto aprovou a seguinte base:

| Tema | Decisão aprovada | Limite / observação |
|---|---|---|
| Posicionamento | Comunidade cristã ampla, para adultos de diferentes denominações; não exigir intenção romântica | O recorte de idade e a estratégia do beta ainda precisam de validação operacional/jurídica |
| Princípio do produto | **Comunidade primeiro. Conexões depois. Relacionamentos como consequência.** | Diretriz central para priorização e UX |
| Núcleo do MVP | Cadastro, perfis, comunidades, publicações, comentários e reações | Modelo curado e permissões-base aprovados; regras operacionais detalhadas e implementação continuam pendentes |
| Descoberta individual | Fora do primeiro MVP | Pode ser reavaliada em fase posterior |
| Relacionamentos/namoro | Não são o núcleo nem a porta de entrada do produto | Qualquer experiência futura deve ser opcional e passar por nova avaliação |
| Mensagens privadas | Fora do primeiro MVP | Reavaliar somente após controles de segurança e capacidade de moderação |
| Frontend | Manter Vue 3 e evoluir incrementalmente | Não reescrever em Next.js; migração Vue CLI → Vite ainda depende de plano técnico, testes e PR isolada |
| Bloqueio entre contas (F-01) | Bloqueio global entre as duas contas para descoberta e interações diretas em toda a plataforma | Não apaga automaticamente conteúdo comunitário, não substitui moderação e não concede acesso a dados privados; aplicação server-side obrigatória |
| Edição e exclusão de conteúdo (F-02) | Texto simples; limites configuráveis; edição própria por janela curta; exclusão lógica e preservação restrita de evidência ativa | Números, janela, restauração e exceções permanecem por detalhar; depende das políticas F-05/F-09 e de implementação server-side |

### Modelo de permissões e participação no beta — aprovado em 2026-11-04

- **Administrador da plataforma:** cria, configura e organiza comunidades; define categorias e regras; designa moderadores; mantém responsabilidade global pela plataforma.
- **Moderador:** atua somente nas comunidades atribuídas; revisa denúncias e conteúdo reportado, aplica ações de moderação permitidas e registra justificativa. Não recebe acesso administrativo global por ser moderador.
- **Membro:** participa das comunidades às quais pertence; pode publicar, comentar, reagir, denunciar e sair, conforme regras e permissões do espaço.
- **Visitante:** pode consultar informações públicas de apresentação/catálogo; não pode interagir. Conteúdo e publicações exigem autenticação e autorização explícita.
- **Comunidade pública:** pode ser descoberta no catálogo; entrada imediata conforme regras. Isso não torna publicações abertas à internet.
- **Comunidade privada:** pode ser descoberta apenas se sua configuração permitir; participação mediante solicitação e aprovação.
- **Denúncias:** persistidas em fila central de moderação, acessível apenas a operadores autorizados e com trilha de auditoria.
- **Bloqueios:** aplicados no servidor em descoberta, conteúdo e interações relevantes; não apenas ocultados no navegador.

Este é o modelo funcional aprovado para orientar o desenho. Matriz detalhada de ações, exceções, retenção de denúncias, SLAs, apelação e operação ainda precisa ser especificada antes de implementar.

### Escopo condicionado: pedidos de oração

Pedidos de oração permanecem como objetivo de produto, mas sua disponibilização a usuários reais fica condicionada à implementação e validação de controles de privacidade, consentimento, autorização por público, denúncia, moderação e exclusão. Não coletar pedidos reais no protótipo atual.

### Decisões que continuam abertas

- D-03: formato e governança do conteúdo espiritual e dos pedidos de oração.
- D-06: compatibilidade e afinidades futuras.
- D-08: canais e preferências de notificação.
- D-09: idiomas além do português brasileiro.
- D-10: região e formato do beta.
- D-12 a D-17: backend, banco, autenticação, storage, e-mail, hospedagem e orçamento.
- D-18 a D-22: capacidade de moderação, idade mínima, revisão jurídica, disponibilidade/orçamento e critérios operacionais de beta.

A aprovação destas decisões de produto não autoriza contratação de serviços, provisionamento de infraestrutura, migração de dados ou mudanças irreversíveis. Antes da Fase 1, fechar as decisões técnicas e operacionais bloqueadoras e registrar ADRs.

## 11. Decisões funcionais das comunidades — F-01 a F-10

**Status geral: PARCIALMENTE DECIDIDO.** F-01 a F-07 foram aprovadas em 2026-11-05 (F-04 no modelo operacional geral; F-05 nos princípios de minimização e governança de dados; F-06 no modelo geral de elegibilidade 18+ e proteção de menores; F-07 no modelo geral de catálogo e visibilidade). F-08 a F-10 permanecem pendentes de aprovação.  
As propostas ainda pendentes orientam a discussão, mas não autorizam implementação. Cada item deverá ser aprovado, rejeitado ou ajustado individualmente.

| ID | Tema | Recomendação em análise | Impacto principal | Estado |
|---|---|---|---|---|
| F-01 | Bloqueio entre usuários | Bloqueio global entre as duas contas para descoberta e interações diretas; não apaga conteúdo comunitário nem substitui moderação | Consultas, feed, busca, comentários, reações e notificações | **Aprovada (2026-11-05)** |
| F-02 | Limites e edição | Texto simples, limites configuráveis, edição própria por janela curta, histórico/auditoria e exclusão lógica | Validação, armazenamento, histórico e moderação | **Aprovada (2026-11-05)** |
| F-03 | Política e sanções | Escala proporcional de orientação a suspensão permanente excepcional; ações justificadas/auditáveis, recurso e poderes locais/globais delimitados | Categorias, gravidade, duração, autoridade por ação e procedimento de recurso | **Aprovada (2026-11-05) — modelo geral** |
| F-04 | Operação e SLA | Beta fechado com cobertura declarada, responsáveis e horários reais; priorização por risco, fila centralizada e metas realistas | Capacidade humana, suporte e autorização para abrir o beta | **Aprovada (2026-11-05) — modelo geral** |
| F-05 | Retenção | Minimização por categoria, finalidade explícita, acesso mínimo, direitos do titular e descarte/anonimização ao fim do prazo aplicável | LGPD, banco, auditoria, denúncias e exclusão | **Aprovada (2026-11-05) — princípios gerais** |
| F-06 | Elegibilidade | Beta inicial restrito a pessoas com 18 anos ou mais; informação clara, verificação proporcional, análise humana de suspeitas e coleta mínima | Cadastro, acesso, proteção de menores e revisão jurídica | **Aprovada (2026-11-05) — modelo geral** |
| F-07 | Catálogo e comunidades não listadas | Catálogo público limitado a metadados e contagens agregadas; sem posts ou listas de membros; não listadas por convite/acesso autorizado; participação não vira diretório público | API pública, privacidade e descoberta | **Aprovada (2026-11-05) — modelo geral** |
| F-08 | Moderador também membro | Permitir participação, com impedimento em decisões nas quais esteja envolvido e encaminhamento a outro moderador/admin | Modelo de papéis, conflitos de interesse e fila de moderação | Pendente |
| F-09 | Edição e exclusão de conteúdo | Edição própria por janela curta; pedido de exclusão; preservar evidência de denúncia ativa com acesso restrito | Integridade, retenção, direitos do titular e moderação | Pendente |
| F-10 | Reações | Uma reação positiva inicial (ex.: “Apoiar”), removível/trocável, sem ranking competitivo | UX, modelo de dados e métricas de engajamento | Pendente |

### Como registrar a decisão

Para cada ID, registrar uma das opções: **Aprovada**, **Rejeitada** ou **Ajustar**, acompanhada de observação quando necessário. Uma aprovação deve indicar limites e exceções relevantes; uma rejeição deve registrar a alternativa escolhida ou declarar que o recurso ficará fora do escopo.

Após a resposta do responsável pelo produto:
1. Atualizar o estado e o texto da decisão nesta seção.
2. Sincronizar a seção 16 de `COMMUNITY_FUNCTIONAL_SPEC.md`, mantendo apenas propostas ainda não decididas como recomendações.
3. Atualizar requisitos, critérios de aceite e testes afetados.
4. Criar/atualizar ADR quando a decisão alterar arquitetura, autorização, dados ou operação.

**Regra de segurança:** F-04, F-05 e F-06 exigem validação operacional/jurídica antes de qualquer beta com usuários reais. F-05 teve seus princípios gerais aprovados, mas inventário, bases legais, prazos por categoria, exceções, fluxo de direitos e comportamento de backups precisam de definição e revisão jurídica antes de dados reais. F-04 teve seu modelo geral aprovado, mas cobertura, responsáveis, horários, prioridades operacionais, escalonamento e SLOs concretos precisam ser definidos e testados antes do beta. F-06 teve o modelo geral 18+ aprovado, mas o mecanismo de verificação, fluxo de suspeita, critérios de revisão humana, tratamento de contas inelegíveis, retenção e revisão jurídica continuam bloqueando o beta. F-07 teve o modelo geral aprovado, mas campos exatos, política de contagens, regras de convite/autorização e controles técnicos permanecem a detalhar; F-08, F-09 e F-10 continuam dependendo de aprovação explícita. F-01, F-02 e F-03 foram aprovadas como regras de produto, mas suas implementações dependem dos pré-requisitos técnicos, testes server-side, auditoria e proteção contra acesso indevido descritos na especificação.

## 12. Pacote de decisão — F-01: bloqueio entre usuários

**Status: APROVADA EM 2026-11-05.**

O responsável pelo produto aprovou a opção global: o bloqueio iniciado por uma conta deve ser aplicado entre as duas contas para descoberta e interações diretas em toda a plataforma. A regra é de produto; a implementação continua condicionada à autorização server-side, testes e controles de auditoria.

### Decisão aprovada e limites

**Bloqueio global entre as duas contas, aplicado à descoberta e às interações diretas em toda a plataforma, sem exclusão automática do conteúdo comunitário.**

O bloqueio não apaga automaticamente publicações ou comentários históricos. A visibilidade desse conteúdo continua subordinada às regras de acesso da comunidade, à privacidade e às decisões de retenção/moderação. A equipe autorizada continua podendo investigar denúncias e executar ações de moderação dentro do escopo necessário.

O bloqueio deve impedir, conforme as regras finais:
- descoberta direta entre as contas;
- novas interações diretas relevantes;
- acesso a superfícies de interação que dependam de vínculo entre as duas contas;
- contorno por URL ou chamada direta de API.

O bloqueio **não deve**:
- apagar publicações ou comentários do usuário em comunidades;
- remover conteúdo de terceiros de uma comunidade;
- substituir denúncia ou ação de moderação;
- conceder ao bloqueador acesso adicional a dados privados;
- permitir que um usuário use bloqueio pessoal para moderar uma comunidade inteira.

### Alternativa A — bloqueio limitado à comunidade

O bloqueio valeria apenas dentro da comunidade onde foi criado.

**Vantagem:** menor impacto global e regras locais mais simples de explicar em comunidades independentes.

**Risco:** o usuário bloqueado poderia continuar aparecendo ou interagindo com a mesma pessoa em outra comunidade, gerando comportamento inconsistente e potencialmente frustrante.

### Alternativa B — bloqueio global

O bloqueio vale entre as duas contas em toda a plataforma, respeitando exceções técnicas e de segurança que ainda precisem ser definidas.

**Vantagem:** comportamento previsível e uma única regra de segurança para interações entre contas.

**Risco:** exige que feed, busca, comentários, reações, notificações e futuras superfícies de interação consultem a mesma política de bloqueio.

### Limites que precisam ser definidos junto com F-01

1. Se o bloqueio impede somente interação ou também a descoberta/perfil.
2. Se conteúdos históricos em comunidades compartilhadas continuam visíveis.
3. Como lidar com moderação: bloqueio pessoal nunca deve impedir a equipe autorizada de investigar uma denúncia.
4. Como tratar comunidades em que ambos são membros.
5. Se administradores/moderadores podem visualizar conteúdo necessário à função apesar de um bloqueio pessoal.
6. Como tratar notificações já geradas.
7. Se desbloqueio é permitido e quais efeitos são revertidos.
8. Como evitar vazamento da existência de uma conta ou conteúdo privado por mensagens de erro.
9. Se haverá limite/rate limit contra abuso do mecanismo de bloqueio.
10. Como registrar eventos de bloqueio/desbloqueio na auditoria sem expor dados desnecessários.

### Critérios mínimos de aceite futuros

A implementação de F-01 só poderá ser considerada funcional quando:
- a regra estiver aplicada server-side;
- endpoints de leitura e escrita relevantes verificarem bloqueio;
- URL direta/IDOR não contornar a regra;
- consultas derivadas (feed, busca, comentários, reações e notificações, quando existirem) respeitarem a política;
- moderação autorizada continuar funcionando dentro do escopo necessário;
- bloqueio e desbloqueio forem idempotentes;
- testes cobrirem pelo menos os cenários permitido, bloqueado, desbloqueado, comunidade compartilhada, tentativa direta por ID e moderador autorizado;
- logs/auditoria não armazenarem mais dados do que o necessário.

### Recomendação de produto

Para o princípio **“Comunidade primeiro. Conexões depois. Relacionamentos como consequência.”**, a opção global é a mais coerente: o bloqueio protege a relação entre duas contas sem transformar a comunidade em um conjunto de silenciamentos privados que substituam a moderação.

**Registro da decisão:** opção global aprovada pelo responsável pelo produto em 2026-11-05, após confirmação de continuidade do trabalho. Os detalhes operacionais de notificações, desbloqueio, limites antiabuso, exceções de segurança e visibilidade de conteúdo histórico deverão ser especificados antes da implementação, sem contrariar os limites já aprovados.

## 13. Pacote de decisão — F-02: limites, edição e exclusão

**Status: APROVADA EM 2026-11-05 — modelo geral.**

O responsável pelo produto aprovou o modelo de texto simples, limites configuráveis, edição pelo autor dentro de uma janela curta, exclusão lógica e preservação restrita de evidências quando houver denúncia ativa. A aprovação não fixa valores numéricos nem encerra as decisões operacionais listadas abaixo.

### Pergunta de produto

Quais limites devem existir para publicações e comentários e o que o autor poderá fazer depois de publicar?

A decisão precisa equilibrar:
- liberdade para corrigir erros;
- prevenção de abuso/spam;
- integridade das evidências de moderação;
- transparência para leitores;
- custo de armazenamento/histórico;
- direitos de exclusão e privacidade.

### Modelo aprovado

**Texto simples, limites configuráveis; edição pelo autor dentro de uma janela curta; exclusão lógica; preservação mínima e restrita de histórico quando necessária para moderação ou denúncia ativa.**

Modelo inicial sugerido:
- Publicação e comentário aceitam texto simples, sem HTML arbitrário.
- O backend valida tamanho mínimo/máximo e normaliza entradas.
- O autor pode editar apenas seu próprio conteúdo e somente dentro de uma janela configurável.
- Cada edição relevante registra versão mínima para auditoria quando necessário.
- A exclusão feita pelo autor é lógica: o conteúdo deixa de ser exibido normalmente, mas evidência necessária a uma denúncia ativa pode ser preservada com acesso restrito.
- Moderadores não devem alterar silenciosamente o texto do autor; ações de moderação devem ser registradas separadamente.
- Conteúdo removido por política não deve voltar a ficar público apenas porque o autor tentou editar ou restaurar.

### Limites iniciais a definir

A recomendação não fixa números sem validação. Antes da implementação, definir separadamente:
1. tamanho máximo de publicação;
2. tamanho máximo de comentário;
3. tamanho mínimo, se houver;
4. janela de edição;
5. possibilidade de editar após uma denúncia;
6. possibilidade de exclusão durante uma denúncia;
7. quem pode restaurar conteúdo ocultado;
8. se leitores verão que houve edição;
9. quanto do histórico será preservado;
10. política para conteúdo removido por moderação ou obrigação legal.

### Alternativa A — sem edição após publicação

O autor publica e não pode alterar o conteúdo.

**Vantagem:** máxima simplicidade de auditoria e integridade.

**Risco:** erros de digitação ou informações incorretas ficam permanentes, aumentando pedidos de exclusão/moderação.

### Alternativa B — edição livre

O autor pode alterar seu conteúdo a qualquer momento.

**Vantagem:** maior flexibilidade.

**Risco:** dificulta investigação, pode permitir alteração de conteúdo denunciado e aumenta complexidade de histórico e auditoria. Não é recomendada para o beta.

### Alternativa C — janela curta de edição

O autor pode corrigir o próprio conteúdo durante uma janela limitada, depois disso precisa solicitar alteração/remoção.

**Vantagem:** bom equilíbrio entre usabilidade e integridade.

**Risco:** exige regra clara para denúncias, moderação e histórico.

### Exclusão física versus lógica

**Exclusão física imediata** simplifica o desaparecimento do conteúdo, mas pode destruir evidências necessárias para uma denúncia legítima.

**Exclusão lógica** permite ocultar o conteúdo do fluxo normal e preservar somente o necessário, com acesso restrito e prazo de retenção definido.

Para o beta, recomenda-se **exclusão lógica**, acompanhada de política de retenção. Isso não significa guardar tudo indefinidamente: dados sem finalidade legítima devem ser eliminados ou anonimizados conforme a política aprovada.

### Relação com moderação

A regra deve separar quatro ações:
- autor corrige o próprio conteúdo;
- autor solicita/removê o próprio conteúdo;
- moderador oculta/remove conteúdo por violação;
- sistema preserva evidência mínima quando existe necessidade legítima de investigação.

Uma edição do autor não pode apagar automaticamente uma evidência de denúncia ativa.

### Critérios mínimos de aceite futuros

F-02 só poderá ser considerada implementada quando:
- somente o autor autorizado puder editar seu próprio conteúdo;
- a janela de edição for validada no servidor;
- conteúdo fora da janela não puder ser alterado por manipulação de ID;
- limites de tamanho forem aplicados no backend;
- HTML/script arbitrário não puder ser injetado;
- exclusão respeitar a política de retenção;
- conteúdo sob moderação/denúncia seguir as regras específicas;
- histórico/auditoria não puder ser adulterado pelo autor ou moderador;
- testes cubram edição autorizada, edição de conteúdo alheio, janela expirada, exclusão, conteúdo denunciado e tentativa direta por API.

### Escopo aprovado e pendências operacionais

Aprovar o modelo geral não significa aprovar números arbitrários. Antes da implementação, definir separadamente os limites de caracteres, janela de edição, tratamento de conteúdo já denunciado, exclusão durante denúncia, autoridade de restauração, sinalização de edição, extensão do histórico e tratamento de remoções por moderação ou obrigação legal. Essas definições devem ser compatíveis com F-05 (retenção) e F-09 (direitos e fluxo de exclusão).

## 14. Pacote de decisão — F-03: política de conteúdo e matriz de sanções

**Status: APROVADA EM 2026-11-05 — modelo geral.**

Foi aprovada a escala proporcional de sanções, incluindo orientação, advertência formal, remoção/ocultação, restrição temporária, suspensão temporária e suspensão permanente excepcional. Ações relevantes devem ser justificadas e auditáveis, com possibilidade de contestação. Moderadores atuam somente nas comunidades atribuídas; suspensões globais ficam sob responsabilidade administrativa. Categorias detalhadas, critérios de gravidade, prazos, autoridade por medida e procedimento operacional de recurso continuam pendentes.

### Pergunta de produto

Quais comportamentos e conteúdos são proibidos, quais medidas podem ser aplicadas e qual o nível de autoridade necessário para cada medida?

A política precisa proteger a comunidade sem transformar a moderação em punição arbitrária. Toda ação relevante deve ter escopo, motivo, duração quando aplicável e registro auditável.

### Princípios recomendados

1. Regras devem ser publicadas antes da participação e escritas em linguagem compreensível.
2. A política deve ser aplicada de forma consistente, independentemente de denominação, posição social ou popularidade do membro.
3. Ação de moderação deve ser proporcional à gravidade, reincidência e risco.
4. Ameaças críveis, exploração sexual, violência, perseguição grave e outros riscos imediatos devem receber tratamento prioritário e possível escalonamento.
5. Moderadores não devem usar ferramentas de moderação para benefício próprio ou contra conflitos nos quais tenham interesse pessoal.
6. Ação disciplinar não substitui suporte pastoral, jurídico ou emergência quando esses forem apropriados.
7. Nenhuma sanção deve depender apenas de esconder um botão no frontend: a autorização precisa existir no servidor.
8. Toda ação relevante deve gerar registro mínimo de auditoria, sem expor desnecessariamente dados sensíveis.

### Categorias iniciais para a política de conteúdo

A política futura deverá definir, no mínimo:
- assédio, humilhação e ataques pessoais;
- discurso de ódio e discriminação;
- ameaças e incentivo à violência;
- perseguição e comportamento intimidatório;
- conteúdo sexual explícito ou exploração sexual;
- exploração ou risco envolvendo menores;
- spam, fraude, golpes e manipulação;
- impersonação/falsa identidade;
- divulgação indevida de dados pessoais;
- malware, links maliciosos ou instruções abusivas;
- conteúdo deliberadamente enganoso usado para prejudicar outros;
- conteúdo incompatível com as regras específicas da comunidade.

Discussões teológicas e diferenças denominacionais, por si só, **não devem ser tratadas como violação**. A moderação deve focar comportamento, segurança e regras publicadas, não impor uma preferência doutrinária única à plataforma inteira.

### Escada de sanções proposta

**Nível 0 — orientação**
- esclarecer a regra;
- pedir correção voluntária;
- não gera suspensão.

**Nível 1 — aviso formal**
- registrar a violação;
- explicar a regra aplicada;
- solicitar mudança de comportamento.

**Nível 2 — remoção/ocultação do conteúdo**
- retirar conteúdo que viola regras;
- informar motivo quando seguro e operacionalmente possível;
- registrar ação.

**Nível 3 — restrição temporária**
- impedir temporariamente determinadas ações, como publicar ou comentar;
- definir início e término;
- registrar justificativa e escopo.

**Nível 4 — suspensão temporária da conta**
- impedir participação na plataforma por período definido;
- reservar para violações relevantes ou reincidência;
- exigir autorização conforme a governança aprovada.

**Nível 5 — remoção/bloqueio permanente**
- medida excepcional;
- destinada a abuso grave, risco significativo ou reincidência após medidas anteriores;
- deve possuir justificativa, registro e mecanismo de revisão quando aplicável.

### Escalonamento imediato

Casos com risco grave não precisam seguir toda a escada.

Exemplos:
- ameaça crível de violência;
- exploração sexual ou risco envolvendo menor;
- divulgação maliciosa de dados pessoais sensíveis;
- fraude grave;
- tentativa de comprometer a segurança da plataforma;
- perseguição grave ou ameaça persistente.

Nesses casos, a prioridade é preservar segurança, limitar dano e encaminhar o caso para a autoridade interna apropriada. Quando houver necessidade de contato com serviços externos, isso deve seguir procedimento formal e aplicável, sem prometer ações que a plataforma não tenha capacidade legal ou operacional de executar.

### Matriz preliminar de autoridade

| Ação | Moderador da comunidade | Admin da plataforma |
|---|---|---|
| Orientação | Sim, no escopo | Sim |
| Aviso formal | Sim, no escopo | Sim |
| Ocultar/remover conteúdo da comunidade | Sim, no escopo | Sim |
| Restrição temporária dentro da comunidade | Proposta/recomendação, conforme política aprovada | Sim |
| Suspensão global da conta | Não | Sim |
| Bloqueio/remoção permanente | Não unilateralmente, salvo fluxo de emergência expressamente aprovado | Sim, conforme política |
| Revisão/apelação | Não decide caso próprio | Sim ou responsável designado |
| Ação sobre comunidade não atribuída | Não | Sim |
| Alteração das regras globais | Não | Sim |

Essa matriz é **preliminar** e depende da governança final. O princípio central é que o moderador tenha poder suficiente para proteger sua comunidade, mas não poder global desnecessário.

### Conflito de interesse e recusa

Um moderador deve se retirar de uma decisão quando:
- é o autor ou alvo direto da denúncia;
- possui conflito pessoal relevante;
- a decisão envolve ação contra si próprio;
- a imparcialidade não puder ser preservada.

O caso deve ser encaminhado a outro moderador autorizado ou ao administrador responsável.

### Apelação

A política deverá prever, no mínimo:
- que medidas relevantes possam ser contestadas;
- prazo razoável para recurso;
- revisão por pessoa diferente da que aplicou a medida, quando possível;
- registro da decisão de recurso;
- proibição de retaliar o usuário por apresentar recurso de boa-fé.

Não é necessário definir agora o mecanismo técnico de recursos; primeiro deve ser aprovada a regra operacional.

### Critérios mínimos de aceite futuros

F-03 somente poderá ser considerada implementada quando:
- regras publicadas forem versionadas;
- categorias de violação estiverem definidas;
- cada sanção tiver autoridade e escopo claros;
- ações de moderador forem limitadas à comunidade atribuída;
- suspensão global não puder ser executada por moderador comum;
- conflitos de interesse tiverem fluxo de recusa;
- ações relevantes produzirem auditoria;
- casos graves tiverem fluxo de escalonamento;
- exista mecanismo de revisão/apelação para sanções definidas como recorríveis;
- testes cubram tentativa de aplicar sanção fora do escopo, suspensão global por moderador, conflito de interesse e escalonamento.

### Modelo geral aprovado e pendências

Adotar a escada proporcional de sanções, com poderes locais para moderadores e poderes globais reservados à administração, além de fluxo para casos graves, conflito de interesse e contestação. A aprovação não define automaticamente categorias finais, limiares de gravidade, durações, poderes detalhados por ação ou prazos e rito de recurso.

Antes da implementação, definir e validar essas regras, publicar política versionada, estabelecer autoridades e escopos por sanção, e prever auditoria, revisão independente quando possível e escalonamento seguro. A aplicação deverá ser server-side e testada contra elevação indevida de privilégios.

## 15. Pacote de decisão — F-04: operação de moderação e SLA do beta

**Status: APROVADA EM 2026-11-05 — modelo operacional geral.** A aprovação não define horários, pessoas, metas numéricas, cobertura 24×7 ou autorização para abrir o beta.

### Pergunta de produto

Como os reports serão recebidos, priorizados, revisados e encerrados durante o beta, considerando a capacidade real de pessoas disponíveis para moderar?

A operação deve evitar prometer cobertura que a equipe não consegue sustentar.

### Modelo recomendado para o beta

Adotar uma operação **human-in-the-loop**, inicialmente com cobertura definida por disponibilidade real, priorização por risco e escalonamento para casos graves.

Não assumir 24×7 até existir equipe, escala e procedimento capazes de sustentar essa promessa.

### Prioridade sugerida

**P0 — risco crítico**
- ameaça crível de violência;
- risco envolvendo menor;
- exposição grave de dados pessoais;
- comprometimento relevante de segurança;
- situação com potencial dano imediato.

Ação: escalonamento imediato para responsável autorizado.

**P1 — alto risco**
- assédio grave ou perseguição;
- fraude relevante;
- conteúdo sexual proibido;
- reincidência grave;
- tentativa de evasão de sanção.

Ação: revisão prioritária e, quando necessário, restrição preventiva proporcional.

**P2 — moderado**
- violação de regra sem risco imediato;
- spam;
- ataques pessoais;
- conteúdo inadequado recorrente.

Ação: revisão dentro da janela operacional definida.

**P3 — baixo**
- dúvidas sobre regras;
- conflitos de baixa gravidade;
- reports sem evidência suficiente.

Ação: tratamento em fila normal.

### SLA e SLO

Os tempos exatos **não devem ser inventados nesta fase**.

Antes do beta, a equipe deve definir:
- horário efetivo de cobertura;
- tempo-alvo de primeira revisão por prioridade;
- tempo-alvo de resolução;
- quem recebe escalonamento fora da cobertura;
- como tratar fila acumulada;
- quais métricas serão acompanhadas.

Um SLA externo somente deve ser anunciado se houver capacidade operacional para cumpri-lo. Para o beta fechado, pode ser preferível tratar esses tempos como **SLO interno**.

### Estados do report

O fluxo deve suportar, no mínimo:
- aberto;
- triagem/revisão;
- ação tomada;
- resolvido;
- descartado;
- escalado.

O fechamento deve registrar:
- responsável;
- decisão;
- motivo/categoria;
- ação aplicada, quando houver;
- timestamp;
- necessidade de acompanhamento.

### Princípios de operação

- Reports não devem ser apagados pelo usuário que foi denunciado.
- O denunciante não deve receber detalhes desnecessários sobre dados ou sanções de terceiros.
- Moderadores só acessam reports dentro do escopo autorizado.
- Casos envolvendo o próprio moderador devem ser encaminhados.
- Duplicatas podem ser agrupadas sem perder rastreabilidade.
- Evidências devem ser minimizadas e protegidas.
- A ausência de resposta do moderador não deve resultar em exposição automática de conteúdo previamente restringido.
- Falhas do sistema de autorização devem resultar em negação segura.

### Métricas mínimas

Antes e durante o beta, acompanhar:
- quantidade de reports por prioridade;
- idade da fila;
- tempo até primeira revisão;
- tempo até resolução;
- taxa de reports descartados;
- reincidência;
- quantidade de escalonamentos;
- reports reabertos ou recorrentes;
- disponibilidade da equipe de moderação.

As métricas devem ser agregadas sempre que possível para reduzir exposição de dados pessoais.

### Critérios mínimos de aceite futuros

F-04 somente poderá ser considerada implementada quando:
- existir fluxo persistente de reports;
- prioridades estiverem definidas;
- cada prioridade possuir responsável e procedimento;
- houver cobertura operacional documentada;
- escalonamento de casos críticos estiver testado;
- conflitos de interesse tiverem rota alternativa;
- métricas básicas forem observáveis;
- a fila não depender de armazenamento local do navegador;
- testes verificarem isolamento de reports e autorização por escopo.

### Recomendação de produto

Começar o beta com **cobertura humana explicitamente limitada e documentada**, priorização por risco e escalonamento de casos críticos. Expandir a cobertura somente depois de medir volume e capacidade real.

**Decisão registrada em 2026-11-05:** aprovação do modelo geral: beta fechado e controlado; cobertura humana com responsáveis e horários declarados; priorização por risco; prazos realistas definidos antes de convidar usuários; fila centralizada com histórico e indicadores; sem promessa de 24×7 sem capacidade comprovada.

**Permanecem pendentes:** nomeação dos responsáveis, escala/horários, definição final das prioridades e critérios, SLOs por prioridade, escalonamento fora da cobertura, capacidade máxima do beta e métricas/limites operacionais. As categorias P0–P3 acima permanecem uma proposta de referência até validação operacional. Esta aprovação não autoriza iniciar beta nem implementar fluxo de denúncias sem os pré-requisitos técnicos e operacionais.

**Decisão registrada:**
- **Aprovar** o modelo geral;
- **Rejeitar** e adotar outro;
- **Ajustar** prioridades, cobertura e metas antes da implementação.

## 16. Pacote de decisão — F-05: retenção, exclusão e minimização de dados

**Status: APROVADA EM 2026-11-05 — princípios gerais de minimização e governança.** A aprovação não define prazos numéricos, bases legais por finalidade, exceções específicas ou autoriza coleta de dados reais.

### Pergunta de produto

Quais dados a plataforma realmente precisa coletar, por quanto tempo cada categoria será mantida e como atender solicitações de acesso, correção, exclusão ou anonimização sem comprometer segurança, obrigações legítimas e investigações em andamento?

Esta decisão deve ser validada com orientação jurídica especializada antes de qualquer beta com dados reais. Dados que revelem convicção religiosa são dados pessoais sensíveis nos termos da LGPD; a plataforma deve evitar coletá-los ou inferi-los sem necessidade e base legal adequada.

### Princípios recomendados

1. **Minimização por padrão:** não coletar um dado apenas porque pode ser útil no futuro.
2. **Finalidade explícita:** cada categoria deve ter finalidade documentada e acesso restrito.
3. **Retenção limitada:** nenhum dado deve ser mantido indefinidamente por conveniência.
4. **Separação de dados:** perfil, conteúdo comunitário, denúncias, auditoria e telemetria devem ter políticas próprias.
5. **Exclusão verificável:** solicitações devem percorrer um fluxo rastreável, com confirmação do que foi excluído, anonimizado ou retido e por qual motivo.
6. **Acesso mínimo:** apenas pessoas e serviços autorizados acessam dados necessários à sua função.
7. **Segurança desde a concepção:** criptografia em trânsito e em repouso quando suportada, gestão segura de segredos, backups protegidos e controle de acesso.
8. **Transparência:** explicar em linguagem clara o que é coletado, por quê, com quem é compartilhado e por quanto tempo.
9. **Não usar dados sensíveis para segmentação ou recomendação** sem avaliação jurídica, finalidade legítima e controles específicos.
10. **Não prometer exclusão instantânea de todos os backups** se a arquitetura não puder garantir isso; informar prazos e processo de expiração.

### Categorias de dados a mapear

| Categoria | Exemplos | Diretriz proposta |
|---|---|---|
| Conta e autenticação | identificador, e-mail, credenciais protegidas | coletar o mínimo necessário; nunca armazenar senha em texto puro |
| Perfil | nome de exibição, foto, biografia | campos opcionais por padrão, visibilidade controlada |
| Participação | comunidades, associações, solicitações | reter enquanto necessário à funcionalidade e obrigações aplicáveis |
| Conteúdo | publicações, comentários, reações | política de edição, exclusão e retenção alinhada à F-02 |
| Denúncias e evidências | relato, conteúdo reportado, decisão | acesso altamente restrito; retenção limitada à finalidade de segurança e defesa de direitos |
| Moderação e auditoria | ação, responsável, escopo, horário, justificativa | integridade protegida; acesso por função; prazo documentado |
| Segurança e telemetria | logs técnicos, eventos de autenticação | evitar conteúdo pessoal em logs; prazos curtos e finalidade de segurança |
| Suporte e solicitações | pedidos de titulares e respostas | manter apenas o necessário para comprovar tratamento e conclusão |

Os exemplos não constituem uma autorização para coletar todos esses campos. Cada campo precisa de justificativa e análise própria.

### Ciclo de vida proposto

1. **Coleta:** informar finalidade e base aplicável antes de coletar.
2. **Uso:** restringir uso à finalidade documentada.
3. **Revisão:** identificar dados sem necessidade contínua.
4. **Solicitação do titular:** autenticar o solicitante e classificar o pedido.
5. **Tratamento:** corrigir, exportar, excluir ou anonimizar conforme aplicável.
6. **Exceção documentada:** reter apenas o necessário quando houver obrigação legal/regulatória ou exercício regular de direitos, com justificativa, escopo e prazo.
7. **Backups:** expirar conforme ciclo documentado; impedir restauração indevida de dados já excluídos, aplicando novamente as exclusões após restauração.
8. **Verificação:** registrar a conclusão sem manter cópias excessivas do conteúdo eliminado.

### Exclusão de conta e conteúdo

A política deve distinguir:
- exclusão de conta;
- remoção de perfil público;
- exclusão de publicações e comentários;
- saída de comunidade;
- revogação de sessões e credenciais;
- retenção restrita de evidências sob denúncia ativa;
- retenção necessária para obrigação legal ou exercício regular de direitos.

A exclusão da conta não deve apagar automaticamente registros que precisem ser preservados legitimamente, mas qualquer exceção deve ser específica, restrita, temporária quando possível e explicada ao titular. Conteúdo público não deve permanecer associado ao usuário por simples conveniência técnica.

### Dados sensíveis e contexto religioso

A participação em uma comunidade cristã pode revelar ou permitir inferir convicção religiosa. Por isso:
- não exibir lista de membros publicamente por padrão;
- não expor participação individual em comunidades sem controle de visibilidade;
- não usar participação para publicidade comportamental;
- evitar campos obrigatórios sobre denominação, igreja ou crença;
- avaliar separadamente pedidos de oração e quaisquer informações de saúde, sofrimento ou vulnerabilidade;
- definir controles de consentimento, acesso, exclusão e retenção antes de coletar pedidos de oração reais.

### Retenção e prazos

**Nenhum prazo numérico está aprovado nesta proposta.**

Antes do beta, criar uma tabela de retenção por categoria com:
- finalidade;
- base legal validada;
- evento que inicia a contagem;
- prazo de retenção;
- acesso permitido;
- destino ao final (exclusão ou anonimização);
- exceções e responsável pela aprovação;
- comportamento em backups.

Evitar uma regra única de retenção para todos os dados.

### Critérios mínimos de aceite futuros

F-05 somente poderá ser considerada implementada quando:
- inventário de dados e finalidades estiver aprovado;
- base legal e avisos de privacidade forem revisados por profissional qualificado;
- tabela de retenção estiver definida por categoria;
- fluxo de acesso/correção/exclusão estiver implementado e testado;
- exceções de retenção forem justificadas e auditadas;
- dados sensíveis tiverem controles reforçados;
- logs não armazenarem senhas, tokens ou conteúdo sensível desnecessário;
- backups e restauração respeitarem exclusões concluídas;
- acesso a denúncias e evidências for restrito;
- testes verificarem exclusão, anonimização, revogação de sessão, retenção excepcional e isolamento de acesso.

### Recomendação de produto

**Decisão registrada em 2026-11-05:** aprovados os princípios gerais de minimização desde o cadastro, finalidade explícita, acesso mínimo, políticas de retenção separadas por categoria, fluxo verificável de direitos do titular, preservação restrita e justificada de evidências, expiração documentada de backups e proteção reforçada para dados que revelem convicção religiosa.

**Permanecem pendentes:** inventário definitivo de dados/finalidades; validação jurídica de bases legais e avisos; prazos por categoria e eventos que iniciam a contagem; exceções e responsáveis por autorizá-las; prazos de backup; procedimento e prazos de atendimento aos titulares; critérios para evidências de denúncias e registros de auditoria. Nenhum prazo numérico foi aprovado. Esta decisão não autoriza coleta de dados reais, beta ou retenção indefinida.

**Próximo passo:** detalhar a matriz de retenção por categoria e submetê-la à revisão jurídica antes de qualquer implementação com dados reais.

## 17. Pacote de decisão — F-06: elegibilidade etária e proteção de menores

**Status: APROVADA EM 2026-11-05 — modelo geral.** A aprovação define beta inicial 18+ e princípios de proteção; não aprova um mecanismo específico de verificação nem autoriza o beta com usuários reais.

### Pergunta de produto

Qual deve ser a regra de idade para o beta e quais controles devem existir para reduzir o risco de acesso de menores a uma plataforma inicialmente desenhada para adultos?

### Decisão aprovada — modelo geral

Adotar **18+ no beta inicial**, informar a idade mínima antes do cadastro, não tratar um checkbox isolado como prova efetiva de idade, coletar somente os dados necessários e prever análise humana e proteção de dados para suspeitas de contas de menores. O mecanismo concreto de verificação e o procedimento operacional permanecem pendentes de revisão jurídica.

A regra deve ser simples de comunicar e aplicada no servidor, não apenas escondendo telas no frontend. O cadastro deve coletar somente a informação necessária para aplicar a política e evitar solicitar documento de identidade ou data de nascimento completa sem uma necessidade legítima e previamente validada.

### Por que começar em 18+

O beta terá comunidades, publicação de conteúdo, denúncias e moderação humana. Começar exclusivamente com adultos reduz complexidade de segurança e evita introduzir, já na primeira versão, requisitos adicionais de proteção infantil, consentimento, desenho de experiência, moderação e resposta a incidentes.

Isso **não significa que um checkbox seja suficiente para impedir um menor de mentir sobre a idade**. Significa apenas que o beta deve declarar claramente a elegibilidade e estabelecer controles proporcionais ao risco.

### Controles mínimos propostos

1. **Regra explícita de elegibilidade:** informar claramente que o beta é destinado a pessoas com 18 anos ou mais.
2. **Validação no cadastro:** impedir cadastro quando a informação fornecida indicar idade inferior ao mínimo.
3. **Persistência mínima:** armazenar apenas o atributo necessário para demonstrar elegibilidade, evitando retenção desnecessária da data completa de nascimento.
4. **Rechecagem no servidor:** endpoints protegidos devem considerar o estado de elegibilidade da conta.
5. **Denúncia de possível menor:** permitir que um usuário reporte suspeita de idade incompatível.
6. **Fluxo restrito de investigação:** suspeitas não devem expor publicamente a informação de idade do usuário denunciado.
7. **Ação preventiva proporcional:** em caso de risco plausível, a conta pode ter determinadas interações restringidas enquanto a situação é analisada.
8. **Encaminhamento:** casos confirmados devem seguir procedimento documentado de encerramento, preservação mínima de evidências e tratamento das solicitações do titular ou responsável conforme orientação jurídica aplicável.
9. **Logs seguros:** não registrar idade, documentos ou dados pessoais adicionais em logs técnicos desnecessariamente.
10. **Testes de autorização:** uma conta inelegível não deve conseguir contornar a regra usando URL direta, sessão antiga ou chamadas de API.

### Verificação de idade

A necessidade e o mecanismo concreto de verificação adicional continuam **em aberto**, conforme avaliação de risco e revisão jurídica. A aprovação do modelo geral não escolhe entre autodeclaração, verificação reforçada ou estratégia híbrida.

Alternativas:

**A — Autodeclaração/atributo de elegibilidade**

- menor complexidade;
- menor coleta de dados;
- não impede fraude deliberada;
- pode ser suficiente para um beta fechado de baixo alcance, dependendo da avaliação jurídica e operacional.

**B — Verificação de idade reforçada**

- maior capacidade de reduzir fraude;
- maior custo e complexidade;
- pode exigir tratamento de documentos ou terceiros;
- aumenta a quantidade de dados pessoais e os riscos de privacidade.

**C — Estratégia híbrida**

- autodeclaração como regra normal;
- verificação adicional somente em situações de risco ou inconsistência;
- exige critérios claros para acionar a verificação e política de retenção específica.

**Ponto ainda não decidido:** avaliar A, B ou C somente após análise de risco, necessidade, proporcionalidade, impacto na privacidade e revisão jurídica. Não contratar nem integrar fornecedor de verificação antes dessa validação.

### Conteúdo e interação envolvendo menores

Se uma conta for identificada como pertencente a menor, não basta alterar o perfil para 18+.

O sistema deverá considerar:
- revogação de sessões e acesso conforme procedimento aprovado;
- preservação mínima e restrita de evidências quando houver incidente;
- bloqueio de novas interações incompatíveis com a política;
- revisão de conteúdo que possa expor a criança/adolescente;
- tratamento de denúncias relacionadas ao caso;
- comunicação e escalonamento conforme procedimento jurídico e de segurança aplicável.

A plataforma não deve solicitar que um usuário publique documentos pessoais ou dados sensíveis para provar sua idade dentro de uma comunidade.

### Relação com outras decisões

F-06 depende especialmente de:
- **F-03:** política de conteúdo e sanções;
- **F-04:** operação e escalonamento de reports;
- **F-05:** minimização, retenção e exclusão;
- **D-19:** idade mínima;
- revisão jurídica antes de qualquer beta com usuários reais.

A decisão de 18+ foi aprovada como regra de produto para o beta em 2026-11-05 e deve ser refletida em D-19. A aprovação não define o mecanismo de verificação nem substitui a revisão jurídica dos procedimentos.

### Critérios mínimos de aceite futuros

F-06 somente poderá ser considerada implementada quando:

- a idade mínima de 18 anos estiver publicada de forma clara antes do cadastro;
- a regra estiver publicada antes do cadastro;
- o mecanismo de verificação escolhido estiver documentado, validado juridicamente e aplicado no servidor;
- contas inelegíveis não conseguirem contornar a regra por API;
- existir fluxo para suspeita/denúncia de menor;
- houver procedimento humano documentado para suspeitas, restrição proporcional, encerramento de contas inelegíveis e tratamento de conteúdo/dados associados;
- dados coletados para idade forem minimizados;
- retenção e exclusão desses dados estiverem documentadas;
- incidentes envolvendo menores tiverem rota de escalonamento;
- testes cobrirem cadastro, sessão antiga, API direta e tentativa de contorno.

### Recomendação de produto

Manter **18 anos ou mais para o beta inicial**, com coleta mínima e mecanismo de verificação proporcional ainda a definir. Não presumir que autodeclaração isolada seja suficiente; qualquer verificação adicional deve ser justificada por risco e necessidade, com revisão jurídica.

**Registro da decisão (2026-11-05):** modelo geral aprovado: beta 18+, informação clara da idade mínima, verificação proporcional sem presumir que checkbox comprove idade, coleta mínima, análise humana de suspeitas e revisão jurídica antes do beta.

**Ainda pendente:** método de verificação, critérios para acionar verificações adicionais, dados/evidências permitidos, fluxo e prazos de revisão, medidas para contas inelegíveis, retenção/exclusão e validação jurídica. A aprovação não autoriza cadastro de usuários reais nem abertura do beta.

## 18. Pacote de decisão — F-07: catálogo, visibilidade e comunidades não listadas

**Status: APROVADA EM 2026-11-05 — modelo geral.** A aprovação define catálogo público de metadados e separação entre descoberta e autorização; não aprova ainda os campos exatos, política final de contagens ou controles técnicos.

### Pergunta de produto

Quais informações de uma comunidade podem ser descobertas por visitantes, membros e usuários autenticados, e como impedir que a existência de um catálogo público seja confundida com autorização para acessar conteúdo comunitário?

### Recomendação para análise

Adotar **catálogo público limitado a metadados de apresentação**, sem posts, comentários, lista nominal de membros ou conteúdo interno.

A visibilidade da comunidade e a autorização para acessar seus recursos devem ser tratadas como políticas independentes:

> **Descobrir uma comunidade não significa estar autorizado a participar dela ou visualizar seu conteúdo.**

### O que o visitante pode visualizar

Para comunidades configuradas como listadas/publicamente descobríveis:

- nome;
- slug público, quando necessário para navegação;
- descrição;
- categoria;
- regras de apresentação;
- indicação do modo de entrada (aberta ou mediante aprovação);
- contagens agregadas, somente quando realmente necessárias à experiência.

O catálogo **não deve expor por padrão**:

- lista nominal de membros;
- e-mails ou outros dados de contato;
- posts;
- comentários;
- denúncias;
- fila de moderação;
- histórico de ações;
- dados privados de solicitações;
- informações que permitam inferir desnecessariamente a participação de uma pessoa.

Contagens agregadas também devem ser avaliadas quanto ao risco de reidentificação, especialmente em comunidades muito pequenas.

### Comunidade pública ≠ posts públicos

Uma comunidade pública pode aparecer no catálogo sem que suas publicações sejam indexáveis ou acessíveis anonimamente.

Por padrão:

- visitante → pode consultar o catálogo permitido;
- visitante → não pode ler posts/comentários internos;
- membro autorizado → pode acessar o conteúdo conforme as regras da comunidade;
- moderador atribuído → pode acessar recursos de moderação dentro do escopo;
- administrador → acesso administrativo conforme política, sem assumir acesso irrestrito a dados privados por padrão.

Essa separação deve existir no backend e ser testada por API, não somente por navegação do frontend.

### Comunidades privadas

Uma comunidade privada pode:

- não aparecer no catálogo;
- aparecer somente como metadado limitado, caso a configuração permita;
- exigir solicitação de entrada;
- exigir aprovação antes de conceder membership.

A resposta para uma pessoa sem autorização não deve revelar conteúdo privado por meio de erros, contagens ou endpoints auxiliares.

### Comunidades não listadas

Uma comunidade não listada deve ficar fora das superfícies públicas de descoberta.

O acesso pode ocorrer por:

- convite válido;
- referência autorizada;
- fluxo administrativo;
- outro mecanismo explicitamente aprovado.

O fato de alguém conhecer o slug, ID ou URL **não concede autorização**.

Endpoints que recebem identificadores de comunidade devem verificar autorização no servidor antes de devolver conteúdo ou metadados restritos.

### Contagens e metadados

Contagens como número de membros, posts ou solicitações devem ser tratadas como dados derivados e não como informações automaticamente públicas.

Antes de expor uma contagem, avaliar:

- finalidade para UX;
- tamanho da comunidade;
- risco de inferência de participação individual;
- possibilidade de alteração frequente permitir rastreamento;
- necessidade de ocultar ou arredondar valores em comunidades pequenas.

Nenhuma contagem deve ser usada para criar ranking de comunidades no MVP.

### Slugs, IDs e enumeração

IDs e slugs não podem ser considerados segredo nem mecanismo de autorização.

O sistema deve:

- usar identificadores estáveis;
- evitar respostas diferentes que revelem conteúdo privado sem necessidade;
- aplicar autorização em toda consulta;
- impedir enumeração de comunidades privadas por alterações de ID/slug;
- evitar mensagens de erro que revelem existência de recursos não autorizados quando isso aumentar o risco.

### Relação com membros e bloqueios

O catálogo não deve transformar participação em comunidade em diretório público de pessoas.

F-01 continua responsável pela política de bloqueio entre contas. F-07 não deve permitir que alguém contorne um bloqueio descobrindo dados do outro usuário por meio da lista de membros ou metadados comunitários.

### Matriz preliminar de visibilidade

| Recurso | Visitante | Usuário autenticado sem membership | Membro ativo | Moderador atribuído | Admin |
|---|---|---|---|---|---|
| Comunidade listada no catálogo | Metadados públicos | Metadados públicos | Metadados públicos | Metadados públicos | Sim |
| Comunidade não listada | Não | Não | Conforme autorização | Conforme escopo | Sim |
| Lista nominal de membros | Não | Não | Não por padrão | Conforme necessidade operacional | Conforme necessidade autorizada |
| Posts da comunidade | Não | Não | Sim | Sim no escopo | Conforme autorização |
| Comentários | Não | Não | Sim | Sim no escopo | Conforme autorização |
| Denúncias | Não | Não | Não | Sim no escopo | Sim conforme função |
| Solicitações de entrada de terceiros | Não | Não | Não | Somente se responsável pelo fluxo | Sim |
| Regras públicas | Sim, se listada | Sim, se listada | Sim | Sim | Sim |

A matriz é preliminar e depende da aprovação da política de privacidade e autorização.

### Critérios mínimos de aceite futuros

F-07 somente poderá ser considerada implementada quando:

- catálogo e conteúdo tiverem políticas de autorização separadas;
- visitante não conseguir acessar posts/comentários por URL direta;
- comunidade privada não vazar conteúdo ou metadados indevidos;
- comunidade não listada não puder ser descoberta por enumeração simples;
- lista de membros não for pública por padrão;
- solicitações e denúncias permanecerem restritas;
- autorização for verificada no servidor;
- testes cobrirem acesso anônimo, usuário sem membership, membro, moderador fora do escopo e alteração direta de ID/slug;
- respostas de erro não revelarem informações privadas desnecessárias.

### Decisão registrada (2026-11-05)

Aprovar o **modelo geral de catálogo público de metadados**, sem posts, comentários ou lista nominal de membros. Contagens devem ser agregadas e avaliadas quanto ao risco de reidentificação. Comunidades não listadas ficam fora das superfícies públicas de descoberta e exigem convite ou autorização explícita. A participação em comunidades não deve virar diretório público de pessoas.

**Ainda pendente:** campos exatos, política final de contagens, regras detalhadas de convite/autorização e controles técnicos anti-vazamento/enumeração.


## 19. Pacote de decisão — F-08: moderador que também é membro e conflito de interesses

**Status: PROPOSTA — não aprovada.**

### Pergunta de produto

Um moderador pode participar normalmente da comunidade em que atua? Se puder, como impedir que decida denúncias, solicitações ou medidas que envolvam a própria conta ou interesses pessoais?

### Recomendação para análise

Permitir que o moderador também seja membro, mas exigir **impedimento e encaminhamento obrigatório** sempre que houver conflito de interesses real ou razoavelmente percebido.

O papel de moderador não deve eliminar a experiência comunitária da pessoa, nem conceder poder para decidir sobre si própria. A autorização deve considerar tanto o escopo da função quanto o vínculo do moderador com o caso específico.

### Situações que exigem impedimento

O moderador não deve revisar, aprovar, rejeitar, encerrar ou aplicar sanção em caso que:

1. envolva denúncia contra sua própria conta;
2. tenha sido denunciado por ele;
3. envolva conteúdo, solicitação de entrada ou recurso apresentado por ele;
4. envolva pessoa com relação direta que possa comprometer sua imparcialidade, conforme política a ser definida;
5. questione uma ação de moderação que ele próprio executou;
6. envolva interesse pessoal, familiar, financeiro ou outro conflito relevante.

A política final deve explicar como reconhecer conflitos menos óbvios, sem exigir exposição excessiva de relações pessoais.

### Encaminhamento e continuidade operacional

- O caso deve ser encaminhado a outro moderador ativo e atribuído à comunidade, sem participação no conflito.
- Se não houver outro moderador elegível, encaminhar à administração da plataforma.
- Se o administrador responsável também estiver impedido, o caso deve permanecer pendente e ser escalonado a outro responsável administrativo previamente designado; não deve ser decidido pela pessoa impedida.
- Não reduzir prioridade nem descartar denúncia por falta de moderador disponível.
- Casos de risco grave devem seguir o fluxo de escalonamento urgente definido em F-03/F-04, sem aguardar a resolução informal do conflito.
- A indisponibilidade de um revisor elegível deve gerar estado/alerta operacional visível à equipe autorizada, sem expor detalhes do caso a membros comuns.

### Limites de acesso e confidencialidade

O moderador impedido não deve:

- visualizar o conteúdo integral da denúncia ou evidências restritas apenas por ser moderador;
- alterar responsável, prioridade, decisão ou estado do caso;
- apagar, editar ou ocultar evidências;
- usar acesso de membro para contornar a restrição de moderação;
- acessar detalhes de identidade do denunciante além do que já seja legitimamente visível pela experiência comum e pela política de privacidade.

A interface pode informar que o caso foi encaminhado, mas não deve revelar ao moderador impedido dados do denunciante, evidências privadas ou a decisão de outro revisor além do necessário.

### Regras de autorização

1. O impedimento deve ser verificado no servidor em cada leitura e mutação da fila, não apenas ocultando botões.
2. A autorização deve combinar papel, comunidade atribuída, estado atual do caso e conflito de interesse.
3. Ser membro não concede acesso à fila de moderação; ser moderador não concede acesso global.
4. A pessoa impedida não pode aprovar a própria solicitação de entrada nem decidir recurso contra ação que executou.
5. A troca de responsável deve exigir usuário autorizado e motivo registrado.
6. Se a condição de conflito surgir depois da atribuição, o caso deve ser reencaminhado antes de qualquer nova ação.
7. Falha ao determinar elegibilidade do revisor deve resultar em negação da ação e encaminhamento seguro, nunca em autorização presumida.

### Auditoria

Registrar, com acesso restrito e sem conteúdo excessivo:

- identificador do caso;
- comunidade e escopo;
- responsável anterior e novo responsável;
- motivo/categoria do impedimento;
- ator que realizou o encaminhamento;
- data/hora e resultado;
- tentativas negadas de acesso ou decisão, quando relevantes à segurança.

O registro deve ser protegido contra alteração pelo moderador envolvido. A trilha não deve copiar desnecessariamente o conteúdo integral da denúncia.

### Alternativas consideradas

**A — Moderador não pode ser membro da comunidade.** Reduz alguns conflitos, mas prejudica a participação comunitária e não resolve conflitos envolvendo usuários conhecidos fora da comunidade.

**B — Moderador pode ser membro, sem regra especial.** Simples, porém permite decisões parciais e autointeressadas; não recomendada.

**C — Moderador pode ser membro, com impedimento, encaminhamento e auditoria.** Preserva participação e cria separação verificável entre envolvimento pessoal e poder de moderação; recomendada para análise.

### Critérios mínimos de aceite futuros

F-08 somente poderá ser considerada implementada quando:

- conflitos e critérios de impedimento estiverem definidos em política acessível à equipe;
- existir encaminhamento para outro moderador elegível;
- existir fallback administrativo e responsável substituto para conflitos na administração;
- moderador impedido não conseguir ler ou alterar casos restritos por URL/API direta;
- moderador não puder aprovar a própria solicitação nem revisar a própria ação;
- mudança de atribuição e impedimentos forem auditados;
- falta de revisor elegível gerar escalonamento, sem descarte silencioso;
- testes cobrirem conflito identificado antes e depois da atribuição, tentativa de acesso direto, tentativa de alteração e indisponibilidade de revisores;
- permissões forem verificadas no servidor e falharem de forma segura.

### Relação com outras decisões

F-08 depende de F-03 (sanções e recursos), F-04 (operação, cobertura e escalonamento), F-05 (retenção e acesso a evidências) e do modelo de autorização da COMMUNITY_FUNCTIONAL_SPEC.md. Também deve respeitar o princípio aprovado de que moderadores atuam somente nas comunidades atribuídas e não recebem administração global.

### Recomendação de produto

Adotar **moderador também pode ser membro, mas nunca decide casos em que esteja envolvido**. Encaminhar a outro moderador elegível; na ausência, escalar à administração ou a um substituto independente. Registrar impedimento e transferência em trilha de auditoria restrita.

**Decisão solicitada ao responsável pelo produto:**
- **Aprovar** a participação com impedimento e encaminhamento;
- **Rejeitar** e proibir moderadores de serem membros das comunidades atribuídas;
- **Ajustar** critérios de conflito, fallback ou limites de acesso.

## 20. Pacote de decisão — F-09: edição, exclusão e preservação de conteúdo

**Status: PROPOSTA — não aprovada.**

### Pergunta de produto

Como permitir que autores corrijam ou removam suas publicações e comentários sem comprometer a integridade de denúncias, a segurança da comunidade, a transparência da moderação ou os direitos de titulares?

### Recomendação para análise

Adotar **edição própria por uma janela curta e configurável, seguida de bloqueio de edição; permitir solicitação de exclusão com ocultação do conteúdo e tratamento de retenções excepcionais documentadas**.

A janela não deve receber um prazo numérico nesta proposta. O valor deverá ser definido após avaliação de UX, risco de abuso, operação e retenção. A política deve diferenciar remoção visível ao público, exclusão efetiva dos dados e preservação excepcional de evidências.

### Edição pelo autor

- O autor pode editar somente o próprio conteúdo e somente dentro da janela aprovada.
- A autorização deve ser conferida no servidor em cada operação.
- A edição não pode alterar autoria, comunidade ou identificador do recurso.
- Após a janela, correções relevantes devem seguir o fluxo de exclusão/republicação ou solicitação à moderação, conforme política a aprovar.
- Conteúdo denunciado ou sob análise pode ter edição temporariamente suspensa para evitar alteração de evidência, com aviso claro ao autor quando isso não comprometer a investigação.
- A interface deve indicar quando o conteúdo foi editado, sem expor histórico detalhado a todos os membros por padrão.

### Histórico e integridade

O sistema deve manter somente o histórico estritamente necessário para segurança, moderação e integridade, com acesso restrito e prazo definido em F-05.

- Não criar histórico público de todas as versões por padrão.
- Registrar autor, recurso, horário e tipo da alteração.
- Proteger versões anteriores contra alteração pelo autor e por moderadores sem permissão específica.
- Evitar cópias redundantes do conteúdo em logs, notificações e telemetria.
- Definir como versões são descartadas ou anonimizadas ao fim da retenção aplicável.

### Exclusão solicitada pelo autor

A experiência deve permitir solicitar a remoção de uma publicação ou comentário próprio.

O fluxo proposto:

1. Autenticar o solicitante e verificar autoria no servidor.
2. Ocultar o conteúdo das superfícies comuns assim que a solicitação for aceita, salvo impedimento técnico/jurídico documentado.
3. Revogar acesso por URL direta, feed, busca, cache de aplicação e endpoints relacionados.
4. Verificar se existe denúncia ativa, investigação, obrigação legal ou outra justificativa válida para retenção excepcional.
5. Se não houver exceção, executar exclusão ou anonimização conforme a política de retenção.
6. Se houver exceção, preservar somente o mínimo necessário, com acesso restrito, finalidade, responsável e prazo/revisão registrados.
7. Informar ao titular o resultado, inclusive quando parte dos dados precisar permanecer retida e a justificativa puder ser comunicada.
8. Aplicar a exclusão também aos ciclos de backup conforme política documentada, sem prometer remoção instantânea de cópias de segurança.

A solicitação de exclusão não deve ser tratada como garantia de eliminação imediata de todo registro em qualquer circunstância. Exceções precisam ser específicas, proporcionais, revisáveis e alinhadas à orientação jurídica aplicável.

### Conteúdo associado a denúncia ou investigação

Quando houver denúncia ativa ou investigação legítima:

- ocultar o conteúdo das superfícies comuns, quando necessário para reduzir exposição e dano;
- preservar evidência mínima necessária à análise;
- restringir a evidência a revisores autorizados e não impedidos, conforme F-08;
- registrar motivo, escopo, responsável e revisão da retenção excepcional;
- impedir que o autor ou moderador comum altere ou elimine a evidência preservada;
- não usar a retenção como justificativa para manter o conteúdo publicamente disponível;
- ao encerrar a finalidade de preservação, reavaliar e eliminar/anonimizar conforme F-05.

Uma denúncia não deve gerar retenção automática e indefinida. A existência, o encerramento e a necessidade de preservação devem ser avaliados e registrados.

### Conteúdo de terceiros e respostas

Excluir uma publicação não deve apagar automaticamente comentários de terceiros que possuam finalidade e autoria próprias. A interface pode substituir o conteúdo removido por indicação neutra, desde que isso não revele dados desnecessários.

Comentários, respostas ou referências que se tornem incompreensíveis ou exponham dados pessoais após a exclusão devem ser avaliados separadamente. A regra final deve evitar tanto a exclusão em cascata indiscriminada quanto a permanência de dados pessoais sem finalidade.

### Relação com direitos do titular e F-05

F-09 não substitui o processo geral de atendimento aos direitos dos titulares. Deve integrar-se a F-05 e distinguir:
- remoção de exibição;
- exclusão lógica;
- exclusão física;
- anonimização;
- retenção excepcional de evidência;
- expiração em backups.

Prazos, bases legais, comunicação e exceções devem ser validados na política de retenção e com revisão jurídica antes de usuários reais.

### Alternativas consideradas

**A — Exclusão física imediata em todos os casos.** Simples de explicar, mas pode destruir evidência necessária a uma denúncia ou obrigação legítima e não contempla ciclos de backup.

**B — Ocultação sem exclusão efetiva.** Facilita a implementação, mas pode manter dados indefinidamente sem finalidade clara e prejudicar direitos do titular.

**C — Ocultação rápida, exclusão/anonimização conforme política e retenção excepcional mínima e auditada.** Equilibra experiência do usuário, segurança e governança; recomendada para análise.

### Critérios mínimos de aceite futuros

F-09 somente poderá ser considerada implementada quando:

- janela de edição estiver aprovada, documentada e configurável;
- autor não conseguir editar conteúdo de terceiros nem contornar a janela por API;
- alterações relevantes tiverem registro de auditoria proporcional;
- solicitação de exclusão tiver fluxo rastreável e confirmação de autoria;
- conteúdo removido não puder ser recuperado por URL direta, busca, feed ou endpoint alternativo por usuários sem autorização;
- denúncia ativa gerar avaliação explícita, e não retenção automática indefinida;
- evidências retidas tiverem acesso restrito, justificativa, responsável e revisão;
- moderadores impedidos não puderem acessar evidências conforme F-08;
- exclusão/anonimização e expiração de backups estiverem alinhadas à F-05;
- comentários de terceiros forem tratados sem exclusão em cascata indevida;
- testes cobrirem edição fora da janela, edição de conteúdo alheio, exclusão sem denúncia, exclusão com denúncia ativa, fim da retenção, URL direta e acesso indevido a evidências.

### Relação com outras decisões

F-09 depende de F-02 (limites e edição), F-03 (sanções e recursos), F-04 (operação de moderação), F-05 (retenção e exclusão), F-08 (impedimento e acesso a evidências) e da política geral de direitos dos titulares. Não definir prazos ou exceções isoladamente desta governança.

### Recomendação de produto

Adotar **edição própria por janela curta configurável; ocultação rápida quando a remoção for solicitada; exclusão ou anonimização conforme F-05; e retenção excepcional mínima de evidência apenas enquanto houver finalidade legítima documentada**.

**Decisão solicitada ao responsável pelo produto:**
- **Aprovar** o modelo de janela curta, ocultação e retenção excepcional controlada;
- **Rejeitar** e escolher outro fluxo de edição/exclusão;
- **Ajustar** janela, histórico, tratamento de denúncias ou comunicação ao titular.


---

## 21. F-10 — Modelo de reações às publicações

**Status:** proposta detalhada — pendente de aprovação do responsável pelo produto.

### Problema e objetivo

Definir como membros demonstram apoio a uma publicação sem transformar a comunidade em uma competição por popularidade, sem criar incentivos artificiais de engajamento e sem expor desnecessariamente quem interagiu.

A reação deve apoiar conversas e encorajamento, preservando o princípio: comunidade primeiro, conexões depois, relacionamentos como consequência.

### Recomendação inicial

Adotar **uma única reação positiva por membro e publicação**, com rótulo inicial sugerido **“Apoiar”**.

- O membro pode adicionar a reação e removê-la posteriormente.
- A operação deve ser idempotente: repetir a mesma solicitação não cria reações duplicadas.
- Não haverá múltiplas opções de emoji ou catálogo de sentimentos no MVP.
- “Trocar” de reação só fará sentido se outro tipo for aprovado em decisão futura; não implementar tipos adicionais implicitamente.
- A reação não equivale a comentário, endosso institucional, confirmação de veracidade ou pedido de oração.
- Reações em comentários não fazem parte desta proposta; o escopo inicial é exclusivamente publicações.

### Limites de produto e apresentação

1. Não criar pontuação individual, ranking de membros, placares, medalhas, níveis, streaks ou competição por engajamento.
2. Não ordenar catálogo, feed ou comunidades pela quantidade de reações.
3. A interface pode apresentar um total agregado simples, condicionado às regras de visibilidade da comunidade e à avaliação de risco de reidentificação prevista em F-07.
4. Não exibir lista pública de quem reagiu por padrão. Qualquer futura visualização nominal exige decisão explícita de produto, privacidade e autorização.
5. Não usar reações como métrica pública de valor espiritual, maturidade, influência ou qualidade de um membro.
6. A ausência de reação não deve gerar aviso, cobrança ou penalidade.

### Autorização e integridade

A API deverá validar a cada operação:

- sessão autenticada e conta ativa;
- vínculo de membro ativo com a comunidade;
- comunidade e publicação em estado que permita interação;
- publicação visível ao solicitante;
- ausência de bloqueio, suspensão ou restrição aplicável;
- limites de frequência e regras antiabuso.

A autorização deve ser aplicada no servidor, nunca apenas pela ocultação do controle na interface. O banco deve impor unicidade por membro/publicação (por exemplo, restrição única em `user_id + post_id`). A criação e remoção devem ser transacionais e seguras diante de solicitações concorrentes.

Visitantes, membros removidos, suspensos ou sem acesso à publicação não podem reagir nem consultar detalhes que revelem conteúdo protegido. Moderadores não podem criar, remover ou alterar reações em nome de outro membro como ação de moderação.

### Estados e efeitos

- Sem reação: o membro pode adicionar “Apoiar”.
- Reagiu: o membro pode remover sua própria reação.
- Publicação oculta, removida ou indisponível: não aceitar novas reações e não expor o agregado nas superfícies comuns.
- Conta sem autorização: negar a operação mesmo que uma chamada direta à API seja realizada.
- Remoção da reação: atualizar o agregado de forma consistente, sem apagar ou alterar a publicação.

O tratamento de reações históricas quando um membro sai da comunidade, é bloqueado ou tem a conta encerrada deverá seguir as decisões de retenção, exclusão e bloqueio (F-01 e F-05), sem criar uma regra isolada nesta proposta.

### Alternativas consideradas

**A — Uma reação positiva simples e removível.** Baixa complexidade, fácil compreensão e menor incentivo à competição; recomendada para o MVP.

**B — Vários emojis ou categorias de reação.** Expressividade maior, mas aumenta complexidade, moderação, acessibilidade e decisões de privacidade; deixar para avaliação posterior.

**C — Reações com pontos, placares ou ranking.** Pode incentivar uso competitivo e contrariar o posicionamento comunitário; não recomendada.

### Critérios mínimos de aceite futuros

F-10 somente poderá ser considerada implementada quando:

- membro autorizado conseguir adicionar e remover sua própria reação;
- solicitações repetidas ou concorrentes não criarem duplicidade;
- visitante, membro sem vínculo ativo, conta suspensa e usuário bloqueado forem negados no servidor;
- publicação oculta, removida, pausada ou indisponível não aceitar novas reações;
- a contagem agregada permanecer consistente após inclusão e remoção;
- nenhuma rota ou consulta revelar lista nominal de reatores sem autorização aprovada;
- não existir pontuação, ranking ou ordenação competitiva derivada das reações;
- limites de frequência e tratamento de abuso estiverem definidos;
- testes cobrirem autorização, acesso direto à API, concorrência, idempotência, remoção, estados da publicação e privacidade do agregado;
- acessibilidade do controle e anúncio de estado forem verificados com teclado e tecnologia assistiva.

### Dependências e relações

F-10 depende do modelo de autenticação e autorização real, da matriz de permissões da comunidade, de F-01 (bloqueio), F-03/F-04 (moderação e operação), F-05 (retenção), F-07 (visibilidade e agregados) e das regras de estado das publicações. Não autoriza, por si só, rankings, reações em comentários ou exposição de identidades.

### Recomendação de produto

Adotar **uma reação positiva “Apoiar” por membro/publicação, removível pelo próprio autor, com contagem agregada simples quando segura e sem lista nominal, pontos ou rankings**. Manter o escopo restrito a publicações no MVP.

**Decisão solicitada ao responsável pelo produto:**
- **Aprovar** a reação única “Apoiar”, removível e sem gamificação;
- **Rejeitar** e escolher outro modelo;
- **Ajustar** rótulo, apresentação da contagem ou escopo das reações.
