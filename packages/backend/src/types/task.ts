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