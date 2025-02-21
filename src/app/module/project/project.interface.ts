import { Types } from 'mongoose';

export type TProject = {
  title: string;
  description: string;
  image?: string;
  liveLink?: string;
  user?: string | Types.ObjectId;
};
