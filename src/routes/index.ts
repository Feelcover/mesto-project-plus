import { Request, Response, Router } from "express";
import cardsRouter from "./cardsRouter";
import userRoutes from "./usersRouter";

const routes = Router();

routes.use("/users", cardsRouter);
routes.use("/cards", userRoutes);
routes.use((req: Request, res: Response) =>
  res.status(404).send("Страница не найдена")
);


export default routes;
