import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    user: z.object({
      name: z.string().min(2, 'Name must be at least 2 characters long'),
      role: z.enum(['admin', 'user']).default('user'),
      email: z.string().email('Invalid email format'),
      password: z
        .string()
        .min(6, 'Password must be at least 6 characters long'),
      image: z.string().url().optional(),
      isDeleted: z.boolean().default(true),
      status: z.enum(['active', 'blocked']).default('active'),
    }),
  }),
});

export const UserValidation = {
  createUser,
};
