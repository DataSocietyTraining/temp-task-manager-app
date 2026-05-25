### Contract First Prompting and Chain of Thought - 1 ##


#### Slide 9/55: A Vague Prompt Leaves API Behavior Undefined  ####

```
Create a POST /tasks endpoint.
```


#### Slide 14/55: A Vague Prompt Leaves API Behavior Undefined  ####

```
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
```

#### Slide 17/55: Prompt used after contract  ####

```
Use the contract for POST /tasks as defined in the types/task.ts

1. Generate a Zod validation schema derived directly from the interface.
2. Implement the route handler. Parse and validate the request body using that schema.
3. Map validation failure to this stable shape: { error: "validation_error", message: string, details: <validation detail> }
4. On success, create the task and return 201 with the full task object.

Do not add fields or behaviors not specified in the contract.
```

#=================================================-
#### Slide 27/55: Delete Task: Write the Contract ####

```
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
```

#=================================================-
#### Slide 29/55: Delete Task: Write the Prompt  ####

```
Use the contract for DELETE /tasks/:id defined in packages/backend/src/types/task.ts.
Validate the route id using the app's id scheme.
Use .safeParse on the route params.
Return the correct status codes and response shapes as defined in the contract.
Do not add fields or behaviors not specified in the contract.
```


#### Slide 37/55: Run the Reasoning Prompt  ####

```
- Before writing any code, reason through the PATCH /tasks/:id endpoint:

  - What should happen if the request body is empty — no fields sent at all?
  - What status code and error shape should that produce?
  - What happens if the task ID does not exist?
  - Are there any security concerns with allowing arbitrary field updates?
  
  Explain each case clearly. Do not write any implementation yet.
```


#### Slide 39/52: Run the Implementation Prompt  ####

```
Now implement the handler using the reasoning above.
The rule — reject empty bodies with 400 — must live in the validation schema,
not just as a conditional check inside the handler logic.
```


#### Slide 45/55: Activity 2: Step 1 — Write the reasoning prompt  ####

```
Before writing any code, reason through GET /api/tasks.

- What should the response look like when tasks exist?
- What should happen when there are no tasks — is an empty list an error or a valid response?
- What status code should always be returned on success?
- Are there any concerns with returning the full task list to the client?

Do not write implementation code yet.
```


#### Slide 47/55: Activity 2: Step 3 — Write the implementation prompt  ####

```
Using the approach you just described, implement GET /api/tasks.
Return 200 with an array of task objects on success.
If there are no tasks, return 200 with [].
Do not create a validation schema for this route.
Do not add fields or behaviors not in the existing task type.
```

