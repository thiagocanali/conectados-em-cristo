# Contrato de persistência para autorização server-side

- Revisão: 2026-11-08
- Estado: contrato lógico de persistência; não define schema físico, migrations, fornecedor ou DDL.
- Dependências: `authorization-data-contract.md`, `authorization-matrix-detailed.md`, `authorization-context.mts` e ADR-0007.

## 1. Objetivo

Traduzir os fatos confiáveis exigidos pela autorização em responsabilidades de persistência, sem antecipar o desenho físico do banco.

Este contrato define:
- quais agregados/relações precisam ser consultáveis;
- quais operações de leitura e escrita precisam ser atômicas;
- semântica de ausência, duplicidade e revogação;
- requisitos mínimos de integridade, concorrência e índices.

Ele **não** define nomes obrigatórios de tabelas/colunas, ORM, migrations, fornecedor PostgreSQL ou mecanismo de autenticação.

## 2. Fronteira

A persistência nunca transforma dado do cliente em fato confiável. O fluxo permanece:

1. adaptador valida a sessão/identidade;
2. identidade resolve `(provider, subject)` → UUID interno;
3. repositórios carregam fatos atuais;
4. contexto server-side chama a política pura;
5. em escrita, fatos críticos são revalidados na mesma unidade transacional da mutação.

Falhas de leitura, inconsistências ou ambiguidade não podem resultar em autorização.

## 3. Agregados e relações lógicas

### Conta e identidade

**Conta interna**
- identificador UUID;
- estado atual da conta;
- timestamps de ciclo de vida;
- informações mínimas necessárias para autorização.

**Identidade externa**
- provedor;
- subject externo;
- referência única à conta interna;
- timestamps de vínculo.

Regras:
- uma identidade externa não pode apontar para duas contas;
- e-mail não é chave de vinculação automática;
- tokens/segredos não pertencem ao repositório de domínio.

### Elegibilidade 18+

Registro separado da autenticação, contendo somente o necessário para decisão:
- estado da verificação;
- proveniência/método;
- instante da decisão;
- dados mínimos para auditoria de ciclo de vida.

O repositório de autorização não precisa expor documento, data de nascimento ou evidência bruta.

Sem verificação suficiente, o resultado é `unknown`/inelegível conforme a política, nunca uma presunção de maioridade.

### Comunidade

A persistência deve permitir obter:
- estado do ciclo de vida;
- visibilidade/listagem;
- modo de entrada;
- identificadores necessários para escopo.

O catálogo público permanece separado da autorização de conteúdo e usa a allowlist F-07.

### Membership

Relação conta ↔ comunidade com:
- estado atual;
- timestamps de entrada/saída/suspensão quando necessários;
- origem da aprovação/convite quando necessária ao caso de uso.

Semântica mínima:
- somente `active` satisfaz participação autorizada;
- `pending`, `suspended`, `left` e `removed` não satisfazem;
- uma conta deve ter no máximo um estado vigente por comunidade;
- histórico, se necessário, não deve permitir que um estado antigo seja interpretado como atual.

### Atribuição de moderador

Relação conta ↔ comunidade com:
- autoridade que concedeu;
- estado;
- início/fim de vigência;
- escopo da atribuição.

Participar da comunidade não concede moderação. Papel global não deve ser usado para inferir atribuição local.

### Bloqueio

Relação entre duas contas internas:
- ator;
- alvo;
- estado/vigência;
- timestamps.

As consultas devem suportar ambos os sentidos sem revelar a existência do bloqueio ao lado não autorizado.

### Sanções e restrições

Registro de decisão de moderação/conta com:
- alvo;
- escopo;
- estado;
- início/fim;
- operações afetadas;
- autoridade e referência de justificativa;
- possibilidade de recurso quando aplicável.

Sanção expirada ou revogada não deve bloquear operações futuras.

### Recursos de conteúdo e reações

Recursos devem permitir resolver:
- autor interno;
- comunidade;
- estado/visibilidade;
- timestamps necessários à janela de edição.

Reações “Apoiar” precisam de unicidade lógica por conta + publicação e remoção idempotente.

### Pedidos de oração

A persistência deve separar:
- autor;
- audiência configurada;
- estado de revogação;
- conteúdo protegido.

Consultas de autorização devem conseguir decidir acesso sem carregar o texto privado quando ele não for necessário.

### Casos de moderação

Repositório restrito para:
- caso;
- comunidade;
- partes envolvidas;
- atribuição atual;
- estado;
- conflito;
- evidência mínima referenciada.

Evidência completa só deve ser carregada depois do gate de autorização.

## 4. Operações mínimas de repositório

As interfaces concretas podem evoluir, mas precisam oferecer semântica equivalente a:

