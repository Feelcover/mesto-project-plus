import { createUser, getAllUsers, getUserById } from '../controllers/users';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser)
usersRouter.patch('/me', (req, res) => {"обновляем профиль"})
usersRouter.patch('/me/avatar', (req, res) => {"обновляем аватар"})

export default usersRouter;
