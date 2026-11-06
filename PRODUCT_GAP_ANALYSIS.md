# Análise de Lacunas de Produto

- Data: 2026-11-05
- Baseline técnico: commit `5c64e0c3349c35a5b2dab4d1ee93a0e09d033998`
- Direção aprovada como princípio: **Comunidade primeiro. Conexões depois. Relacionamentos como consequência.**
- Status: direção estratégica e modelo-base de comunidades aprovados em 2026-11-04; F-01, F-02 e F-03 aprovadas em 2026-11-05; F-04 aprovada no modelo operacional geral, F-05 nos princípios gerais de minimização/governança, F-06 no modelo geral de elegibilidade 18+ e F-07 no modelo geral de catálogo/visibilidade em 2026-11-05; F-08 aprovada no modelo geral de participação com impedimento por conflito de interesse em 2026-11-06; F-09 foi aprovada no modelo geral em 2026-11-06; F-10, detalhes operacionais, decisões técnicas e critérios de segurança continuam pendentes.

## 1. Diagnóstico

A aplicação atual apresenta a marca e alguns fluxos individuais, mas não entrega o valor central de uma comunidade online. Não há usuários compartilhando dados, espaços coletivos, participação, publicações, atividades ou moderação operacional.

O primeiro MVP real deve provar que pessoas encontram valor em participar da comunidade, mesmo sem buscar relacionamento amoroso. Portanto, descoberta romântica e compatibilidade não devem ser a porta de entrada nem a métrica central do produto.

## 2. Lacunas por pilar

| Pilar | Estado atual | Lacuna para produto real | Prioridade sugerida |
|---|---|---|---|
| Identidade e landing | Página inicial estática | Mensagem, onboarding público, políticas e suporte reais | P1 |
| Conta | Cadastro/login locais | Auth segura, verificação, recuperação, sessão, exclusão | P0 |
| Perfil | Formulário local básico | API, persistência, privacidade por campo, consentimentos, fotos | P0 |
| Comunidades | Ausente | Criação/listagem/entrada, papéis, regras, conteúdo, moderação | P0 |
| Publicações | Ausente | Criar, editar, excluir, comentar, reagir, paginação e denúncia | P0/P1 |
| Fé e conteúdo | Teste de dons e aviso de oração | Devocional/estudo com referências, planos, favoritos e conteúdo revisado | P1 |
| Pedidos de oração | Apenas página informativa | Compartilhamento privado/por grupo, consentimento, controle de acesso, remoção e denúncia | P1 |
| Pessoas | Descoberta local | Busca, perfis públicos controlados, bloqueio server-side e paginação | P1 |
| Compatibilidade | Score heurístico local | Pesquisa de requisitos, explicabilidade, incerteza, controles e validação | P2 |
| Eventos | Ausente | Organização, inscrição, limites, privacidade e denúncia | P2 |
| Mensagens | Ausente | Conversas persistentes, bloqueio, denúncia, anti-spam e retenção | P2 |
| Notificações | Ausente | Preferências, entrega, opt-out e limites anti-manipulação | P2 |
| Moderação | Registros locais | Fila, revisão humana, sanções proporcionais, apelação e auditoria | P0 |
| Administração | Ausente | RBAC, painel, métricas operacionais e audit log | P0 |
| LGPD | Documentação preliminar | Inventário, finalidade/base legal, direitos, retenção e processos | P0 |
| Operação | Deploy estático | Ambientes, segredos, backup/restore, alertas, incidentes e rollback | P0 |

P0 significa bloqueador da fundação segura do MVP; P1 significa primeira experiência comunitária; P2 significa evolução após validação. A priorização é recomendação, não aprovação de escopo.

## 3. Proposta de escopo comunitário inicial

### Núcleo aprovado como direção do MVP

1. Conta real, e-mail verificado, sessão segura, recuperação e exclusão.
2. Perfil mínimo, progressivo e com visibilidade configurável.
3. Comunidades públicas e privadas/por aprovação, com categorias e regras.
4. Participação: entrar/sair, publicar, comentar e reagir com controles simples.
5. Denunciar conteúdo/usuário, bloquear, fila de moderação e ações administrativas auditáveis.
6. Área de fé inicial com conteúdo editorial revisado e referências bíblicas verificáveis.
7. Pedidos de oração somente quando houver controle de público, consentimento e moderação suficientes.
8. Suporte, privacidade, termos e canal de segurança.

