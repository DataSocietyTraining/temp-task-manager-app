import { Request, Response } from 'express';
import { createTaskBodySchema, patchTaskBodySchema, taskIdParamSchema } from '../schemas/task';
import * as store from '../store/taskStore';

function sendValidationError(res: Response, message: string, details?: unknown): void {
  res.status(400).json({ error: 'validation_error', message, details });
}

export function listTasks(_req: Request, res: Response): void {
  res.json(store.getTasks());
}

export function createTask(req: Request, res: Response): void {
  const parsed = createTaskBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, 'Invalid request body', parsed.error.flatten());
    return;
  }
  const task = store.createTask(parsed.data);
  res.status(201).json(task);
}

export function patchTask(req: Request, res: Response): void {
  const params = taskIdParamSchema.safeParse(req.params);
  if (!params.success) {
    sendValidationError(res, 'Invalid task id', params.error.flatten());
    return;
  }
  const body = patchTaskBodySchema.safeParse(req.body);
  if (!body.success) {
    sendValidationError(res, 'Invalid request body', body.error.flatten());
    return;
  }
  const updated = store.updateTask(params.data.id, body.data);
  if (!updated) {
    res.status(404).json({ error: 'not_found', message: `Task ${params.data.id} not found` });
    return;
  }
  res.json(updated);
}

export function removeTask(req: Request, res: Response): void {
  const params = taskIdParamSchema.safeParse(req.params);
  if (!params.success) {
    sendValidationError(res, 'Invalid task id', params.error.flatten());
    return;
  }
  const removed = store.deleteTask(params.data.id);
  if (!removed) {
    res.status(404).json({ error: 'not_found', message: `Task ${params.data.id} not found` });
    return;
  }
  res.status(204).send();
}
