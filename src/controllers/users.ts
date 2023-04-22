import { InternalServerErr } from "errors/errors";
import { NextFunction, Request, Response } from "express";
import { IRequest } from "utils/types";
import User from "../models/user";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().exec();
    if (users) {
      next(res.status(200).send({ data: users }));
    }
  } catch (err) {
    next(new InternalServerErr("На сервере произошла ошибка"));
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findById(req.params.userId);
    if (!users) {
      next(res.status(404).send("Пользователь не найден"));
    }
    next(res.status(200).json({ data: users }));
  } catch (err) {
    next(new InternalServerErr("На сервере произошла ошибка"));
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name, about, avatar } = req.body;
  try {
    if (!email || !password) {
      next(res.status(400).send("Проверьте данные пользователя"));
    }
    const isInDatabase = await User.findOne({ email });
    if (isInDatabase) {
      // такая почта уже зарегистрирована
    }
    const user = await User.create({ name, about, avatar });
    next(res.status(201).json({ data: user }));
  } catch (err) {
    next(new InternalServerErr("На сервере произошла ошибка"));
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const me = (req as IRequest).user?._id;
  try {
    if (!name || !about) {
      next(res.status(400).send("Проверьте данные пользователя"));
    }

    const user = await User.findByIdAndUpdate(
      me,
      { name, about },
      { new: true, runValidators: true }
    );
    if (!user) {
      next(res.status(404).send("Пользователь не найден"))
    }
    next(res.status(200).json({ data: user }));
  } catch (err) {
    next(new InternalServerErr("На сервере произошла ошибка"));
  }
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const me = (req as IRequest).user?._id;
  try {
    if (!avatar) {
      next(res.status(400).send("Проверьте ссылку на аватар"));
    }

    const user = await User.findByIdAndUpdate(
      me,
      { avatar },
      { new: true, runValidators: true }
    );
    if (!user) {
      next(res.status(404).send("Пользователь не найден"));
    }
    next(res.status(200).json({ data: user }));
  } catch (err) {
    next(new InternalServerErr("На сервере произошла ошибка"));
  }
};
