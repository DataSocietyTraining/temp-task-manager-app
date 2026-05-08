// ─────────────────────────────────────────────
//  Task Controller
//
//  TODO: Implement each handler.
//        Import the model functions you need,
//        validate inputs, and send proper HTTP
//        status codes + JSON responses.
// ─────────────────────────────────────────────

import { Request, Response } from 'express';

export const getTasks = (req: Request, res: Response): void => {
  // TODO: Return all tasks (200)
};

export const getTask = (req: Request, res: Response): void => {
  // TODO: Return task by id (200) or 404 if not found
};

export const createTask = (req: Request, res: Response): void => {
  // TODO: Validate required fields, create task, return 201
};

export const updateTask = (req: Request, res: Response): void => {
  // TODO: Update task, return 200 or 404
};

export const deleteTask = (req: Request, res: Response): void => {
  // TODO: Delete task, return 204 or 404
};
