import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Blog = model<TBlog>('Blog', blogSchema);

export default Blog;
