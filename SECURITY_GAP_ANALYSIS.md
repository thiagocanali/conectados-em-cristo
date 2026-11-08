# Análise de Lacunas de Segurança — Conectados em Cristo

- Data: 2026-11-07
- Atualização: credenciais demonstrativas saneadas nas PRs #25 e #26; auditoria de dependências atualizada pela PR #29
- Baseline: `5c64e0c3349c35a5b2dab4d1ee93a0e09d033998`
- Escopo: inspeção estática do código, configuração, lockfile, documentação e execução de `npm audit`.
- Não é pentest nem atestado de conformidade.

## 1. Conclusão

**O protótipo não deve receber dados pessoais reais, senhas reutilizadas ou conteúdo privado.** A interface foi alterada para não solicitar nem persistir senhas e o serviço remove credenciais em texto puro de registros locais legados quando os usuários são lidos. A sessão continua simulável no navegador; não há servidor para impor autorização; denúncias e bloqueios não são operacionais.

## 2. Riscos prioritários

| Risco | Severidade | Evidência | Requisito antes do beta |
|---|---|---|---|
| Credenciais locais legadas | Mitigada parcialmente no protótipo | `demoAuth.mjs` remove campos `senha`, `password` e `passwordHash` ao ler perfis; cadastro não pede senha | Confirmar limpeza em todos os fluxos e substituir por autenticação server-side antes do beta |
| Autorização client-side | Crítica | `router.beforeEach` confia em `localStorage.currentUser` | Autorização no backend por recurso, usuário e papel |
| Dados apenas locais | Alta | Perfil, interações e respostas em localStorage | Banco remoto, escopo por usuário e integridade |
| Denúncia sem operador | Alta | `DescobertaPage.vue` registra localmente | Fila persistente, acesso restrito, SLA, moderação e auditoria |
| Bloqueio local | Alta | Filtragem apenas no navegador | Bloqueio server-side aplicado a descoberta/conteúdo/interação |
| Dados religiosos sem governança | Alta | Perfil/questionário capturam fé, denominação, leitura bíblica, oração | Minimização, finalidade/base legal, controles de acesso, retenção e transparência |
| Vulnerabilidades de dependências | Mitigada no lockfile atual | Auditoria CI de 2026-11-07: 0 vulnerabilidades completas e 0 no recorte de produção após atualização de 46 pacotes transitivos | Manter auditoria recorrente e atualizar quando novos advisories surgirem |
| Upload sem proteção | Alta futura | Não existe upload hoje | Validação real, tamanho, MIME, scan, storage privado e moderação |
| Ausência de backup/restore | Alta futura | Sem banco/backup operacional | Backup criptografado e restauração testada |
| Sem observabilidade/resposta a incidente | Alta | Docs são apenas rascunhos | Alertas, logs minimizados, responsáveis e runbooks |

## 3. Auditoria de dependências

No lockfile do commit auditado:
- Relatório completo: **54 vulnerabilidades** — 3 críticas, 30 altas, 19 moderadas e 2 baixas.
- `npm audit --omit=dev`: **5 registros de pacote em alta severidade**, nenhum crítico reportado nesse recorte.
- Pacotes de produção identificados: `vue@3.5.24`, `@vue/server-renderer@3.5.24`, `postcss@8.5.6`, `source-map-js@1.2.1` e `nanoid@3.3.11`.
- O relatório marcou correção disponível para os cinco registros. A ocorrência de Vue/server-renderer está relacionada à renderização SSR; o projeto atual é SPA client-side, mas a dependência deve ser corrigida.
- O relatório completo também apontou dependências transitivas críticas, incluindo `proxy-addr`, `shell-quote` e `websocket-driver`.

Os números são um snapshot de 2026-11-04 e podem mudar com advisories novos. Não executar `npm audit fix --force`. Avaliar caminhos de dependência, faixa corrigida, breaking changes e ambiente afetado. A auditoria de dependências não prova exploração do site.

### Snapshot atual — 2026-11-07

- Antes da correção, CI reportou **17 vulnerabilidades**: 13 altas, 3 moderadas, 1 baixa e nenhuma crítica.
- No recorte de produção (`npm audit --omit=dev`), havia **5 altas** e nenhuma crítica: `@vue/server-renderer`, `nanoid`, `postcss`, `source-map-js` e a dependência `vue` associada.
- O caminho seguro foi executado em runner isolado com `npm audit fix`, sem `--force`.
- Foram atualizados 46 pacotes no `package-lock.json`; `package.json` permaneceu inalterado.
- Auditoria completa após a atualização: **0 vulnerabilidades**. Auditoria de produção: **0 vulnerabilidades**.
- O CI da PR #40 validou lint, 27 testes unitários/contrato, seis testes da API local e builds frontend/backend. O CI da PR atual adiciona testes de catálogo com PostgreSQL efêmero; seus resultados serão registrados após execução. O preview Vercel pode estar sujeito a rate limit de builds e não é evidência substituta do CI.
- O workflow `.github/workflows/ci.yml` mantém auditoria completa e de produção em cada PR, com artefatos temporários por 14 dias.

O resultado é um retrato do lockfile em 2026-11-07, não uma garantia permanente. A auditoria deve continuar sendo executada e novas correções devem permanecer isoladas e sem `--force` quando possível.

## 4. Modelo de ameaça inicial

