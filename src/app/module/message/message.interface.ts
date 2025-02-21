import { Types } from 'mongoose';

export type TMessage = {
  name: string;
  email: string;
  message: string;
  user?: string | Types.ObjectId;
};
