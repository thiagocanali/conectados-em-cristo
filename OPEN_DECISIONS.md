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

### D-02 — Comunidade no MVP

**Pergunta:** quais espaços devem existir primeiro?

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
| Núcleo do MVP | Cadastro, perfis, comunidades, publicações, comentários e reações | O desenho detalhado de comunidades, papéis e permissões continua pendente |
| Descoberta individual | Fora do primeiro MVP | Pode ser reavaliada em fase posterior |
| Relacionamentos/namoro | Não são o núcleo nem a porta de entrada do produto | Qualquer experiência futura deve ser opcional e passar por nova avaliação |
| Mensagens privadas | Fora do primeiro MVP | Reavaliar somente após controles de segurança e capacidade de moderação |
| Frontend | Manter Vue 3 e evoluir incrementalmente | Não reescrever em Next.js; migração Vue CLI → Vite ainda depende de plano técnico, testes e PR isolada |

### Escopo condicionado: pedidos de oração

Pedidos de oração permanecem como objetivo de produto, mas sua disponibilização a usuários reais fica condicionada à implementação e validação de controles de privacidade, consentimento, autorização por público, denúncia, moderação e exclusão. Não coletar pedidos reais no protótipo atual.

### Decisões que continuam abertas

- D-02: modelo de comunidades no beta (curadas, centralizadas ou criação pelos usuários).
- D-03: formato e governança do conteúdo espiritual e dos pedidos de oração.
- D-06: compatibilidade e afinidades futuras.
- D-08: canais e preferências de notificação.
- D-09: idiomas além do português brasileiro.
- D-10: região e formato do beta.
- D-12 a D-17: backend, banco, autenticação, storage, e-mail, hospedagem e orçamento.
- D-18 a D-22: capacidade de moderação, idade mínima, revisão jurídica, disponibilidade/orçamento e critérios operacionais de beta.

A aprovação desta direção não autoriza contratação de serviços, provisionamento de infraestrutura, migração de dados ou mudanças irreversíveis. Antes da Fase 1, fechar as decisões técnicas e operacionais bloqueadoras e registrar ADRs.
