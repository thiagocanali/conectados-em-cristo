# Roadmap

interesses → comunidades → atividades → pessoas → amizades

1. O que é o Conectados em Cristo?
2. Quem é o usuário?
3. Qual é a arquitetura que sustenta essa visão?

PROJECT_CONTEXT.md
        ↓
PRODUCT VISION
        ↓
MVP
        ↓
DATABASE MODEL
        ↓
API / BACKEND
        ↓
AUTH + SECURITY
        ↓
COMMUNITY
        ↓
ACTIVITIES
        ↓
CONNECTIONS
        ↓
RELATIONSHIPS


## Objetivo
Organizar a evolução do produto sem comprometer segurança, privacidade e propósito.

## Escopo inicial
- Fundação documental e arquitetural.
- Validação de público e jornadas.
- MVP de perfil, compatibilidade, conversa e segurança.

## Perguntas em aberto
- Ordem definitiva das funcionalidades.
- Critérios de sucesso por fase.

## Decisões pendentes
- Priorização após validação com usuários.

## TODOs
- Atualizar com marcos aprovados pelo produto.

Status: rascunho.

---

1. Definir muito bem "quem é o Conectados em Cristo"
Hoje temos uma visão funcional, mas falta uma personalidade de produto.

Eu definiria:

Não somos um aplicativo de namoro.

Não somos uma rede social genérica.

Não somos uma igreja online.

Somos uma comunidade cristã digital para pessoas se conectarem por fé, interesses e propósito.

Isso precisa aparecer em tudo: UX, textos, onboarding, marketing e arquitetura.

2. Onboarding precisa ser excelente
Eu não faria:

Nome → e-mail → senha → pronto.

O onboarding deveria descobrir a pessoa.

Algo como:

O que trouxe você para o Conectados?
Quero fazer novas amizades

Quero participar de uma comunidade

Quero compartilhar minha fé

Quero conhecer pessoas com interesses semelhantes

Quero encontrar alguém para um relacionamento

Quero aprender

Quero participar de atividades

Depois:

O que você gosta?
🎵 Música
📖 Bíblia
🏃 Esportes
🎮 Games
💻 Tecnologia
📚 Livros
☕ Café
🌎 Viagens

Depois:

Como você gostaria de participar?
Comunidades

Atividades

Eventos

Conversas

Estudos

Jogos

Isso imediatamente cria um perfil muito mais rico.

3. Não obrigar o usuário a declarar que está procurando namoro
Isso é muito importante para o posicionamento.

Em vez de:

"Você está procurando relacionamento?"

Poderia ser:

"O que você gostaria de encontrar aqui?"
E a pessoa pode escolher vários:

☑ Amizades
☑ Comunidade
☑ Pessoas com interesses semelhantes
☑ Atividades
☑ Estudos
☑ Relacionamento

Isso evita transformar todo mundo em potencial parceiro romântico.

4. Sistema de reputação — mas NÃO de popularidade
Eu não faria:

João — 4,9 ⭐

Isso transformaria pessoas em produtos.

Mas podemos ter histórico de participação comunitária, que é diferente.

Por exemplo:

Participa de 4 comunidades
Participou de 18 atividades
Criou 3 eventos
Está na plataforma há 8 meses

Sem dizer:

"João é uma pessoa 94% confiável."

A plataforma mostra comportamentos verificáveis, não um julgamento moral.

5. "Círculos de confiança"
Essa ideia poderia ficar muito interessante no futuro.

Uma pessoa pode decidir compartilhar determinadas informações progressivamente.

Nível 1
Perfil público.

Nível 2
Depois de amizade:

interesses adicionais;

algumas informações pessoais.

Nível 3
Depois de confiança:

redes sociais;

telefone;

informações pessoais.

A plataforma nunca deveria incentivar a pessoa a revelar tudo imediatamente.

6. Segurança para primeiro encontro
Se relacionamento fizer parte do produto, isso precisa existir.

Antes de um encontro:

🛡️ Encontro seguro
compartilhar o evento com alguém de confiança;

local público recomendado;

horário;

contato de emergência;

botão para sair rapidamente;

denunciar posteriormente;

não revelar endereço residencial.

E eu faria uma tela educativa:

Primeiro encontro? Algumas recomendações de segurança.

Isso é muito mais útil que simplesmente escrever "tenha cuidado".

7. Anti-golpe
Eu colocaria isso como um projeto próprio.

Existem padrões que merecem atenção:

pedido de dinheiro;

pedido de investimento;

urgência financeira;

tentativa insistente de tirar a conversa da plataforma;

links suspeitos;

múltiplas contas;

mensagens copiadas para muitos usuários;

comportamento sexual inadequado;

manipulação emocional.

O sistema pode gerar sinais internos para moderação, sem acusar automaticamente alguém de ser criminoso.

8. Proteção contra abuso entre usuários
Você precisa pensar em situações como:

"Não quero mais conversar."

O sistema deve tornar isso fácil.

Botões:
Bloquear

Denunciar

Encerrar conversa

Silenciar

Impedir novas solicitações

Não obrigar o usuário a justificar tudo.

9. Comunidades precisam de governança
Isso é algo que facilmente passa despercebido.

Se qualquer pessoa puder criar:

"Cristãos de Blumenau"

quem administra?

Quem pode apagar posts?

Quem pode expulsar membros?

Quem pode denunciar moderadores?

O que acontece se o dono abandonar a comunidade?

Você precisará de:

owner
admin
moderator
member

E também:

moderation policies
community rules
appeals
moderator actions
audit logs

10. Denúncia precisa ser realmente boa
Não faça apenas:

"Denunciar usuário"

Faça:

Por que você está denunciando?
Perfil falso

Golpe

Assédio

Conteúdo sexual

Discurso de ódio

Spam

