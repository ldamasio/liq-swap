# liq-swap

# FUNCIONALIDADES

A API Liqi Swap 1.0 vem suprir a demanda por cotações monetárias.

O usuário pode converter os valores, por exemplo, de BRL para USD.

A documentação apresenta todos os símbolos de moedas disponíveis.

Com a API Liqi Swap você pode converter os valores de moedas com base na 
cotação atual, utilizando a versão 4 da Exchange Rate API.

# CARACTERÍSTICAS TÉCNICAS

Versão do Node: 18

# INSTALAÇÃO

nvm use 18
npm i
node server.js

# ROTAS

POST /api/currency/convert - Converte o valor de um montante de dinheiro em outra moeda.

GET /api/currency/symbols - Lista todas as moedas

## Exemplo:

Requisição:

`POST http://localhost:3000/api/currency/convert
Content-Type: application/json

{
  "amount": 100,
  "sourceCurrency": "BRL",
  "targetCurrency": "USD"
}
`

Resposta:

`
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 61
ETag: W/"3d-0/a/5RGtJZe0bVRwGEkuN9wVwu4"
Date: Wed, 03 Apr 2024 00:51:04 GMT
Connection: close

{
  "amount": 19.8,
  "sourceCurrency": "BRL",
  "targetCurrency": "USD"
}
`


