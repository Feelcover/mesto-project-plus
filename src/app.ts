import express, { json, NextFunction, Request, Response } from "express";
import path from 'path';
import mongoose from 'mongoose';
// import routes from "./routes/index";
import { IRequestCustom } from "utils/types";


const { PORT = 4444, DB_URL = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env;

const app = express();

app.use(json());
// app.use(routes);

// app.use((req: Request, res: Response, next: NextFunction) => {
//   (req as IRequestCustom).user = {
//     _id: '5d8b8592978f8bd833ca8133',
//   };
//   next();
// });
app.use(express.static(path.join(__dirname, 'public')));


async function start() {
  try {
    mongoose.set('strictQuery', false); //для теста
    await mongoose.connect(DB_URL);
    console.log('База данных подключена');
    await app.listen(PORT);
    console.log('Сервер запущен', PORT);
  } catch (err) {
    console.log('Ошибка сервера', err);
  }
}

start();
