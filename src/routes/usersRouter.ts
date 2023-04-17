import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (req, res) => {"получаем всех юзеров"});
usersRouter.get('/:userId', (req, res) => {"получаем юзера по id"})
usersRouter.post('/', (req, res) => {"регистрируемся"})
usersRouter.patch('/me', (req, res) => {"обновляем профиль"})
usersRouter.patch('/me/avatar', (req, res) => {"обновляем аватар"})

export default usersRouter;
