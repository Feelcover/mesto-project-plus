import { Request, Response } from "express";
import user from "../models/user";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await user.find().populate("_id").exec();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось найти пользователей",
    });
  }
};
