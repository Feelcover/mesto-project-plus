import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { regExp } from '../utils/constants';
import { IUser, UserModel } from '../utils/types';
import UnauthorizedErr from '../errors/UnauthorizedErr';

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (valid: string) => validator.isEmail(valid),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
    validate: {
      validator: (valid: string) => valid.length > 2 && valid.length < 30,
      message: 'Текст короче 2 символов или длиннее 30',
    },
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
    validate: {
      validator: (valid: string) => valid.length > 2 && valid.length < 30,
      message: 'Текст короче 2 символов или длиннее 200',
    },
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (valid: string) => regExp.test(valid),
      message: 'Некорректная ссылка',
    },
  },
});

UserSchema.static(
  'findUserByCredentials',
  async function findUserByCredentials(email, password) {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      return Promise.reject(new UnauthorizedErr('Неверная почта или пароль'));
    }
    const toMatchPass = await bcrypt.compare(password, user.password);
    if (!toMatchPass) {
      return Promise.reject(new UnauthorizedErr('Неверная почта или пароль'));
    }
    return user;
  },
);

export default mongoose.model<IUser, UserModel>('User', UserSchema);
