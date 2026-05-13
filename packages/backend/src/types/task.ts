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
export interface CreateTaskBody {
  text: string;
  description?: string;
  completed?: boolean;
  isHighImpact?: boolean;
}

/**
 * PATCH /tasks/:id
 * Updates one or more fields on an existing task.
 *
 * @param {number} id - Task identifier. Coerced from the URL parameter.
 * @body text - Optional task text.
 * @body description - Optional task details.
 * @body completed - Optional completion state.
 * @body isHighImpact - Optional focus marker.
 *
 * @returns {200} Updated task object.
 * @returns {400} Validation error for malformed id or invalid body.
 * @returns {404} Task not found for id.
 */
export interface PatchTaskBody {
  text?: string;
  description?: string;
  completed?: boolean;
  isHighImpact?: boolean;
}

export interface PatchTaskParams {
  id: number;
}

/**
 * DELETE /tasks/:id
 * Removes a task permanently by its ID.
 *
 * @param {number} id - Task identifier. Coerced from the URL parameter.
 *
 * @returns {204} No content — task successfully deleted.
 * @returns {400} Validation error for malformed or invalid id.
 * @returns {404} Task not found for id.
 */
export interface DeleteTaskParams {
  id: number;
}

