
import { z } from 'zod';

export const createTaskBodySchema = z.object({
	text: z.string(),
	description: z.string().optional(),
	completed: z.boolean().optional(),
	isHighImpact: z.boolean().optional(),
});

// PATCH /tasks/:id/status body schema
export const patchTaskStatusBodySchema = z.object({
  status: z.enum(['pending', 'in-progress', 'complete'])
});

// PATCH /tasks/:id body schema (for general updates)
export const patchTaskBodySchema = z.object({
	text: z.string().optional(),
	description: z.string().optional(),
	completed: z.boolean().optional(),
	isHighImpact: z.boolean().optional(),
}).refine(
	(data) => Object.keys(data).length > 0,
	{
		message: 'At least one field must be provided for update',
		path: [],
	}
);

