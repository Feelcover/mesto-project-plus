import { InternalServerErr } from "./errors";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (req:Request, res:Response, next:NextFunction) => {
  if(req.xhr) {
    next(new InternalServerErr("На сервере произошла ошибка"))
  }else{
    next();
  }
};