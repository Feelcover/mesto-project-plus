import express, { json } from "express";

const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017/mestodb" } =
  process.env;

const app = express();

app.use(json());
