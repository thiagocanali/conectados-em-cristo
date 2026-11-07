# Classificação de privacidade — Conectados em Cristo

- Revisão: 2026-11-07
- Estado: baseline inicial; inventário final e prazos exigem revisão jurídica e operacional.
- Princípio: classificar pelo pior dano plausível em caso de acesso indevido, não pela facilidade de coleta.

## 1. Classes de dados

| Classe | Exemplos | Padrão de acesso | Regras |
|---|---|---|---|
| Público | Nome de exibição, foto marcada como pública, biografia aprovada, metadados de comunidade pública | Visitantes e membros, conforme configuração | Publicação explícita pelo titular; nunca incluir contato/endereço ou campos internos |
| Pessoal | E-mail, telefone, data de nascimento, cidade, idioma, preferências de conta | Titular e serviços estritamente necessários | Minimizar; não expor por API pública; verificar finalidade e retenção |
| Sensível | Tradição/convicção religiosa, práticas de fé, pedidos de oração, conteúdo que revele saúde, sofrimento ou vida íntima | Titular por padrão; compartilhamento granular e explícito | Acesso mínimo; sem analytics/logs/e-mail por padrão; revisão jurídica antes de coleta real |
| Confidencial de moderação | Denúncias, evidências, notas, decisões, recursos, sinais antifraude | Denunciante apenas no estado permitido; moderadores designados/admin conforme caso | Fila restrita, segregação de função, auditoria e retenção limitada |
| Segurança/segredo | Tokens, sessões, códigos de recuperação, secrets, chaves, eventos de segurança | Serviço responsável e operadores autorizados em exceções | Nunca no frontend/logs; rotação, escopo mínimo e armazenamento seguro |
| Agregado | Contagens de membros, publicações ou reações | Público/membros conforme risco | Só divulgar se não permitir reidentificação; sem lista nominal por padrão |

## 2. Classificação inicial por domínio

| Domínio | Dados | Classe mínima | Observação |
|---|---|---|---|
| Conta | ID interno, e-mail, status, provedor externo | Pessoal / segurança | ID não é autorização |
| Perfil | Nome de exibição, bio, foto pública, cidade aproximada | Público ou pessoal por campo | Cada campo tem visibilidade própria |
| Fé | Tradição, denominação, práticas, frequência, crenças | Sensível | Não tornar público por padrão sem escolha clara |
| Preferências | Distância, objetivos, família, compatibilidade | Pessoal ou sensível conforme campo | Coletar somente se necessário ao MVP |
| Comunidade | Nome, descrição, categoria, regras | Público ou pessoal | Catálogo público não revela membros ou posts |
| Membership | User ID, comunidade, papel, estado, datas | Pessoal/confidencial | Não expor diretório nominal |
| Publicação/comentário | Texto, anexos, autor, comunidade | Público, membro ou restrito conforme comunidade | Aplicar política de visibilidade e moderação |
| Reação | Membro, post, data | Pessoal/interno | Expor apenas agregado seguro (F-10) |
| Oração | Texto, autor, pessoas mencionadas, categoria | Sensível | Privado por padrão; não enviar em notificações sem opt-in |
| Denúncia | Motivo, conteúdo, denunciante, denunciado, evidências | Confidencial de moderação | Acesso por caso, finalidade e papel |
| Moderação | Ação, motivo, prazo, recurso, moderador | Confidencial | Auditável; conflito de interesse (F-08) |
| Logs | Request ID, ator pseudônimo, ação, status | Segurança | Não registrar payload sensível, tokens ou texto privado |
| Backup | Cópias de todas as classes | Mesma classe do dado original | Criptografia, acesso mínimo, retenção e descarte documentados |

## 3. Regras de minimização

- Não coletar endereço residencial, coordenada exata, documentos, contatos ou informações financeiras para o MVP sem finalidade e aprovação específicas.
- Preferir cidade/região aproximada a localização precisa.
- Não coletar informações de terceiros em pedidos de oração além do estritamente necessário; orientar o usuário a evitar identificadores.
- Não coletar informações de saúde ou vida íntima para fins de compatibilidade sem necessidade, base legal e revisão jurídica.
- Não inferir crença, maturidade, caráter ou risco moral a partir de comportamento ou conteúdo.
- Não usar dados sensíveis em analytics, logs, ranking ou treinamento de modelos.
- Dados de compatibilidade devem ser explicáveis, limitados e não apresentados como autoridade sobre relacionamentos.

## 4. Acesso e compartilhamento

- Titular: acesso aos próprios dados e controles de privacidade.
- Visitante: somente metadados explicitamente públicos.
- Membro: dados públicos e conteúdo das comunidades em que possui membership válido.
- Moderador: somente dados necessários para casos das comunidades atribuídas; impedimento por conflito F-08.
- Administrador: acesso global restrito, justificado e auditado; sem leitura rotineira de pedidos de oração privados.
- Suporte: não é papel aprovado no beta; qualquer função futura exige escopo mínimo e decisão própria.
- Provedores: somente dados necessários ao serviço, com contrato, região e avaliação de transferência internacional.

## 5. Retenção e direitos

Prazos numéricos não estão aprovados. Definir por categoria, finalidade e obrigação legal antes de dados reais:
- conta ativa e dados de perfil;
- conta encerrada e solicitação de exclusão;
- conteúdo removido e evidência mínima de denúncia ativa;
- denúncias, sanções e recursos;
- logs de segurança e auditoria;
- backups e cópias de recuperação;
- mensagens/notificações futuras.

A exclusão deve considerar ocultação rápida, exclusão/anonymização, preservação mínima excepcional e propagação para backups conforme política validada. Não prometer exclusão imediata de cópias imutáveis sem confirmar o desenho técnico.

## 6. Revisões necessárias

- **REVISÃO JURÍDICA NECESSÁRIA:** bases legais, dados pessoais sensíveis, consentimento, direitos do titular, menores/18+, retenção, transferência internacional e termos.
- **REVISÃO OPERACIONAL NECESSÁRIA:** quem acessa denúncias, evidências e pedidos de oração em incidentes; como registrar e auditar exceções.
- **REVISÃO TÉCNICA NECESSÁRIA:** inventário completo de campos, classificação por endpoint, criptografia, backup/restore e descarte.

**Status:** baseline de classificação registrado; inventário final, prazos e bases legais pendentes.
