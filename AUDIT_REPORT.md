# Relatório de Auditoria — Conectados em Cristo

## Revisão incremental — 2026-11-11

Base: `main` em `ea5bd28fb794cfc6974b64814c6d5e8b5b5b5f57`. Revisão de código e contratos da API, identidade/autorização, persistência demonstrativa, workflows, documentação central e evidências dos plugins GitHub/Supabase/Vercel. Não é uma revisão exaustiva de todas as jornadas nem pentest.

### Correções implementadas

| Problema | Comportamento corrigido | Evidência |
|---|---|---|
| Cursor de 512 caracteres e contagem UTF-16 não comportavam todos os nomes permitidos por `varchar(100)` | Limite 1024, contagem por ponto de código e validação de UTF-8/NUL/substitutos isolados | Paginação real com nomes de 100 emojis e entradas inválidas em PostgreSQL 17 |
| Dois executores podiam disputar criação do histórico e aplicar a mesma migration | Advisory lock transacional antes do histórico; lote inteiro atômico | Dois executores em banco vazio; falha de DDL, rollback de esquema/histórico e retry |
| Cadastro, perfil e questionário podiam deixar dados parcialmente salvos ao falhar a sessão | Serviço compartilhado, tentativa de rollback do cadastro e mensagem de falha; sem avançar para resultados quando não salvou | Testes unitários e injeção de `QuotaExceededError` no Chromium |
| ESLint analisava JS minificado após um build local | Ignora `dist/` e `server/dist/` | `npm run build` seguido de `npm run lint` |
| Auditoria npm apenas informativa | CI bloqueia vulnerabilidades altas/críticas e mantém relatórios | Auditoria local com zero vulnerabilidades reportadas |

O rollback de localStorage é de melhor esforço: a API do navegador não oferece transação entre chaves. Se o navegador também bloquear a restauração, não há garantia de consistência. Isso não transforma a sessão local em autenticação.

### Validação desta revisão

- Node 24.22.1 e PostgreSQL 17 efêmero, sem dados remotos.
- 31 testes unitários/contrato, 66 testes de API/identidade/autorização e 10 testes PostgreSQL passaram; typecheck, build de API, build de frontend e lint passaram.
- Chromium, viewport 390 × 844: cadastro → perfil → salvar → recarregar; erro de quota em perfil e questionário sem sucesso falso; questionário → resultados após restaurar armazenamento. Nenhum erro de página e nenhum overflow horizontal na tela final. Verificação pontual, sem suíte E2E no CI.
- `npm audit`: zero vulnerabilidades reportadas no lockfile consultado; resultado não garante ausência de vulnerabilidades desconhecidas.
- Consulta HTTP com TLS validado ao domínio informado: 200. O Chromium remoto encontrou erro de confiança no certificado do proxy; a verificação interativa desta revisão foi feita no app local HTTP, sem desativar validação TLS para o site remoto.

A inspeção adicional das 12 rotas em viewport móvel não encontrou erros de página ou overflow horizontal. Encontrou dois elementos `main` aninhados na home; a view agora usa um `div`, preservando o landmark único de `App.vue`. Landmark único, atalho de teclado para o conteúdo e ausência de overflow foram verificados na home em 390 e 1440 px. Isso não equivale a auditoria completa de acessibilidade.

### Infraestrutura e próximos passos

1. **Identidade e persistência remotas:** nenhum projeto Supabase retornado pela conexão foi identificado como pertencente a esta aplicação. Nenhum projeto foi vinculado, provisionado ou alterado. Antes de dados reais, definir ambiente e provedor e implementar conta interna + adapter de identidade verificada + persistência dos fatos de autorização.
2. **Autorização integrada:** políticas e carregadores puros existem, mas não protegem rotas de domínio nem estão ligados a repositórios persistentes. Manter operações privadas/escritas indisponíveis até integrar e testar IDOR, revogação e escopo.
3. **Deploy:** produção Vercel READY no commit-base, mas divergência entre aliases e respostas HTTP; ver `docs/operations/deployment.md`. Fastify ainda não é servido pelo build estático. Definir a hospedagem da API e verificar contrato HTTP antes de conectá-la à interface.
4. **Demais jornadas locais:** o tratamento de descoberta/salvos foi concluído na continuação abaixo; a recuperação do teste de dons e a validação do formulário de perfil foram concluídas na continuação abaixo; outras jornadas, como os resultados de compatibilidade, ainda precisam de revisão específica e cobertura de componentes.
5. **Operação do produto:** retenção/exclusão, moderação, backups/restore e revisão de privacidade continuam pré-requisitos para um beta com pessoas reais.

