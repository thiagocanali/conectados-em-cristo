# ADR-0003: Stack técnica do MVP

## Contexto
O repositório já contém um protótipo funcional em Vue 3, Vue Router 4 e Vue CLI 5. Não há backend ou banco de dados. A stack de produção ainda precisa ser definida com simplicidade, segurança, baixo custo e possibilidade de evolução internacional.

## Problema
Como avaliar a stack sem transformar uma hipótese em decisão irreversível antes da validação do produto?

## Opções Consideradas
- **Next.js + React + TypeScript + Tailwind CSS**: integração direta entre apresentação e rotas do MVP; exige disciplina para separar domínio e infraestrutura.
- **Frontend e backend separados**: separação explícita; aumenta custo operacional e complexidade inicial.
- **Outro framework full-stack**: pode atender ao produto; ainda não foi comparado com evidências do projeto.

## Decisão
**Pendente:** Next.js/React/TypeScript/Tailwind permanecem alternativas para avaliação, não uma decisão de migração. O código atual usa Vue 3/Vue CLI; manter ou substituir essa stack requer uma decisão explícita após comparar necessidades, custos e impacto.

## Consequências
- Positivas: ciclo curto de desenvolvimento e uma base comum para UI e APIs.
- Negativas: risco de acoplamento se as camadas não forem separadas.
- Mitigações: manter domínio, persistência, autenticação e apresentação em módulos distintos; revisar após o primeiro vertical slice.

## Data
2026-09-28

## Status
Pendente; proposta de Next.js não adotada.

## Próximos passos
- Comparar a stack atual com as alternativas de produção.
- Aprovar ou rejeitar explicitamente uma migração antes de implementá-la.
- Rever backend, persistência, autenticação e testes em ADRs próprios.
