import express from 'express';
import bodyParser from 'body-parser';
import authenticateUser from './authenticateUser.js'; // Добавляем расширение .js
// server.js

// import createTestUser from './createTestUser.js';

// // Вызываем функцию для создания тестового пользователя
// createTestUser()
//   .then(() => {
//     console.log('Тестовый пользователь успешно добавлен в базу данных');
//   })
//   .catch(error => {
//     console.error('Ошибка при добавлении тестового пользователя:', error);
//   });

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Укажите адрес вашего фронтенд приложения
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await authenticateUser(username, password);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
