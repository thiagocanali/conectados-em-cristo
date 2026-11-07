# Recomendação de Arquitetura

- Data da revisão: 2026-11-07
- Estado: frontend Vue 3 + Vite preservado e migração concluída na PR #23; decisões de backend, banco, autenticação e fornecedores permanecem pendentes.
- Baseline atual: Vue 3.5.45 + Vue Router 4.6.3 + Vite 6.4.5, SPA com hash routing e CSS próprio; Node.js 26 LTS no CI e Node 22/24/26 suportados.

## 1. Princípios

- Modular monolith antes de microserviços.
- Preservar o frontend existente enquanto a migração não provar benefício.
- Backend como autoridade para autenticação, autorização, regras de domínio e dados.
- PostgreSQL como candidato relacional, sujeito à aprovação.
- Privacidade por padrão e classificação de dados desde o modelo inicial.
- Ambientes separados, segredos fora do repositório e migrations versionadas.
- Serviços gerenciados para reduzir carga operacional de uma equipe pequena.
- Evitar Redis, réplicas, filas distribuídas e observabilidade cara até existir necessidade mensurável.

## 2. Arquitetura recomendada para avaliação

```
Navegador
   |
   | HTTPS
   v
Frontend Vue 3 + TypeScript (SPA)
   |
   | API HTTPS / cookie de sessão
   v
Backend Node.js + TypeScript (monólito modular)
   |-- Auth / Account
   |-- Profiles & Privacy
   |-- Communities & Memberships
   |-- Posts & Interactions
   |-- Prayer / Content
   |-- Reports & Moderation
   |-- Admin & Audit
   |
   +--> PostgreSQL gerenciado
   +--> Object Storage para imagens
   +--> Provedor de e-mail transacional
   +--> Observabilidade básica
```

O frontend não acessa diretamente credenciais administrativas do banco. Operações sensíveis passam pela API. Se um provedor gerenciado fornecer autenticação ou RLS, isso será defesa adicional e não substitui validação de autorização no servidor.

## 3. Frontend: Vue versus Next.js

### Recomendação

Manter Vue 3 + Vue Router 4 + Vite 6, stack atual validada na PR #23. Introduzir TypeScript por módulos somente se houver benefício concreto e em mudança isolada. Não há evidência de que o produto precise de Next.js ou SSR.

| Alternativa | Benefícios | Custos/riscos | Parecer |
|---|---|---|---|
| Vue 3 + Vite (atual) | Preserva investimento, build moderno e fluxo já validado | TypeScript ainda não configurado | Stack frontend adotada |
| Vue 3 + Vite + TypeScript | Mantém ecossistema atual e permite tipagem gradual | Exige plano incremental, lint e testes | Evolução opcional, não bloqueante |
| Next.js + TypeScript | SSR/SEO e ecossistema React | Reescrita de telas, nova curva e migração ampla | Não justificada hoje |

Tailwind não é requisito. O projeto usa CSS próprio; preservar até haver razão concreta para substituir.

## 4. Backend: alternativas

| Opção | Vantagens | Custos/complexidade | Parecer |
|---|---|---|---|
| Fastify + TypeScript | Leve, validação explícita, bom controle do monólito | Mais decisões de estrutura precisam ser padronizadas | Preferência técnica inicial |
| NestJS | Convenções, DI, módulos e estrutura pronta | Mais abstração e boilerplate para MVP pequeno | Boa alternativa se equipe crescer |
| Express + TypeScript | Ecossistema amplo e familiar | Exige compor validação, estrutura e padrões | Viável, menos opinativo |

**Proposta:** Fastify + TypeScript em monólito modular, com schemas de validação, serviços de domínio, camada de persistência e OpenAPI. A escolha é pendente de aprovação e teste vertical.

## 5. Banco de dados

PostgreSQL é o candidato recomendado devido a relações entre contas, perfis, comunidades, membros, publicações, comentários, denúncias, consentimentos e auditoria.

