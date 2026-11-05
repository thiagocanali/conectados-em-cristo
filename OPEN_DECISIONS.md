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

**Recomendação:** 18+ no beta inicial, sujeito a revisão jurídica. Confirmar se haverá verificação de idade além de checkbox.

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

**Status geral: PENDENTE DE APROVAÇÃO DO RESPONSÁVEL PELO PRODUTO.**  
As recomendações abaixo foram propostas na `COMMUNITY_FUNCTIONAL_SPEC.md`. Elas orientam a discussão, mas não autorizam implementação. Cada item deverá ser aprovado, rejeitado ou ajustado individualmente.

| ID | Tema | Recomendação em análise | Impacto principal | Estado |
|---|---|---|---|---|
| F-01 | Bloqueio entre usuários | Escopo global entre as duas contas para descoberta e interações; não apaga conteúdo comunitário nem substitui moderação | Consultas, feed, busca, comentários, reações e notificações | Pendente |
| F-02 | Limites e edição | Texto simples, limites configuráveis, edição própria por janela curta, histórico/auditoria e exclusão lógica | Validação, armazenamento, histórico e moderação | Pendente |
| F-03 | Política e sanções | Escala proporcional: orientação, advertência, remoção/ocultação, restrição temporária e suspensão; escalonamento imediato de risco grave | Governança, poderes de moderação, comunicação e recurso | Pendente |
| F-04 | Operação e SLA | Beta fechado com responsáveis e horários declarados; priorização por risco e metas realistas antes de convidar usuários | Capacidade humana, suporte e autorização para abrir o beta | Pendente |
| F-05 | Retenção | Minimização por categoria, prazos documentados, evidência restrita quando necessária e descarte/anonimização ao fim do prazo aplicável | LGPD, banco, auditoria, denúncias e exclusão | Pendente |
| F-06 | Elegibilidade | Beta inicial 18+, sem tratar checkbox como prova de idade; coleta mínima | Cadastro, acesso e revisão jurídica | Pendente |
| F-07 | Catálogo e comunidades não listadas | Catálogo público limitado a metadados e contagens agregadas; sem posts ou listas de membros; não listadas por convite/acesso autorizado | API pública, privacidade e descoberta | Pendente |
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

**Regra de segurança:** F-04, F-05 e F-06 exigem validação operacional/jurídica antes de qualquer beta com usuários reais. F-01, F-02, F-03, F-07, F-08, F-09 e F-10 também não devem ser implementadas com base apenas na recomendação; dependem de aprovação explícita e dos pré-requisitos técnicos da especificação.

## 12. Pacote de decisão — F-01: bloqueio entre usuários

**Status: PROPOSTA — não aprovada.**

### Pergunta de produto

Quando um usuário bloquear outro, o bloqueio deve valer somente para determinadas interações/comunidades ou deve ser uma regra consistente entre as contas em toda a plataforma?

### Opção recomendada para análise

**Bloqueio global entre as duas contas, aplicado às interações e à descoberta, sem apagar nem ocultar automaticamente conteúdo comunitário de terceiros.**

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

**Decisão solicitada ao responsável pelo produto:**  
- **Aprovar** a opção global;
- **Rejeitar** e adotar bloqueio limitado à comunidade; ou
- **Ajustar** o escopo e registrar as exceções.

## 13. Pacote de decisão — F-02: limites, edição e exclusão

**Status: PROPOSTA — não aprovada.**

### Pergunta de produto

Quais limites devem existir para publicações e comentários e o que o autor poderá fazer depois de publicar?

A decisão precisa equilibrar:
- liberdade para corrigir erros;
- prevenção de abuso/spam;
- integridade das evidências de moderação;
- transparência para leitores;
- custo de armazenamento/histórico;
- direitos de exclusão e privacidade.

### Opção recomendada para análise

**Texto simples, limites conservadores e configuráveis; edição pelo autor dentro de uma janela curta; exclusão lógica; preservação mínima de histórico quando necessário para moderação ou denúncia ativa.**

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

### Recomendação de produto

Adotar como ponto de partida **a alternativa C: janela curta de edição + exclusão lógica**, com limites configuráveis e histórico mínimo quando houver finalidade de auditoria/moderação.

Os números exatos não devem ser inventados nesta fase. Devem ser definidos juntamente com a política de conteúdo, retenção e operação de moderação.

**Decisão solicitada ao responsável pelo produto:**  
- **Aprovar** a alternativa C e definir os limites;
- **Rejeitar** e adotar outra alternativa; ou
- **Ajustar** a proposta.
