import { Request, Response } from 'express';
import { IRequest } from 'utils/types';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().exec();
    if (users) {
      res.status(200).send({ data: users });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'На сервере произошла ошибка',
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const users = await User.findById(req.params.userId);
    if (!users) {
      return res.status(404).send('Пользователь не найден');
    }
    return res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'На сервере произошла ошибка',
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const {email, password, name, about, avatar } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send('Проверьте данные пользователя');
    }
    const user = await User.create({ name, about, avatar });
    return res.status(201).json({ data: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send('На сервере произошла ошибка');
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, about } = req.body;
  const me = (req as IRequest).user?._id;
  try {
    if (!name || !about) {
      return res.status(400).send('Проверьте данные пользователя');
    }

    const user = await User.findByIdAndUpdate(
      me,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res.status(404).send('Пользователь не найден');
    }
    return res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send('На сервере произошла ошибка');
  }
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;
  const me = (req as IRequest).user?._id;
  try {
    if (!avatar) {
      return res.status(400).send('Проверьте ссылку на аватар');
    }

    const user = await User.findByIdAndUpdate(
      me,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res.status(404).send('Пользователь не найден');
    }
    return res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send('На сервере произошла ошибка');
  }
};
