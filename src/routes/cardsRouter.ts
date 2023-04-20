import { createCard, deleteCard, getCards, likeCard } from '../controllers/cards';
import { Router } from 'express';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', () => {"убираем лайк"});
cardsRouter.delete('/:cardId', deleteCard);

export default cardsRouter;
