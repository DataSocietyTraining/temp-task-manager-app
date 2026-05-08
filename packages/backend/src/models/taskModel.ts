// ─────────────────────────────────────────────
//  In-memory data store for Tasks
//
//  TODO: Implement the following functions.
//        Each should operate on the `tasks` array
//        and return the appropriate value.
// ─────────────────────────────────────────────

import { Task, CreateTaskBody, UpdateTaskBody } from '../types';

// Seed data – feel free to modify
const tasks: Task[] = [];

export const getAllTasks = (): Task[] => {
  // TODO: Return all tasks
  throw new Error('Not implemented');
};

export const getTaskById = (id: string): Task | undefined => {
  // TODO: Find and return the task with the matching id
  throw new Error('Not implemented');
};

export const createTask = (body: CreateTaskBody): Task => {
  // TODO: Build a new Task object (generate id + timestamps),
  //       push it to the store, and return it
  throw new Error('Not implemented');
};

export const updateTask = (
  id: string,
  body: UpdateTaskBody
): Task | undefined => {
  // TODO: Find the task, apply changes, update `updatedAt`, and return it
  throw new Error('Not implemented');
};

export const deleteTask = (id: string): boolean => {
  // TODO: Remove the task from the store; return true if found, false otherwise
  throw new Error('Not implemented');
};
