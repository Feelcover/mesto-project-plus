import { InternalServerErr } from "../errors/errors";
import { NextFunction, Request, Response } from "express";
import { IRequest } from "utils/types";
import Card from "../models/card";

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cards = await Card.find().exec();
    if (cards) {
      return res.status(200).send({ data: cards });
    }
  } catch (err) {
    next(new InternalServerErr("На сервере произошла ошибка"));
  }
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  const owner = (req as IRequest).user?._id;
  try {
    if (!name || !link) {
      next(res.status(400).send("Проверьте данные для создания карточки"));
    }
    const card = await Card.create({ name, link, owner });
    return res.status(201).json({ data: card });
  } catch (err) {
    next(new InternalServerErr("На сервере произошла ошибка"));
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      next(res.status(400).send("Не удалось найти карточку"));
    }
    return res.status(200).json({ data: card });
  } catch (err) {
    next(new InternalServerErr("На сервере произошла ошибка"));
  }
};

export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      next(res.status(400).send("Не удалось найти карточку"));
    }
    return res.status(200).json({ data: card });
  } catch (err) {
    next(new InternalServerErr("На сервере произошла ошибка"));
  }
};

export const deleteLikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      next(res.status(400).send("Не удалось найти карточку"));
    }
    return res.status(200).json({ data: card });
  } catch (err) {
    next(new InternalServerErr("На сервере произошла ошибка"));
  }
};
