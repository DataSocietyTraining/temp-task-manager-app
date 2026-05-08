/**
 * Learner stub — same exports and types as the completed reference client:
 * `src/task-manager-app/frontend/src/api/tasksApi.ts`
 *
 * Implement each function using `fetch()` against your Express API. Vite proxies `/api`
 * to `http://localhost:3001` (see `vite.config.ts`).
 *
 * Until implemented: `fetchTasks` resolves to an empty list; mutations throw so the UI
 * error banner shows what to fix next.
 */
import type { Task } from '../types/task'

export const apiBase = import.meta.env.VITE_API_BASE_URL ?? ''

function notImplemented(name: string): Error {
  return new Error(
    `Learner stub: implement ${name} in src/api/tasksApi.ts — compare src/task-manager-app/frontend/src/api/tasksApi.ts`
  )
}

export async function fetchTasks(): Promise<Task[]> {
  // TODO(learner): GET /api/tasks — then delete the early return below.
  return []
}

export async function createTask(_text: string): Promise<Task> {
  throw notImplemented('createTask')
}

export async function patchTask(
  _id: number,
  _patch: Partial<Pick<Task, 'text' | 'completed' | 'isHighImpact'>>
): Promise<Task> {
  throw notImplemented('patchTask')
}

export async function deleteTask(_id: number): Promise<void> {
  throw notImplemented('deleteTask')
}
