import mongoose from 'mongoose';
import { IUser, UserModel } from '../utils/types';
import { UnauthorizedErr } from '../errors/errors';
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select:false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

UserSchema.static("findUserByCredentials", async function findUserByCredentials(email, password) {
const user = await this.findOne({email}).select("+password");
const toMatchPass = await bcrypt.compare(password, user.password);
if (!user || !toMatchPass) {
  return Promise.reject(new UnauthorizedErr("Неверная почта или пароль"));
}
return user;
});



export default mongoose.model<IUser, UserModel>('User', UserSchema);
