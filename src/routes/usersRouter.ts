import { Router } from 'express';
import { getByIdValidate, updateAvatarValidate, updateUserValidate } from '../validations/validationUser';
import {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getMe,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMe);
usersRouter.get('/:userId', getByIdValidate, getUserById);
usersRouter.patch('/me', updateUserValidate, updateUser);
usersRouter.patch('/me/avatar', updateAvatarValidate, updateUserAvatar);

export default usersRouter;
