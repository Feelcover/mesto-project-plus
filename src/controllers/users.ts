import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BadRequestErr from '../errors/BadRequestErr';
import NotFoundErr from '../errors/NotFoundErr';
import { IRequest } from '../utils/types';
import User from '../models/user';
import { JWT_SECRET } from '../utils/constants';
import ConflictErr from '../errors/ConflictErr';
import InternalServerErr from '../errors/InternalServerErr';

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
      return res.send({ data: usersWithoutEmail });
    }
  } catch (err) {
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
      return next(new NotFoundErr('Пользователь не найден'));
    }
    return res.send({
      data: {
        name: user?.name,
        about: user?.about,
        avatar: user?.avatar,
      },
    });
  } catch (err) {
    next(err);
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
      return next(new BadRequestErr('Проверьте данные пользователя'));
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
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new BadRequestErr('Переданы некорректные данные при создании пользователя'));
    } else if (err instanceof Error && err.message.includes('email_1')) {
      next(new ConflictErr('Пользователь с таким email существует'));
    } else {
      next(err);
    }
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
    res.send({
      token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }),
    });
  } catch (err) {
    next(err);
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
      return next(new NotFoundErr('Пользователь не найден'));
    }
    return res.send({ data: user });
  } catch (err) {
    next(err);
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
      return next(new BadRequestErr('Проверьте данные пользователя'));
    }

    const user = await User.findByIdAndUpdate(
      me,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoundErr('Пользователь не найден'));
    }
    return res.send({ data: user });
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new BadRequestErr('Переданы некорректные данные при обновлении профиля'));
    } else {
      next(err);
    }
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
      return next(new BadRequestErr('Проверьте ссылку на аватар'));
    }

    const user = await User.findByIdAndUpdate(
      me,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoundErr('Пользователь не найден'));
    }
    return res.send({ data: user });
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new BadRequestErr('Переданы некорректные данные при обновлении аватара'));
    } else {
      next(err);
    }
  }
};
