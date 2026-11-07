# ADR-0004: Persistência do MVP

## Contexto
O produto exige dados relacionais e transacionais para perfis, consentimentos, comunidades, memberships, conteúdo, denúncias e trilhas de auditoria. O protótipo atual continua usando apenas armazenamento local.

## Problema
Como escolher a persistência sem criar tabelas ou contratos prematuros?

## Opções Consideradas
- **PostgreSQL gerenciado**: modelo relacional adequado às relações do produto, consultas estruturadas e controles maduros de segurança.
- **Banco documental**: flexibilidade para questionários; exige cuidados adicionais com consistência e consultas relacionais.
- **Persistência local ou somente em memória**: útil apenas para protótipos visuais; não atende ao produto real.

## Decisão
**Decisão aprovada em 2026-11-07:** PostgreSQL é o mecanismo relacional do produto. O provedor permanece pendente e não foi escolhido. O modelo deverá usar migrations versionadas, constraints, transações e autorização server-side. RLS poderá ser defesa adicional, nunca substituto da autorização da API. Nenhum banco remoto será provisionado até a comparação de fornecedores, região, backups, restauração e custos.

## Consequências
- Positivas: consistência e clareza para entidades relacionais.
- Negativas: exige desenho de migrações e governança de dados.
- Mitigações: começar com um esquema mínimo, migrations versionadas e classificação de privacidade por campo.

## Data
2026-11-07 (rascunho original: 2026-09-28)

## Status
Aceito — PostgreSQL como tecnologia; provedor e provisionamento pendentes.

## Próximos passos
- Comparar provedores sem contratação e registrar preço, região, limites e portabilidade.
- Validar o modelo de perfil, consentimentos e classificação de dados.
- Definir migrations, backup e restauração antes de dados reais.
