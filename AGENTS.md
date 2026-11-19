# AGENTS.md — Desenvolvimento autônomo com proteção

Aplica-se a agentes de desenvolvimento e ao Codex neste repositório.

## Execução e agrupamento
- Trabalhe em lotes de 5 a 10 tarefas relacionadas, quando houver tarefas executáveis suficientes. Corrija bugs, testes e documentação do mesmo tema no mesmo lote.
- Antes de abrir PR, liste as PRs abertas e procure uma PR da **mesma frente**. Atualize a branch existente quando compatível, em vez de criar outra PR.
- Mantenha no máximo uma PR ativa por frente, salvo dependências incompatíveis ou isolamento técnico documentado.
- Faça commits pequenos e descritivos, mas não crie uma PR por commit ou tarefa. Continue tarefas independentes quando outra estiver bloqueada.
- Não force push em branches compartilhadas sem verificar impactos e autorização.

## Qualidade e segurança
- Execute lint, testes, typecheck e build aplicáveis antes de declarar uma tarefa concluída. Acompanhe os checks da PR e corrija falhas.
- Nunca contorne branch protection, revisões, status checks, CODEOWNERS, secrets scanning ou políticas organizacionais.
- Nunca faça merge de PR draft, com CI falhando, revisões obrigatórias pendentes, conflito ou vulnerabilidade crítica não tratada.
- Prefira squash merge **apenas** quando autorizado, permitido pelas regras do repositório e com todos os gates atendidos. Auto-merge somente quando habilitado e autorizado; não configure bypass.
- Mudanças em autenticação, RLS, banco, credenciais, permissões, pagamentos ou produção exigem revisão adicional, testes negativos e validação em ambiente isolado antes do merge/deploy.
- Não execute migrações destrutivas ou mudanças de produção sem confirmar o ambiente, plano de rollback e aprovação exigida.
- Nunca imprima, registre ou commite tokens, URLs com senhas ou outras credenciais.

## CI e deploys
- Use GitHub Actions para lint, typecheck, testes e builds. Não use deploy da Vercel como substituto dos testes locais/CI.
- Agrupe alterações antes de push quando isso reduzir previews desnecessários; não prejudique a segurança nem a rastreabilidade dos commits.
- Reserve previews da Vercel para validação hospedada necessária. Investigue configurações de Git integration/ignored build step antes de modificá-las.
- Não altere produção, proteções da main, secrets, ambientes protegidos ou integração de deploy sem auditoria de consequências.
- Nunca desabilite checks para acelerar merge. Cancele apenas execuções de CI obsoletas da **mesma PR**, sem cancelar deploy em andamento.

## Relatório por lote
Informe tarefas realizadas, arquivos/commits, testes efetivamente executados, checks pendentes, riscos e bloqueios. Não confunda PR aberta com merge ou deploy concluído.
