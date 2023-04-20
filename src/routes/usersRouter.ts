import { createUser, getAllUsers, getUserById, updateUser, updateUserAvatar } from '../controllers/users';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser)
usersRouter.patch('/me', updateUser)
usersRouter.patch('/me/avatar', updateUserAvatar)

export default usersRouter;
