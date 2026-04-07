import { z } from 'zod';

export const orderSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
  status: z.string().min(3)
});
