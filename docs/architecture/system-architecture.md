# Arquitetura do Sistema — Conectados em Cristo

## Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                         CDN (Cloudflare)                     │
│               Cache de assets estáticos                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Vue.js 3)                       │
│           Single Page Application com Router                 │
│              Hospedado em Vercel/GitHub Pages                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway / WAF                         │
│              Rate Limiting, CORS, Security                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Node.js)                         │
│              Express/TypeScript microserviços                │
│           Autenticação, Negócio, Moderação                   │
└─────────────────────────────────────────────────────────────┘
       ↓            ↓           ↓           ↓
    Auth        Profile     Discovery    Moderation
    Service     Service      Service      Service
       │            │           │           │
       └────────────┴───────────┴───────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│                  Cache Layer (Redis)                         │
│          Sessões, Cache, Rate Limiting                       │
└─────────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│              Database Layer (PostgreSQL)                     │
│          Primary (master) + Replica (read-only)              │
└─────────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│                  Storage Services                            │
│         S3 (Fotos, Docs) | Email (SendGrid/Resend)          │
│        Backup (Glacier) | Monitoring (Datadog)              │
└─────────────────────────────────────────────────────────────┘
```

## Componentes

### 1. Frontend
- **Tecnologia:** Vue.js 3, Tailwind CSS, Vue Router, Pinia
- **Tipo:** Single Page Application (SPA)
- **Hospedagem:** Vercel ou GitHub Pages (avaliação)
- **Build:** Vite (otimizado para performance)
- **Responsabilidades:**
  - Renderização de UI
  - Validação de input frontend
  - State management (Pinia)
  - Comunicação com API
  - Autenticação local (token storage)
  - Cache local (localStorage, sessão storage)

### 2. API Gateway / WAF
- **Tecnologia:** Cloudflare Workers ou AWS WAF
- **Responsabilidades:**
  - Rate limiting global
  - CORS policy
  - Detecção de bot/DDoS
  - HTTPS enforcement
  - Compressão de responses
  - Logging de requisições

### 3. Backend Services
Arquitetura modular com serviços específicos.

#### 3.1 Auth Service
- **Responsabilidades:**
  - Registro de usuário
  - Verificação de email
  - Login / Logout
  - Reset de senha
  - Geração de JWT
  - Refresh token
  - MFA (futuro)
- **Endpoints:**
  - POST /auth/register
  - POST /auth/verify-email
  - POST /auth/login
  - POST /auth/logout
  - POST /auth/refresh-token
  - POST /auth/forgot-password
  - POST /auth/reset-password

#### 3.2 Profile Service
- **Responsabilidades:**
  - CRUD de perfil
  - Upload de fotos
  - Validação de dados
  - Edição de campo individual
  - Recuperação de perfil completo
- **Endpoints:**
  - GET /profiles/:userId
  - POST /profiles
  - PATCH /profiles/:userId
  - PUT /profiles/:userId/photos
  - DELETE /profiles/:userId/photos/:photoId
  - GET /profiles/:userId/preview

#### 3.3 Discovery Service
- **Responsabilidades:**
  - Busca de perfis
  - Filtros avançados
  - Ordenação (compatibilidade, recente, novo)
  - Paginação
  - Cálculo de compatibilidade em tempo real
- **Endpoints:**
  - GET /discovery/profiles?filters=...&sort=...
  - GET /discovery/profiles/:userId/compatibility

#### 3.4 Interaction Service
- **Responsabilidades:**
  - Registrar interesse
  - Registrar pass
  - Registrar save
  - Registrar bloco
  - Registrar denúncia
  - Histórico de interações
  - Notificação de mutual interest
- **Endpoints:**
  - POST /interactions/interest
  - POST /interactions/pass
  - POST /interactions/save
  - POST /interactions/block
  - POST /interactions/report
  - GET /interactions/history
  - GET /interactions/interested-in-me

#### 3.5 Compatibility Service
- **Responsabilidades:**
  - Cálculo de score de compatibilidade
  - Análise de alinhamentos
  - Identificação de pontos de atenção
  - Recomendações (futuro)
- **Endpoints:**
  - GET /compatibility/:userId/:otherUserId
  - POST /compatibility/recalculate/:userId

#### 3.6 Moderation Service
- **Responsabilidades:**
  - Gestão de denúncias
  - Revisão de conteúdo
  - Ações: avisar, suspender, banir
  - Logs de moderação
  - Detecção de padrão de fraude
- **Endpoints:**
  - POST /moderation/reports
  - GET /moderation/reports
  - PATCH /moderation/reports/:reportId/action
  - GET /moderation/logs

### 4. Cache Layer (Redis)
- **Responsabilidades:**
  - Sessões de usuário
  - Cache de perfis
  - Cache de compatibilidade
  - Rate limiting storage
  - Fila de jobs (futuro)
- **TTL Strategy:**
  - Sessão: 24h
  - Perfil cache: 1h
  - Compatibilidade: 24h

### 5. Database (PostgreSQL)
- **Estratégia:**
  - Primary (escrita)
  - Read Replica (leitura)
  - Backup diário
- **Tabelas principais:**
  - users
  - profiles
  - faith_data
  - personality_data
  - relationship_goals
  - lifestyle_data
  - interactions
  - compatibility_scores
  - moderation_reports
  - logs
- **Indices:**
  - PK em todas as tabelas
  - FK com integridade referencial
  - Índices em colunas de filtro/busca

### 6. Storage Services

#### 6.1 Object Storage (S3 / Vercel Blob)
- **Responsabilidades:**
  - Armazenamento de fotos
  - Backup de dados críticos
- **Estrutura:**
  - /photos/{userId}/{photoId}.jpg
  - /backups/{date}/database.sql.gz
  - Versionamento habilitado
  - Replicação para múltiplas regiões

#### 6.2 Email Service (SendGrid / Resend)
- **Responsabilidades:**
  - OTP para verificação
  - Reset de senha
  - Notificações (futuro)
  - Marketing (futuro)
- **Templates:**
  - Verificação de email
  - Reset de senha
  - Bem-vindo ao Conectados em Cristo
  - Novo interesse (futuro)

#### 6.3 Backup Service
- **Frequência:** Diário
- **Retenção:** 30 dias
- **Estratégia:** Incremental
- **Armazenamento:** AWS Glacier
- **Teste:** Mensal

### 7. Monitoring e Observabilidade
- **Logs:** ELK Stack ou Datadog
- **Métricas:** Prometheus + Grafana
- **Tracing:** Jaeger ou Datadog APM
- **Alertas:** PagerDuty
- **Uptime:** UptimeRobot
- **Performance:** New Relic

## Fluxos Principais

### Fluxo de Autenticação
```
1. Usuário submete email/senha
2. Frontend valida localmente
3. POST /auth/register
4. Backend valida, cria usuário, envia OTP
5. Usuário recebe email
6. Usuário clica link ou insere código
7. POST /auth/verify-email
8. Backend marca email como verificado
9. Frontend recebe token JWT
10. Token armazenado em sessionStorage (httpOnly via cookie)
11. Todas as requisições posteriores incluem token
```

### Fluxo de Descoberta
```
1. Usuário abre Discovery
2. Frontend requisita GET /discovery/profiles?filters=...
3. Backend consulta cache (Redis)
4. Se miss: consulta DB, calcula compatibilidade, armazena em cache
5. Backend retorna lista de perfis + compatibilidade
6. Frontend renderiza lista
7. Usuário clica em perfil
8. Frontend requisita GET /discovery/profiles/:userId/compatibility
9. Backend retorna dados detalhados
10. Frontend exibe compatibilidade explicada
```

### Fluxo de Interesse
```
1. Usuário visualiza perfil
2. Clica "Demonstrar interesse"
3. Frontend POST /interactions/interest {from, to}
4. Backend registra interesse
5. Backend verifica se há mutual interest
6. Se sim:
   - Armazena match em DB
   - Enfileira notificação
   - Retorna {mutual: true}
