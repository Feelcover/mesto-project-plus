import { Router } from 'express';
import { cardWithBodyValidate, cardWithIdValidate } from '../validations/validationCard';
import {
  createCard,
  deleteCard,
  deleteLikeCard,
  getCardById,
  getCards,
  likeCard,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.get('/:cardId',cardWithIdValidate, getCardById);
cardsRouter.post('/',cardWithBodyValidate, createCard);
cardsRouter.put('/:cardId/likes', cardWithIdValidate, likeCard);
cardsRouter.delete('/:cardId/likes',cardWithIdValidate, deleteLikeCard);
cardsRouter.delete('/:cardId',cardWithIdValidate, deleteCard);

export default cardsRouter;
