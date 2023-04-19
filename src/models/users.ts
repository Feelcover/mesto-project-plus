import mongoose from "mongoose";
import { TUser } from "utils/types";


const UserSchema = new mongoose.Schema<TUser>({
  name:{},
  about:{},
  avatar:{},
})

export default mongoose.model<TUser>('User', UserSchema);