| Caso | Leitura mínima | Regra de ausência |
|---|---|---|
| conteúdo comunitário | conta + idade + comunidade + membership + sanções/bloqueios aplicáveis + recurso | falha fechada |
| criação de conteúdo | conta + idade + comunidade + membership + sanções | falha fechada |
| edição/exclusão | recurso + autor + estado + janela | recurso inexistente segue contrato anti-enumeração |
| Apoiar/remover | post + participação + reação própria | ausência de reação torna remoção idempotente |
| moderação | atribuição + caso + conflito + autoridade | acesso negado sem enumerar caso/evidência |
| oração | autor + audiência + revogação | acesso privado ausente/ambíguo é negado |
| administração | papel global + escopo + justificativa | ausência de papel não autoriza |

Para o primeiro carregador já implementado, a interface permanece deliberadamente pequena: comunidade, membership e elegibilidade. A expansão deve acompanhar cada caso de uso, não antecipar todos os módulos.

## 5. Integridade

Quando o schema físico for aprovado, deverá garantir no armazenamento, além das validações de aplicação:

- identificadores internos únicos;
- vínculo externo único por `(provider, subject)`;
- no máximo um membership vigente por conta/comunidade;
- no máximo uma atribuição vigente equivalente por conta/comunidade/escopo;
- no máximo uma reação “Apoiar” por conta/publicação;
- referências entre recursos existentes;
- estados válidos por domínio;
- timestamps coerentes;
- impossibilidade de reativar implicitamente registros revogados por atualização concorrente.

A estratégia exata de constraints será definida no desenho físico.

## 6. Concorrência e TOCTOU

Toda escrita protegida deve definir uma unidade transacional que impeça autorização baseada em fatos já obsoletos.

Casos obrigatórios:
- membership removido durante publicação;
- sanção aplicada durante uma operação de escrita;
- bloqueio criado durante interação;
- moderador revogado durante ação de moderação;
- reação criada simultaneamente por duas requisições.

A implementação deve usar constraints, locks, isolamento ou combinação equivalente. Retries precisam preservar idempotência.

Não é suficiente consultar autorização fora da transação e depois executar a escrita sem revalidação.

## 7. Índices e consultas

O desenho físico deverá privilegiar consultas por:
- identidade externa;
- conta + comunidade;
- comunidade + estado;
- conta + estado de membership;
- comunidade + moderadores vigentes;
- par de contas para bloqueio;
- recurso + autor/comunidade;
- publicação + conta para reação;
- caso + comunidade/atribuição.

Índice só deve ser criado quando houver consulta justificando-o; não criar índices especulativos.

Para o catálogo público já implementado, continuam válidos os índices e a paginação keyset existentes. Este contrato não os substitui.

## 8. Consistência e leitura

- Estado de autorização deve ser atual nas decisões protegidas.
- Cache não é fonte de verdade para conta, membership, bloqueio, sanção ou atribuição.
- Leituras que compõem uma decisão devem ter semântica consistente suficiente para o caso de uso.
- Ausência e duplicidade devem ser explicitamente distinguíveis internamente, mesmo quando a resposta HTTP precisar ser anti-enumeração.
- Erro de banco/serviço deve chegar ao limite da aplicação para tratamento genérico, sem virar `allowed: true`.

## 9. Privacidade e minimização

Persistir somente dados necessários para finalidade definida e revisão jurídica.

Em especial:
- não duplicar tokens de autenticação;
- não colocar conteúdo privado de oração em logs;
- não replicar evidências de moderação em tabelas auxiliares sem finalidade;
- separar dados operacionais de dados de auditoria quando isso reduzir acesso indevido;
- retenção, backup, exclusão e anonimização dependem do fechamento de F-05/F-09 e revisão jurídica.

Nenhum prazo de retenção é definido por este contrato.

## 10. Testes de contrato

Antes do schema físico, os repositórios podem ser validados por testes de contrato provider-neutral:

1. estado válido retorna fatos atuais;
2. ausência retorna o estado de ausência definido, nunca um valor permissivo;
3. duplicidade/inconsistência falha fechada;
4. mudança de estado é refletida em nova decisão;
5. operações idempotentes permanecem idempotentes;
6. concorrência não cria duas reações/memberships/atribuições vigentes;
7. consultas não carregam dados privados desnecessários;
8. erros de dependência são propagados ao limite da aplicação.

Os testes PostgreSQL reais devem ser adicionados quando o modelo físico correspondente for aprovado.

## 11. Critério para schema físico

Não criar migrations adicionais para estes conceitos até que estejam fechados, no mínimo:

- provedor de identidade e prova técnica de sessão;
- política e mecanismo de verificação 18+;
- requisitos LGPD, retenção, direitos e backups;
- modelo operacional de moderação;
- fornecedor/ambiente PostgreSQL e estratégia de restore;
- revisão do modelo físico contra a matriz de autorização.

Até lá, o código deve continuar usando contratos pequenos e provider-neutral.

## 12. Próximo passo

Depois dos gates acima, a primeira implementação de persistência deve ser incremental:

1. schema de identidade/conta;
2. adapter de sessão e middleware;
3. memberships e atribuições;
4. integração do carregador de autorização comunitária;
5. testes de integração e concorrência;
6. somente então conteúdo/interações.

Nenhuma etapa deste documento habilita cadastro público, escrita de domínio ou coleta de dados reais.
