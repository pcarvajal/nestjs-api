import { Schema } from 'mongoose';

export const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    expirationDate: {
      type: Date,
      required: false,
    },
  },
  {
    versionKey: false,
  },
);
