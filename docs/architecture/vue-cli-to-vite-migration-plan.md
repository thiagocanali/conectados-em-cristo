# Plano de migração — Vue CLI 5 para Vite

- Data da análise: 2026-11-06
- Branch-base: `main`
- Escopo original: preparação técnica e critérios para a migração Vue CLI → Vite.
- Estado atual: migração executada e integrada em `main` em 2026-11-06. O conteúdo abaixo registra o plano e os critérios históricos; a configuração real é `vite.config.mjs`, `index.html`, `package.json` e os workflows ativos.

## Resultado da migração

- Vue 3 e Vue Router foram preservados; o build agora usa Vite e mantém as 12 rotas com hash routing.
- O alias `@` aponta para `src`; a base do GitHub Pages é `/conectados-em-cristo/` e a base Vercel é `/`.
- A falha remota do primeiro merge foi causada por `safeStorage` em CommonJS importado como default ESM. A correção converteu o utilitário e seus testes para ESM e foi validada localmente.
- Cadastro/login local foram desabilitados em correção posterior; isso não faz parte da migração Vite.
- A execução atual do CI/deploy após a correção ainda depende de novo push.

## 1. Objetivo e limites

Substituir a ferramenta de build/desenvolvimento Vue CLI 5 por Vite, preservando Vue 3, Vue Router 4, as 12 rotas atuais, o comportamento visual, o CSS próprio, o hash routing, a persistência local demonstrativa e os destinos de deploy existentes.

Esta etapa não deve:
- reescrever componentes ou migrar a aplicação para React/Next;
- introduzir TypeScript em massa;
- mudar o modelo de autenticação local ou alegar que ele se tornou seguro;
- adicionar backend, banco, autenticação real ou serviços externos;
- alterar o design, rotas, textos ou funcionalidades;
- remover dependências sem comprovar que são desnecessárias;
- executar `npm audit fix --force`.

## 2. Baseline confirmado na main

| Item | Evidência atual |
|---|---|
| Vue | `vue@3.5.24` resolvido no lockfile |
| Router | `vue-router@4.6.3` |
| Build | `@vue/cli-service@5.0.9`, Webpack 5.103.0 |
| Node CI/deploy | Node 20 nos workflows |
| Lockfile | npm lockfileVersion 3 |
| Linguagem | JavaScript + Vue SFC; sem TypeScript configurado |
| Entrada JS | `src/main.js` |
| HTML | `public/index.html`, atualmente com placeholder Vue CLI `<%= BASE_URL %>` |
| Alias | `@/*` → `src/*` em `jsconfig.json`; usado em imports do router e da página TesteDons |
| Router | Vue Router 4 com `createWebHashHistory()`; não alterar durante a migração |
| Estilos | CSS próprio; `src/assets/global.css` importa Google Fonts remotamente |
| Base de deploy | `vue.config.js`: raiz na Vercel e `/conectados-em-cristo/` fora da Vercel |
| Vercel | `vercel.json` executa `npm run build`, publica `dist` e faz rewrite para `index.html` |
| GitHub Pages | workflow compila e publica `dist/` em `gh-pages` |
| Testes | `node --test`, cinco casos em `tests/safeStorage.test.js` |
| Lint | `vue-cli-service lint`, configuração ESLint embutida em `package.json` |

### Dependências sem uso identificado

- Pinia 3.0.4 está em `dependencies`, mas não foram encontrados imports/uso na busca estática.
- Tailwind CSS 4.1.17 e `@tailwindcss/postcss` estão em `devDependencies`, sem uso/configuração identificada nos arquivos pesquisados.
- `gh-pages` e o script `npm run deploy` coexistem com o workflow de deploy via `peaceiris/actions-gh-pages`; confirmar se o script manual é usado antes de remover.
- Babel e os plugins Vue CLI fazem parte da toolchain atual; a migração precisa identificar o que deixa de ser necessário e o que ainda é exigido por lint/testes.

A ausência de correspondência na busca estática não prova que uma dependência possa ser removida. Remoções devem ser uma alteração separada, com análise de imports, build e testes.

## 3. Riscos e compatibilidade

