import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    user: z.object({
      name: z
        .string({ required_error: 'Name is required' })
        .min(2, 'Name must be at least 2 characters long'),
      role: z.enum(['admin', 'user']).default('user'),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),
      phoneNumber: z.string({ required_error: 'Phone Number is required' }),
      password: z
        .string()
        .min(6, 'Password must be at least 6 characters long'),
      image: z.string().optional(),
      isDeleted: z.boolean().default(true),
      status: z.enum(['active', 'blocked']).default('active'),
    }),
  }),
});

const updateUser = z.object({
  body: z.object({
    user: z.object({
      name: z
        .string({ required_error: 'Name is required' })
        .min(2, 'Name must be at least 2 characters long')
        .optional(),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format')
        .optional(),
      phoneNumber: z
        .string({ required_error: 'Phone Number is required' })
        .optional(),
      image: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createUser,
  updateUser,
};
