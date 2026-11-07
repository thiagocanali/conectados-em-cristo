# Modelo de ameaças — Conectados em Cristo

- Revisão: 2026-11-07
- Estado: baseline documental inicial; não representa auditoria independente nem aprovação para beta.
- Método: STRIDE por fronteira de confiança, complementado por privacidade e abuso comunitário.

## 1. Escopo e ativos

O modelo cobre o futuro produto com API Fastify, PostgreSQL e autenticação gerenciada, conforme ADRs 0004–0006. O protótipo atual continua local e não deve receber dados reais.

Ativos que exigem proteção:
- identidade, e-mail, telefone, credenciais e sessões;
- dados de perfil, preferências, localização aproximada e dados que revelem convicção religiosa;
- memberships, comunidades privadas e conteúdo não público;
- pedidos de oração, que podem revelar crenças, saúde, sofrimento ou dados de terceiros;
- publicações, comentários, reações e interações;
- denúncias, evidências, casos, sanções, recursos e notas de moderação;
- papéis, permissões, configurações e trilhas de auditoria;
- backups, segredos, chaves, tokens e artefatos de deploy.

## 2. Fronteiras de confiança

1. **Navegador não confiável:** qualquer dado em localStorage, sessionStorage, DOM ou JavaScript pode ser alterado pelo usuário. Guards de frontend são UX, não autorização.
2. **Frontend público:** assets e chamadas públicas não podem conter secrets ou dados privados.
3. **API:** fronteira autoritativa para autenticação, autorização, validação e regras de domínio.
4. **Provedor de identidade:** valida credenciais/sessões conforme integração aprovada; a API ainda valida estado da conta e permissões.
5. **PostgreSQL:** persistência relacional; credenciais administrativas nunca chegam ao navegador.
6. **Object storage:** arquivos privados por padrão; acesso por autorização e URL temporária.
7. **E-mail:** canal externo, sujeito a abuso, phishing e vazamento de conteúdo em notificações.
8. **Operação humana:** moderadores e administradores são usuários privilegiados, sujeitos a menor privilégio, conflito de interesse e auditoria.

## 3. Atores e capacidades

- Visitante anônimo: pode enumerar superfícies públicas, automatizar requisições e tentar explorar endpoints.
- Membro malicioso: pode abusar de descoberta, conteúdo, mensagens futuras, denúncias ou dados de outros membros.
- Conta comprometida: pode agir com permissões da vítima.
- Bot/spammer: pode criar contas, publicar conteúdo, enviar denúncias ou provocar indisponibilidade.
- Moderador: pode revisar casos apenas nas comunidades atribuídas; pode ter conflito de interesse.
- Administrador: possui poderes globais limitados por política, justificativa e auditoria.
- Terceiro/provedor comprometido: pode expor tokens, dados ou indisponibilidade.
- Atacante externo: pode explorar dependências, configuração, API, storage ou pipeline.

## 4. Registro STRIDE e controles

| Categoria | Ameaça / cenário | Impacto | Controles exigidos | Estado |
|---|---|---|---|---|
| Spoofing | Conta falsa, credential stuffing, takeover ou abuso de recuperação | Acesso indevido e fraude | Auth gerenciada, verificação proporcional, rate limit, MFA conforme risco, revogação de sessão e alertas | Pendente de implementação |
| Spoofing | Sessão falsificada no navegador | Falsa identidade | Nunca confiar em currentUser/storage; API valida sessão em toda requisição | Protótipo explicitamente não seguro |
| Tampering | IDOR em perfil, comunidade, post, pedido de oração ou denúncia | Exposição/alteração de dados | Autorização server-side por recurso, ownership, membership, estado e bloqueios; testes negativos | Pendente |
| Tampering | Alteração de conteúdo ou reação fora das regras | Abuso e perda de integridade | Schemas, limites, transações, constraints, idempotência e trilha de auditoria | Pendente |
| Repudiation | Negação de ação administrativa/moderação | Impossibilidade de investigar | Audit log protegido, ator, ação, alvo, horário, motivo e correlação; acesso restrito | Pendente |
| Information disclosure | Vazamento de dados religiosos, oração, localização, contato ou preferências | Dano à privacidade e segurança pessoal | Minimização, classificação, default deny, visibilidade por campo, criptografia, retenção e revisão de acesso | Pendente |
| Information disclosure | Denúncia/evidência acessível a qualquer moderador ou membro | Retaliação e exposição | Fila restrita; escopo mínimo; conflito de interesse; acesso auditado | Pendente |
| Information disclosure | Reidentificação por contagens ou listas nominais | Exposição de membros | Catálogo só com metadados; agregados somente quando seguros; sem lista nominal de reações | Regras F-07/F-10 aprovadas; implementação pendente |
| Denial of Service | Spam, scraping, floods e abuso de endpoints caros | Indisponibilidade e custo | Rate limits por IP/conta/ação, quotas, paginação, timeouts, limites de payload e monitoramento | Pendente |
| Elevation of privilege | Moderador atua fora da comunidade ou em caso próprio | Abuso de poder | RBAC + escopo de comunidade; recusa obrigatória por conflito F-08; escalonamento e auditoria | Modelo geral aprovado; detalhes pendentes |
| Elevation of privilege | Usuário bloqueado/suspenso continua interagindo por chamada direta | Assédio e evasão | Verificação server-side de bloqueio, status de conta, membership e sanção em cada operação | Pendente |
| Upload | MIME falso, malware, SVG/HTML ativo, EXIF ou arquivo excessivo | XSS, malware, exposição de localização | Allowlist de formatos, inspeção real, limites, re-encode, remoção EXIF, antivírus/moderação e storage privado | Pendente |
| Supply chain | Dependência vulnerável ou workflow comprometido | Execução de código/vazamento | npm audit no CI, lockfile, atualizações isoladas, permissões mínimas, actions versionadas | Auditoria CI ativa; revisão contínua |
| Insider | Acesso excessivo ou uso indevido de dados | Vazamento/abuso | Menor privilégio, acesso temporário, justificativa, logs, recusa por conflito e revisão periódica | Pendente |
| Recovery | Exclusão, backup ou restore inadequado | Perda ou retenção indevida | Política por categoria, backup criptografado, restore testado, retenção e descarte documentados | Pendente |

