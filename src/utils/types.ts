import { Request } from 'express';

export interface IRequestCustom extends Request {
  user?: {
    _id: string
  };
}

export type TUser = {
  name: string;
  about: string;
  avatar: string;
}