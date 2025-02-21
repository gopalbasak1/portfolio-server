import { z } from 'zod';

const createProject = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(10, { message: 'Description must be at least 10 characters' }),

    image: z.string(),
    liveLink: z.string(),
  }),
});

const updateProject = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(10, { message: 'Description must be at least 10 characters' })
      .optional(),

    image: z.string().optional(),
    liveLink: z.string().optional(),
  }),
});

export const ProjectValidation = {
  createProject,
  updateProject,
};
