import { z } from 'zod';

export const createTaskBodySchema = z.object({
  text: z.string().trim().min(1, 'text is required'),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  isHighImpact: z.boolean().optional(),
});

export const patchTaskBodySchema = z
  .object({
    text: z.string().trim().min(1).optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    isHighImpact: z.boolean().optional(),
  })
  .refine(
    (b) =>
      b.text !== undefined ||
      b.completed !== undefined ||
      b.isHighImpact !== undefined ||
      b.description !== undefined,
    {
      message: 'at least one of text, description, completed, isHighImpact is required',
    }
  );

export const taskIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});
