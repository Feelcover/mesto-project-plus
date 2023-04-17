import express, { json, Request, Response } from "express";

const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017/mestodb" } =
  process.env;

const app = express();

app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.status(201).send('test');
});


app.listen(PORT, () => {
  console.log(`Номер порта ${PORT}, номер базы Mongo ${MONGO_URL}`)
})