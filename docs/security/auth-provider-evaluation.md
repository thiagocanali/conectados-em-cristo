# Avaliação de provedores de autenticação — D-14

- Revisão: 2026-11-07
- Estado: avaliação técnica e comercial preliminar; nenhum provedor selecionado.
- Decisão vigente: autenticação gerenciada (ADR-0005 / D-14).
- Stack: Fastify + TypeScript + PostgreSQL.

## Resumo executivo

A lista curta compatível com a decisão atual é **Supabase Auth** e **Clerk**. **Better Auth** é tecnicamente compatível com Fastify/PostgreSQL, mas é uma biblioteca self-hosted, não um provedor gerenciado; adotá-lo exigiria reavaliar D-14 e assumir operação de identidade.

**Recomendação preliminar:** avaliar Supabase Auth primeiro, especialmente se o projeto também escolher Supabase Postgres. Clerk é a alternativa gerenciada mais direta se quisermos manter o banco independente e priorizar UI/SDK de autenticação pronta. Não selecionar ou provisionar nenhum deles até concluir privacidade, região, DPA, operação, SMTP e orçamento.

## Comparação

| Critério | Supabase Auth | Clerk | Better Auth |
|---|---|---|---|
| Modelo | Serviço gerenciado, integrado à plataforma Supabase | Serviço gerenciado dedicado | Biblioteca open source executada dentro da nossa API |
| Compatibilidade Fastify | SDK de servidor framework-agnostic; verificar JWT/claims no backend | SDK oficial `@clerk/fastify` | Integração oficial Fastify; handler e sessão no próprio servidor |
| PostgreSQL | Integração nativa com Supabase Postgres; acoplamento maior se o banco escolhido for outro | Banco da aplicação permanece independente | Conecta diretamente a PostgreSQL via `pg.Pool` |
| Sessões | JWT + refresh; transporte cookie/header exige decisão explícita | Cookie `__session` ou Authorization header; SDK verifica token | Cookie de sessão com sessão persistida no banco |
| MFA | TOTP disponível; opções avançadas podem ter add-on | MFA incluído no Pro | Plugin 2FA; operação e política ficam sob nossa responsabilidade |
| Interface pronta | SDKs e fluxos Auth; UI da aplicação precisa ser integrada | Componentes e APIs prebuilt de sign-up/sign-in/profile | A aplicação implementa a interface |
| Operação | Provedor opera o serviço; ainda precisamos configurar domínio, e-mail, segurança e integração | Provedor opera o serviço e fornece SDKs/UI | Nós operamos deploy, patches, banco, e-mail, antiabuso, logs, backup e resposta a incidentes |
| Aderência a D-14 | Alta | Alta | Baixa sem alterar a decisão para self-hosted |

## Custos publicados consultados

Valores em USD, consultados em 2026-11-07. São preços de lista e não incluem impostos, câmbio, SMTP externo, SMS, hospedagem da API, banco fora do pacote, suporte jurídico ou outros serviços.

### Supabase Auth

- Free: 50.000 MAU, 500 MB de banco por projeto e até dois projetos gratuitos; projetos Free podem pausar após uma semana sem atividade.
- Pro: a partir de US$ 25/mês; 100.000 MAU incluídos e US$ 0,00325 por MAU adicional.
- O provedor de e-mail integrado tem limite de 2 e-mails por hora; produção precisa planejar SMTP próprio ou um serviço transacional.
- Supabase Auth usa JWT. No backend, validar claims/assinatura ou consultar o usuário no servidor; não confiar no objeto de usuário retornado por uma sessão carregada do storage do cliente.
- MFA TOTP está documentado; o add-on Advanced MFA cobre opções além de TOTP.

**Impacto arquitetural:** Supabase Auth fica mais simples e econômico se D-13 também escolher Supabase Postgres. Usar Supabase Auth com outro banco pode criar duas plataformas e duas superfícies operacionais. Isso precisa ser comparado, não presumido.

