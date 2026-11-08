# D-14 — Gate de seleção do provedor de autenticação

- Revisão: 2026-11-08
- Estado: checklist de decisão; nenhum fornecedor selecionado.
- Escopo: Supabase Auth e Clerk continuam como shortlist gerenciada. Better Auth permanece apenas como alternativa que exigiria reabrir a decisão de estratégia gerenciada.

## Regra de decisão

A seleção só deve ser considerada pronta quando houver evidência para **todos** os gates bloqueadores. Preço publicado isoladamente não é suficiente.

| Gate | O que precisa estar definido | Bloqueia seleção? |
|---|---|---:|
| Estratégia | Autenticação gerenciada, API como autoridade de autorização | Não — já aprovado |
| Banco | Compatibilidade com PostgreSQL e plano de integração | Sim |
| Região | Localização/região de processamento compatível com requisitos de privacidade | Sim |
| LGPD/DPA | DPA, subprocessadores, transferência internacional e direitos do titular avaliados | Sim |
| Sessão | Cookie/header, expiração, revogação, rotação e logout | Sim |
| CSRF/CORS | Origens permitidas, transporte e proteção CSRF definidos | Sim |
| E-mail | Verificação, recuperação e provedor SMTP/transacional definidos | Sim |
| MFA | MFA obrigatório para admin/moderação e recuperação de fatores definida | Sim |
| Idade | Fluxo 18+ separado da autenticação definido | Sim |
| Portabilidade | Exportação, desvinculação e plano de troca de provedor | Sim |
| Exclusão | Fluxo de exclusão/revogação/reconciliação definido | Sim |
| Incidentes | Canal, SLA e responsabilidade operacional definidos | Sim |
| Orçamento | Teto mensal e custos previsíveis aprovados | Sim |
| Suporte | Capacidade e nível de suporte aceitáveis para beta | Sim |
| Prova técnica | Fluxo mínimo validado sem dados reais | Sim |

## Critérios de descarte imediato

Descartar uma opção se, antes do beta:

- não houver mecanismo aceitável de revogação de sessão;
- o tratamento de dados não puder atender aos requisitos de privacidade aprovados;
- MFA de equipe não puder ser aplicado de forma adequada;
- recuperação de conta depender de fluxo operacional incompatível com o suporte disponível;
- o custo previsível ultrapassar o teto aprovado;
- não houver caminho razoável de saída/portabilidade.

## Prova técnica mínima

A prova deve usar somente contas de teste e ambiente não produtivo.

1. cadastro;
2. verificação de e-mail;
3. login;
4. criação/renovação de sessão;
5. logout;
6. revogação;
7. recuperação de conta;
8. MFA de operador;
9. obtenção segura de `(provider, subject)`;
10. resolução para UUID interno;
11. conta `suspended` bloqueada pela API;
12. CORS/CSRF conforme o transporte escolhido;
13. logs sem tokens, cookies ou dados sensíveis.

A prova não autoriza cadastro público, usuários reais, migração de dados ou lançamento.

## Comparação atual

### Supabase Auth

**Vantagens**
- maior sinergia com a direção PostgreSQL caso Supabase seja escolhido também para o banco;
- MFA TOTP disponível;
- opção gerenciada coerente com D-14;
- evita operar o núcleo de autenticação.

**Pontos a fechar**
- região/DPA/subprocessadores;
- SMTP de produção;
- desenho cookie/header e CSRF/CORS;
- custo conjunto Auth + Postgres;
- plano de saída.

### Clerk

**Vantagens**
- provedor dedicado de identidade;
- SDK Fastify oficial;
- componentes/fluxos de autenticação prontos;
- banco da aplicação permanece independente.

**Pontos a fechar**
- custo e métrica MRU;
- plano necessário para MFA de equipe;
- região/DPA/subprocessadores;
- SMTP/entrega e domínio;
- portabilidade e dependência operacional.

### Better Auth

Não entra na prova enquanto D-14 permanecer como estratégia gerenciada. Para colocá-lo na shortlist seria necessário:

1. reabrir D-14;
2. aceitar responsabilidade operacional de autenticação;
3. revisar incidentes, patches, sessões, e-mail, rate limits, backups e observabilidade;
4. criar ADR específica.

## Ordem de trabalho

1. Fechar requisitos operacionais e jurídicos que não dependem do fornecedor.
2. Confirmar teto de custo e capacidade de operação.
3. Comparar Supabase Auth + Supabase Postgres contra Clerk + PostgreSQL independente.
4. Escolher candidato.
5. Fazer prova técnica isolada.
6. Registrar decisão em ADR.
7. Só então criar migration física de `accounts`/`auth_identities` e integração real.

## Estado

**Não selecionado.** Nenhum serviço deve ser provisionado ou contratado com base neste documento.
