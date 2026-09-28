# Plano do MVP — Conectados em Cristo

## Escopo do MVP

O MVP (Minimum Viable Product) focará nas funcionalidades essenciais para validar a hipótese central: usuários cristãos buscam relacionamentos profundos e significativos em uma plataforma focada em compatibilidade, segurança e fé.

## Features Incluídas no MVP

### Sprint 1: Fundação
- [ ] Setup inicial do projeto (backend, frontend, banco)
- [ ] Autenticação com email/senha
- [ ] Verificação de email
- [ ] Gestão de sessão
- [ ] Admin panel básico

### Sprint 2: Perfil e Onboarding
- [ ] Criação de perfil
- [ ] Upload de fotos
- [ ] Preenchimento de dados básicos
- [ ] Preenchimento de dados de fé
- [ ] Preview do perfil
- [ ] Edição de perfil

### Sprint 3: Questionário
- [ ] Questionário de compatibilidade
- [ ] Salvamento progressivo
- [ ] Resumo de respostas
- [ ] Atualização de respostas

### Sprint 4: Descoberta
- [ ] Lista de perfis
- [ ] Filtros básicos (idade, localização, fé)
- [ ] Visualização de perfil completo
- [ ] Ordenação por compatibilidade

### Sprint 5: Interações
- [ ] Demonstrar interesse
- [ ] Passar perfil
- [ ] Salvar perfil
- [ ] Bloquear perfil
- [ ] Denunciar perfil

### Sprint 6: Compatibilidade e Match
- [ ] Cálculo de compatibilidade
- [ ] Exibição de compatibilidade
- [ ] Notificação de mutual interest
- [ ] Histórico de interações

### Sprint 7: Moderação Básica
- [ ] Painel de denúncias
- [ ] Revisão de perfis denunciados
- [ ] Ação: avisar, suspender, banir
- [ ] Logs de moderação

### Sprint 8: Polish e QA
- [ ] Testes de segurança
- [ ] Testes de usabilidade
- [ ] Otimizações de performance
- [ ] Documentação final

## Features NÃO no MVP

- ❌ Mensagens entre usuários
- ❌ Notificações push
- ❌ Análise comportamental avançada
- ❌ Verificação de identidade avançada (foto + documento)
- ❌ Internacionalização (apenas PT)
- ❌ Moderação com IA
- ❌ Recomendações algoritmos
- ❌ Pagamentos/Freemium
- ❌ Social features (seguir, comentar)
- ❌ Stories ou feed
- ❌ Video chat
- ❌ Badges ou gamification

## User Stories Prioritárias

### Como novo usuário, quero...
- Registrar-me com email e senha (10 pontos)
- Verificar meu email (5 pontos)
- Criar meu perfil completo (13 pontos)
- Ver como meu perfil aparece para outros (5 pontos)
- Responder questionário de compatibilidade (13 pontos)
- Descobrir pessoas compatíveis (13 pontos)
- Demonstrar interesse em alguém (3 pontos)
- Ver quem demonstrou interesse em mim (5 pontos)
- Saber por que sou compatível com alguém (8 pontos)
- Bloquear ou denunciar perfil suspeito (5 pontos)

### Como usuário voltando, quero...
- Fazer login facilmente (3 pontos)
- Atualizar meu perfil (5 pontos)
- Ver meu histórico de interações (5 pontos)
- Receber notificação de novo interesse (8 pontos)
- Deletar minha conta (5 pontos)

### Como moderador/admin, quero...
- Ver todas as denúncias (5 pontos)
- Revisar perfil denunciado (5 pontos)
- Tomar ação: avisar, suspender, banir (8 pontos)
- Ver logs de moderação (5 pontos)
- Desativar contas fraudulentas (3 pontos)

## Critérios de Sucesso do MVP

### Funcional
- [ ] 100% das features core funcionam sem crashes
- [ ] Zero vulnerabilidades críticas de segurança
- [ ] Taxa de erro < 0.1%

### Experiência
- [ ] Onboarding completo em < 10 minutos
- [ ] Primeira descoberta em < 2 minutos após onboarding
- [ ] Interface responsiva em desktop e mobile
- [ ] Sem lentidão aparente em ações comuns

### Negócio
- [ ] 100+ beta testes
- [ ] NPS > 40
- [ ] Taxa de conclusão de onboarding > 70%
- [ ] Taxa de preenchimento de perfil > 80%

## Timeline Estimada

- Sprint 1-2: 2 semanas (fundação + perfil)
- Sprint 3-4: 2 semanas (questionário + descoberta)
- Sprint 5-6: 2 semanas (interações + compatibilidade)
- Sprint 7-8: 2 semanas (moderação + polish)

**Total: 8 semanas (2 meses)**

## Dependências Técnicas

- Backend: Node.js + Express/TypeScript
- Frontend: Vue.js 3 (avaliar migração Next.js)
- Banco: PostgreSQL
- Hosting: Vercel + AWS (avaliar)
- Email: Sendgrid/Resend
- Storage: S3/Vercel Blob
- Autenticação: JWT
- Moderação: Manual + Keywords

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|--------|-----------|
| Vulnerabilidade de segurança descoberta | Média | Alto | Teste de penetração early, security review |
| Performance suficiente não atingida | Baixa | Médio | Load testing desde early, otimizações |
| Usuários não entendem compatibilidade | Média | Médio | UX testing, design intuitivo |
| Taxa de abandono alta | Média | Alto | Analytics, feedback, iterações rápidas |
| Mudança de escopo | Alta | Alto | Planejamento claro, frozen scope |

## Próximos Passos

1. [ ] Aprovação do escopo MVP
2. [ ] Definição exata de tecnologias
3. [ ] Criação de design mockups
4. [ ] Setup do repositório backend
5. [ ] Início do desenvolvimento Sprint 1
