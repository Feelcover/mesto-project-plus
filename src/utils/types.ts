import { Request } from 'express';
import { Types } from 'mongoose';


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

export type TCard = {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
}

export interface IRequest extends Request {
  user?: {
    _id: string
  };
}
