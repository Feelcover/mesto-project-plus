import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/types';

export const errHandler = (err:CustomError, req:Request, res:Response, next:NextFunction) => {
  const status = err.status || 500;
  const message = status === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(status).send({ message });
  next();
};
