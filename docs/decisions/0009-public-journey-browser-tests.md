# ADR-0009: Testes de navegador para a jornada pública

## Status e data
Aceito como escolha técnica de manutenção em 2026-11-12.

## Contexto
Estudos, encontros e caminhada tinham testes unitários e verificações pontuais com Chromium, mas nenhuma proteção E2E no CI. Uma alteração poderia quebrar navegação, arquivos ou impressão sem falhar nos checks existentes. A aplicação também usa bases diferentes na Vercel e no GitHub Pages.

## Decisão
- Usar `@playwright/test` com versão exata e lockfile, inicialmente em Chromium desktop e móvel.
- Rodar seis jornadas sobre `npm run build` + `npm run preview`, não sobre o servidor de desenvolvimento.
- Executar duas configurações: `VERCEL=1` para a raiz e `VERCEL` vazio para a subpasta GitHub Pages. A suíte seleciona a base esperada por `E2E_BASE_PATH`; o build/prévia usam a configuração real do projeto.
- Isolar cada cenário num contexto novo, sem identidade, credenciais ou banco. Bloquear requisições a origens externas para não depender de fontes ou serviços bíblicos no CI; as referências externas são verificadas como links.
- Verificar erros não capturados da página, chamadas de escrita no armazenamento e overflow ao final de cada cenário. A instrumentação registra método/chave, sem valores.
- Manter HTML, traces e screenshots de falha por sete dias nos artefatos do CI. A execução tem um worker e uma repetição em CI para diagnóstico; não usar sleeps como sincronização de UI.

## Consequências
- Dois jobs adicionais de navegador verificam o núcleo público em pull requests e na main.
- Não substitui testes de autorização, validação editorial, auditoria completa de acessibilidade, testes em aparelhos físicos ou validação de provedores externos.
- O Chromium do CI é instalado pela versão fixada do Playwright. Um binário local pode ser indicado explicitamente para ambientes gerenciados; isso não altera o padrão do CI.
- A primeira execução em subpasta revelou um problema real de prévia local: `command === 'serve'` tratava também a prévia como dev na raiz. A configuração agora considera `isPreview`, preservando a base do build no comando de prévia.

## Referência
[Execução e escopo E2E](../testing/e2e-testing.md).
