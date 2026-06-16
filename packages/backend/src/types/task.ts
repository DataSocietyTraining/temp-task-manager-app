/**
 * The Task entity stored by the app.
 *
 * This is provided infrastructure (the in-memory store in `store/taskStore.ts`
 * imports it) and is intentionally NOT part of the learner exercise. It must be
 * exported so the starter type-checks and builds out of the box — without it,
 * `taskStore.ts` fails to compile (`types/task.ts` is not a module / has no
 * exported member 'Task'), which silently breaks `pnpm build:backend` and
 * `pnpm check`.
 */
export interface Task {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  isHighImpact: boolean;
}

/**
 * POST /tasks
 * Creates a new task.
 *
 * @body text - Required task text.
 * @body description - Optional task details.
 * @body completed - Optional completion state.
 * @body isHighImpact - Optional focus marker.
 *
 * @returns 201 - Created task object.
 * @returns 400 - Validation error when the request body is invalid.
 */
interface CreateTaskBody {
  text: string;
  description?: string;
  completed?: boolean;
  isHighImpact?: boolean;
}