## Continuação — fronteira de identidade e autorização (2026-11-11)

Após integração da PR #64 (`dcb1f05`), foi confirmada uma falha nas políticas ainda não conectadas às rotas: valores booleanos ausentes ou com tipo incorreto podiam autorizar operações. Exemplos: ausência do resultado de bloqueio/conflito era interpretada como ausência de impedimento; `editWindowOpen: "false"` era tratado como verdadeiro; uma visibilidade de oração desconhecida podia seguir pelo caminho de audiência selecionada.

Correção: booleanos explícitos, arrays de identificadores e strings não vazias são exigidos em runtime. O resolvedor rejeita conta ativa sem UUID interno válido. Carregadores não consultam repositórios quando os identificadores recebidos estão malformados. Falhas de dependência continuam propagadas. Não foram criadas tabelas, sessões ou rotas privadas.

Evidência: os 12 novos testes foram executados em worktree isolada sobre a base não corrigida: 10 falharam e 2 passaram. Na versão corrigida, os 12 passaram, junto dos 66 testes anteriores da API e 31 testes unitários/contrato; typecheck, build da API, lint e build do frontend passaram localmente. A suíte inclui mudança de conta ativa para suspensa entre resoluções e respostas malformadas dos repositórios de bloqueio/conflito/edição.

Infraestrutura: produção Vercel READY após merge da PR #64; metadados de ambiente do projeto retornaram lista vazia, sem solicitar descriptografia. Os projetos Supabase disponíveis continuam sem correspondência identificada para esta aplicação. A integração remota permanece dependente da identificação do ambiente e dos gates documentados de provedor, idade, privacidade e operação.

## Continuação — descoberta e perfis salvos (2026-11-11)

Base: `92a364f`, após a integração da PR #65. As telas podiam lançar exceções ao renderizar registros locais malformados, remover um cartão antes de confirmar sua gravação e deixar denúncia/bloqueio parcialmente persistidos em caso de quota.

Foi criado um serviço de listas demonstrativas por conta. Ele não importa listas globais de outra conta; lê a variante legada de e-mail sem gravar durante a leitura; preserva JSON corrompido em vez de sobrescrevê-lo como lista vazia; lê e prepara todas as alterações antes de escrever. Uma falha posterior tenta restaurar as chaves já escritas. Falha na própria restauração tem mensagem distinta. Não há transação real nem garantia contra escritas simultâneas de outras abas.

As telas só avançam ou atualizam a lista após confirmação de gravação. Remover um perfil usa a lista relida no momento da ação para preservar entradas adicionadas desde a renderização. Cartões recebem somente campos de apresentação validados, com nome textual e idade inteira entre 18 e 99; registros inválidos são ignorados. E-mail local continua sendo apenas uma chave demonstrativa, não identidade autenticada. Erro ao ler listas de bloqueios/denúncias impede a descoberta de exibir cartões até resolver o erro.

A interface de denúncia informa antes e depois da ação que o registro fica no navegador e não é enviado a moderadores.

Validação: nove novos testes unitários cobrem isolamento por conta, legado sem gravação, dados corrompidos, rollback, falha de rollback e projeção de perfis. Quarenta testes unitários/contrato, lint e build passaram localmente. Chromium móvel verificou salvar/remover/interesse com falhas de quota, preservação de entrada adicionada entre leitura e remoção, restauração de denúncia quando o bloqueio falha, bloqueio após recarregar e descoberta sem cartões ao encontrar JSON de bloqueio corrompido; sem erros de página. Verificação pontual de navegador, não incorporada ao CI.

## Continuação — recuperação do teste de dons e formulário de perfil (2026-11-11)

Base: `7ab9bf7`, após a PR #66. O teste de dons alterava o índice/pontuação antes de gravar; uma falha de quota deixava a resposta aplicada em memória. Os botões de recuperação consultavam localStorage em computed properties sem dependência reativa, ficando desatualizados após concluir/apagar. A validação aceitava pontuações fracionárias, acima dos limites e resultados antecipados. O mapeamento dos dons dependia de um fallback no componente porque o objeto de dados usava `this` fora de contexto.

