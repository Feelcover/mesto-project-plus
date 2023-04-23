import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';


const authRouter = Router();



authRouter.post('/signup', createUser);
authRouter.post('/signin', ); //тут будет функция для входа


export default authRouter;


