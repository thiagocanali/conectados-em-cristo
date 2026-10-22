# conectados-em-cristo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Estado funcional e limites do protótipo

O projeto é atualmente um protótipo Vue executado inteiramente no navegador. Cadastro, sessão, perfis, questionários, perfis salvos, bloqueios e preferências usam `localStorage`; portanto, os dados existem apenas no navegador e no dispositivo em que foram criados. Limpar os dados do navegador remove essas informações e usuários em navegadores/dispositivos diferentes não se enxergam.

**Não use este protótipo para armazenar dados sensíveis ou como autenticação de produção.** O armazenamento local não fornece autenticação segura, autorização no servidor, sincronização entre dispositivos, recuperação de senha ou moderação centralizada. As senhas do protótipo não são protegidas por um serviço de autenticação. Pedidos de oração compartilhados permanecem desativados.

### Fluxos locais disponíveis

1. Criar uma conta de demonstração e entrar/sair.
2. Criar ou editar o perfil e torná-lo disponível à descoberta local.
3. Descobrir outros perfis criados no mesmo navegador, salvar perfis, registrar interesse e bloquear perfis.
4. Responder ao questionário e calcular uma pontuação indicativa entre contas locais com respostas completas.
5. Continuar o teste de dons com progresso armazenado por conta.

### Para uso real

Antes de convidar usuários, integrar um provedor de autenticação e uma API/backend com banco de dados, autorização por usuário, validação server-side, recuperação de conta, regras de privacidade, moderação de denúncias e backups. Não colocar chaves administrativas ou segredos no bundle frontend. A integração depende da escolha e configuração do provedor; nenhuma credencial de backend está configurada neste repositório.
