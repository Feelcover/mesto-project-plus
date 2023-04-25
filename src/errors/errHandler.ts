import { NextFunction, Request, Response } from 'express';

export const errHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
  const statusCode = res.statusCode || 500;
  const message = statusCode === 500 ? "На сервере произошла ошибка" : err.message;
  res.status(statusCode).send({ message });
    next();
  };
