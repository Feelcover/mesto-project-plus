import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';

export interface IRequestCustom extends Request {
  user?: {
    _id: string;
  };
}

export interface IUser {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}

export type TCard = {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  createdAt: Date;
};

export interface IRequest extends Request {
  user?: {
    _id: string;
  };
}

export interface ISessionRequest extends Request {
  user?: string | JwtPayload;
}

export interface UserModel extends mongoose.Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string
  ) => Promise<mongoose.Document<any, any, IUser>>;
}
