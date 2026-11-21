# ADR-0015 — Auth independente do Supabase no Neon

- Data: 2026-11-15
- Estado: decisão de implementação, **não** liberação para produção
- Substitui a preferência por autenticação gerenciada descrita em D-14, apenas para a implementação desta migração.

## Contexto

O requisito atual é remover dependências de Supabase, incluindo Auth, e utilizar Neon PostgreSQL. A API é Fastify e o cliente é Vue; a aplicação ainda não oferece cadastro/login reais. O contrato de identidade interna em `server/src/auth/identity.mts` continua válido.

## Decisão

Adotar **Better Auth**, com persistência PostgreSQL no Neon, por trás da API. A sessão será validada no servidor; dados de identidade enviados pelo navegador nunca serão tratados como prova de autenticação. A identidade validada será associada a uma conta interna por UUID. Usuários suspensos/restritos não terão acesso às operações protegidas.

Implementar em etapas: schema de autenticação versionado, integração Fastify, cookies seguros e proteção CSRF/origens, registro/login, verificação de e-mail, recuperação, revogação, MFA de equipe e testes de isolamento. Nenhuma etapa incompleta será exposta ao público.

## Segurança e operações

- Credenciais, segredo de sessão e URL direta do Neon somente em ambiente servidor; separar preview e produção.
- Cookies HttpOnly, Secure em HTTPS e SameSite apropriado; rejeitar origens não autorizadas.
- Nunca registrar tokens, cookies ou senhas em logs.
- E-mail transacional e MFA são bloqueadores para beta público, não devem ser simulados.
- Revisar requisitos LGPD, retenção, exclusão e incidentes antes do lançamento.
- Manter Supabase como rollback até aprovação explícita do corte.
- Evitar deploys Vercel por commit; validar com GitHub Actions.

## Consequências

A equipe assume operação e manutenção de segurança do provedor self-hosted. O custo de licença pode ser menor, mas há custo de manutenção, envio de e-mail, monitoramento e resposta a incidentes. A escolha não equivale a autenticação implementada ou testada.
