# ADR-0003: Stack técnica do MVP

## Contexto
O projeto evoluiu desde o registro deste ADR. A aplicação executável é uma SPA em Vue 3, Vue Router 4 e Vite 6. A migração de Vue CLI para Vite foi concluída na PR #23. As decisões de backend, banco, autenticação e fornecedores continuam separadas e pendentes.

## Problema
Como avaliar a stack sem transformar uma hipótese em decisão irreversível antes da validação do produto?

## Opções Consideradas
- **Next.js + React + TypeScript + Tailwind CSS**: integração direta entre apresentação e rotas do MVP; exige disciplina para separar domínio e infraestrutura.
- **Frontend e backend separados**: separação explícita; aumenta custo operacional e complexidade inicial.
- **Outro framework full-stack**: pode atender ao produto; ainda não foi comparado com evidências do projeto.

## Decisão
**Decisão para o frontend: manter Vue 3 + Vue Router 4 + Vite 6.** A hipótese anterior de Next.js/React/TypeScript/Tailwind não foi aprovada e não deve orientar reescrita. A migração Vue CLI → Vite foi concluída e validada na PR #23. Este ADR não aprova backend, banco de dados, autenticação ou fornecedores.

## Consequências
- Positivas: ciclo curto de desenvolvimento e uma base comum para UI e APIs.
- Negativas: risco de acoplamento se as camadas não forem separadas.
- Mitigações: manter domínio, persistência, autenticação e apresentação em módulos distintos; revisar após o primeiro vertical slice.

## Data
2026-09-28

## Status
Pendente

## Próximos passos
- Manter Vue 3 + Vite como frontend; mudanças futuras devem ser incrementais e justificadas.
- Registrar backend, banco, autenticação e fornecedores em ADRs próprios após avaliação de custo, privacidade e operação.
