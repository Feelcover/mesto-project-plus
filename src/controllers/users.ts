import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  BadRequestErr,
  InternalServerErr,
  NotFoundErr,
} from '../errors/errors';
import { IRequest } from '../utils/types';
import User from '../models/user';
import { JWT_SECRET } from '../utils/constants';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find().exec();
    if (users) {
      const usersWithoutEmail = users.map((user) => {
        const { email, ...userWithoutEmail } = user.toObject();
        return userWithoutEmail;
      });
      return res.status(200).send({ data: usersWithoutEmail });
    }
  } catch {
    next(new InternalServerErr('На сервере произошла ошибка'));
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      next(new NotFoundErr('Пользователь не найден'));
    }
    return res.status(200).send({
      data: {
        name: user?.name,
        about: user?.about,
        avatar: user?.avatar,
      },
    });
  } catch {
    next(new InternalServerErr('На сервере произошла ошибка'));
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  try {
    if (!email || !password) {
      next(new BadRequestErr('Проверьте данные пользователя'));
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: hashPass,
      name,
      about,
      avatar,
    });
    return res.status(201).send({
      data: {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      },
    });
  } catch {
    next(new InternalServerErr('На сервере произошла ошибка'));
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    res.status(200).send({
      token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }),
    });
  } catch {
    next(new InternalServerErr('На сервере произошла ошибка'));
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const me = (req as IRequest).user?._id;

  try {
    const user = await User.findById(me);
    if (!user) {
      next(new NotFoundErr('Пользователь не найден'));
    }
    return res.status(200).send({ data: user });
  } catch {
    next(new InternalServerErr('На сервере произошла ошибка'));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const me = (req as IRequest).user?._id;
  const { name, about } = req.body;
  try {
    if (!name && !about) {
      next(new BadRequestErr('Проверьте данные пользователя'));
    }

    const user = await User.findByIdAndUpdate(
      me,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      next(new NotFoundErr('Пользователь не найден'));
    }
    return res.status(200).send({ data: user });
  } catch {
    next(new InternalServerErr('На сервере произошла ошибка'));
  }
};

export const updateUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  const me = (req as IRequest).user?._id;
  try {
    if (!avatar) {
      next(new BadRequestErr('Проверьте ссылку на аватар'));
    }

    const user = await User.findByIdAndUpdate(
      me,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      next(new NotFoundErr('Пользователь не найден'));
    }
    return res.status(200).send({ data: user });
  } catch {
    next(new InternalServerErr('На сервере произошла ошибка'));
  }
};
