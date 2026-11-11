# Contrato de dados confiáveis para autorização

- Revisão: 2026-11-08
- Estado: contrato lógico de integração; não define schema físico, fornecedor, migrations ou autorização jurídica.
- Dependências: ADR-0007, `identity-boundary.md`, `authorization.md`, `authorization-matrix-detailed.md` e `server/src/auth/authorization.mts`.
- Regra: a API monta o contexto a partir de fontes server-side confiáveis; dados enviados pelo cliente são apenas seletores de recurso, nunca provas de identidade, papel ou permissão.

## 1. Objetivo e fronteira

As funções puras de política já implementadas recebem fatos explícitos e retornam decisões. Este documento define quais fatos precisam existir, de onde podem vir e como a camada de aplicação deve tratá-los antes de chamar essas funções.

O contrato não autoriza ainda:
- autenticação real ou seleção/provisionamento de provedor;
- criação de tabelas, migrations ou persistência de domínio;
- endpoints de escrita, dados reais ou abertura do beta;
- confiar em claims não validados, no frontend, em cache de autorização ou em IDs fornecidos pelo usuário.

## 2. Princípios de carregamento

1. Validar sessão/token com o adaptador de identidade aprovado e resolver o par confiável `(provider, subject)` para o UUID interno.
2. Obter status atual da conta interna e fatos de elegibilidade a partir de fontes controladas pelo servidor.
3. Resolver o recurso no repositório pelo identificador recebido; carregar estado, comunidade, titularidade e relações necessárias.
4. Carregar apenas os fatos mínimos para a operação solicitada. Não montar um objeto global contendo dados privados desnecessários.
5. Construir o contexto tipado no servidor e chamar as funções puras de política; a rota não reimplementa regras.
6. Em escrita, revalidar os fatos relevantes no limite transacional imediatamente antes da mutação. Evitar TOCTOU entre autorização e gravação.
7. Registrar eventos sensíveis com ator interno, ação, alvo, escopo, motivo quando exigido e correlação; não registrar tokens, conteúdo de oração, evidências completas ou segredos.

A autorização deve refletir o estado atual em novas requisições. Cache pode acelerar leituras não sensíveis, mas não pode ser fonte de verdade para status de conta, membership, bloqueios, sanções, atribuições ou conflitos. Se futuramente houver cache, sua invalidação e limite de obsolescência precisarão de decisão e testes explícitos.

## 3. Fatos confiáveis por domínio

### Validação em runtime

As políticas e os carregadores também verificam os tipos dos fatos relevantes: TypeScript não valida respostas de banco/adapters durante a execução. Identificadores devem ser strings não vazias; atribuições e audiências devem ser arrays de identificadores. Uma visibilidade desconhecida não concede acesso a terceiros.

Janela de edição e necessidade justificada exigem o booleano `true`; ausência de bloqueio/conflito exige o booleano `false`. `null`, `undefined`, strings como `"false"`, números e outros valores não são provas suficientes. Dados incompletos negam acesso; erros de dependência continuam sendo propagados para tratamento no limite da API. Essas verificações não tornam confiáveis fatos enviados pelo cliente.

| Fato | Fonte lógica confiável | Regras de integridade |
|---|---|---|
| Identidade interna | Mapeamento de identidade validado pelo adaptador | UUID interno; nunca inferir por e-mail; identidade externa não é ID público |
| Estado da conta | Registro interno de conta | `active`, `restricted`, `suspended`, `deleted` ou `pending_verification`; ausente/desconhecido não é ativo |
| Elegibilidade 18+ | Registro/fato de verificação separado da autenticação | Booleano/fato verificado com proveniência, instante e estado; e-mail verificado não comprova idade; não expor documento ou data de nascimento ao contexto de autorização |
| Papéis globais | Atribuições administrativas persistidas | Origem autorizada, concessão/revogação, escopo e validade temporal; nunca aceitar role do cliente |
| Atribuição de moderador | Atribuição explícita por comunidade | Conta, comunidade, autoridade concedente, início/fim e estado; papel global não é inferido de participação |
| Comunidade | Repositório de comunidades | Estado, visibilidade/listagem, modo de entrada e identificador interno; catálogo público usa allowlist F-07 |
| Membership | Relação conta-comunidade | Estado atual e histórico necessário; somente `active` habilita conteúdo conforme política |
| Bloqueio | Relação entre contas internas | Verificar ambos os sentidos para a superfície afetada; não revelar a existência da relação |
| Sanção/restrição | Registro de moderação/conta | Estado, escopo, vigência, operações vedadas e recurso; não inferir suspensão por texto livre |
| Ownership | Registro do próprio recurso | Autor interno definido pelo servidor; nunca aceitar `authorId` do body como prova |
| Janela de edição | Datas/status do recurso e regra de produto aprovada | Calcular no servidor; relógio do cliente não participa |
| Audiência de oração | Configuração explícita do pedido | Autor, público selecionado, escopo e revogação; privado por padrão; não usar papel administrativo como bypass |
| Caso de moderação | Repositório restrito de casos | Comunidade, partes envolvidas, atribuição atual, estado e conflito; evidências carregadas só após autorização |
| Justificativa administrativa | Entrada explícita e validada para ação excepcional | Obrigatória quando a política exigir; vinculada à ação e auditada, não texto genérico reaproveitado |

