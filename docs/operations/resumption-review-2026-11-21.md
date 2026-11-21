# Revisão de continuidade — 2026-11-21

## Base e fontes

Código inspecionado na main `af65f54f4e1064fb4a8265012ecd854dd46a7acd`, Git, documentação, histórico disponível na conversa e metadados GitHub/Vercel. Outros chats e alterações locais do ambiente anterior não estavam disponíveis. O ambiente atual iniciou sem checkout; a cópia foi recuperada do GitHub, sem alterações locais a sobrescrever. A consulta de issues/PRs abertas retornou vazia.

## Direção preservada

Jesus no centro; conhecer Cristo pelas Escrituras, aprender juntos e servir. Igrejas e pequenos grupos são o uso principal. Dons, personalidade e matching permanecem experimentais. Vue/Vite, Fastify/TypeScript, PostgreSQL, API versionada e identidade interna separada do provedor continuam as escolhas existentes.

## Último ponto desenvolvido

A última entrega desta conversa foi a folha de estudo para participantes (#72). O Git avançou depois para implantação e fundação de identidade:

| PR / commit | Evidência no código |
| --- | --- |
| #76 / `b70ae6d` | Verificador Supabase por consulta ao servidor, sem confiar em JWT decodificado ou metadata editável |
| #77 / `15d47bc` | Composição de identidade validada e conta interna ativa |
| #78 / `4200d9c` | Consulta parametrizada PostgreSQL do par provider/subject |
| #79 / `cda3db5` | Scripts separados de grants restritos e auditoria de identidade |
| #81 / `ed0cbfd` | Evidência da publicação do catálogo e isolamento de credenciais de preview |
| #85 / `765eedf` | Contratos HTTP adicionais da Function |
| #86 / `279cb35` | Migration versionada de contas/identidades, RLS forçada e sem políticas por padrão |
| #87 / `af65f54` | AGENTS, template de PR, concorrência do CI e serialização de deploy Pages |

A PR #63 também está integrada: `c213c38` é ancestral da main. Nenhuma implementação de convite personalizado foi encontrada; foi uma possibilidade de continuidade, não uma entrega iniciada.

## Estado confirmado

- Estudos, caminhada, roteiros/condução e folha do participante estão no código e na suíte pública existente.
- Produção Vercel READY no commit `af65f54`, deployment `dpl_4htWQ7DcpX3pEsf189yfkuZRMe5i`. A consulta HTTP do catálogo retornou 200 com `{"items":[]}`. Isso não representa comunidades cadastradas nem participação operacional.
- `buildRuntimeApp` conecta apenas o catálogo/readiness. `buildApp` publica health/catalog. Não conecta o verificador, gateway ou repositório de identidade a rotas protegidas.
- `accounts`/`account_identities` existem no esquema versionado. Aplicação remota dessas tabelas não foi confirmada nesta revisão; o catálogo publicado não comprova isso.
- Login do frontend continua demonstrativo. Não há memberships, perfis remotos, conteúdo comunitário ou operação de moderação.
- Documentos antigos confundiam ausência de login operacional com ausência de qualquer implementação de identidade e ainda negavam a existência do banco remoto. As entradas principais foram reconciliadas sem converter propostas em entregas.

## Lote de continuidade

1. Reproduzir a falha de reexecução: 12 testes passaram na primeira execução; a segunda falhou no setup porque `accounts` já existia.
2. Limpar também as tabelas de identidade antes de reaplicar migrations, preservando a guarda de banco local com sufixo `_test`.
3. Verificar defaults, estados, constraints, unicidade e FK reais.
4. Verificar RLS forçada e negação de leitura sem política, mesmo com grant de SELECT.
5. Executar adapter/gateway com leitor restrito: mapeamento exato, entrada hostil sem ampliação de leitura, ausência de vínculo, conta inativa e revogação local de vínculo.
6. Executar os scripts reais de grants/auditoria com papéis locais sintéticos; verificar negação de escrita/colunas extras e detecção de grants indevidos, RLS removida e tabelas ausentes.
7. Testar down/up de identidade dentro de transação revertida; exigir duas execuções consecutivas da suíte PostgreSQL no CI.
8. Reconciliar contexto, arquitetura, fronteira de identidade e documentação de testes.

Todos os cenários de identidade ficam no mesmo runner destrutivo do catálogo para evitar resets concorrentes. Fixtures, políticas e papéis de identidade são revertidos ao final de cada cenário. O verificador externo é simulado: isso não valida sessão remota ou revogação no provedor. Não foram alterados runtime, migration, SQL de produção, credenciais ou configuração de serviços remotos.

## Validação local

- 63 testes unitários/contrato.
- 103 testes da API/identidade/autorização, typecheck e build TypeScript; smoke HTTP da Function separado.
- 19 testes PostgreSQL, duas execuções consecutivas no mesmo banco descartável PostgreSQL 17.
- Lint e build Vue/Vite.
- 28 execuções da jornada pública Playwright nas duas bases e perfis desktop/móvel, todas aprovadas.
- Auditoria npm: zero vulnerabilidades. Os resultados locais não substituem os checks da PR.

## Próxima tarefa

Preparar a integração isolada de identidade confiável com rotas protegidas, usando as peças existentes. Antes de habilitar login ou cadastrar pessoas: confirmar decisão operacional de autenticação, ambiente independente, credencial dedicada de identidade, provisionamento/ciclo de vida, revisão de segurança e gates de privacidade. Nunca ampliar o leitor público do catálogo para acessar identidades.

Permanecem pendentes validação editorial/piloto, participação, memberships, moderação, retenção, backup/restore e operação. Esta revisão não declara esses recursos concluídos nem muda sua arquitetura.
