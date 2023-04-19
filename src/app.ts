import express, { json, NextFunction, Request, Response } from "express";
import path from 'path';
import mongoose from 'mongoose';
import routes from "./routes/index";
import { IRequestCustom } from "utils/types";


const { PORT = 4444, MONGODB_URL = "mongodb://localhost:27017/mestodb" } =
  process.env;

const app = express();

app.use(json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  (req as IRequestCustom).user = {
    _id: '5d8b8592978f8bd833ca8133',
  };
  next();
});


async function start() {
  try {
    mongoose.set('strictQuery', false); //для теста
    await mongoose.connect(MONGODB_URL);
    console.log('База данных подключена');
    await app.listen(PORT);
    console.log('Сервер запущен', PORT);
  } catch (error) {
    console.log('Ошибка сервера', error);
  }
}

start()