Ativos:
- Credenciais e sessão.
- Identidade, e-mail e dados de perfil.
- Dados religiosos, preferências e objetivos.
- Conteúdo de comunidades e pedidos de oração.
- Fotos, denúncias, evidências e decisões de moderação.
- Dados administrativos e trilha de auditoria.

Atores/ameaças:
- Atacante externo tentando tomar contas, enumerar usuários ou explorar dependências.
- Usuário abusivo publicando spam, assédio, golpes ou conteúdo impróprio.
- Fraudador/catfish tentando obter dinheiro ou dados privados.
- Membro tentando acessar comunidade/recurso sem permissão.
- Moderador/administrador com privilégio excessivo ou conta comprometida.
- Exposição acidental por logs, backups, storage público ou permissões mal configuradas.

## 5. Controles obrigatórios de arquitetura

### Identidade e sessão
- Provedor de autenticação ou backend revisado.
- Hash forte gerenciado pelo provedor; sem senha em localStorage/sessionStorage.
- Verificação de e-mail, recuperação segura, revogação de sessões e MFA opcional.
- Cookies HttpOnly/Secure/SameSite quando aplicável e defesa CSRF.
- Rate limit, proteção contra enumeração e abuso.

### Autorização
- Negação por padrão.
- Separar administrador global de moderador com escopo limitado às comunidades atribuídas; membros só executam ações nos espaços em que têm vínculo válido.
- Catálogo público não implica publicações públicas: exigir autenticação e autorização para conteúdo e interações.
- Checagem server-side em cada recurso.
- RBAC para funções administrativas e checagem de vínculo para comunidades.
- Testes negativos: alterar IDs, acessar conteúdo privado, usar sessão revogada.
- RLS como defesa adicional se o banco/provedor suportar; nunca confiar apenas no frontend.

### Dados e privacidade
- Inventário de dados, finalidade, base legal, categoria, acesso e retenção.
- Dados religiosos tratados com proteção adequada como potencial dado sensível pela LGPD.
- Localização aproximada; endereço/telefone/e-mail privados por padrão.
- Exportação, correção, exclusão e processo de atendimento.
- Logs sem credenciais, tokens, conteúdo privado ou PII desnecessária.

### Conteúdo e moderação
- Validação server-side, limites de frequência e tamanho.
- Denúncias persistentes em fila central, com acesso restrito e trilha de auditoria.
- Bloqueio aplicado em todos os endpoints relevantes, não apenas por ocultação no cliente.
- Comunidades privadas exigem aprovação; comunidades públicas podem ser descobertas e permitir entrada conforme suas regras.
- Revisão humana para sanções graves e processo de apelação.
- Upload seguro com inspeção, limites, storage privado e URLs assinadas.

### Operação
- Segredos fora do Git.
- Ambientes separados.
- Backups criptografados e restore testado.
- Logs, métricas, alertas e runbooks.
- Plano de incidente, comunicação e análise pós-incidente.

## 6. LGPD e privacidade

A plataforma pode tratar dados pessoais e dados pessoais sensíveis, incluindo informações sobre convicção religiosa. Antes de lançamento:
- Definir controlador, operadores, finalidades e bases legais com assessoria jurídica.
- Avaliar necessidade de consentimento específico e destacado quando aplicável.
- Elaborar aviso de privacidade, termos, política de retenção e fluxo de direitos.
- Documentar compartilhamentos, subprocessadores, transferência internacional e resposta a incidentes.
- Minimizar perguntas e separar dados de conta de dados de perfil.
- Não afirmar conformidade apenas por existir uma checkbox.

Este documento é análise técnica inicial, não parecer jurídico.

## 7. Critérios de segurança para beta/produção

- [x] O fluxo atual de protótipo não solicita nem grava novas senhas; o serviço remove campos legados quando lê perfis.
- [ ] Verificar/limpar todos os dados legados em navegadores já utilizados; a limpeza acontece apenas quando o perfil é lido.
- [ ] Nenhuma senha em storage do browser em qualquer fluxo ou ambiente real.
- [ ] Autenticação, sessão e recuperação testadas.
- [ ] Autorização server-side e isolamento entre usuários testados.
- [ ] Rate limiting e proteção anti-abuso.
- [ ] Denúncia persistente, fila, SLA, ação e apelação.
- [ ] Bloqueio efetivo no servidor.
- [ ] Papéis administrativos e audit log.
- [ ] Upload seguro, se habilitado.
- [ ] Direitos LGPD e políticas revisados.
- [ ] Backups e restauração testados.
- [ ] Observabilidade e resposta a incidentes.
- [ ] Nenhuma vulnerabilidade crítica/alta sem mitigação aprovada e documentada.
- [ ] Revisão manual de segurança e testes de acessibilidade.

## 8. Ações imediatas recomendadas

1. Não coletar dados reais no protótipo.
2. Manter o acesso local explicitamente identificado como demonstrativo; nunca tratá-lo como autenticação ou autorização.
3. Concluir a revisão dos consumidores de sessão e testar fluxos completos.
4. Corrigir dependências em PR isolada e reexecutar auditorias completa/produção.
5. Aprovar arquitetura de identidade e backend.
6. Desenhar threat model e classificação de dados antes de schema.
7. Implementar o primeiro fluxo real com testes de autorização.
