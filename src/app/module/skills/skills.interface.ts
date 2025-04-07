import { Types } from 'mongoose';

export type TSkills = {
  title: string;
  description: string;
  skillList: {
    icon: string; // Store icon names as strings instead of JSX
    name: string;
  };
  user?: string | Types.ObjectId;
};
