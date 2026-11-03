# ADR-0003: Stack técnica do MVP

## Contexto
O projeto está na fase de fundação documental e ainda não possui implementação funcional. A stack precisa atender ao MVP com simplicidade, segurança, baixo custo e possibilidade de evolução internacional.

## Problema
Como avaliar a stack sem transformar uma hipótese em decisão irreversível antes da validação do produto?

## Opções Consideradas
- **Next.js + React + TypeScript + Tailwind CSS**: integração direta entre apresentação e rotas do MVP; exige disciplina para separar domínio e infraestrutura.
- **Frontend e backend separados**: separação explícita; aumenta custo operacional e complexidade inicial.
- **Outro framework full-stack**: pode atender ao produto; ainda não foi comparado com evidências do projeto.

## Decisão
**Hipótese registrada, decisão pendente:** Next.js, React, TypeScript e Tailwind CSS foram considerados, mas não foram aprovados. A aplicação atual usa Vue 3, Vue Router 4 e Vue CLI 5; qualquer migração exige comparação técnica e decisão explícita. A decisão final depende da validação técnica do repositório e do primeiro incremento funcional.

## Consequências
- Positivas: ciclo curto de desenvolvimento e uma base comum para UI e APIs.
- Negativas: risco de acoplamento se as camadas não forem separadas.
- Mitigações: manter domínio, persistência, autenticação e apresentação em módulos distintos; revisar após o primeiro vertical slice.

## Data
2026-09-28

## Status
Pendente

## Próximos passos
- Confirmar a estrutura real do repositório.
- Criar um vertical slice de perfil com testes.
- Revisar a decisão antes de iniciar funcionalidades de escala.
