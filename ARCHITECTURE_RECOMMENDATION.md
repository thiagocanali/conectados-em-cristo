# Recomendação de Arquitetura

- Data: 2026-11-04
- Estado: proposta para discussão; nenhuma escolha de fornecedor ou migração foi aprovada.
- Baseline: Vue 3 + Vue Router 4 + Vue CLI 5, SPA com hash routing, CSS próprio.

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

Manter Vue 3 e Vue Router no primeiro incremento. Planejar modernização incremental de Vue CLI 5 para Vite e introdução de TypeScript por módulos, somente após uma branch/PR de migração com equivalência funcional e testes. Não há evidência de que o produto precise de Next.js ou SSR.

| Alternativa | Benefícios | Custos/riscos | Parecer |
|---|---|---|---|
| Vue 3 + Vue CLI atual | Preserva investimento e reduz mudança imediata | Toolchain antiga, vulnerabilidades e manutenção | Apenas transição curta |
| Vue 3 + Vite + TypeScript | Mantém ecossistema atual, build moderno, migração incremental | Ajustar config, plugins e CI | Preferida para evolução |
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
3. Migrar build Vue CLI para Vite em PR isolada, sem reescrever as views.
4. Definir TypeScript e padrões de lint/testes.
5. Provisionar banco e autenticação em ambiente dev.
6. Construir vertical slice: cadastro/verificação → perfil → comunidade/membership → publicação → denúncia/moderação.
7. Testes de integração e E2E.
8. Homologação e revisão de segurança antes de dados reais.

## 13. Decisões pendentes

Consulte `OPEN_DECISIONS.md`. Esta recomendação não autoriza contratação, provisionamento ou migração.
