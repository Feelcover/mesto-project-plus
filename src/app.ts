import express, { json, Request, Response } from "express";
import path from 'path';
import mongoose from 'mongoose';


const { PORT = 4444, MONGODB_URL = "mongodb://localhost:27017/mestodb" } =
  process.env;

const app = express();

app.use(json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req: Request, res: Response) => {
  res.status(201).send("test");
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
