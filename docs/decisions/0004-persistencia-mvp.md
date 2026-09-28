# ADR-0004: Persistência do MVP

## Contexto
O produto exige dados de perfil, preferências, consentimentos, denúncias e trilhas de auditoria. Nenhum banco ou esquema funcional foi confirmado nesta fase.

## Problema
Como escolher a persistência sem criar tabelas ou contratos prematuros?

## Opções Consideradas
- **PostgreSQL gerenciado**: modelo relacional adequado às relações do produto, consultas estruturadas e controles maduros de segurança.
- **Banco documental**: flexibilidade para questionários; exige cuidados adicionais com consistência e consultas relacionais.
- **Persistência local ou somente em memória**: útil apenas para protótipos visuais; não atende ao produto real.

## Decisão
**Proposta, ainda não aceita:** avaliar PostgreSQL gerenciado como opção principal para o MVP. A escolha final deve considerar o provedor disponível, RLS ou escopo por usuário, migrações, backups e custos.

## Consequências
- Positivas: consistência e clareza para entidades relacionais.
- Negativas: exige desenho de migrações e governança de dados.
- Mitigações: começar com um esquema mínimo, migrations versionadas e classificação de privacidade por campo.

## Data
2026-09-28

## Status
Proposto

## Próximos passos
- Confirmar integração disponível no projeto.
- Validar o modelo de perfil e consentimentos.
- Definir estratégia de migração, backup e restauração antes de dados reais.
