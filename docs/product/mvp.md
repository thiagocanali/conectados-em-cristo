# MVP — Conectados em Cristo

> **Status: direção de produto aprovada; implementação ainda incompleta.** Este documento não define cronograma. O estado executável está em PROJECT_CONTEXT.md e README.md; decisões canônicas ficam em OPEN_DECISIONS.md.

## 1. Hipótese do MVP

Validar que pessoas cristãs adultas encontram valor em uma comunidade digital baseada em fé, interesses e experiências compartilhadas, mesmo sem buscar relacionamento amoroso.

**Princípio:** Comunidade primeiro. Conexões depois. Relacionamentos como consequência.

O MVP não deve transformar descoberta romântica, compatibilidade ou chat em requisito de entrada.

## 2. Escopo funcional inicial

### Conta e sessão
- Cadastro real.
- Login e logout.
- Verificação de e-mail.
- Recuperação de acesso.
- Sessão segura e revogável.
- Proteção server-side de rotas e recursos.

### Perfil
- Perfil mínimo e progressivo.
- Nome de exibição, bio e interesses.
- Informações públicas configuráveis.
- Privacidade por campo quando aplicável.
- Exclusão, correção e exportação conforme requisitos jurídicos definidos.
- Dados religiosos somente quando houver finalidade e proteção adequadas.

### Comunidades
- Comunidades inicialmente criadas e curadas pela administração.
- Categorias e regras próprias.
- Comunidades públicas descobertas no catálogo.
- Comunidades privadas ou por aprovação com entrada controlada.
- Entrada, saída, solicitação e aprovação conforme a regra da comunidade.
- Administrador global, moderadores atribuídos e membros com permissões distintas.
- Criação livre de comunidades por usuários fica fora do primeiro beta.

### Participação
- Publicações inicialmente em texto.
- Comentários.
- Reação única “Apoiar”, removível pelo próprio autor.
- Edição própria por janela curta.
- Exclusão lógica conforme as regras de privacidade/moderação.
- Paginação e controles de abuso.

### Segurança e moderação
- Bloqueio global entre contas para descoberta/interações diretas.
- Denúncia de usuários e conteúdo.
- Fila central restrita de denúncias.
- Moderação com ações proporcionais, justificativa e auditoria.
- Conflito de interesse de moderadores tratado server-side.
- Apelação e SLAs somente após definição operacional.

### Administração
- Gestão de usuários e comunidades.
- Gestão de denúncias.
- Designação de moderadores.
- Categorias e regras.
- Auditoria de ações administrativas.
- Autorização administrativa sempre no servidor.

## 3. Fora do primeiro MVP

- Chat e mensagens privadas.
- Descoberta romântica individual como porta de entrada.
- Compatibilidade algorítmica/score.
- Interesse romântico e matching.
- Criação livre de comunidades por usuários.
- Eventos.
- Notificações avançadas/push.
- Upload de mídia, enquanto storage, moderação e privacidade não estiverem prontos.
- Recursos de monetização.
- Internacionalização além do português brasileiro inicial.
- Gamificação de popularidade.

Esses itens podem permanecer no backlog e só devem ser promovidos mediante nova decisão de produto e segurança.

## 4. Oração e conteúdo de fé

Conteúdo editorial cristão pode evoluir de forma controlada, com referências e licenças adequadas.

Pedidos de oração são dados potencialmente sensíveis e **não devem receber dados reais no protótipo**. A funcionalidade só deve ser habilitada após controles de público/audiência, consentimento, autorização server-side, denúncia, moderação, exclusão e retenção estarem operacionais.

## 5. Modelo de participação do beta

- Visitantes: somente metadados públicos de apresentação/catálogo.
- Membros autenticados: participação apenas nos espaços em que possuem vínculo válido.
- Moderadores: atuação somente nas comunidades atribuídas, com impedimento em conflitos.
- Administradores: poderes globais conforme justificativa e auditoria.
- Comunidades não listadas: acesso somente por convite/autorização.
- Conteúdo e interações não são públicos para a internet.

## 6. Critérios de aceite do MVP

O MVP não será considerado pronto apenas por possuir telas ou builds verdes. Em homologação deverá existir evidência de:

1. autenticação e sessão reais;
2. perfil persistente com privacidade;
3. comunidades e memberships persistentes;
4. publicações, comentários e reações persistentes;
5. autorização server-side por recurso;
6. bloqueios e denúncias persistentes;
7. moderação com fila, ações e auditoria;
8. direitos de privacidade operacionais;
9. backup/restore testado;
10. monitoramento e resposta a incidentes;
11. testes automatizados dos fluxos críticos;
12. acessibilidade revisada.

## 7. Gates antes de dados reais

Não coletar dados reais enquanto estiverem pendentes os gates aplicáveis de:

- fornecedor/região de identidade e PostgreSQL;
- sessão, recuperação e MFA administrativo;
- privacidade/LGPD, bases legais e retenção;
- capacidade humana de moderação;
- verificação de idade 18+;
- backup/restore;
- observabilidade e resposta a incidentes;
- revisão jurídica.

## 8. Cronograma

**Não aprovado.**

Estimativas anteriores de 8 semanas ou 6 meses são históricas e não devem orientar implementação. O cronograma só deve ser estimado após escopo fechado, disponibilidade de desenvolvimento, orçamento, capacidade de moderação e requisitos legais conhecidos.
