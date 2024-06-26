const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.get('/', (req, res) => {
  res.send('Bem vindo a API Liqi Swap!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});