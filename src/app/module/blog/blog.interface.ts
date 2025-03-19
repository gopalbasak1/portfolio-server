import { Types } from 'mongoose';

export type TBlog = {
  title: string;
  content: string;
  imageUrls?: string[];
  category?: string;
  user?: string | Types.ObjectId;
};
