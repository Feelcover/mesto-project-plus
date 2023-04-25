import NotFoundErr from "../errors/NotFoundErr";
import { NextFunction, Request, Response, Router } from "express";
import cardsRouter from "./cardsRouter";
import usersRoutes from "./usersRouter";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/cards", cardsRouter);
routes.use((req: Request, res: Response, next: NextFunction) =>
  next(new NotFoundErr("Страница не найдена"))
);

export default routes;
