import { patchTaskBodySchema } from '../schemas/task';

export function patchTask(req: Request, res: Response): void {
  // Validate id: must be a positive integer
  const idParam = req.params.id;
  const id = Number(idParam);
  if (!idParam || !/^[1-9]\d*$/.test(idParam) || !Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      error: 'invalid_id',
      message: 'Invalid task id',
    });
    return;
  }

  // Validate body using schema (rejects empty body)
  const result = patchTaskBodySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: 'validation_error',
      message: result.error.issues[0]?.message || 'Invalid request body',
      details: result.error.format(),
    });
    return;
  }

  // Find task
  const task = store.getTaskById(id);
  if (!task) {
    res.status(404).json({
      error: 'not_found',
      message: 'Task not found',
    });
    return;
  }

  // Only update allowed fields
  const allowedFields = ['text', 'description', 'completed', 'isHighImpact'];
  const patch: any = {};
  for (const key of allowedFields) {
    if (key in result.data) patch[key] = result.data[key as keyof typeof result.data];
  }

  const updated = store.updateTask(id, patch);
  if (!updated) {
    res.status(404).json({
      error: 'not_found',
      message: 'Task not found',
    });
    return;
  }
  res.status(200).json(updated);
}
import { Request, Response } from 'express';
import { createTaskBodySchema, patchTaskStatusBodySchema } from '../schemas/task';
import * as store from '../store/taskStore';

/**
 * Temporary helper so the starter app runs before learners implement the API.
 * Replace or reuse this after Copilot generates validation logic.
 */
function notImplemented(res: Response, feature: string): void {
  res.status(501).json({
    error: 'not_implemented',
    message: `${feature} is intentionally left for the Copilot exercise`,
  });
}

export function listTasks(_req: Request, res: Response): void {
  // Return all tasks as an array (200 with [] if none)
  const tasks = store.getTasks();
  res.status(200).json(tasks);
}

export function createTask(req: Request, res: Response): void {
  const result = createTaskBodySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: 'validation_error',
      message: 'Invalid request body',
      details: result.error.format(),
    });
    return;
  }
  const task = store.createTask(result.data);
  res.status(201).json(task);
}

export function patchTaskStatus(req: Request, res: Response): void {
  // Validate id: must be a positive integer
  const idParam = req.params.id;
  const id = Number(idParam);
  if (!idParam || !/^[1-9]\d*$/.test(idParam) || !Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      error: 'invalid_id',
      message: 'Invalid task id',
    });
    return;
  }

  // Validate body
  const result = patchTaskStatusBodySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: 'invalid_body',
      message: 'Invalid request body',
      details: result.error.format(),
    });
    return;
  }

  // Find task
  const task = store.getTaskById(id);
  if (!task) {
    res.status(404).json({
      error: 'not_found',
      message: 'Task not found',
    });
    return;
  }

  // Update status
  const updated = store.updateTask(id, { status: result.data.status } as any);
  // Defensive: if update fails, treat as not found
  if (!updated) {
    res.status(404).json({
      error: 'not_found',
      message: 'Task not found',
    });
    return;
  }
  res.status(200).json(updated);
  return;
}

export function removeTask(_req: Request, res: Response): void {
  
  // call store.deleteTask, return 204 for success and 404 when missing.
  notImplemented(res, 'DELETE /api/tasks/:id');
}
