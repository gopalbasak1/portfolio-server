import { z } from 'zod';

const createBlog = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(10, { message: 'Content must be at least 10 characters' }),

    image: z.string(),
    category: z.string({ required_error: 'Category is required' }),
  }),
});

const updateBlog = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(10, { message: 'Content must be at least 10 characters' })
      .optional(),

    image: z.string().optional(),
    category: z.string({ required_error: 'Category is required' }).optional(),
  }),
});

export const BlogValidation = {
  createBlog,
  updateBlog,
};
