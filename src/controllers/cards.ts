import { NextFunction, Request, Response } from 'express';
import BadRequestErr from '../errors/BadRequestErr';
import ForbiddenError from '../errors/ForbiddenError';
import InternalServerErr from '../errors/InternalServerErr';
import NotFoundErr from '../errors/NotFoundErr';
import { IRequest } from '../utils/types';
import Card from '../models/card';

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find().exec();
    if (cards) {
      return res.send({ data: cards });
    }
  } catch (err) {
    next(new InternalServerErr('На сервере произошла ошибка'));
  }
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, link } = req.body;
  const owner = (req as IRequest).user?._id;
  try {
    if (!name || !link) {
      return next(new BadRequestErr('Проверьте данные для создания карточки'));
    }
    const card = await Card.create({ name, link, owner });
    return res.status(201).send({ statusCard: 'created', data: card });
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new BadRequestErr('Переданы некорректные данные при создании пользователя'));
    } else {
      next(err);
    }
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = (req as IRequest).user?._id;
  try {
    const card = await Card.findOne({ _id: cardId });
    if (!card) {
      return next(new NotFoundErr('Не удалось найти карточку'));
    }
    if (card.owner.toString() !== userId?.toString()) {
      return next(new ForbiddenError('Нет прав для удаления карточки'));
    }
    const result = await Card.deleteOne({ _id: cardId });
    if (result.deletedCount === 1) {
      return res.send({ statusCard: 'deleted', data: card });
    }
    return next(new NotFoundErr('Не удалось найти карточку'));
  } catch {
    next(new InternalServerErr('На сервере произошла ошибка'));
  }
};

export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
      { new: true },
    );
    if (!card) {
      return next(new NotFoundErr('Не удалось найти карточку'));
    }
    return res.send({ statusLike: 'added', data: card });
  } catch {
    next(new InternalServerErr('На сервере произошла ошибка'));
  }
};

export const deleteLikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
      { new: true },
    );
    if (!card) {
      return next(new NotFoundErr('Не удалось найти карточку'));
    }
    return res.send({ statusLike: 'deleted', data: card });
  } catch {
    next(new InternalServerErr('На сервере произошла ошибка'));
  }
};
