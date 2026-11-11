# Conectados em Cristo — Contexto do Projeto

> **Fonte de verdade operacional e de produto.** Atualizado em 2026-11-11. Este documento distingue explicitamente o que existe, o que é direção aprovada e o que continua pendente.

## 1. Identidade do produto

**Visão:** ajudar pessoas a conhecer e seguir Jesus Cristo, aprendendo pelas Escrituras e caminhando em comunidades cristãs que praticam amor, cuidado e serviço. Igrejas e pequenos grupos são parceiros centrais dessa experiência.

**Princípio central:** **Jesus no centro. Aprender juntos. Servir na vida real.** Comunidade primeiro; conexões e relacionamentos são consequências, não o produto principal.

Direção reforçada pelo responsável pelo produto em 2026-11-11: estudos bíblicos, participação comunitária e utilidade concreta para igrejas têm prioridade sobre testes de dons, personalidade e compatibilidade. A primeira jornada pública foi implementada: biblioteca de quatro estudos dos Evangelhos, etapas de leitura/conversa/prática e roteiros de encontro para baixar/imprimir. A participação em comunidades online continua pendente.

O produto não é um aplicativo de namoro. Relacionamentos amorosos podem existir futuramente, mas não são o núcleo nem a porta de entrada do MVP.

## 2. Estado técnico real

O repositório contém uma **jornada pública de estudos bíblicos e preparação de encontros**, protótipos locais legados e uma prova técnica de backend. Ainda não é uma comunidade online operacional.

### Frontend
- Vue 3.
- Vue Router 4.
- Vite 6.
- CSS próprio.
- Fluxos demonstrativos em localStorage/sessionStorage.
- Cadastro/login local por e-mail é falsificável e não autentica identidade.
- Não há sincronização de contas/produto com backend real.

### Backend
- Node.js 26 LTS recomendado.
- TypeScript.
- Fastify.
- Monólito modular.
- API REST versionada em /api/v1.
- Health check.
- Catálogo público de comunidades com PostgreSQL local.
- Problem Details sanitizados e request IDs.
- Migrations locais.
- Testes Fastify e integração PostgreSQL.

### Banco
- PostgreSQL é a tecnologia aprovada.
- A migration executável atual cobre comunidades do catálogo.
- Não existe banco remoto provisionado.
- O schema físico completo de contas, identidades, perfis, memberships, blocos, conteúdo, oração e moderação ainda não foi implementado.

### Autenticação e identidade
- Estratégia de autenticação gerenciada aprovada.
- Supabase Auth e Clerk são a shortlist documentada; nenhum provedor foi selecionado.
- Conta interna UUID e vínculo externo provider/subject são a direção aprovada.
- Não há login real, sessão real, recuperação, verificação de e-mail ou MFA operacional.

### Autorização
Existem políticas puras e carregadores provider-neutral testados para:
- conteúdo comunitário;
- criação de conteúdo;
- edição própria;
- interação direta/bloqueio;
- moderação por papel/escopo/conflito;
- leitura de pedidos de oração;
- remoção de reação.

Ainda não há adapter persistente geral nem integração dessas políticas nas rotas de domínio.

### Atualização técnica após as PRs #64–#67
- Produção Vercel confirmada; o build publicado é a SPA. A API Fastify não é servida por esse build estático.
- Migrations locais serializadas e com rollback do lote; paginação compatível com nomes Unicode.
- Identidade/políticas/carregadores validam fatos em runtime, negando dados incompletos ou de tipos incorretos.
- Gravações locais de perfil, questionário, descoberta, salvos e dons tratam falhas; restauração entre chaves é de melhor esforço, sem isolamento entre abas.
- Progresso de dons reativo, persistido antes de avançar e validado contra limites. Esses testes são recursos legados e deixam de ser prioridade de produto.
- Validação da base: 49 testes unitários/contrato, 78 de API/identidade/autorização e 10 PostgreSQL, além de lint/build. Auditoria npm bloqueia severidade alta/crítica.
- Nenhum projeto Supabase foi identificado como pertencente a esta aplicação; nenhum recurso de outro projeto deve ser vinculado por suposição.

## 3. Jornada pública e recursos legados

### Implementado sem cadastro
- `/estudos`: quatro guias originais dos Evangelhos, com filtro por tema.
- `/estudos/:slug`: referência bíblica externa, contexto, observação, perguntas e prática.
- `/em-comunidade`: roteiros de 30/45/60 minutos com preparação/contexto, condução por cinco etapas, link que preserva estudo/duração, download em texto e impressão completa. Etapas são temporárias, sem controle de presença ou registro de relatos.
- `/igrejas`: uso dos materiais pela comunidade local, com limites atuais claros.
- Home, navegação e painel promovem aprendizado, comunidade e serviço. `/laboratorio` preserva recursos anteriores, com aviso demonstrativo.
- Nenhum histórico de estudo, nota, participante ou relato é coletado/persistido nessa jornada. Materiais são originais e as referências podem ser conferidas; ver ADR-0008 e critérios editoriais.

### O que permanece demonstrativo

Os fluxos locais podem experimentar:
- criação/edição de perfil;
- sessão demonstrativa;
- questionários;
- descoberta local;
- interesses, bloqueios, denúncias e perfis salvos locais.