O responsável aprovou este núcleo como direção do MVP: cadastro, perfis, comunidades, publicações, comentários e reações. **Modelo de beta aprovado:** comunidades criadas e curadas pela administração, com categorias, regras e moderadores designados pela equipe. Participantes poderão entrar ou solicitar participação conforme a configuração de cada comunidade. A criação livre de comunidades por usuários fica para uma fase posterior, condicionada à capacidade de moderação e à validação dos controles de segurança. **Modelo-base de permissões aprovado:** administrador da plataforma cria/configura comunidades e designa moderadores; moderador atua somente nos espaços atribuídos e revisa denúncias; membro participa e interage nos espaços em que foi aceito; visitante consulta apenas informações públicas de apresentação/catálogo, sem interagir. Comunidades públicas são descobertas no catálogo e permitem entrada conforme regras; comunidades privadas exigem solicitação e aprovação. Publicações não ficam abertas à internet: exigem autenticação e autorização. Denúncias devem chegar a uma fila central restrita e auditável; bloqueios devem ser aplicados server-side. A matriz detalhada de ações, exceções, SLAs, apelação e retenção ainda precisa ser especificada antes da implementação. Pedidos de oração são um objetivo aprovado de produto, mas só poderão receber dados reais depois de controles de privacidade, consentimento, autorização, denúncia, moderação e exclusão. O MVP não inclui chat privado, compatibilidade algorítmica ou descoberta romântica como requisito de lançamento inicial.

### Por que não começar pelo chat ou pelo algoritmo

- Chat aumenta riscos de assédio, spam, golpes, exposição de dados e custos de moderação.
- Compatibilidade requer pesquisa sobre valores, objetivos, explicabilidade, vieses e tratamento de dados religiosos.
- Feed público sem moderação é risco desproporcional.
- Um MVP menor permite validar utilidade comunitária e operação de segurança primeiro.

## 4. Comunidade ampla versus solteiros

**Decisão aprovada:** a plataforma atende adultos cristãos de diferentes denominações, sem exigir intenção romântica. Descoberta individual e relacionamentos não são o núcleo nem a porta de entrada do MVP; mensagens privadas e descoberta individual ficam fora do primeiro MVP.

**Decisão aprovada (F-06, modelo geral):** beta inicial restrito a pessoas com 18 anos ou mais, com informação clara antes do cadastro, verificação proporcional, coleta mínima e análise humana de suspeitas de contas de menores. **Ainda pendente:** mecanismo concreto de verificação, critérios para acioná-lo, fluxo/prazos de revisão, tratamento de contas inelegíveis, retenção e validação jurídica antes de qualquer beta com usuários reais.

Pontos que continuam em aberto:
- Quais categorias e comunidades específicas serão lançadas primeiro, além do modelo aprovado de comunidades curadas pela administração?
- Quais campos exatos serão expostos no catálogo e quais contagens agregadas serão permitidas, conforme o modelo geral aprovado em F-07?
- Quais campos de perfil serão visíveis a membros, visitantes e não participantes?
- Quais limites e controles seriam necessários caso descoberta/relacionamentos sejam reavaliados no futuro?


## 5. Critérios de sucesso centrados nas pessoas

Evitar tempo de tela, volume de matches ou notificações como objetivos primários. Indicadores sugeridos:
- Ativação: usuários que entram em uma comunidade relevante e entendem as regras.
- Qualidade: participação significativa e satisfação declarada.
- Segurança: denúncias triadas no prazo, reincidência, recursos e tempo de resolução.
- Privacidade: solicitações atendidas e incidentes.
- Inclusão: pessoas que usam a plataforma sem procurar namoro.
- Saúde comunitária: retenção voluntária por valor comunitário, não por pressão.

Metas numéricas devem ser definidas após piloto e capacidade operacional conhecida.

