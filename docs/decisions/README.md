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

- [ADR-0003: Stack técnica do MVP](0003-stack-mvp.md) — Pendente; Next.js não adotado
- [ADR-0004: Persistência do MVP](0004-persistencia-mvp.md) — Pendente; PostgreSQL não aprovado
- [ADR-0005: Autenticação e sessões do MVP](0005-autenticacao-mvp.md) — Pendente; provedor não escolhido

Nenhuma decisão de stack, banco ou autenticação foi aceita. Ainda não há ADR específica para moderação.

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
| 0003 | Stack técnica do MVP | Pendente | 2026-09-28 |
| 0004 | Persistência do MVP | Pendente | 2026-09-28 |
| 0005 | Autenticação e sessões do MVP | Pendente | 2026-09-28 |