Correções: transição imutável por resposta; gravação antes de alterar a tela; progresso salvo reativo; chaves por e-mail normalizado, sem importar progresso global; leitura de legado sem escrita; exclusão da chave normalizada e variante legada atual com tentativa de restauração em falha parcial. Índice, conclusão, chaves de pontuação, valores inteiros não negativos e máximos por dom/perguntas já respondidas são verificados. Dados inválidos permanecem armazenados até substituição explícita por novo teste. O mapeamento de perguntas para dons usa os índices definidos em cada dom, também usados no máximo do resultado.

Foi extraído um helper de escrita/restauração compartilhado com listas demonstrativas. Continua sendo rollback de melhor esforço, sem transação real ou isolamento entre abas. A verificação do progresso detecta inconsistências de formato/limites; não comprova respostas autênticas nem torna o teste um instrumento validado.

O perfil agora projeta somente campos de formulário conhecidos, normaliza tipos locais inválidos e rejeita nome em branco/idade fora de 18–99 ou fracionária antes de gravar. A leitura legada não tenta gravar uma migração durante a abertura da tela.

Validação local: 49 testes unitários/contrato passaram, incluindo sete novos testes de dons e dois de perfil; lint e build passaram. Os testes anteriores de listas continuaram verdes com o helper extraído. Chromium móvel verificou 120 respostas (24/24 em todos os dons para respostas Muito), retomada após recarregar, quota sem duplicar pontuação, novo teste sem destruir resultados quando a gravação falha, falha e sucesso na exclusão e atualização imediata dos botões de recuperação. Perfil com campos de tipos inválidos foi editado/salvo sem exceção ou preservação de campos arbitrários; nome em branco foi rejeitado. Nenhum erro de página. Esta verificação de navegador permanece pontual, fora do CI.

## Snapshot original — 2026-11-04

