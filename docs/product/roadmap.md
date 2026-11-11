# Roadmap — Conectados em Cristo

> **Prioridade reforçada em 2026-11-11:** Jesus Cristo no centro; aprendizado bíblico, vida comunitária e serviço, com utilidade concreta para igrejas e pequenos grupos. Testes de dons/personalidade e compatibilidade não são a porta de entrada nem o núcleo. A primeira jornada pública já oferece quatro estudos dos Evangelhos e roteiros de encontro para download/impressão. Participação remota e controles de segurança continuam dependências reais.
> **Sem cronograma aprovado.** Este roadmap organiza dependências e evidências, não promete datas.

## Prioridade de execução

1. Entrega pública de estudos e roteiros: implementada, com jornada anônima, preparação/contexto, condução por etapas, compartilhamento de estudo/duração e exportação/impressão verificadas. A caminhada de quatro encontros acrescenta continuidade e kit completo, sem cadastro ou acompanhamento de participantes.
2. Validar material e utilidade com uma igreja/pequeno grupo piloto; incorporar revisão editorial e necessidades reais.
3. Fechar ambiente de identidade/dados e controles de segurança/operação para uma comunidade online curada.
4. Integrar participação, autorização, moderação e privacidade antes de abrir relatos e publicações.

Matching e testes não são substitutos desses passos. Recursos legados permanecem fora da navegação principal.

## Estado atual

O produto executável oferece estudos públicos e roteiros de encontro, além de protótipos legados e uma prova técnica de backend. Não há autenticação real, persistência completa de domínio, autorização integrada às rotas ou operação de moderação para usuários reais.

## Fase 0 — Reconciliação e gates

- [x] Alinhar visão para “Comunidade primeiro. Conexões depois. Relacionamentos como consequência.”
- [x] Registrar arquitetura vigente: Vue/Vite + Fastify + PostgreSQL + monólito modular.
- [x] Documentar identidade interna provider-agnostic.
- [x] Implementar políticas e carregadores provider-neutral de autorização.
- [x] Detalhar contrato de persistência de autorização.
- [x] Reconciliar documentação de produto, requisitos, contexto e arquitetura.
- [ ] Fechar inventário de dados, bases legais, retenção e revisão jurídica.
- [ ] Fechar capacidade, horários, SLOs e escalonamento de moderação.
- [ ] Fechar mecanismo operacional de verificação de idade.
- [ ] Fechar orçamento, região e critérios do beta.
- [ ] Selecionar fornecedores somente após os gates correspondentes.

## Fase 1 — Identidade e fundação persistente

- [ ] Selecionar e provar o provedor de autenticação.
- [ ] Implementar accounts/auth_identities/profile mínimo.
- [ ] Implementar sessão, verificação, recuperação, logout e revogação.
- [ ] Integrar identidade confiável às rotas Fastify.
- [ ] Implementar adapters persistentes dos fatos de autorização.
- [ ] Cobrir isolamento entre contas, enumeração e sessão revogada.

**Gate:** nenhum dado real até privacidade, segurança, operação e revisão jurídica aplicáveis estarem fechadas.

## Fase 2 — Perfil e privacidade

- [ ] Perfil persistente e progressivo.
- [ ] Visibilidade configurável.
- [ ] Consentimentos versionados quando aplicáveis.
- [ ] Correção, exportação e exclusão.
- [ ] Testes de autorização e privacidade.

## Fase 3 — Comunidades e participação

- [ ] Comunidades curadas pela administração.
- [ ] Membership, entrada, saída e aprovação.
- [ ] Regras e categorias.
- [ ] Publicações de texto.
- [ ] Comentários.
- [ ] Reação “Apoiar”.
- [ ] Bloqueio server-side.
- [ ] Paginação, limites e antiabuso.

**Gate:** autorização server-side, persistência, moderação e auditoria funcionais antes de abrir conteúdo a usuários externos.

## Fase 4 — Moderação e administração

- [ ] Fila central de denúncias.
- [ ] Severidade, SLA e escalonamento.
- [ ] Sanções proporcionais e apelação.
- [ ] RBAC admin/moderador.
- [ ] Audit log.
- [ ] Operação de suporte e incidentes.

## Fase 5 — Fé e oração

- [ ] Conteúdo editorial revisado.
- [ ] Referências/licenças.
- [ ] Pedidos de oração com audiência explícita.
- [ ] Remoção, denúncia e retenção.

**Gate:** nenhum pedido de oração real antes dos controles de privacidade, autorização, moderação e exclusão.

## Fase 6 — Beta fechado

Somente após:
- auth e sessão reais;
- perfis/comunidades/conteúdo persistentes;
- autorização negativa testada;
- denúncia/moderação operacional;
- backup/restore;
- monitoramento/alertas;
- acessibilidade;
- revisão jurídica;
- suporte e capacidade de moderação.

## Fase 7 — Evolução

Somente após validação do MVP:
- descoberta de pessoas;
- eventos;
- mensagens;
- notificações avançadas;
- compatibilidade;
- novos idiomas;
- criação aberta de comunidades.

Cada item exige nova avaliação de produto, segurança e operação.

## Regra de progresso

Uma tarefa só é concluída quando houver evidência de código/documentação/teste e, quando aplicável, CI. Não tratar telas demonstrativas, endpoints isolados ou documentação aspiracional como funcionalidade pronta.
