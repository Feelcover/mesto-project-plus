/* eslint-disable no-console */
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import { errors } from "celebrate";
import routes from "./routes/index";
import { DB_URL, PORT } from "./utils/constants";
import authMiddleware from "./middleware/authMiddleware";
import { errHandler } from "./errors/errHandler";
import { errLogger, reqLogger } from "./errors/loggers";
import {
  createUserValidate,
  loginValidate,
} from "./validations/validationAuth";
import { createUser, login } from "./controllers/users";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(reqLogger);
app.post("/signup", createUserValidate, createUser);
app.post("/signin", loginValidate, login);
app.use(authMiddleware);
app.use(routes);
app.use(errLogger);
app.use(errors());
app.use(errHandler);

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_URL);
    console.log("База данных подключена", DB_URL);
    await app.listen(PORT);
    console.log("Сервер запущен", PORT);
  } catch (err) {
    console.log("Ошибка подключения", err);
  }
};

start();