> **Snapshot histórico:** este relatório descreve o commit `5c64e0c3349c35a5b2dab4d1ee93a0e09d033998` em 2026-11-04. Achados sobre senha em texto puro, Vue CLI e vulnerabilidades de dependências foram mitigados em etapas posteriores (PRs #23, #25, #26, #29 e #31). Para o estado atual, consulte `PROJECT_CONTEXT.md`, `README.md` e `SECURITY_GAP_ANALYSIS.md`. O protótipo continua sem autenticação/autorização server-side e não está pronto para dados reais.

- Data da auditoria: 2026-11-04
- Branch-base: `main`
- Commit auditado: `5c64e0c3349c35a5b2dab4d1ee93a0e09d033998`
- Escopo: árvore completa do repositório, documentação, configuração, aplicação Vue, rotas, persistência local, testes, workflows e resultados recentes de CI/deploy.
- Natureza: auditoria estática e inspeção de configuração/código. Não equivale a pentest, revisão jurídica ou validação manual completa de UX.

## 1. Resumo executivo

O repositório contém uma SPA demonstrativa em Vue 3. Há uma landing page, cadastro/login local, perfil, questionário, resultados indicativos, descoberta de perfis locais, lista de salvos, testes de dons e personalidade e uma página informativa sobre oração.

**Não existe ainda uma comunidade online funcional.** Não há API, backend, banco remoto, autenticação server-side, sincronização entre dispositivos, armazenamento remoto de imagens, chat, comunidades compartilhadas, eventos operacionais, painel administrativo ou fila de moderação.

A direção de produto mais recente está clara e deve ser preservada: **Comunidade primeiro. Conexões depois. Relacionamentos como consequência.** Documentos antigos ainda descrevem um produto primariamente voltado a solteiros e namoro; esses trechos são aspiracionais/legados e não devem orientar implementação sem nova aprovação.

A base visual é coerente e responsiva por CSS, mas a acessibilidade não foi auditada formalmente. O projeto tem cinco testes unitários focados em utilitários de armazenamento seguro; não há testes de componentes, integração, E2E, acessibilidade ou segurança.

**Não está apto a receber usuários reais ou dados pessoais.** O cadastro grava senhas em texto puro no navegador; o guard de rotas é contornável; denúncias e bloqueios não são comunicados a uma equipe.

## 2. Inventário técnico confirmado

### Stack executável

- Vue 3, Vue Router 4, Vue CLI 5 e `vue-cli-service`.
- JavaScript com componentes Vue SFC; não há TypeScript configurado.
- CSS próprio em `src/assets/global.css` e estilos locais/scoped.
- Babel e ESLint.
- Navegação com `createWebHashHistory`.
- Node 20 nos workflows de CI e deploy.
- `npm test` executa Node.js Test Runner.
- Pinia e Tailwind aparecem no manifesto, mas não foi identificado uso efetivo no fluxo atual.
- Vite, React, Next.js, NestJS, Fastify, Express e banco de dados não estão implementados.

### Arquivos e estrutura

A árvore auditada contém 119 entradas, incluindo:
- 12 views Vue em `src/views`.
- 2 componentes compartilhados em `src/components`.
- 1 router em `src/router`.
- 1 helper de armazenamento em `src/utils`.
- 1 arquivo de dados do teste de dons em `src/data`.
- 1 arquivo global de estilos e 1 stylesheet do teste de dons.
- 1 arquivo de testes com 5 casos.
- 41 arquivos de documentação/configuração/infraestrutura e demais recursos, conforme a árvore do commit auditado.

### Rotas existentes

`/`, `/login`, `/cadastro`, `/questionario`, `/testedons`, `/testepersonalidade`, `/resultados`, `/dashboard`, `/perfil`, `/descoberta`, `/salvos` e `/oracoes`.

O router mantém uma lista local de rotas privadas. A checagem depende de `localStorage.currentUser`; isso serve apenas para fluxo demonstrativo.

## 3. Classificação funcional

| Área | Estado real | Evidência/limite |
|---|---|---|
| Landing page | Implementada no protótipo | Conteúdo estático e navegação local |
| Navegação e rodapé | Implementados parcialmente | Componentes compartilhados; sessão lida do navegador |
| Cadastro | Demonstrativo; correção de segurança obrigatória | Cria usuário no localStorage e armazena senha em texto puro |
| Login/logout | Demonstrativos; correção de segurança obrigatória | Comparação local de senha e remoção da sessão local |
| Guard de rotas | Demonstrativo | Pode ser contornado alterando localStorage/DevTools |
| Perfil | Parcial/demonstrativo | Formulário e persistência local; poucos campos; sem privacidade granular |
| Questionário | Parcial/demonstrativo | 10 perguntas, respostas locais; sem salvamento progressivo por servidor |
| Resultados/compatibilidade | Demonstrativos | Soma heurística entre contas no mesmo navegador; não é algoritmo validado |
| Descoberta | Demonstrativa | Perfis de contas locais; sem pesquisa remota, filtros ou paginação |
| Interesse/passagem | Demonstrativos | Registro local; sem notificação ou conexão real |
| Salvar perfil | Implementado localmente | localStorage por usuário/navegador |
| Bloqueio | Parcial/demonstrativo | Efeito apenas local, sem impedir acesso em servidor |
| Denúncia | Parcial/demonstrativa | prompt e registro local; sem moderação ou revisão humana |
| Pedidos de oração | Página informativa, não funcional | Declara explicitamente que envio/compartilhamento não está disponível |
| Teste de dons | Implementado como experiência local | Questionário, biblioteca e persistência local de progresso/resultados |
| Teste de personalidade | Parcial/demonstrativo | Calcula resultado em memória; não persiste nem possui validação psicométrica |
| Comunidades | Não implementadas | Sem entidades, API, membros, publicações ou moderação |
| Publicações/comentários | Não implementados | Sem backend ou feed |
| Devocionais/planos bíblicos | Não implementados | Conteúdo não estruturado como funcionalidade |
| Eventos/inscrições | Não implementados | Sem calendário, capacidade ou organizadores |
| Mensagens/notificações | Não implementadas | Sem chat, transporte ou entrega |
| Administração | Não implementada | Sem RBAC, console ou trilha de auditoria |
| Exportação/exclusão de conta | Não implementadas | Sem fluxo de direitos do titular |
| Upload de imagens | Não implementado | Sem storage nem validação de arquivo |

## 4. Achados técnicos e riscos

### Críticos para lançamento

1. **Senha em texto puro:** `CadastroPage.vue` grava `senha` no array `users` e copia o objeto para `currentUser`. O conteúdo fica acessível ao próprio navegador e a qualquer script com acesso à origem. Não usar dados reais.
2. **Autorização inexistente:** o guard de `src/router/index.js` confia em um objeto local. Não protege recursos e pode ser falsificado.
3. **Ausência de backend e persistência compartilhada:** usuários só se veem quando os dados estão no mesmo navegador/perfil local.
4. **Denúncias/bloqueios sem operação:** não há recepção, triagem, SLA, ação administrativa ou trilha central.
5. **Privacidade/LGPD não implementada:** dados religiosos e outras informações de perfil podem revelar dados sensíveis. Não há gestão efetiva de consentimento, finalidade, retenção, acesso, exportação ou eliminação.

### Altos

- Vulnerabilidades de dependências registradas por `npm audit`: 54 no relatório completo (3 críticas, 30 altas, 19 moderadas, 2 baixas). Auditoria de produção com `--omit=dev` reportou 5 registros de pacote em alta severidade; os achados incluem Vue/server-renderer, PostCSS, nanoid e source-map-js. Os pacotes e versões precisam ser tratados por PR isolada, sem `npm audit fix --force`.
- Toolchain Vue CLI 5/webpack e dependências antigas; atualização precisa respeitar compatibilidade.
- Não existe política de segurança executável no servidor, rate limiting, proteção anti-bot ou gestão de sessões.
- Sem backup, restore, observabilidade operacional, alertas ou resposta a incidentes.

### Médios/estruturais

- Vue CLI é a ferramenta real; Vite não está configurado. Não confundir o projeto com template Vite.
- Pinia e Tailwind estão no manifesto sem uso identificado.
- Teste de personalidade usa pontuação simples, não validada; não deve ser apresentado como avaliação psicológica.
- Questionário de compatibilidade reduz dimensões complexas a 10 respostas de 1 a 3; o score 0–30 não tem validação nem explicação suficientemente robusta.
- A página de oração contém um aviso correto de indisponibilidade e privacidade.
- `PrayerRequestsPage.vue` usa wrapper `div` e está corrigido após PR #14; não foi identificado nested main nessa versão.
- Duas rotas de publicação existem: GitHub Pages e Vercel. O repositório não confirma qual URL é a produção oficial.
- O workflow de deploy do GitHub Pages pede `contents: write`; é necessário revisar o menor privilégio possível no contexto do action.

## 5. Documentação e divergências

A documentação é extensa e cobre produto, arquitetura, banco, segurança, moderação, UX, jurídico, APIs, testes e operação. Entretanto, vários arquivos são esqueletos com objetivo/TODO e não especificações operacionais.

Divergências principais:
- Direção atual ampla/comunitária versus documentos legados de solteiros/namoro como foco principal.
- Vue 3 atual versus Next.js como hipótese antiga.
- MVP em 8 semanas versus 6 meses.
- Português apenas versus PT/EN/ES.
- Mensagens fora do MVP versus mensagens descritas em jornadas e requisitos antigos.
- Diagramas de microsserviços, Redis, réplicas, WAF e múltiplos fornecedores aparecem como propostas, mas não existem no código e são complexidade prematura para o estágio atual.
- ADRs 0003–0005 permanecem pendentes; ADR-0002 está como proposta. Nenhum provedor ou stack de produção foi aprovado.

## 6. Validação executada e evidências

No commit `5c64e0c3349c35a5b2dab4d1ee93a0e09d033998`, workflow GitHub Actions `41815731367` terminou com sucesso:
- Lint: success.
- Unit tests: success.
- Production build: success.

O deploy GitHub Pages `41815731422` também terminou com sucesso após a integração da PR #14. Isso confirma o pipeline e publicação estática, não um ambiente backend de produção.

A suíte atual tem cinco testes para `parseStoredJson` e `isValidDonsProgress`. Não há cobertura dos fluxos de negócio da aplicação.

A análise de dependências executada em branch temporária usou `npm ci --ignore-scripts --no-audit`, depois `npm audit --json`. A branch de auditoria não alterou a `main`; o workflow temporário foi removido.

## 7. Limitações desta auditoria

Não foram executados:
- Teste manual completo no navegador em desktop/mobile.
- Teste com leitores de tela.
- Auditoria WCAG/contraste.
- Pentest, DAST, SAST ou revisão de infraestrutura de produção.
- Revisão jurídica da LGPD, termos ou política de privacidade.
- Teste de carga.
- Verificação de dados de usuários reais (não há backend conectado).
- Confirmação de qual domínio é oficialmente produção.

## 8. Conclusão

O estado correto é **protótipo frontend demonstrativo com documentação estratégica em evolução**. Não é MVP operacional nem produto pronto para beta com dados reais.

A ordem recomendada é: aprovar posicionamento e escopo comunitário do MVP; decidir stack/provedores; desenhar modelo mínimo de dados e privacidade; construir autenticação e backend seguros; implementar uma jornada comunitária vertical completa; depois expandir descoberta, oração, eventos e comunicação conforme validação e capacidade de moderação.
