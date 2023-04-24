import { Router } from 'express';
import { createUserValidate, loginValidate } from '../validations/validationAuth';
import {
  createUser, login,
} from '../controllers/users';


const authRouter = Router();

authRouter.post('/signup', createUserValidate, createUser);
authRouter.post('/signin', loginValidate, login);


export default authRouter;


