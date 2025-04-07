import { model, Schema } from 'mongoose';

import { TSkills } from './skills.interface';

const skillSchema = new Schema<TSkills>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    skillList: [
      {
        icon: { type: String, required: true }, // Store icon name (not JSX)
        name: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }, // Adds createdAt & updatedAt fields
);

const Skill = model<TSkills>('Skill', skillSchema);

export default Skill;
