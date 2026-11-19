## Objetivo e escopo
<!-- Resuma o lote de 5–10 tarefas relacionadas. Indique PR existente da mesma frente ou justifique nova PR. -->

## Mudanças e validação
- [ ] Escopo limitado a uma frente de desenvolvimento
- [ ] Lint, testes relevantes, typecheck e build executados ou bloqueios documentados
- [ ] CI revisada; falhas investigadas e corrigidas
- [ ] Sem segredos, dados sensíveis ou alterações de produção acidentais

## Avaliação de risco
- [ ] Não altera autenticação, autorização, banco, RLS, permissões ou produção
- [ ] **Se altera alguma dessas áreas:** descrevi testes negativos, rollback, ambiente isolado e revisão adicional necessária
- [ ] Migrações foram verificadas em ambiente descartável antes de aplicação remota, quando aplicável
- [ ] Não depende de bypass de proteções, revisões ou checks obrigatórios

## Deploy
- [ ] Não requer preview hospedado, ou justifiquei por que ele é necessário
- [ ] Nenhuma alteração de ambiente de produção sem validação específica

## Critérios para merge
- [ ] PR não está em draft, sem conflitos, com checks obrigatórios aprovados
- [ ] Revisões exigidas concluídas
- [ ] Squash/auto-merge apenas quando permitido pelas configurações e autorizado
