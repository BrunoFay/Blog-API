const express = require('express');

const app = express();
const errorMiddleware = require('./middlewares/genericErrorMiddleware');
const users = require('./controllers/userController');
const login = require('./controllers/loginController');
const categories = require('./controllers/categoryController');
const posts = require('./controllers/blogPostController');

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use('/login', login);
app.use('/user', users);
app.use('/categories', categories);
app.use('/post', posts);
app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));