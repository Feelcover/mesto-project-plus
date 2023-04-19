import mongoose from "mongoose";
import { TCard } from "utils/types";

const cardSchema = new mongoose.Schema<TCard>({
  name:{},
  link: {},
  owner: {},
  likes: {},
  createdAt: {},
});

export default mongoose.model<TCard>("Card", cardSchema);