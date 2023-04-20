import { NextFunction, Request, Response } from "express";
import { IRequestCustom } from "./types";

export const regExp = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;

export const testUserId = (req: Request, res: Response, next: NextFunction) => {
    (req as IRequestCustom).user = {
      _id: '64414faf42c7df17c6acd981',
    };
    next();
  }
