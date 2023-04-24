import mongoose from 'mongoose';
import { regExp } from '../utils/constants';
import { TCard } from '../utils/types';

const cardSchema = new mongoose.Schema<TCard>({
  name: {
    type: String,
  },
  link: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<TCard>('Card', cardSchema);
