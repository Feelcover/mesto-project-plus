import { BadRequestErr, ForbiddenError, InternalServerErr, NotFoundErr } from "../errors/errors";
import { NextFunction, Request, Response } from "express";
import { IRequest } from "../utils/types";
import Card from "../models/card";
import { connected } from "process";

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
      next(new BadRequestErr("Проверьте данные для создания карточки"));
    }
    const card = await Card.create({ name, link, owner });
    return res.status(201).send({ statusCard: "created", data: card });
  } catch (err) {
    next(new InternalServerErr("На сервере произошла ошибка"));
  }
};
export const getCardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      next(new NotFoundErr("Карточка не найдена"));
    }
    return res.status(200).send({ data: { card } })
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
  const userId = (req as IRequest).user?._id;
  try {
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      next(new NotFoundErr("Не удалось найти карточку"));
    }
    if (card && card.owner.toString() !== userId?.toString()) {
      next(new ForbiddenError("Нет прав для удаления карточки"))
    } else {
      return res.status(200).send({statusCard: "deleted", data: card });
    }
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
  const user = (req as IRequest).user?._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      {
        $addToSet: {
          likes: user,
        },
      },
      { new: true }
    );
    if (!card) {
      next(new NotFoundErr("Не удалось найти карточку"));
    }
    return res.status(200).send({statusLike:"added", data: card });
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
      next(new NotFoundErr("Не удалось найти карточку"));
    }
    return res.status(200).send({statusLike:"deleted", data: card });
  } catch (err) {
    next(new InternalServerErr("На сервере произошла ошибка"));
  }
};
