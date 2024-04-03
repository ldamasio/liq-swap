# liq-swap

# FUNCIONALIDADES

A API Liqi Swap 1.0 vem suprir a demanda por cotações monetárias.

O usuário pode converter os valores, por exemplo, de BRL para USD.

A documentação apresenta todos os símbolos de moedas disponíveis.

Com a API Liqi Swap você pode converter os valores de moedas com base na 
cotação atual, utilizando a versão 4 da Exchange Rate API.

# CARACTERÍSTICAS TÉCNICAS

Versão do Node: 18
Versão da API Exchange Rate: 4

# INSTALAÇÃO

nvm use 18
npm i
node server.js

# ROTAS

POST /api/currency/convert - Converte o valor de um montante de dinheiro em outra moeda.

GET /api/currency/symbols - Lista todas as moedas

## Exemplo Conversão:

Requisição:

```
POST http://localhost:3000/api/currency/convert
Content-Type: application/json

{
  "amount": 100,
  "sourceCurrency": "BRL",
  "targetCurrency": "USD"
}
```

Resposta:

```
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
```


## Exemplo Símbolos:

Requisição:

```
GET http://localhost:3000/api/currency/symbols
```

Resposta: 
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 985
ETag: W/"3d9-Lx4A5plSe+mfAxgPB5hqCkewaMo"
Date: Wed, 03 Apr 2024 16:40:52 GMT
Connection: close

{
  "symbols": [
    "USD",
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "FOK",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KID",
    "KMF",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLE",
    "SLL",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TVD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "UYU",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XCD",
    "XDR",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMW",
    "ZWL"
  ]
}
```

# TESTES

Para rodar testes, executar o comando:

`npm test`

Existem dois arquivos de testes, que usam a biblioteca Jest para executar 
testes unitários sobre os Controllers de conversão de valores de moedas e 
de listagem dos símbolos. 

Lista de Testes:
1. should return converted amount and currencies
2. should return error for invalid currency
3. should return error for missing parameters
4. should return error for API failure
5. should return list of currency symbols
6. should handle error when fetching currency symbols

# DETALHAMENTOS OPERACIONAIS

A justificativa para o uso da versão 4 é que ela permita realizar a consulta 
necessária para o cálculo da conversão sem a necessidade de consumir créditos. 



