import { InternalServerErr } from "errors/errors";
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
    return new InternalServerErr("На сервере произошла ошибка");
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
    return new InternalServerErr("На сервере произошла ошибка");
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      return res.status(400).send("Не удалось найти карточку");
    }
    return res.status(200).json({ data: card });
  } catch (err) {
    return new InternalServerErr("На сервере произошла ошибка");
  }
};

export const likeCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  const me = (req as IRequest).user?._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      {
        $addToSet: {
          likes: me,
        },
      },
      { new: true }
    );
    if (!card) {
      return res.status(400).send("Не удалось найти карточку");
    }
    return res.status(200).json({ data: card });
  } catch (err) {
    return new InternalServerErr("На сервере произошла ошибка");
  }
};

export const deleteLikeCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  const me = (req as IRequest).user?._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      {
        $pull: {
          likes: me,
        },
      },
      { new: true }
    );
    if (!card) {
      return res.status(400).send("Не удалось найти карточку");
    }
    return res.status(200).json({ data: card });
  } catch (err) {
    return new InternalServerErr("На сервере произошла ошибка");
  }
};
