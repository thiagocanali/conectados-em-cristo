Banco de Dados — Conectados em Cristo
Princípio

O banco deve separar claramente:

identidade;

perfil;

comunidade;

conteúdo;

atividades;

conexões;

comunicação;

fé;

segurança.

1. Identity
users
id
email
password_hash
status
created_at
updated_at
last_login_at


Nunca armazenar senha em texto puro.

2. Profile
profiles
id
user_id
display_name
birth_date
bio
city
state
country
avatar_url
visibility
created_at
updated_at


A localização exata nunca deve fazer parte do perfil público.

3. Interests
interests
id
name
slug
category
icon
status
created_at

user_interests
user_id
interest_id
created_at

4. Faith
faith_profiles
id
user_id
tradition
church_participation
faith_importance
community_participation
created_at
updated_at


Evitar coletar informações que não sejam necessárias para a experiência.

5. Communities
communities
id
name
slug
description
category
visibility
created_by
status
created_at
updated_at

community_members
community_id
user_id
role
status
joined_at


Roles:

member
moderator
admin
owner

6. Posts
posts
id
author_id
community_id
content
visibility
status
created_at
updated_at

comments
id
post_id
author_id
content
status
created_at
updated_at

reactions
id
user_id
post_id
type
created_at

7. Activities
activities
id
creator_id
community_id
title
description
type
start_at
end_at
max_participants
visibility
status
created_at

activity_participants
activity_id
user_id
status
joined_at

8. Events
events
id
organizer_id
community_id
title
description
city
region
location_type
start_at
end_at
max_participants
status
created_at

event_participants
event_id
user_id
status
joined_at


Nunca armazenar ou expor localização exata desnecessariamente.

9. Friendship
friendships
id
requester_id
receiver_id
status
created_at
accepted_at


Estados:

pending
accepted
declined
blocked

10. Romantic Interest
romantic_interests
id
from_user_id
to_user_id
status
created_at
updated_at


Estados:

pending
accepted
declined
withdrawn


A existência de interesse romântico não deve alterar automaticamente as permissões de privacidade.

11. Messaging
conversations
id
type
created_at
updated_at

conversation_members
conversation_id
user_id
joined_at

messages
id
conversation_id
sender_id
content
status
created_at

12. Prayer
prayer_requests
id
author_id
title
content
visibility
status
created_at
expires_at

prayer_supports
id
prayer_request_id
user_id
created_at

13. Devotionals
devotionals
id
title
content
author_id
status
published_at

reading_plans
id
title
description
duration_days
status

reading_plan_items
id
reading_plan_id
day_number
content_reference

reading_progress
id
user_id
reading_plan_id
item_id
completed_at

14. Quizzes
quizzes
id
title
description
category
status
created_at

quiz_questions
id
quiz_id
question
position

quiz_options
id
question_id
text
is_correct
position

quiz_attempts
id
quiz_id
user_id
score
started_at
completed_at

15. Safety
reports
id
reporter_id
target_user_id
target_type
target_id
reason
description
status
created_at

blocks
id
user_id
blocked_user_id
created_at

moderation_cases
id
target_type
target_id
priority
status
created_at
updated_at

moderation_actions
id
case_id
moderator_id
action
reason
created_at

16. Verification
verifications
id
user_id
type
status
provider
verified_at
expires_at
created_at


Tipos:

email
phone
identity
photo


A tabela deve registrar apenas o necessário.

17. Security
security_events
id
user_id
event_type
severity
metadata
created_at

risk_signals
id
user_id
signal_type
severity
source
created_at
resolved_at


O sistema de risco deve ser usado internamente para proteção e moderação.

Não expor um "score de caráter" aos usuários.

18. Notifications
notifications
id
user_id
type
title
body
reference_type
reference_id
read_at
created_at

19. Relações principais
USER
 ├── PROFILE
 ├── FAITH_PROFILE
 ├── INTERESTS
 ├── COMMUNITIES
 │    ├── POSTS
 │    ├── COMMENTS
 │    └── ACTIVITIES
 │
 ├── FRIENDSHIPS
 ├── ROMANTIC_INTERESTS
 ├── CONVERSATIONS
 ├── PRAYER_REQUESTS
 ├── READING_PROGRESS
 ├── QUIZ_ATTEMPTS
 │
 └── SECURITY
      ├── VERIFICATIONS
      ├── REPORTS
      ├── BLOCKS
      ├── RISK_SIGNALS
      └── SECURITY_EVENTS

20. Regra de arquitetura

Nenhum módulo de relacionamento deve ser capaz de ignorar as regras de:

privacidade;

bloqueio;

moderação;

autorização;

segurança.

A camada de segurança deve estar abaixo das funcionalidades sociais, e não ser implementada separadamente em cada tela.