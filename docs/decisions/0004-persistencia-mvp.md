# ADR-0004: Persistência do MVP

## Contexto
O produto planejado exige dados de perfil, preferências, consentimentos, denúncias e trilhas de auditoria. O protótipo atual persiste dados no `localStorage`/`sessionStorage`; não há banco, API ou esquema funcional de servidor.

## Problema
Como escolher a persistência sem criar tabelas ou contratos prematuros?

## Opções Consideradas
- **PostgreSQL gerenciado**: modelo relacional adequado às relações do produto, consultas estruturadas e controles maduros de segurança.
- **Banco documental**: flexibilidade para questionários; exige cuidados adicionais com consistência e consultas relacionais.
- **Persistência local ou somente em memória**: útil apenas para protótipos visuais; não atende ao produto real.

## Decisão
**Pendente:** PostgreSQL gerenciado é uma alternativa para avaliação, não uma escolha. Persistência local atende apenas ao protótipo e não deve armazenar dados reais; a decisão de produção precisa considerar provedor, isolamento por usuário, migrações, backups, restauração e custos.

## Consequências
- Positivas: consistência e clareza para entidades relacionais.
- Negativas: exige desenho de migrações e governança de dados.
- Mitigações: começar com um esquema mínimo, migrations versionadas e classificação de privacidade por campo.

## Data
2026-09-28

## Status
Pendente; PostgreSQL não aprovado.

## Próximos passos
- Confirmar integração disponível no projeto.
- Validar o modelo de perfil e consentimentos.
- Definir estratégia de migração, backup e restauração antes de dados reais.
