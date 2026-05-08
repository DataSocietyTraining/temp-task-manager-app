// ─────────────────────────────────────────────
//  In-memory data store for Assignees
//
//  TODO: Mirror the pattern from taskModel.ts
// ─────────────────────────────────────────────

import { Assignee, CreateAssigneeBody, UpdateAssigneeBody } from '../types';

const assignees: Assignee[] = [];

export const getAllAssignees = (): Assignee[] => {
  // TODO
  throw new Error('Not implemented');
};

export const getAssigneeById = (id: string): Assignee | undefined => {
  // TODO
  throw new Error('Not implemented');
};

export const createAssignee = (body: CreateAssigneeBody): Assignee => {
  // TODO
  throw new Error('Not implemented');
};

export const updateAssignee = (
  id: string,
  body: UpdateAssigneeBody
): Assignee | undefined => {
  // TODO
  throw new Error('Not implemented');
};

export const deleteAssignee = (id: string): boolean => {
  // TODO
  throw new Error('Not implemented');
};
