import mongoose from 'mongoose';
import { regExp } from '../utils/constants';
import { TUser } from '../utils/types';
import validator from 'validator';

const UserSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (valid: string) => valid.length > 2 && valid.length < 30,
      message: 'Текст короче 2 символов или длиннее 30',
    },
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    validate: {
      validator: (valid: string) => valid.length > 2 && valid.length < 200,
      message: 'Текст короче 2 символов или длиннее 200',
    },
  },
  avatar: {
    type: String,
    validate: {
      validator: (valid: string) => regExp.test(valid),
      message: 'Некорректная ссылка',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate:{
      validator: (valid: string) => validator.isEmail(valid),
    },
  },
  password: {
    type: String,
    required: true,
    select:false,
  },
});

export default mongoose.model<TUser>('User', UserSchema);