Nada disso representa comunicação entre usuários reais ou operação de moderação.

**Não usar o protótipo para dados pessoais, religiosos, pedidos de oração, senhas ou qualquer informação real.**

## 4. MVP aprovado como direção

### Núcleo
1. Conta e sessão reais.
2. Perfil mínimo e privacidade.
3. Comunidades curadas pela administração.
4. Membership, entrada, saída e aprovação.
5. Publicações de texto.
6. Comentários.
7. Reação “Apoiar”.
8. Bloqueio.
9. Denúncias persistentes.
10. Moderação e auditoria.
11. Administração server-side.

### Fora do primeiro MVP
- chat privado;
- descoberta romântica;
- matching/compatibilidade algorítmica;
- criação livre de comunidades por usuários;
- eventos;
- notificações avançadas;
- mídia, enquanto storage/moderação não estiverem prontos;
- internacionalização além do português brasileiro inicial.

Pedidos de oração só poderão receber dados reais quando os controles de privacidade, audiência, consentimento, autorização, denúncia, moderação, exclusão e retenção estiverem operacionais.

## 5. Modelo de acesso

- Visitante: somente metadados públicos de apresentação/catálogo.
- Membro: participa apenas onde possui vínculo válido.
- Moderador: escopo limitado às comunidades atribuídas e impedimento em conflito.
- Administrador: poder global conforme política e justificativa/auditoria quando exigidas.
- Comunidade não listada: somente por convite/autorização.
- Publicações, comentários e interações não são públicos para a internet.

## 6. Segurança e privacidade

O projeto trata potencialmente dados pessoais sensíveis, incluindo informações relacionadas à convicção religiosa.

Princípios obrigatórios:
- minimização;
- finalidade;
- privacidade por padrão;
- autorização server-side;
- deny-by-default;
- validação de entrada;
- proteção de sessão;
- bloqueio server-side;
- denúncias persistentes e auditáveis;
- logs sem segredos ou PII desnecessária;
- retenção e exclusão definidas antes de dados reais;
- revisão jurídica LGPD antes do beta.

Idade mínima aprovada para o beta: **18 anos**. O mecanismo concreto de verificação e tratamento de suspeitas ainda está pendente.

## 7. Decisões técnicas vigentes

- Frontend: Vue 3 + Vue Router + Vite.
- Backend: Node.js 26 LTS + TypeScript + Fastify em monólito modular.
- Banco: PostgreSQL.
- Autenticação: estratégia gerenciada, fornecedor pendente.
- Identidade: UUID interno separado do provider/subject.
- API: REST versionada em /api/v1.
- OpenAPI: contrato draft.
- Não provisionar serviços pagos ou coletar dados reais sem aprovação dos gates correspondentes.

Consultar OPEN_DECISIONS.md e os ADRs para decisões formais.

## 8. Pendências bloqueadoras

- D-13: fornecedor/região/custo do PostgreSQL.
- D-14: fornecedor de autenticação e detalhes de sessão.
- D-15: storage.
- D-16: e-mail.
- D-17: hospedagem.
- D-18: capacidade e operação de moderação.
- D-19: verificação de idade.
- D-20: revisão jurídica.
- D-21: orçamento/disponibilidade.
- D-22: critérios finais de beta.
- Inventário de dados, bases legais, retenção, backups/restore e resposta a incidentes.

## 9. Documentação canônica

- README.md — entrada e estado resumido.
- OPEN_DECISIONS.md — registro canônico de decisões e pendências.
- EXECUTION_ROADMAP.md — fases e evidências de execução, sem cronograma aprovado.
- docs/product/mvp.md — escopo comunitário vigente.
- docs/product/requirements.md — requisitos de trabalho reconciliados.
- docs/architecture/system-architecture.md — arquitetura vigente e histórico explicitamente marcado.
- docs/security/* — contratos, threat model e autorização.
- docs/database/* — contratos e schema físico conforme cada etapa.

Documentos históricos podem conter ideias antigas. Quando houver conflito, prevalecem as decisões aprovadas em OPEN_DECISIONS.md e os ADRs correspondentes.

## 10. Próxima ordem de execução

1. Fechar o bloqueador atual de validação/documentação.
2. Implementar contexto de autorização para oração e consolidar contratos de fatos confiáveis.
3. Preparar persistência física de identidade/contas somente após gates de fornecedor, privacidade e operação.
4. Integrar identidade → contexto confiável → política → rota.
5. Construir perfil e membership persistentes.
6. Construir conteúdo comunitário com autorização e testes negativos.
7. Operacionalizar denúncias, bloqueios, moderação e auditoria.
8. Só então preparar beta fechado com evidência de backup, observabilidade, acessibilidade e revisão jurídica.

## 11. Regra de desenvolvimento

Para cada tarefa:
1. ler AGENTS.md e documentação relevante;
2. inspecionar implementação atual;
3. identificar dependências;
4. definir escopo;
5. implementar em mudança pequena e reversível;
6. testar;
7. revisar segurança/privacidade;
8. atualizar documentação;
9. validar CI;
10. relatar implementação, arquivos, testes, resultados, problemas, pendências e próximo passo.

Não marcar uma funcionalidade como pronta apenas porque existe uma tela, endpoint ou teste isolado.
