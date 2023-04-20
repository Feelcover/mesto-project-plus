import { createCard, deleteCard, getCards } from '../controllers/cards';
import { Router } from 'express';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.put('/:cardId/likes', () => {"ставим лайк"});
cardsRouter.delete('/:cardId/likes', () => {"убираем лайк"});
cardsRouter.delete('/:cardId', deleteCard);

export default cardsRouter;
