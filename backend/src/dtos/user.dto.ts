import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  cpf: z.string().min(11)
});

export const updateUserSchema = z.object({
  name: z.string().min(3),
  password: z.string().min(8),
  cpf: z.string().min(11)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