## 5. Regras de segurança por domínio

### Identidade e sessão
- Não implementar autenticação própria sem necessidade aprovada.
- Cookies de sessão devem ser HttpOnly, Secure e SameSite quando compatíveis com o provedor; definir CSRF/CORS após escolha.
- Revogar sessões em logout, suspensão, troca de credenciais e eventos de risco.
- Nunca registrar tokens, senhas, códigos de recuperação ou cabeçalhos de autorização.

### Perfil, comunidade e conteúdo
- Negar por padrão; verificar identidade, status da conta, membership, visibilidade, bloqueios e sanções.
- Catálogo público contém apenas metadados aprovados; posts e listas de membros não são públicos (F-07).
- Bloqueio global afeta descoberta e interações diretas; não apaga conteúdo comunitário automaticamente (F-01).
- Edição, exclusão lógica e preservação mínima de evidências seguem F-02/F-05/F-09.
- Reação “Apoiar” é única, removível e sem ranking/lista nominal (F-10).

### Oração e dados sensíveis
- Pedidos de oração são privados por padrão e visíveis ao autor; qualquer compartilhamento deve ser escolha explícita e granular.
- Não incluir pedido de oração em catálogo, busca pública, analytics, e-mail ou logs.
- Conteúdo reportado só pode ser acessado por operadores autorizados para o caso e finalidade, com trilha de auditoria.
- Não presumir que um pedido autoriza compartilhar dados de terceiros mencionados nele.

### Moderação
- Moderador só atua nas comunidades atribuídas.
- Moderador não decide caso que envolva sua conta, seu conteúdo, sua denúncia ou apelação; encaminhar para outro responsável (F-08).
- Sanções seguem escala proporcional F-03, com motivo, prazo quando aplicável, auditoria e contestação.
- Classificação automática nunca é única base para sanção permanente.

## 6. Prioridade de riscos

**Críticos antes de dados reais:** autorização/IDOR; vazamento de dados sensíveis; takeover de conta; acesso indevido a pedidos de oração; exposição de evidências; escalada de privilégio; ausência de backup/restore.

**Altos antes de beta:** rate limit; abuso de cadastro/conteúdo; upload seguro; conflito de interesse de moderadores; exclusão/retention; incident response; observabilidade sem dados sensíveis.

**Contínuos:** dependências, secrets, workflows, revisão de permissões, logs, testes negativos e monitoramento.

## 7. Critérios de saída antes de beta

- Threat model revisado por engenharia e segurança.
- Classificação e inventário de dados aprovados; revisão jurídica necessária para LGPD e dados sensíveis.
- Matriz de autorização implementada e testada em API.
- Testes negativos de IDOR, bloqueio, membership, suspensão, moderação e acesso a pedidos de oração.
- Fluxos de sessão, recuperação, revogação e MFA conforme risco.
- Storage privado, upload seguro e remoção de metadados.
- Rate limits, auditoria, monitoramento, backups e restore testados.
- Pessoas, horários, fila e SLAs de moderação definidos (F-04).
- Processo de incidentes, exclusão e direitos do titular testado.
- Revisão jurídica de termos, privacidade, idade 18+, retenção e bases legais.

## 8. Limites e pendências

Este documento é um baseline de engenharia, não certificação, parecer jurídico ou autorização para lançamento. Riscos residuais, probabilidade, impacto numérico, proprietários e prazos devem ser refinados com o threat model detalhado e a operação real.

**Status:** baseline inicial registrado; implementação e revisão especializada pendentes.
