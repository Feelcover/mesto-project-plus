import { Router } from 'express';
import {
  createCard,
  deleteCard,
  deleteLikeCard,
  getCards,
  likeCard,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', deleteLikeCard);
cardsRouter.delete('/:cardId', deleteCard);

export default cardsRouter;
