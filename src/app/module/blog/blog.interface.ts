import { Types } from 'mongoose';

export type TBlog = {
  title: string;
  content: string;
  image?: string;
  category?: string;
  user?: string | Types.ObjectId;
};