7. Se não:
   - Retorna {mutual: false}
8. Frontend exibe resultado
```

### Fluxo de Moderação
```
1. Usuário clica "Denunciar"
2. Frontend POST /moderation/reports {from, target, reason}
3. Backend cria registro de denúncia
4. Admin vê painel de denúncias
5. Admin clica para revisar
6. Admin vê perfil denunciado + histórico
7. Admin escolhe ação: avisar, suspender, banir
8. Backend executa ação:
   - Se banir: marca user como deleted, bloqueia login
   - Se suspender: marca como suspended, com data de retorno
   - Se avisar: envia email
9. Logs são registrados
```

## Decisões Arquiteturais Pendentes

- [ ] Frontend: Vue.js → Next.js (v2)?
- [ ] Backend: Express → Fastify/Nest.js?
- [ ] Banco: Neon, Supabase, ou AWS Aurora?
- [ ] Cache: Redis self-hosted ou managed?
- [ ] Storage: S3 vs Vercel Blob vs Supabase Storage?
- [ ] Email: SendGrid vs Resend?
- [ ] Observabilidade: ELK vs Datadog vs New Relic?
- [ ] Infraestrutura: Vercel, AWS, ou híbrido?

## Princípios de Arquitetura

1. **Separação de Responsabilidades:** Cada serviço tem responsabilidade única
2. **Stateless:** Serviços não armazenam estado (exceto cache)
3. **Escalabilidade:** Poder escalar horizontalmente
4. **Segurança:** Security first em design
5. **Observabilidade:** Logs, métricas, traces em tudo
6. **Testabilidade:** Código testável em múltiplas camadas
7. **Documentação:** APIs bem documentadas
8. **Versionamento:** APIs versionadas para backward compatibility

## Próximos Passos

1. [ ] Definir stack exato (Next.js vs Vue, Node vs Nest, etc)
2. [ ] Criar ADRs para cada decisão
3. [ ] Desenhar diagrama ER do banco
4. [ ] Especificar esquema de autenticação (JWT payload)
5. [ ] Criar especificação de APIs (OpenAPI/Swagger)
