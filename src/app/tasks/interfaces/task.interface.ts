import { Document } from 'mongoose';

export interface Task extends Document {
  name: string;
  description: string;
  createdAt: Date;
  expirationDate?: Date;
}
