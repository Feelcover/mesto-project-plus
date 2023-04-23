import { Request, Response, Router } from 'express';
import authRouter from './authRouter';
import cardsRouter from './cardsRouter';
import usersRoutes from './usersRouter';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRouter);
routes.use('/', authRouter);
routes.use((req: Request, res: Response) => res.status(404).send('Страница не найдена'));

export default routes;
