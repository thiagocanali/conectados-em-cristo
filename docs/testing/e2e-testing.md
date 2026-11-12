# Testes ponta a ponta da jornada pública

## Execução

A suíte usa `@playwright/test` fixado no lockfile e testa o build de produção. Requer Node 22/24/26 suportado pelo projeto e Chromium do Playwright:

```bash
npm ci
npx playwright install --with-deps chromium
npm run test:e2e
E2E_BASE_PATH=/conectados-em-cristo/ npm run test:e2e
```

O primeiro comando testa a configuração Vercel na raiz. O segundo testa GitHub Pages na subpasta. Cada execução cobre Chromium desktop (1440 × 900) e móvel (390 × 844). O runner controla `VERCEL` somente no subprocesso de build/prévia, sem flags que escondam erros na configuração real do projeto. Ele ocupa a porta local 4173 com `strictPort` e não reutiliza servidores antigos.

Em um ambiente que já tem Chromium instalado, pode-se selecionar explicitamente o binário, sem mudar o padrão do CI:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

## Jornadas automatizadas

1. Home → passagem bíblica referenciada → perguntas → prática → preparar encontro.
2. Seleção de estudo/duração, recarga, link público e alternativa manual quando a cópia é negada.
3. Caminhada de quatro encontros, kit baixado, conteúdo dos arquivos, próximos roteiros e conservação da duração.
4. Condução por etapas, foco de teclado e impressão do roteiro completo durante a condução.
5. Filtro de estudos, referência inexistente e recuperação de links inválidos.
6. Atalho para o conteúdo e navegação responsiva para estudos.

Cada cenário usa contexto novo e sem sessão. A fixture identifica erros não capturados da página, chamadas de escrita em localStorage/sessionStorage e overflow horizontal ao final. Downloads são realmente produzidos pelo app e lidos no teste. A impressão verifica a apresentação CSS, não o diálogo nativo de uma impressora.

A aplicação só pode carregar recursos da origem local durante os testes; fontes externas são bloqueadas para evitar dependência de rede. Os links bíblicos são inspecionados sem navegar a serviços de terceiros. Nenhum participante, relato, conta ou banco real é usado.

## CI e diagnóstico

O workflow `Validate application` inclui dois jobs `Public browser journeys`: Vercel e GitHub Pages. Cada job instala Chromium e roda os dois perfis, totalizando 24 execuções de cenário por workflow. Lint, unitários/API/PostgreSQL, build e auditoria continuam presentes.

Relatório HTML, screenshot e trace de falha ficam em `playwright-report/` e `test-results/`, ignorados pelo Git e pelo lint. Os artefatos do CI são retidos por sete dias. Para abrir um relatório local:

```bash
npx playwright show-report
```

A suíte usa assertions e eventos do navegador, sem esperas fixas. Em CI há uma repetição para diagnóstico; falhas e flakiness devem ser examinadas pelo relatório, sem simplesmente aumentar timeouts.

## Limites

É cobertura do núcleo público. Não valida autenticação remota, moderação, dados privados, banco de produção, editoria pastoral, disponibilidade de serviços externos ou acessibilidade completa. Os perfis móveis usam Chromium emulado; não equivalem a testes físicos ou a Safari/WebKit. Recursos legados e futuras comunidades online exigem suas próprias jornadas quando entrarem no escopo.

Ver [ADR-0009](../decisions/0009-public-journey-browser-tests.md).