| Alternativa | Vantagens | Trade-offs |
|---|---|---|
| Supabase Postgres | Banco gerenciado, ferramentas integradas e opção de Auth/Storage | Dependência de ecossistema; revisar RLS, limites e custo |
| Neon Postgres | PostgreSQL gerenciado com foco em desenvolvimento/branching | Auth, storage e backend precisam de serviços separados |
| PostgreSQL em provedor de aplicação | Mais controle sobre composição | Maior responsabilidade operacional e backup/restore |

Nenhuma opção está contratada ou configurada. Comparar preços/limites atuais antes da contratação.

## 6. Autenticação

Avaliar:
- Supabase Auth: integração com Postgres/Storage, menos serviços separados.
- Clerk: experiência gerenciada de identidade e sessões; dependência/custo do fornecedor.
- Better Auth/autenticação própria no backend: controle e portabilidade, maior responsabilidade por segurança e operação.

**Recomendação:** não implementar hashing, recuperação e gestão de sessão do zero sem necessidade. Selecionar provedor após comparar preço, portabilidade, cookies/sessões, MFA, e-mail, exportação e suporte. A API deve validar identidade e autorização em cada operação.

## 7. Hospedagem e operação

- Frontend estático: Vercel é opção natural já configurada; GitHub Pages pode permanecer como preview/demo, não como backend.
- API: serviço Node gerenciado com deploy por ambiente (Render/Fly.io ou alternativa avaliada), ou plataforma que suporte runtime persistente e segredos.
- Banco: PostgreSQL gerenciado.
- Storage: Supabase Storage ou S3-compatible, com URLs assinadas, limites, validação e remoção de metadados.
- E-mail: Resend, Postmark ou equivalente; comparar entregabilidade, preço, região e contrato.
- DNS/HTTPS: provedor com TLS gerenciado.
- Observabilidade: logs estruturados sem PII, monitoramento de erros e uptime básico; ampliar somente conforme operação.

Não assumir que Vercel/GitHub Pages atuais já hospedam API ou dados.

## 8. Arquitetura modular sugerida

Módulos de domínio:
1. Identity & Accounts
2. Profiles & Privacy
3. Communities & Memberships
4. Content & Interactions
5. Faith Content & Prayer
6. Events (fase posterior)
7. Discovery (fase posterior)
8. Reports & Moderation
9. Administration & Audit
10. Notifications (fase posterior)

Uma base PostgreSQL compartilhada, com limites de módulo e migrations, é suficiente inicialmente. Não criar microsserviços por domínio.

## 9. Segurança e privacidade arquitetural

- Sessão em cookie HttpOnly, Secure e SameSite, se compatível com o provedor; CSRF e CORS configurados conforme origens.
- Autorização server-side por recurso, papel e vínculo comunitário.
- Rate limiting nos fluxos de autenticação, criação de conteúdo e denúncias.
- Senhas nunca em localStorage; não guardar tokens de longa duração no browser.
- Segredos via ambiente/secret manager.
- Upload por URL assinada ou endpoint controlado, validar MIME real/tamanho e processar imagem.
- Criptografia em trânsito e controles de acesso em repouso.
- Logs sem senha, tokens, pedidos privados ou dados religiosos desnecessários.
- Backups e restauração testada antes de beta.
- Inventário de dados, base legal/finalidade, consentimento quando aplicável, retenção e exclusão validados com jurídico.

## 10. Ambientes

- Local: dados sintéticos e serviços isolados.
- Preview/homologação: projeto de banco e storage separado, sem dados reais.
- Produção: segredos e acessos próprios, migrações revisadas, backups, alertas e rollback.
- Não copiar dados reais de produção para desenvolvimento.

## 11. Custos e complexidade

| Camada | Custo inicial esperado | Crescimento |
|---|---|---|
| Vue/Vite | Baixo, ferramentas abertas | Custo de manutenção do frontend |
| API Fastify | Baixo em tráfego inicial | Instância e logs conforme uso |
| PostgreSQL gerenciado | Baixo/médio conforme plano e armazenamento | Principal componente de custo e operação |
| Auth gerenciada | Pode ter plano gratuito limitado | Custo acompanha usuários ativos/recursos |
| Storage de imagens | Baixo no piloto | Banda, armazenamento e moderação |
| E-mail | Baixo em baixo volume | Volume e reputação de envio |
| Observabilidade | Básico pode ser baixo | Retenção e volume de logs |

