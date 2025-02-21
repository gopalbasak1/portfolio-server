import { model, Schema } from 'mongoose';
import { TProject } from './project.interface';

const projectSchema = new Schema<TProject>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
