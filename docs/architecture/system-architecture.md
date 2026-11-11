# Arquitetura do Sistema — Conectados em Cristo

> **Fonte de verdade arquitetural atual.** Estado executável e direção técnica vigente em 2026-11-11. Propostas antigas de microserviços, Express, Redis, Cloudflare/AWS, S3/Glacier, SendGrid/Resend, Datadog etc. são históricas e não constituem decisões.

## 1. Estado atual

O projeto ainda é um **protótipo local**, não um MVP de produção.

- Frontend: Vue 3 + Vue Router 4 + Vite 6 + TypeScript/CSS próprio.
- Backend: Fastify + TypeScript, monólito modular, API REST versionada em /api/v1.
- Banco: PostgreSQL como tecnologia aprovada; somente o catálogo público de comunidades possui persistência local executável neste momento.
- Autenticação: estratégia gerenciada aprovada, mas provedor ainda não selecionado/provisionado.
- Identidade: fronteira interna provider-agnostic aprovada (UUID interno + identidade externa provider/subject), ainda sem schema físico/login real.
- Autorização: políticas puras e carregadores provider-neutral implementados/testados; ainda sem adapter persistente geral e sem integração nas rotas de domínio.
- Deploy: configurações para Vercel/GitHub Pages existem; ambiente de produção ativo ainda precisa ser confirmado.
- Dados reais: não autorizados nesta etapa.

## 2. Arquitetura vigente

```
Usuário
  │
  ▼
Vue 3 + Vue Router + Vite
  │ HTTPS / API REST
  ▼
Fastify + TypeScript
  ├── Identity & Accounts
  ├── Profiles & Privacy
  ├── Communities & Memberships
  ├── Content & Interactions
  ├── Prayer & Faith Content
  ├── Reports & Moderation
  └── Administration & Audit
  │
  ▼
PostgreSQL
```

O backend é um **monólito modular**, não uma arquitetura de microserviços. Cada módulo deve manter separação de responsabilidades sem criar serviços distribuídos prematuramente.

### 2.1 Frontend

Implementado: Vue 3, Vue Router 4, Vite 6, CSS próprio e fluxo demonstrativo local por localStorage/sessionStorage.
O fluxo demonstrativo não é autenticação e não pode ser usado como mecanismo de segurança. Ainda falta cliente de API de domínio e sincronização com identidade/persistência reais.

### 2.2 Backend

Implementado: Fastify/TypeScript, health check, Problem Details sanitizados, request IDs, catálogo público de comunidades, repositório PostgreSQL local, migrations locais e testes Fastify/PostgreSQL.

Ainda pendente: sessão real; contas/perfis persistentes; memberships; conteúdo; denúncias/moderação; integração das políticas de autorização com rotas; rate limiting e controles antiabuso de produção.

### 2.3 Identidade e autenticação

A direção aprovada é: provedor gerenciado valida a sessão; a API valida identidade em cada operação protegida; provider/subject é resolvido para uma conta interna UUID; o estado da conta é consultado antes da autorização; a autorização usa fatos carregados do servidor.

O provedor final continua pendente conforme D-14. Não armazenar senha, access token ou refresh token da aplicação em localStorage/sessionStorage.

### 2.4 Autorização

A autorização segue deny-by-default.

Já implementado/testado: acesso a conteúdo comunitário, criação de conteúdo, edição própria, interação direta e bloqueio bidirecional, acesso a casos de moderação por papel/escopo/conflito, leitura de pedidos de oração por proprietário/audiência e remoção da própria reação.

Ainda não implementado: adapters persistentes para todos os fatos, middleware/route hooks de autorização e transações/locks necessários aos fluxos de escrita reais.

A existência de uma política não significa que um endpoint esteja protegido até que ela seja integrada a fatos confiáveis e à rota.

### 2.5 PostgreSQL

PostgreSQL é a tecnologia relacional aprovada. A migration executável atual cobre o catálogo de comunidades. O contrato lógico de persistência para autorização já está documentado, mas o schema físico completo de contas, identidades, perfis, memberships, blocos, sanções, conteúdo, reações, oração e moderação ainda depende dos gates de identidade, privacidade/LGPD, operação e fornecedor.

Não há provedor PostgreSQL remoto selecionado ou provisionado.

## 3. Fluxo de segurança alvo

```
Request
  ↓
Validação de entrada
  ↓
Identidade/sessão confiável
  ↓
Conta interna + estado
  ↓
Fatos confiáveis mínimos
  ↓
Política de autorização
  ↓
Operação transacional
  ↓
Resposta sanitizada + auditoria quando aplicável
```

O frontend melhora UX, mas nunca substitui autorização server-side.

## 4. MVP comunitário vigente

**Comunidade primeiro. Conexões depois. Relacionamentos como consequência.**

O MVP inicial deve concentrar-se em conta/autenticação real, perfil mínimo e privacidade, comunidades curadas pela administração, membership/entrada/saída/aprovação, publicações de texto, comentários, reação Apoiar, bloqueio, denúncias/moderação operacional e administração/auditoria.

Ficam fora do primeiro MVP: chat privado, descoberta romântica, compatibilidade algorítmica, criação livre de comunidades por usuários, notificações avançadas e eventos.

Pedidos de oração só recebem dados reais depois de privacidade, consentimento, autorização, denúncia, moderação e exclusão estarem operacionais.

## 5. Decisões ainda pendentes

Consultar OPEN_DECISIONS.md como registro canônico. Principais gates: D-14 autenticação; D-13 PostgreSQL; D-15 storage; D-16 e-mail; D-17 hospedagem; D-18 moderação; D-19 idade; D-20 revisão jurídica; D-21 orçamento/disponibilidade; D-22 critérios de beta.

Nenhuma decisão é presumida por nomes de fornecedores presentes em documentos históricos.

## 6. Critério para novas implementações

1. Verificar se já existe módulo/contrato equivalente.
2. Preservar a separação entre identidade, domínio, persistência e autorização.
3. Preferir solução local e reversível quando o requisito ainda estiver em validação.
4. Não introduzir serviço distribuído, cache ou fila sem necessidade demonstrada.
5. Atualizar ADR/documentação quando a decisão for arquitetural.
6. Validar segurança, privacidade, concorrência e testes antes de concluir a tarefa.

## 7. Histórico arquitetural

Documentos e diagramas anteriores podem mencionar Express, microserviços, Redis, API Gateway/WAF específico, Cloudflare/AWS, S3/Vercel Blob, SendGrid/Resend, Datadog/ELK/New Relic, réplicas de leitura, compatibilidade e descoberta romântica como núcleo.

Esses itens são **históricos/aspiracionais** e não devem ser implementados por referência a esse material.

As decisões vigentes são registradas em OPEN_DECISIONS.md e nos ADRs correspondentes.
## Jornada pública de aprendizado — atualização 2026-11-11

A SPA oferece `/estudos`, `/estudos/:slug`, `/em-comunidade` e `/igrejas`, sem gate de identidade. Conteúdo original referenciado fica em `src/data/studies.mjs`. `meetingGuide.mjs` produz um roteiro público a partir do estudo e da duração suportada; download e impressão ocorrem no cliente, sem coletar participantes ou armazenar histórico pessoal. A nova jornada não chama a API legada nem concede permissões comunitárias. Protótipos anteriores são acessados por `/laboratorio`. Ver ADR-0008 e critérios editoriais.
