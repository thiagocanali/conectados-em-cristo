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

### Infraestrutura e próximos passos

1. **Identidade e persistência remotas:** nenhum projeto Supabase retornado pela conexão foi identificado como pertencente a esta aplicação. Nenhum projeto foi vinculado, provisionado ou alterado. Antes de dados reais, definir ambiente e provedor e implementar conta interna + adapter de identidade verificada + persistência dos fatos de autorização.
2. **Autorização integrada:** políticas e carregadores puros existem, mas não protegem rotas de domínio nem estão ligados a repositórios persistentes. Manter operações privadas/escritas indisponíveis até integrar e testar IDOR, revogação e escopo.
3. **Deploy:** produção Vercel READY no commit-base, mas divergência entre aliases e respostas HTTP; ver `docs/operations/deployment.md`. Fastify ainda não é servido pelo build estático. Definir a hospedagem da API e verificar contrato HTTP antes de conectá-la à interface.
4. **Demais jornadas locais:** descoberta, salvos e outros testes ainda têm gravações diretas no storage e precisam de tratamento equivalente de falha, validação de dados e cobertura de componentes. A correção desta revisão cobre cadastro, perfil e questionário.
5. **Operação do produto:** retenção/exclusão, moderação, backups/restore e revisão de privacidade continuam pré-requisitos para um beta com pessoas reais.

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
