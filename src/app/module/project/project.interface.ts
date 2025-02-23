import { Types } from 'mongoose';

export type TProject = {
  title: string;
  category: 'Frontend' | 'Backend' | 'Mern-Stack' | 'Full-stack' | 'Mobile-App';
  stack: { name: string }[]; // now an array of objects with a 'name' property
  github: string;
  description: string;
  image?: string;
  liveLink?: string;
  user?: string | Types.ObjectId;
};
