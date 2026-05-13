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


/**
 * PATCH /tasks/:id/status
 * Updates a task's workflow status using valid transitions only.
 *
 * @param {string} id - Task identifier from the data layer.
 * @body {Object} body
 * @param {('pending'|'in-progress'|'complete')} body.status - Target status.
 *
 * @returns {200} Updated task including id, title, assignee, status, updatedAt.
 * @returns {400} Validation error for invalid body, malformed id, or illegal transition.
 * @returns {404} Task not found for id.
 */
export type TaskStatus = 'pending' | 'in-progress' | 'complete';

export interface PatchTaskStatusBody {
  status: TaskStatus;
}