# Análise de Lacunas de Produto

- Data: 2026-11-04
- Baseline: commit `5c64e0c3349c35a5b2dab4d1ee93a0e09d033998`
- Direção aprovada como princípio: **Comunidade primeiro. Conexões depois. Relacionamentos como consequência.**
- Status: direção estratégica aprovada em 2026-11-04; detalhes operacionais e critérios de segurança do MVP ainda precisam ser fechados.

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

**Recomendação:** plataforma ampla para adultos cristãos, sem exigir intenção romântica. Recursos de relacionamento, se aprovados, devem ser uma área opcional e explicitamente opt-in, com limites de idade, preferências e controles separados.

Decisões ainda pendentes:
- A plataforma permitirá qualquer adulto cristão ou terá recorte etário/temático?
- Quais categorias de comunidades existirão no beta, incluindo eventual comunidade geral e grupos temáticos?
- Quais metadados do catálogo de comunidades serão públicos e quais dados do perfil serão visíveis a membros versus não participantes?


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

Ver `OPEN_DECISIONS.md`: público, comunidades iniciais, conteúdo de fé, pedidos de oração, descoberta de pessoas, chat, idiomas, monetização, prazo e capacidade de moderação.