### Clerk

- Hobby: gratuito, 50.000 Monthly Retained Users (MRU) por aplicação, domínio customizado, até três assentos de dashboard e sessão fixa de sete dias; logs retidos por um dia.
- Pro: US$ 20/mês com cobrança anual, inclui 50.000 MRU por aplicação; MRU adicional publicado a US$ 0,02/mês cada.
- MFA e duração de sessão customizável estão listados no Pro.
- SDK Fastify oficial valida sessão a partir de cookies/headers e disponibiliza estado de autenticação na request.

**Impacto arquitetural:** integração e UX mais prontas, sem obrigar a hospedar o banco na mesma plataforma. O plano gratuito não atende ao requisito de MFA para equipe se decidirmos exigi-lo; o Pro passa a ser o baseline relevante. MRU não é a mesma métrica que MAU do Supabase.

### Better Auth

- Framework open source MIT e gratuito; não há cobrança por usuário para a biblioteca.
- Integra diretamente com PostgreSQL via `pg.Pool` e tem integração oficial Fastify.
- A plataforma opcional de infraestrutura/observabilidade publica Starter gratuito e Pro a US$ 20/mês; isso é separado do framework.
- O custo monetário do framework não elimina custo de operação: segurança, disponibilidade, atualizações, sessões, recuperação, e-mail/SMS, rate limit, monitoramento, backups e incidentes passam a ser responsabilidade do projeto.

**Impacto arquitetural:** bom encaixe técnico com o código atual e potencial menor custo de licença, mas contradiz a estratégia gerenciada aprovada em D-14. Não adotar sem revisar capacidade operacional e ADR.

## Requisitos mínimos para qualquer opção

1. Verificação de e-mail e recuperação segura de conta; entrega de e-mail deve ser testada antes de beta.
2. Sessão revogável, expiração e rotação; logout e mudança de estado da conta precisam invalidar acesso no backend.
3. MFA obrigatório para administradores e moderadores; avaliar TOTP e recuperação segura de fatores.
4. Cookies `HttpOnly`, `Secure`, `SameSite` e proteção CSRF quando o transporte escolhido usar cookies. CORS deve permitir somente origens conhecidas.
5. API Fastify valida identidade em cada request e converte o subject externo para um UUID interno; autorização continua sendo regra da nossa API, nunca do provedor sozinho.
6. Não armazenar access/refresh tokens em `localStorage` como substituto de sessão segura.
7. Rate limits, proteção contra brute force/credential stuffing, eventos de segurança e logs sem tokens ou dados sensíveis.
8. Exportação, exclusão, retenção, DPA, subprocessadores, região de processamento, suporte a incidentes e portabilidade dos identificadores.
9. O mecanismo de idade mínima de 18 anos (F-06) é uma decisão separada: login/e-mail verificado não comprova idade.
10. Plano de saída: exportar/relacionar contas e sessões, trocar chaves, invalidar sessões e migrar identidades sem expor credenciais.

## Recomendação e pendências

- **Primeiro candidato para prova técnica:** Supabase Auth, condicionado à avaliação conjunta com D-13 (PostgreSQL) e à resolução de SMTP, cookies/PKCE, região, DPA e MFA.
- **Alternativa gerenciada:** Clerk Pro se a separação entre auth e banco e a UI pronta compensarem o custo recorrente e a métrica MRU.
- **Alternativa self-hosted:** Better Auth somente se houver decisão explícita de alterar D-14 e capacidade real para operar autenticação crítica.

Antes de decidir, precisamos confirmar: região de dados, orçamento mensal máximo, necessidade de TOTP para equipe, domínio/e-mail transacional, preferência por senha vs. magic link/OTP, política de exclusão/exportação e responsabilidade por incidentes.

**Nenhum provedor foi selecionado, conectado, provisionado ou contratado. Nenhuma credencial foi criada.**
