# Architecture Decision Records (ADRs)

Este diretório contém todos os Architecture Decision Records do projeto Conectados em Cristo.

## Formato de ADR

Cada ADR deve seguir este formato:

```
# ADR-XXX: Título da Decisão

## Contexto
Descrição do problema, situação e pressões que levam à decisão.

## Problema
Qual é o problema específico que precisa ser resolvido?

## Opções Consideradas
- Opção 1: Descrição, pros, contras
- Opção 2: Descrição, pros, contras
- Opção 3: Descrição, pros, contras

## Decisão
Qual opção foi escolhida e por quê?

## Consequências
- Positivas: O que melhora
- Negativas: O que piora ou complica
- Mitigações: Como lidar com consequências negativas

## Data
Data da decisão

## Status
- Pendente
- Aceito
- Descontinuado
- Substituído por ADR-XXX
```

## ADRs Registradas

- [ADR-0009: Testes de navegador da jornada pública](0009-public-journey-browser-tests.md) — Playwright no CI, Chromium desktop/móvel e bases Vercel/GitHub Pages

- [ADR-0008: Jesus no centro e primeira jornada útil para igrejas](0008-christ-centered-learning.md) — estudos públicos e roteiros; legado experimental separado

- [ADR-0003: Stack técnica do MVP](0003-stack-mvp.md) — Frontend Vue 3 + Vite aceito; backend e demais camadas continuam pendentes
- [ADR-0004: Persistência do MVP](0004-persistencia-mvp.md) — PostgreSQL aprovado como tecnologia; provedor pendente
- [ADR-0005: Autenticação e sessões do MVP](0005-autenticacao-mvp.md) — estratégia gerenciada aprovada; provedor pendente
- [ADR-0006: Backend API](0006-backend-api.md) — Fastify + TypeScript + Node 26 LTS aprovados
- [ADR-0007: Identidade interna independente do provedor](0007-internal-identity-boundary.md) — direção de modelagem aceita; esquema e integração pendentes

As direções técnicas de frontend (Vue/Vite), backend (Fastify/TypeScript), banco (PostgreSQL) e estratégia de autenticação gerenciada foram aceitas. Fornecedores de banco, auth, storage, e-mail e hospedagem continuam pendentes. A identidade interna será separada do subject externo e do perfil; ADR-0007 não autoriza migrations ou login real. Ainda não há ADR específica para moderação.

## Princípios para Tomada de Decisão

1. **Segurança em primeiro lugar** — Sempre considere implicações de segurança
2. **Escalabilidade razoável** — Não prematura, mas preparada
3. **Manutenibilidade** — Código deve ser compreensível por novos desenvolvedores
4. **Clareza** — Decisões devem ser documentadas explicitamente
5. **Reversibilidade** — Prefira decisões reversíveis quando possível
6. **Consenso informado** — Baseie em fatos, não em preferências pessoais

## Como Adicionar um Novo ADR

1. Crie arquivo: `ADR-XXX-titulo-da-decisao.md`
2. Siga o formato acima
3. Obtenha aprovação antes de mergear
4. Atualize a lista neste README
5. Referencie o ADR em código e documentação quando relevante

## Histórico

| ADR | Título | Status | Data |
|-----|--------|--------|------|
| 0003 | Stack técnica do MVP | Direção aceita | 2026-09-28 |
| 0004 | Persistência do MVP | PostgreSQL aceito; provedor pendente | 2026-09-28 |
| 0005 | Autenticação e sessões do MVP | Estratégia gerenciada aceita; provedor pendente | 2026-09-28 |
| 0006 | Backend API | Aceito | 2026-11-07 |
| 0007 | Identidade interna independente do provedor | Direção aceita; implementação pendente | 2026-11-07 |
