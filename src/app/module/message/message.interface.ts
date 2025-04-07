import { Types } from 'mongoose';

export type TMessage = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  user?: string | Types.ObjectId;
};
