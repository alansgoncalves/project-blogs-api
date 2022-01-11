const express = require('express');
const userCreate = require('./src/routes/userCreate');
const userLogin = require('./src/routes/userLogin');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use('/user', userCreate);
app.use('/login', userLogin);

app.listen(3000, () => console.log('ouvindo porta 3000!'));