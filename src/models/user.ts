import mongoose from "mongoose";
import { regExp } from "../utils/constants";
import { TUser } from "../utils/types";

const UserSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: {
      validator: (valid: string) => valid.length > 2 && valid.length < 30,
      message: "Текст короче 2 символов или длиннее 30",
    },
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
    validate: {
      validator: (valid: string) => valid.length > 2 && valid.length < 200,
      message: "Текст короче 2 символов или длиннее 200",
    },
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (valid: string) => regExp.test(valid),
      message: "Некорректная ссылка",
    },
  },
});

export default mongoose.model<TUser>("User", UserSchema);
