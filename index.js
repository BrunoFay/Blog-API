const express = require('express');

const app = express();
const errorMiddleware = require('./middlewares/genericErrorMiddleware');
const users = require('./controllers/userController');

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use('/user', users);
app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));