Valores específicos não foram fixados porque preços, limites e disponibilidade mudam por fornecedor e região. Antes de contratação, fazer comparação atual com estimativa de usuários, fotos, e-mails e tráfego.

## 12. Sequência técnica proposta

1. Aprovar público, MVP e provedores.
2. Criar threat model e classificação de dados.
3. [x] Migrar build Vue CLI para Vite em PR isolada (#23), sem reescrever as views.
4. Definir TypeScript e padrões de lint/testes.
5. Provisionar banco e autenticação em ambiente dev.
6. Construir vertical slice: cadastro/verificação → perfil → comunidade/membership → publicação → denúncia/moderação.
7. Testes de integração e E2E.
8. Homologação e revisão de segurança antes de dados reais.

## 13. Decisões pendentes

Consulte `OPEN_DECISIONS.md`. Esta recomendação não autoriza contratação, provisionamento ou migração.


## 14. Proposta de decisões técnicas para revisão — 2026-11-06

Esta seção transforma a recomendação anterior em uma proposta objetiva para a próxima etapa. **Não é aprovação de fornecedor, contratação, provisionamento ou autorização para iniciar a implementação.** As decisões D-12 a D-17 em `OPEN_DECISIONS.md` continuam sendo o registro canônico e permanecem pendentes até aprovação explícita.

### 14.1 Padrões técnicos recomendados

| Camada | Padrão recomendado para avaliação | O que ainda precisa ser decidido |
|---|---|---|
| Frontend | Vue 3 + Vue Router + Vite 6; TypeScript gradual opcional | Migração concluída na PR #23; lint, testes, build e preview validados |
| API | Node.js 26 LTS + TypeScript + Fastify, monólito modular | Teste vertical, estrutura de módulos, validação, logging, OpenAPI e política de suporte da versão Node |
| Persistência | PostgreSQL relacional, migrations versionadas | Provedor, região, custo, backup/restore, limites e estratégia de conexão |
| Identidade | Serviço de autenticação gerenciado, com sessão segura | Comparação de Supabase Auth, Clerk e Better Auth; cookies, MFA, recuperação, exportação, custo e integração |
| Autorização | Regras de domínio verificadas pela API em cada operação | Matriz completa de permissões, testes negativos e trilha de auditoria |
| Arquivos | Object storage privado, acesso temporário por URL assinada | Provedor, região, limites, processamento, remoção e política de retenção |
| E-mail | Provedor transacional separado da lógica de domínio | Entregabilidade, domínio, preço, limites e requisitos de privacidade |
| Hospedagem | Vercel para frontend; API em serviço gerenciado compatível com Node | Provedor e custo mensal; disponibilidade, logs, secrets, deploy e rollback |
| Observabilidade | Logs estruturados mínimos, métricas de disponibilidade e erros | Retenção, acesso, alertas e custo compatíveis com F-05 |

### 14.2 Decisões que não devem ser misturadas

1. **Escolher PostgreSQL não significa escolher Supabase ou Neon.** O modelo de dados e as migrations devem permanecer portáveis.
2. **Escolher autenticação gerenciada não delega autorização comunitária ao frontend.** A API deve validar conta, papel, vínculo comunitário, estado do conteúdo, bloqueios e impedimentos F-08 em todas as operações.
3. **RLS pode ser defesa adicional, não substituto da política de autorização.** Se houver acesso direto do cliente ao banco, isso exige revisão específica de superfície de ataque e testes.
4. **Storage privado é obrigatório para conteúdo não público.** URLs assinadas devem ter escopo e validade limitados; nomes de arquivos e IDs não são autorização.
5. **Vercel para frontend não implica hospedar a API na mesma plataforma.** A decisão de API deve considerar runtime, execução contínua quando necessária, rede, conexão com PostgreSQL e custos.
6. **Nenhum serviço gratuito deve ser tratado como gratuito para sempre ou adequado por padrão.** Limites, suspensão por inatividade, backup, região, egress e política de dados devem ser verificados antes de uso.

### 14.3 Sequência de execução recomendada

| Ordem | Etapa | Entrega verificável | Bloqueio para avançar |
|---|---|---|---|
| 0 | Revisar PR documental e consolidar decisões | Documentação alinhada na `main` | Concluída pela PR #20 |
| 1 | Inventário técnico do frontend e dependências | Relatório de scripts, plugins, vulnerabilidades e comportamento atual | Concluída; 46 dependências atualizadas sem `--force`, auditoria zerada (#29) |
| 2 | Plano de migração Vue CLI → Vite | Plano, matriz de compatibilidade e critérios de equivalência | Concluída; plano histórico preservado |
| 3 | Migração isolada do frontend | PR pequena com lint, testes, build e smoke tests | Concluída na PR #23; sem backend ou reescrita de views |
| 4 | Prova técnica da API Fastify | Aplicação mínima local, health check, validação e teste | Depende de aprovação da stack e versão suportada |
| 5 | Modelo de dados e threat model | ERD, classificação de dados, ameaças e matriz de acesso | F-05, F-07, F-08, F-09 e F-10 detalhadas |
| 6 | Seleção de provedores e ambiente dev | ADRs de fornecedor, estimativa de custo e ambiente isolado | Orçamento e aprovação explícita antes de contratar/provisionar |
| 7 | Primeiro fluxo vertical | Cadastro, sessão, perfil e membership com autorização real | Revisão de segurança e testes negativos |
| 8 | Conteúdo e moderação | Publicação, comentários, reações, denúncia e auditoria | Regras F-01 a F-10 operacionalizadas |
| 9 | Homologação | Testes E2E, backup/restore, acessibilidade, privacidade e segurança | Revisão jurídica e operação de moderação antes de dados reais |

### 14.4 Critérios mínimos para aprovar a stack

Antes de escolher fornecedores, elaborar uma comparação simples e reproduzível que registre:

- custo mensal estimado para desenvolvimento e beta, incluindo o que acontece ao ultrapassar limites gratuitos;
- região de processamento/armazenamento e opções de exportação;
- backups, recuperação pontual quando disponível e teste de restauração;
- limites de conexões, armazenamento, banda, execução e e-mail;
- autenticação, MFA, recuperação de conta, sessões e integração com API;
- logs, auditoria, exportação e exclusão;
- lock-in e caminho de migração;
- requisitos de LGPD e revisão jurídica aplicável.

A comparação deve usar uma estimativa explícita de usuários ativos, publicações, imagens, tráfego e e-mails. Sem esses números, qualquer custo é apenas indicativo.

### 14.5 Escopo permitido agora

Até que as decisões pendentes sejam aprovadas, o trabalho pode avançar em:
- auditoria do frontend e inventário de dependências;
- desenho de arquitetura e contratos de API sem dados reais;
- threat model e matriz de autorização;
- plano de migração e testes;
- protótipos locais com dados sintéticos.

Não avançar em:
- contratação ou ativação de serviços pagos;
- criação de banco/armazenamento com dados reais;
- migração de dados;
- cadastro de usuários reais;
- publicação de pedidos de oração reais;
- autenticação ou autorização de produção;
- lançamento de beta ou promessa de cobertura de moderação.

### 14.6 Próxima tarefa técnica

A próxima tarefa recomendada é **fechar o desenho técnico do backend sem provisionar serviços**: revisar D-12 a D-17, threat model, classificação de dados, contratos de API e matriz de autorização com dados sintéticos. Fastify + TypeScript e PostgreSQL continuam recomendações técnicas, não decisões de fornecedor ou autorização para custos. A implementação real depende de revisão das decisões, estimativa de custo e aprovação dos requisitos de privacidade/operação.

**Estado:** frontend Vue/Vite concluído; recomendações de backend registradas. D-12 a D-17 continuam pendentes; nenhuma escolha de fornecedor foi aprovada.
