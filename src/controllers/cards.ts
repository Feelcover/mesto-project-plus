import { Request, Response } from "express";
import { IRequest } from "utils/types";
import Card from "../models/card";

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find().exec();
    if (cards) {
      res.status(200).send({ data: cards });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось найти карточки",
    });
  }
};