Os nomes acima são conceitos de domínio, não nomes ou tipos de colunas obrigatórios. Modelagem física fica para ADR/migration futura após os gates de identidade, LGPD, operação e fornecedor.

## 4. Contexto mínimo por operação

- **Catálogo público:** comunidade e allowlist de campos; não carregar membership, perfis, contagens ou conteúdo.
- **Perfil:** conta alvo, visibilidade por campo e relação de bloqueio aplicável; retornar apenas campos permitidos.
- **Conteúdo comunitário:** principal/conta, elegibilidade, comunidade, membership atual, sanção, bloqueio quando aplicável e estado/visibilidade do conteúdo.
- **Criar conteúdo:** mesmos fatos de participação; autor e timestamps são definidos no servidor.
- **Editar/excluir:** recurso carregado, titular interno, estado, janela e política de retenção/exclusão; revalidar na transação.
- **Apoiar/remover:** principal, elegibilidade, membership, estado/visibilidade do post e ownership da própria reação para remoção; garantir unicidade/idempotência no armazenamento quando implementado.
- **Moderação:** papel e atribuição atual, caso/comunidade, partes envolvidas, conflito, autoridade da ação e motivo; só buscar evidência depois de passar o gate.
- **Pedido de oração:** autor, audiência escolhida e estado de revogação; não carregar texto privado para operações que não precisam dele.
- **Administração global:** papel global específico, finalidade, justificativa e trilha de auditoria; acesso não é irrestrito.

## 5. Falha fechada e consistência

Negar a operação (ou responder de forma anti-enumeração conforme o endpoint) quando:
- identidade não puder ser validada ou mapeada inequivocamente;
- conta, elegibilidade, comunidade, membership, atribuição ou recurso estiver ausente, inconsistente ou em estado desconhecido;
- a consulta de autorização falhar, expirar ou retornar dados parciais;
- houver divergência entre fontes ou atribuições duplicadas/ambíguas;
- a atribuição estiver fora da vigência, revogada ou não pertencer ao escopo solicitado;
- conflito de interesse não puder ser determinado;
- audiência de oração estiver ausente, ambígua ou revogada;
- não for possível garantir que a verificação e a mutação usem fatos consistentes.

Não converter falha de banco/serviço em permissão implícita. Erro operacional pode resultar em 503 quando necessário, sem expor existência de recurso privado. A política de resposta 403/404 deve seguir o contrato anti-enumeração do endpoint.

## 6. Transações e concorrência

- Escritas protegidas devem executar leitura dos fatos críticos e mutação em uma transação apropriada, com constraints/locks ou estratégia equivalente definida na implementação.
- Mudança concorrente de membership, bloqueio, sanção, papel ou atribuição deve impedir a escrita se invalidar a permissão.
- Unicidade de membership, reação e atribuições ativas deve ser garantida no armazenamento quando o modelo for aprovado, além de validação de aplicação.
- Operações repetidas devem ser idempotentes quando o contrato do recurso exigir.
- A estratégia exata de isolamento, locks, constraints e retries será especificada junto ao schema e aos testes de integração; este documento não presume uma implementação.

## 7. Privacidade, logs e minimização

- Carregar apenas os fatos necessários para a decisão e o recurso solicitado.
- Não copiar dados de oração, evidências, documentos de idade, tokens ou conteúdo privado para logs, métricas ou mensagens de erro.
- Auditoria registra decisão/ação e contexto mínimo; acesso à própria auditoria também é autorizado e restrito.
- Dados sensíveis não devem ser replicados em claims de sessão sem necessidade demonstrada.
- Prazo de retenção, base legal, direitos do titular, backups e exceções dependem do fechamento de F-05 e revisão jurídica; nenhum prazo é definido aqui.

## 8. Plano de integração e critérios de aceite

A integração deve ocorrer em etapas pequenas, depois dos bloqueios de identidade e governança:

1. Definir interfaces de repositório e principal autenticado a partir do schema aprovado, sem permitir construção pelo cliente.
2. Implementar carregadores de contexto por caso de uso, com consultas mínimas e resultados explícitos para ausência/ambiguidade.
3. Integrar primeiro rotas somente leitura de baixo risco; manter catálogo público separado da autorização de conteúdo.
4. Integrar operações de escrita somente após transações, constraints, auditoria e política operacional estarem prontas.
5. Cobrir cada permissão e negação da matriz com testes de integração PostgreSQL, incluindo concorrência, revogação, bloqueio em ambos os sentidos, mudança de estado e anti-enumeração.
6. Executar revisão de segurança/privacidade e demonstrar que logs e respostas não vazam dados sensíveis.

Critérios mínimos:
- Nenhuma rota usa role, status, membership, ownership ou idade fornecidos pelo cliente.
- Toda operação protegida resolve identidade interna e consulta fatos atuais.
- Falha de dependência ou dado ambíguo nunca libera acesso.
- Escrita revalida permissão sem janela TOCTOU.
- Moderador não ultrapassa comunidade atribuída e conflito bloqueia o caso.
- Pedido de oração privado permanece inacessível a terceiros, inclusive administradores por privilégio genérico.
- Testes cobrem concessão, revogação, estados inválidos e condições concorrentes.

**Próximo bloqueio real:** fechar os requisitos de identidade/conta, política de verificação etária, modelo de atribuições e memberships, F-05 e capacidade operacional. Até lá, manter as políticas puras e o catálogo público atual; não criar schema físico nem habilitar conteúdo/interações reais.