## 6. Pesquisa e validação necessárias

Antes de congelar o MVP:
- Entrevistar pessoas com diferentes tradições cristãs e perfis de participação.
- Entrevistar moderadores/organizadores de grupos.
- Testar protótipo de jornadas: encontrar comunidade, entrar, publicar, denunciar e sair.
- Identificar risco de exposição de crenças, localização e pedidos de oração.
- Definir a capacidade de moderação humana e o canal de suporte.

## 7. Critério de aceite do MVP comunitário

O MVP não será considerado pronto apenas por ter telas. Deve permitir em ambiente de homologação:
- cadastro e autenticação reais;
- criar/editar perfil e definir visibilidade;
- descobrir e participar de comunidades;
- criar conteúdo e interagir com autorização server-side;
- bloquear e denunciar com persistência central;
- moderadores processarem denúncias e registrarem decisões;
- usuários exercerem direitos de privacidade aplicáveis;
- operação observar erros, backups e incidentes;
- fluxos críticos automatizados e acessibilidade revisada.

## 8. Decisões que precisam do responsável

O registro canônico é `OPEN_DECISIONS.md`. Permanecem pendentes, entre outras:
- F-01 (aprovada): bloqueio global entre contas para descoberta e interações diretas, sem exclusão automática de conteúdo comunitário.
- F-02 (aprovada no modelo geral): texto simples, limites configuráveis, janela curta de edição pelo autor, exclusão lógica e preservação restrita de evidências de denúncia ativa; números e regras operacionais dependem de F-05/F-09.
- F-03 (aprovada no modelo geral): escada proporcional de sanções, justificativa/auditoria, contestação e limites entre poderes locais de moderadores e poderes globais administrativos; detalhes operacionais continuam pendentes.
- F-04 (modelo geral aprovado): beta fechado com cobertura humana declarada, priorização por risco, fila centralizada e metas realistas; responsáveis, horários, SLOs, escalonamento e capacidade ainda pendentes.
- F-05 (aprovada nos princípios gerais): minimização por categoria, finalidade explícita, acesso mínimo, direitos do titular, preservação restrita de evidências e descarte/anonimização ao fim do prazo aplicável; inventário, bases legais, prazos, exceções, backups e revisão jurídica ainda pendentes.
- F-06 (modelo geral aprovado): beta 18+, informação clara, verificação proporcional, coleta mínima e análise humana; mecanismo, fluxo e revisão jurídica ainda pendentes.
- F-07 (modelo geral aprovado): catálogo público limitado a metadados, sem posts/comentários/lista nominal de membros; não listadas por convite/autorização; campos exatos, contagens e controles anti-vazamento ainda pendentes.
- F-08 (modelo geral aprovado): moderador pode ser membro, mas deve se impedir em casos envolvendo a própria conta, conteúdo/ação própria, recurso próprio ou interesse direto, com encaminhamento a outro moderador elegível ou administração/substituto independente e auditoria restrita. Ainda pendentes critérios completos de conflito, fallback, acesso pré-impedimento e detalhes de auditoria/testes.
- F-09 (modelo geral aprovado em 2026-11-06): edição própria por janela curta, solicitação de exclusão com ocultação rápida, exclusão/anonimização conforme F-05 e retenção excepcional mínima, restrita e auditada; parâmetros operacionais e revisão jurídica pendentes.
- F-10 (pendente): modelo de reações às publicações.
- D-03, D-06, D-08 a D-10: governança de conteúdo de fé/or oração, compatibilidade futura, notificações, idiomas e formato/região do beta.
- D-12 a D-17: backend, banco, autenticação, imagens/storage, e-mail e hospedagem.
- D-18 a D-22: capacidade de moderação, método de verificação etária e proteção de menores, documentos legais, prazo/orçamento e critérios de beta.

As decisões estratégicas já aprovadas (público adulto cristão amplo, princípio comunitário, MVP, Vue 3 e modelo-base de comunidades/permissões) não devem ser reabertas por este documento. A aprovação do escopo não equivale a autorização para coletar dados reais ou provisionar serviços.
