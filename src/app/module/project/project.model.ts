import { model, Schema } from 'mongoose';
import { TProject } from './project.interface';

const projectSchema = new Schema<TProject>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Mern-Stack', 'Full-stack', 'Mobile-App'],
      required: true,
    },
    stack: [
      {
        name: {
          type: String,
        },
      },
    ],
    github: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    liveLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Project = model<TProject>('Project', projectSchema);

export default Project;
