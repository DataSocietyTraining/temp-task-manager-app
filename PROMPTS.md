#######################################################
#######################################################
############    COPYRIGHT - DATA SOCIETY   ############
#######################################################
#######################################################

## Contract: First  Prompting and  Chain - of -  Thought - 1 ##

## NOTE: To run individual pieces of code, select the line of code and
##       press ctrl + enter for PCs or command + enter for Macs


#=================================================-
#### Slide 9/52: A Vague Prompt Leaves API Behavior Undefined  ####

Create a POST /tasks endpoint.



#=================================================-
#### Slide 15/52: A Vague Prompt Leaves API Behavior Undefined  ####

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

#=================================================-
#### Slide 17/52: Prompt used after contract  ####

use the contract for POST /tasks is defined 

1. Generate a Zod validation schema derived directly from the interface.

2. Implement the route handler. Parse and validate the request body using that schema.

3. Map validation failure to this stable shape:

{ error: "validation_error", message: string, details: <validation detail> }

4. On success, create the task and return 201 with the full task object.

Do not add fields or behaviors not specified in the contract.

#=================================================-
#### Slide 26/52: Activity 1: Run the Endpoint Prompt  ####

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

#=================================================-
#### Slide 27/52: Activity 1: Run the Endpoint Prompt  ####

Use the PATCH /tasks/:id/status contract .

Use Zod 4 with import { z } from "zod".

Generate patchTaskStatusBodySchema using:

z.enum(['pending', 'in-progress', 'complete'])

Validate the route id using the app's id scheme.

Use .safeParse on the request body.

Return 400 with a stable JSON error object for invalid id or invalid body.

Return 404 when the task is not found.

Return 200 with the updated task on success.

Do not add fields or behaviors not specified in the contract.



#=================================================-
#### Slide 35/52: Run the Reasoning Prompt  ####

- Before writing any code, reason through the PATCH /tasks/:id endpoint:

  - What should happen if the request body is empty — no fields sent at all?
  - What status code and error shape should that produce?
  - What happens if the task ID does not exist?
  - Are there any security concerns with allowing arbitrary field updates?
  
  Explain each case clearly. Do not write any implementation yet.

#=================================================-
#### Slide 38/52: Run the Reasoning Prompt  ####

Now implement the handler using the reasoning above.
The rule — reject empty bodies with 400 — must live in the validation schema,
not just as a conditional check inside the handler logic.



#=================================================-
#### Slide 43/52: Activity 2: Run the reasoning Prompt  ####

Before writing any code, reason through GET /api/tasks.

Explain what the response should look like when tasks exist, what should happen when there are no tasks, why no tasks should return 200 with [], and whether returning the full task list creates field exposure or response-size concerns.

Do not write implementation code yet.


#=================================================-
#### Slide 44/52: Activity 2: Run the implementation Prompt  ####


Using the approach you just described, implement GET /api/tasks.

Update the task-list handler in controllers/tasksController.ts to return 200 with an array of tasks. If there are no tasks, return 200 with [].

Update routes/tasksRoutes.ts to wire the mounted GET / route to that handler. app.ts already mounts this router at /api/tasks.

Do not create a validation schema for this route.

Do not add fields or behaviors not in the existing task type.






#######################################################
####  CONGRATULATIONS ON COMPLETING THIS MODULE!   ####
#######################################################
