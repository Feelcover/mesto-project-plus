import { NextFunction, Request, Response } from 'express';
import { IRequestCustom } from './types';

export const testUserId = (req: Request, res: Response, next: NextFunction) => {
  (req as IRequestCustom).user = {
    _id: '6443f3fc6eba1f6b585d1f16',
  };
  next();
};
