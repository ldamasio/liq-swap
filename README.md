# ORGANIZAÇÃO DOS PROJETOS

## Desafio 1

O diretório api contém a resposta para o Desafio 1. 
Trata-se de uma rota de API Gateway para criar um usuário.
Faz uso de servidor Node Express. 
O usuário poderá converter valores de moedas segundo as regras da API. 
Teste podem ser executados com `npm test`
Ao final do deploy, teremos a URL da API.

### Instação do projeto api

```
nvm use 18
npm i
npm test
node app.js
```

### Acessando a API Gateway no ambiente de desenvolvimento

```
## Convert 100 USD to EUR
POST http://localhost:3000/api/currency/convert
Content-Type: application/json

{
  "amount": 100,
  "sourceCurrency": "BRL",
  "targetCurrency": "USD"
}

GET http://localhost:3000/api/currency/symbols

GET https://api.exchangerate-api.com/v4/latest/USD

```


## Desafio 2

O diretório aws-serverless contém a resposta para o Desafio 2. 
Utiliza o modelo Serverless.
Propõe-se dinamicamente criar uma infraestrutura (liq-convert).
A localização geográfica da rede será na região us-east-1.

Foram definidas as seguintes especificações:

- permissões IAM,
- Funções Lambda (CreateUserFunction e SQSLambdaFunction),
- API Gateway, 
- Fila SQS,
- EventBridge,
- DynamoDB (UserTable),
- SQS queue (MySQSQueue). 

Teste podem ser executados com `npm test`
Ao final do deploy, teremos a URL da API Gateway.

### Instalão do projeto aws-serveless

```
sam local start-api
sam local invoke 
sam local invoke SQSLambdaFunction --event ./events/event.json
sam local start-lambda
sam deploy
```

### Acessando a API Gateway no ambiente de desenvolvimento

```
POST http://localhost:3000/createUser
Content-Type: application/json

{
    "email": "teste@example.com", 
    "password": "senha123",
    "payload": {"name": "usertest"}
}
```