1. **HTML de entrada:** Vite espera `index.html` na raiz do projeto. A migração deverá mover/adaptar o conteúdo de `public/index.html` para a raiz. O placeholder `<%= BASE_URL %>` é sintaxe Vue CLI; no Vite, usar a substituição suportada `%BASE_URL%` ou solução equivalente validada.
2. **Base path:** reproduzir os dois destinos: `/` na Vercel e `/conectados-em-cristo/` no GitHub Pages. Não presumir que um build único sirva para ambos sem testar os artefatos.
3. **Hash routing:** manter `createWebHashHistory()` e validar abertura direta, refresh, links internos e retorno de login com query `redirect` nos dois destinos.
4. **Alias:** configurar `@ -> src` no Vite e preservar a resolução do editor por `jsconfig.json`.
5. **CSS e fontes:** manter a ordem de carregamento e o import externo das fontes nesta etapa; observar warnings de CSS e disponibilidade externa sem redesenhar o sistema.
6. **SFC:** validar `<script setup>`, componentes Options API e Composition API, estilos scoped e imports CSS.
7. **Lint:** `vue-cli-service lint` deixa de existir com Vue CLI removido. Preservar as regras atuais e migrar o comando para ESLint CLI em mudança controlada; não atualizar ESLint major na mesma PR.
8. **Testes:** manter `node --test` e todos os cinco casos atuais sem exigir Vite para executá-los.
9. **Deploy:** atualizar workflow e configuração Vercel somente se necessário; preservar Node 20 durante esta etapa, salvo evidência de incompatibilidade e aprovação específica.
10. **Segurança de dependências:** a auditoria registrada em `AUDIT_REPORT.md` aponta vulnerabilidades relevantes na árvore de dependências. Não foi executado novo `npm audit` nesta análise. Registrar uma linha de base atual antes/depois da migração; tratar correções de segurança em PR própria sempre que possível.

## 4. Estratégia de implementação em PR isolada

### Etapa A — preparação

- Confirmar que a PR de arquitetura foi integrada à `main`.
- Criar branch exclusiva a partir da `main` atual.
- Guardar evidências dos comandos atuais: instalação limpa, lint, testes e build.
- Registrar versão de Node/npm usada localmente e no CI.
- Não alterar dependências de produto sem necessidade demonstrada.

### Etapa B — toolchain Vite

- Adicionar Vite e plugin oficial Vue em versões compatíveis com Node 20 e Vue 3, verificadas na data da implementação.
- Criar `vite.config.js` com plugin Vue, alias `@` e base condicional por ambiente.
- Criar `index.html` na raiz, preservando metadados, título, idioma, noscript, favicon e elemento `#app`.
- Ajustar scripts `dev`, `build` e `preview`.
- Preservar `npm test`.
- Migrar lint para ESLint CLI mantendo as regras e o parser compatível com os SFCs; manter ESLint major atual nesta PR.
- Remover Vue CLI, Babel e plugins apenas depois de confirmar que nenhum script/configuração remanescente depende deles.
- Atualizar lockfile com instalação npm limpa, sem forçar resolução destrutiva.

### Etapa C — validação

Executar localmente e no CI:

```sh
npm ci
npm run lint
npm test
npm run build
```

Executar também:
- iniciar servidor Vite e abrir todas as 12 rotas;
- verificar console do navegador sem erros novos;
- validar cadastro/login demonstrativos, logout, redirect, questionário, resultados, perfil, salvos, teste de dons, personalidade e página de oração;
- validar refresh e links com hash;
- testar build com base Vercel `/`;
- testar build com base GitHub Pages `/conectados-em-cristo/`;
- confirmar que assets, favicon, fontes e CSS carregam;
- comparar visualmente as páginas-chave com o baseline anterior.

### Etapa D — deploy controlado

- Confirmar qual destino é produção oficial antes de publicar.
- Validar preview Vercel e artefato GitHub Pages sem substituir produção inadvertidamente.
- Não publicar manualmente em `gh-pages` fora do workflow.
- Só integrar após checks obrigatórios e revisão do diff de lockfile.

## 5. Critérios de aceite

A migração só poderá ser considerada concluída quando:

- `npm ci`, lint, os cinco testes existentes e build passarem;
- não houver dependência de `vue-cli-service` nos scripts/workflows ativos;
- todas as 12 rotas forem preservadas e navegáveis;
- hash routing e query de redirecionamento continuarem funcionando;
- alias `@` resolver em build e editor;
- Vercel e GitHub Pages gerarem assets com bases corretas;
- não houver regressão visual/funcional identificada nas jornadas verificadas;
- lockfile estiver atualizado e reproduzível;
- vulnerabilidades novas não forem introduzidas; findings antigos forem reportados, não ocultados;
- documentação e workflows refletirem a toolchain real.

## 6. Plano de rollback

Se houver falha:
- não mesclar a PR;
- corrigir na mesma branch se o escopo continuar isolado;
- se a compatibilidade exigir mudança ampla, fechar a PR e replanejar;
- manter `main` e o deploy atual intactos;
- não alterar o branch `gh-pages` manualmente para mascarar falha de build.

## 7. Pendências fora desta migração

- Revisão de vulnerabilidades e atualização segura de dependências.
- Confirmar destino oficial de produção e política de deploy.
- Decidir se Pinia, Tailwind e script manual `deploy` devem permanecer ou ser removidos.
- Introduzir TypeScript gradualmente, em PRs futuras.
- Ampliar testes de componentes, integração, acessibilidade e E2E.
- Implementar backend, autenticação e autorização somente após aprovações arquiteturais, de privacidade e operação.

**Conclusão:** a migração é tecnicamente viável sem reescrita de aplicação, mas requer cuidado com HTML de entrada, base path, alias, lint e os dois destinos de deploy. Esta documentação não executa nem autoriza a migração.
