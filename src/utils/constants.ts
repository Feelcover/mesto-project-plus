import { NextFunction, Request, Response } from "express";
import { IRequestCustom } from "./types";

export const regExp = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;

export const testUserId = (req: Request, res: Response, next: NextFunction) => {
    (req as IRequestCustom).user = {
      _id: '5d8b8592978f8bd833ca8133',
    };
    next();
  }
