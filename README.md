# FullStack Lab - DevPleno

### Construção de um BugTracker
- Construção de um gerenciador de bugs, desde a concepção (descrição do problema) até sua conclusão (utilizando integração com o google spreadsheet).

![Project](https://github.com/RenatoSiqueira/DevPleno_BugTracker/blob/master/bugtracker.gif)
![Project](https://github.com/RenatoSiqueira/DevPleno_BugTracker/blob/master/errorScreen.png)

### App Online
[Ver  Online](https://bugtracker.renatosiqueira.dev/)

### Upgrade em Junho/2020 - v2.0
- Atualização do pacote Google Spreadsheet
- Alteração do funcionamento para Async/Await
- Inclusão de Error Screen
- Redução de .env variables
- Melhorias na responsividade

### Assuntos Abordados
- Criação do Projeto
- Express
- Ejs
- Body Parser
- Google Spreadsheet
- Vercel

### Realizada em Novembro/2019 - v1.0

### Instruções Prévias
- Renomeie o .env-default para .env
- Preencha o docId com o id do seu documento google-spreadsheet
- Preencha o SENDGRID_API_KEY com seu KEY do [sendgrid](https://sendgrid.com/)
- Preencha os seguintes segundo sua conta Google
    - GOOGLE_PRIVATE_KEY
    - GOOGLE_SERVICE_ACCOUNT_EMAIL


### How to
```
# yarn
# yarn start
# acessar http://localhost:{PORTA_DEFINIDA_NO_ENV}
```
