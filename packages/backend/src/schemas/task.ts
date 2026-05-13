import { z } from 'zod';
import type { CreateTaskBody, DeleteTaskParams, PatchTaskBody, PatchTaskParams } from '../types/task';

export const createTaskBodySchema: z.ZodType<CreateTaskBody> = z.object({
  text: z.string(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  isHighImpact: z.boolean().optional(),
});

export const patchTaskBodySchema: z.ZodType<PatchTaskBody> = z
  .object({
    text: z.string().optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    isHighImpact: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Request body must contain at least one field',
    path: [],
  });

export const patchTaskParamsSchema: z.ZodType<PatchTaskParams> = z.object({
  id: z.coerce.number().int(),
});

export const deleteTaskParamsSchema: z.ZodType<DeleteTaskParams> = z.object({
  id: z.coerce.number().int(),
});