Pedido de dinheiro

Comportamento ameaçador

Outro

E:

O que aconteceu?

A denúncia deve chegar a uma fila de moderação estruturada.

11. Privacidade e LGPD
Como você está pensando no Brasil, isso precisa entrar no projeto antes do lançamento, não depois.

Você terá dados potencialmente delicados relacionados a:

religião/crença;

relacionamento;

localização;

idade;

identidade;

mensagens;

comportamento.

Portanto, eu colocaria desde o início:

política de privacidade;

consentimento quando aplicável;

finalidade dos dados;

minimização;

retenção;

exclusão de conta;

exportação de dados quando aplicável;

controle de privacidade;

gestão de cookies;

registro de consentimentos.

E vale envolver um profissional jurídico especializado em LGPD antes do lançamento público.

12. Crianças e adolescentes
Eu definiria claramente a idade mínima.

Para um produto que envolve relacionamento, mensagens privadas e encontros, isso é particularmente importante.

Eu não deixaria isso para depois.

13. Denominação/tradição cristã
Aqui existe uma decisão estratégica.

Você tem no projeto a ideia de contemplar:

católicos;

ortodoxos;

protestantes/evangélicos.

Eu criaria o conceito:

"Minha tradição cristã"
E permitiria:

informar;

não informar;

selecionar mais de uma descrição quando fizer sentido.

Mas evitaria transformar a plataforma numa guerra denominacional.

Também criaria comunidades específicas quando houver demanda.

Exemplo:

Católicos

Batistas

Presbiterianos

Assembleia de Deus

etc.

Sem fazer uma tradição aparecer como "mais cristã" que outra dentro do produto.

14. Conteúdo precisa de curadoria
Se você colocar:

"Devocional do dia"

quem escreve?

Você terá que decidir entre:

conteúdo próprio;

autores convidados;

igrejas;

organizações;

conteúdo licenciado;

conteúdo gerado por usuários.

E, principalmente, definir:

quem pode ensinar o quê em nome da plataforma?

Eu separaria:

Conteúdo oficial

de

Conteúdo da comunidade

Isso evita confusão.

15. IA
Eu usaria IA, mas com bastante cuidado.

Ela pode ajudar em:

moderação;

classificação de conteúdo;

detecção de spam;

tradução;

recomendações;

busca;

organização de comunidades.

Mas eu evitaria inicialmente:

"IA determina se duas pessoas foram feitas uma para a outra."

Também evitaria IA fazendo julgamentos sobre espiritualidade ou caráter.

16. Busca
Você vai precisar de uma busca realmente boa.

A pessoa poderia pesquisar:

"pessoas que gostam de música"

"grupo de jovens"

"estudo bíblico"

"corrida"

"evento em Blumenau"

"devocional sobre ansiedade"

"pessoas que gostam de fotografia"

A busca pode se tornar uma das principais portas de entrada da plataforma.

17. Sistema de recomendações
Depois que houver dados suficientes:

Você pode gostar de:

🎸 Comunidade de músicos
12 pessoas conhecidas

📖 Estudo de Romanos
24 participantes

🏃 Corrida & Café
sábado

👤 5 pessoas com interesses semelhantes

Perceba que o algoritmo recomenda experiências, não apenas pessoas.

Essa é uma diferença enorme.

18. Notificações precisam ser muito bem pensadas
Eu evitaria:

"João está esperando você!"

"Você tem uma nova chance!"

"Não perca seu match!"

Isso é linguagem típica de apps de namoro e pode criar comportamento compulsivo.

Prefira:

"Ana comentou no estudo que você participa."

"O quiz começa em 30 minutos."

"Alguém respondeu seu pedido de oração."

"Nova atividade na comunidade Música & Fé."

19. Métrica principal
Eu não usaria:

DAU

ou:

número de matches

como principal indicador.

Uma métrica mais alinhada seria algo como:

Conexões significativas por usuário ativo
Uma "conexão significativa" poderia ser definida futuramente como uma combinação de ações:

participação em comunidade;

atividade;

conversa;

amizade;

contribuição;

retorno à comunidade.

Ainda precisaríamos validar essa definição com usuários reais.

20. E uma última coisa: o nome
Conectados em Cristo funciona muito bem conceitualmente porque comunica comunidade, mas eu ainda faria uma etapa antes de fechar a marca:

disponibilidade do domínio;

disponibilidade nas lojas;

marcas registradas;

redes sociais;

nomes semelhantes;

facilidade de pronúncia;

possibilidade de expansão internacional.

Não precisa trocar o nome. Só vale validar antes de investir pesado em branding.

Se fosse meu projeto, eu faria agora
Eu congelaria novas funcionalidades por um momento e faria esta sequência:

1. Visão do produto
        ↓
2. Personas
        ↓
3. Jornada do usuário
        ↓
4. Arquitetura
        ↓
5. Banco de dados
        ↓
6. Segurança / LGPD
        ↓
7. Design system
        ↓
8. MVP
        ↓
9. Teste com usuários reais
        ↓
10. Desenvolvimento

E tem uma coisa que eu acho que vale muito a pena fazermos antes de escrever mais código:

Criar 4 personas reais do Conectados em Cristo
Por exemplo:

Pedro, 24 — quer fazer amizades e participar de atividades.

Mariana, 29 — quer relacionamento sério, mas tem receio de golpes.

Lucas, 35 — casado, quer participar de comunidades e estudos.

Ana, 21 — quer conteúdo, jogos e conhecer outros jovens cristãos.

Isso nos obrigaria a responder:

"Por que cada uma dessas pessoas abriria o Conectados em Cristo amanhã?"

Se conseguirmos responder isso claramente, teremos uma base muito mais forte para decidir quais funcionalidades realmente entram no MVP e quais são apenas ideias legais.