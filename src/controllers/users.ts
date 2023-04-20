import { Request, Response } from "express";
import User from "../models/user";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().exec();
    if (users) {
      res.status(200).send({ data: users });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось найти пользователей",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const users = await User.findById(req.params.userId);
    if (!users) {
      return res.status(404).send("Пользователь не найден");
    }
    return res.json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось найти пользователя",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  try {
    if (!name || !about || !avatar) {
      return res.status(400).send("Проверьте данные пользователя");
    }
    const user = await User.create({ name, about, avatar });
    return res.status(201).json({ data: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Не удалось зарегестрироваться");
  };
  }

  export const updateUser = async (req: any, res: Response) => {
    const { name, about } = req.body;
    const me = req.user?._id;
    try {
      if (!name || !about) {
        return res.status(400).send("Проверьте данные пользователя");
      }

      const user = await User.findByIdAndUpdate(me, { name, about },{new:true, runValidators:true});
      if (!user) {
        return res.status(404).send("Пользователь не найден");
      }
      return res.json({ data: user });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Не удалось обновить данные пользователя");
    };
  };

  export const updateUserAvatar = async (req: any, res: Response) => {
    const { avatar } = req.body;
    const me = req.user?._id;
    try {
      if (!avatar) {
        return res.status(400).send("Проверьте ссылку на аватар");
      }

      const user = await User.findByIdAndUpdate(me, { avatar },{new:true, runValidators:true});
      if (!user) {
        return res.status(404).send("Пользователь не найден");
      }
      return res.json({ data: user });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Не удалось обновить аватар");
    };
  };