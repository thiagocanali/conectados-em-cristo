# Relatório de Auditoria — Conectados em Cristo

- Data da auditoria original: 2026-11-04
- Adendo de estado atual: 2026-11-07
- Baseline remoto deste adendo: `e4c2725b4cf055782647db1951822e330b6ed034`
- Escopo: árvore completa do repositório, documentação, configuração, aplicação Vue, rotas, persistência local, testes, workflows e resultados recentes de CI/deploy.
- Natureza: auditoria estática e inspeção de configuração/código; não equivale a pentest, revisão jurídica ou validação manual completa de UX.

## Adendo — Fase 0 em 2026-11-07

Este adendo atualiza o estado executável. As seções históricas abaixo registram a auditoria anterior e não substituem os fatos listados aqui.

### Estado observado

- 12 rotas Vue, dois componentes compartilhados e uma SPA Vue 3/Vue Router 4/Vite 6 com hash routing.
- 15 SFCs Vue, um utilitário de armazenamento, um arquivo de dados do teste de dons e sete testes unitários de utilitários.
- Não há API, servidor, banco de dados ou integrações de autenticação. Não há fluxo de publicação, comentários, comunidades, reação “Apoiar”, administração nem moderação operacional.
- Cadastro e login locais foram desabilitados no código. Um utilitário remove `senha` de `users` e `currentUser` no próximo carregamento após a publicação; até então, credenciais inseridas em versões anteriores podem continuar no navegador do usuário.
- Guardas de páginas de perfil redirecionam para login, sem confiar em `localStorage`; os testes recreativos de dons e personalidade continuam públicos.
- Pedidos de oração são informativos e dizem explicitamente que compartilhamento está indisponível.

### Classificação funcional

| Área | Classificação | Evidência e limite |
|---|---|---|
| Landing, navegação e rodapé | Parcial | Renderizam e navegam; ainda apontam para fluxos indisponíveis ou demonstrativos. |
| Cadastro, login, logout e sessão | Inseguro na versão anterior; agora desabilitado | Não existe provedor/API; senhas antigas são removidas apenas após receber a nova versão. |
| Perfil, questionário, salvos e descoberta | Demonstrativos/parciais | Persistência local, sem compartilhamento, autorização server-side ou fonte de dados confiável. |
| Resultados/compatibilidade | Demonstrativo e não validado | Heurística local apresentada como pontuação; não representa compatibilidade real. |
| Teste de dons | Parcialmente implementado | Perguntas, progresso e resultado locais; conteúdo não deve ser interpretado como diagnóstico ou declaração definitiva. |
| Teste de personalidade | Parcial/demonstrativo | Pontuação simples em memória, sem validação psicológica nem persistência. |
| Pedidos de oração | Não implementados como compartilhamento | A tela é informativa e corretamente bloqueia coleta sensível. |
| Comunidades, publicações, comentários e “Apoiar” | Não implementados | Sem domínio, API, persistência ou interfaces funcionais. |
| Bloqueio, denúncia e moderação | Demonstrativos/inseguros | Dados locais não bloqueiam no servidor nem chegam a uma fila de moderação. |
| Admin, RBAC, apelação e auditoria | Não implementados | Sem backend ou papéis/permissões reais. |
| Exclusão/exportação de conta e recuperação/verificação de e-mail | Não implementadas | Sem identidade e fluxos de direitos do titular. |

### Problemas por criticidade

1. **Bloqueador de beta:** não existe backend/autenticação; nenhum dado de usuário pode ser considerado persistente, privado ou compartilhado.
2. **Alto:** a versão anterior guardava senhas em texto puro no `localStorage`; o novo código desabilita o cadastro e limpa essas chaves no próximo carregamento, mas a limpeza só ocorre quando a nova publicação chega ao navegador.
3. **Alto:** descoberta, denúncia e bloqueio são locais e não oferecem proteção contra outro usuário; não lançar essas ações como controles reais.
4. **Alto:** `npm audit` após atualização compatível sem `--force` reportou 12 vulnerabilidades (8 altas, 3 moderadas, 1 baixa), majoritariamente em dependências transitivas da toolchain.
5. **Médio:** resultados ainda apresentam uma pontuação de “compatibilidade” local; o campo de perfil voltado a namoro foi substituído por interesses comunitários, mas resultados continuam sem fundamento para descoberta real.
6. **Médio:** não há testes de rotas/UI, integração, autorização negativa, E2E, acessibilidade, responsividade automatizada ou teste manual documentado.
7. **Médio:** CI não ignora artefatos `dist`; `npm run lint` foi limitado a `src` e `tests` para evitar análise do bundle gerado.
8. **Operacional:** GitHub Pages está configurado; o GitHub declara `conectadosemcristo-site.vercel.app` como homepage. Ambos respondem 200, mas o domínio sugerido na missão retorna 404 e o destino oficial ainda precisa de confirmação.

### Checks e status remoto

- Antes da correção, `npm run build` reproduziu o erro de exportação default de `safeStorage.js` em `ResultadosPage.vue`; os logs dos workflows `42315290474` e `42315290650` confirmaram a mesma falha.
- Correção local: `safeStorage` e os consumidores/testes agora usam ESM; o lint evita `dist`; cadastro/login não aceitam credenciais; dados locais legados têm limpeza de senha.
- Após atualizar o lockfile, `npm ci`, lint, todos os sete testes e build passaram localmente. `npm audit --omit=dev` reportou zero vulnerabilidades; a auditoria completa reportou 12 vulnerabilidades em dependências de desenvolvimento.
- Novo CI e deploy ainda dependem de push da branch de correção. A URL pública ainda não foi validada com o novo artefato.

### Próxima sequência

1. Completar instalação limpa, lint, testes, build e auditoria de dependências sobre o lockfile atualizado.
2. Abrir PR da estabilização; validar checks remotos e publicação sem merge automático.
3. Corrigir perfil/linguagem para prioridade comunitária e adicionar testes de rotas/jornadas existentes.
4. Fechar decisões de arquitetura e operação antes de iniciar API, auth ou banco; não provisionar fornecedores sem aprovação.
5. Implementar um fluxo vertical seguro de identidade → perfil → comunidade curada, com autorização server-side e testes de acesso negativo.

## Relatório histórico de 2026-11-04 (superado pelo adendo acima)

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
