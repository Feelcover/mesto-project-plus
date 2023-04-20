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

export const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = (req as IRequest).user?._id;
  try {
    if (!name || !link) {
      return res.status(400).send("Проверьте данные для создания карточки");
    }
    const card = await Card.create({ name, link, owner });
    return res.status(201).json({ data: card });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Не удалось создать карточку");
  };
  };