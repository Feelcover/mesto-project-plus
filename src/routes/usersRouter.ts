import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

export default usersRouter;
