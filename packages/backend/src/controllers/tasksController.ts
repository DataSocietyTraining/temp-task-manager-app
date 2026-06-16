import { Request, Response } from 'express';
import { createTaskBodySchema, deleteTaskParamsSchema, patchTaskBodySchema, patchTaskParamsSchema } from '../schemas/task';
import { createTask as createTaskInStore, deleteTask, getTasks, updateTask } from '../store/taskStore';

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

/**
 * Sends a consistent 400 validation-error response.
 *
 * Centralizes the `{ error: 'validation_error', message, details }` shape that
 * every handler returns on a failed schema check. The Module 3 lab refers to
 * this helper by name — the Task 3 green-phase prompt asks Copilot to reuse it,
 * and the refactor constraints require it "not be removed or moved" — so it
 * ships as provided infrastructure instead of being inlined in each handler.
 */
function sendValidationError(res: Response, message: string, details: unknown): void {
  res.status(400).json({
    error: 'validation_error',
    message,
    details,
  });
}

export function listTasks(_req: Request, res: Response): void {
  const tasks = getTasks();
  res.status(200).json(tasks);
}

export function createTask(req: Request, res: Response): void {
  const parseResult = createTaskBodySchema.safeParse(req.body);

  if (!parseResult.success) {
    sendValidationError(res, 'Request body validation failed', parseResult.error.issues);
    return;
  }

  const createdTask = createTaskInStore(parseResult.data);
  res.status(201).json(createdTask);
}

export function patchTask(req: Request, res: Response): void {
  const paramsResult = patchTaskParamsSchema.safeParse(req.params);
  if (!paramsResult.success) {
    sendValidationError(res, 'Route parameter validation failed', paramsResult.error.issues);
    return;
  }

  const bodyResult = patchTaskBodySchema.safeParse(req.body);
  if (!bodyResult.success) {
    sendValidationError(res, 'Request body validation failed', bodyResult.error.issues);
    return;
  }

  const updatedTask = updateTask(paramsResult.data.id, bodyResult.data);
  if (!updatedTask) {
    res.status(404).json({
      error: 'not_found',
      message: 'Task not found',
    });
    return;
  }

  res.json(updatedTask);
}

export function removeTask(req: Request, res: Response): void {
  const paramsResult = deleteTaskParamsSchema.safeParse(req.params);

  if (!paramsResult.success) {
    sendValidationError(res, 'Route parameter validation failed', paramsResult.error.issues);
    return;
  }

  const deleted = deleteTask(paramsResult.data.id);
  if (!deleted) {
    res.status(404).json({
      error: 'not_found',
      message: 'Task not found',
    });
    return;
  }

  res.status(204).send();
}
