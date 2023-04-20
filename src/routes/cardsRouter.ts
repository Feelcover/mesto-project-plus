import { getCards } from '../controllers/cards';
import { Router } from 'express';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', () => {"создаем"});
cardsRouter.put('/:cardId/likes', () => {"ставим лайк"});
cardsRouter.delete('/:cardId/likes', () => {"убираем лайк"});
cardsRouter.delete('/:cardId', () => {"удаляем карточку"});

export default cardsRouter;
