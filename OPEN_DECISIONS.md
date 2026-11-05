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

## 14. Pacote de decisão — F-03: política de conteúdo e matriz de sanções

**Status: PROPOSTA — não aprovada.**

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

### Recomendação de produto

Adotar como ponto de partida uma **escada proporcional de sanções**, com poderes locais para moderadores e poderes globais reservados à administração, além de um fluxo explícito para casos graves e conflitos de interesse.

Isso deve ser aprovado junto com a política de conteúdo e a governança da plataforma; não deve ser codificado como regra definitiva antes dessa aprovação.

**Decisão solicitada ao responsável pelo produto:**
- **Aprovar** a escada e a matriz;
- **Rejeitar** e adotar outro modelo; ou
- **Ajustar** categorias, sanções, autoridades e fluxo de recurso.

## 15. Pacote de decisão — F-04: operação de moderação e SLA do beta

**Status: PROPOSTA — não aprovada.**

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

**Decisão solicitada ao responsável pelo produto:**
- **Aprovar** o modelo;
- **Rejeitar** e adotar outro;
- **Ajustar** prioridades, cobertura e metas antes da implementação.

## 16. Pacote de decisão — F-05: retenção, exclusão e minimização de dados

**Status: PROPOSTA — não aprovada.**

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

Adotar **minimização desde o cadastro, políticas de retenção separadas por categoria e um fluxo verificável de direitos do titular**. Não coletar dados reais sensíveis no protótipo e não abrir beta público antes da revisão jurídica e da validação operacional.

**Decisão solicitada ao responsável pelo produto:**
- **Aprovar** os princípios e solicitar definição de prazos por categoria;
- **Rejeitar** e propor outro modelo;
- **Ajustar** categorias, exceções e ciclo de vida.

## 17. Pacote de decisão — F-06: elegibilidade etária e proteção de menores

**Status: PROPOSTA — não aprovada.**

### Pergunta de produto

Qual deve ser a regra de idade para o beta e quais controles devem existir para reduzir o risco de acesso de menores a uma plataforma inicialmente desenhada para adultos?

### Recomendação para análise

Adotar **18+ no beta inicial**, sem tratar um checkbox como prova robusta de idade.

A regra deve ser simples de comunicar e aplicada no servidor, não apenas escondendo telas no frontend. O cadastro deve coletar somente a informação necessária para aplicar a política e evitar solicitar documento de identidade ou data de nascimento completa sem uma necessidade legítima e previamente validada.

### Por que começar em 18+

O beta terá comunidades, publicação de conteúdo, denúncias e moderação humana. Começar exclusivamente com adultos reduz complexidade de segurança e evita introduzir, já na primeira versão, requisitos adicionais de proteção infantil, consentimento, desenho de experiência, moderação e resposta a incidentes.

Isso **não significa que um checkbox seja suficiente para impedir um menor de mentir sobre a idade**. Significa apenas que o beta deve declarar claramente a elegibilidade e estabelecer controles proporcionais ao risco.

### Controles mínimos propostos

1. **Regra explícita de elegibilidade:** informar claramente que o beta é destinado a maiores de 18 anos.
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

A verificação adicional de idade fica **em aberto**.

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

**Recomendação:** começar avaliando A para o beta fechado e deixar C como evolução possível, sem contratar ou integrar fornecedor de verificação antes de uma necessidade comprovada e revisão jurídica.

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

A decisão de 18+ proposta aqui é coerente com a recomendação já registrada em D-19, mas **não substitui a aprovação formal de D-19**.

### Critérios mínimos de aceite futuros

F-06 somente poderá ser considerada implementada quando:

- a idade mínima estiver formalmente aprovada;
- a regra estiver publicada antes do cadastro;
- a verificação ocorrer no servidor;
- contas inelegíveis não conseguirem contornar a regra por API;
- existir fluxo para suspeita/denúncia de menor;
- houver procedimento para encerramento ou restrição de contas inelegíveis;
- dados coletados para idade forem minimizados;
- retenção e exclusão desses dados estiverem documentadas;
- incidentes envolvendo menores tiverem rota de escalonamento;
- testes cobrirem cadastro, sessão antiga, API direta e tentativa de contorno.

### Recomendação de produto

Adotar **18+ para o beta inicial**, com coleta mínima e autodeclaração/atributo de elegibilidade como ponto de partida, deixando verificação reforçada como opção futura condicionada a risco real, necessidade e revisão jurídica.

**Decisão solicitada ao responsável pelo produto:**
- **Aprovar** 18+ e os controles mínimos;
- **Rejeitar** e adotar outra idade/estratégia;
- **Ajustar** idade, verificação ou fluxo de proteção.

