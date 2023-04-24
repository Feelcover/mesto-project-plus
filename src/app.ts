import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import routes from './routes/index';
import { testUserId } from './utils/testUser';
import { DB_URL, PORT } from './utils/constants';

const app = express();

app.use(express.json());
app.use(testUserId); // тестовый пользователь
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

const start = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DB_URL);
    console.log('База данных подключена', DB_URL);
    await app.listen(PORT);
    console.log('Сервер запущен', PORT);
  } catch (err) {
    console.log('Ошибка подключения', err);
  }
};

start();
