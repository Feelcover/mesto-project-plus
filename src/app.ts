import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index";
import { testUserId } from "./utils/testUser";
import { DB_URL, PORT } from "./utils/constants";
import authMiddleware from "./middleware/authMiddleware";
import helmet from "helmet";
import { errorHandler } from "./errors/errHandler";
import { errLogger, reqLogger } from "./errors/loggers";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(reqLogger);
app.use(errLogger);
app.use(testUserId);
app.use(authMiddleware);
app.use(routes);
app.use(errorHandler);

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
