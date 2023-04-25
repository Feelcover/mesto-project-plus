import { celebrate, Joi } from 'celebrate';
import { regExp } from '../utils/constants';

export const cardWithBodyValidate = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(regExp),
    }),
});

export const cardWithIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});
