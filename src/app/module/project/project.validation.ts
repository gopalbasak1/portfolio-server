import { z } from 'zod';

const categories = [
  'Frontend',
  'Backend',
  'Mern-Stack',
  'Full-stack',
  'Mobile-App',
] as const;

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
    category: z.enum(categories, { required_error: 'Category is required' }),
    stack: z
      .array(
        z.object({
          name: z.string().min(1, 'Stack name is required'),
        }),
      )
      .min(1, { message: 'At least one stack technology is required' }),
    github: z.string().optional(),
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
    category: z
      .enum(categories, { required_error: 'Category is required' })
      .optional(),
    stack: z
      .array(
        z.object({
          name: z.string().min(1, 'Stack name is required'),
        }),
      )
      .min(1, { message: 'At least one stack technology is required' })
      .optional(),
    github: z.string().optional(),
  }),
});

export const ProjectValidation = {
  createProject,
  updateProject,
};
