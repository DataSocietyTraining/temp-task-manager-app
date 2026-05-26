# Module - Contract-First Prompting and Chain-of-Thought 1

This lab walks through two prompting habits for backend API work:

- define the API contract before implementation
- use reasoning prompts to surface business rules before code is generated

You will work in `temp-task-manager-app` and use `task-manager-app` only as a fallback reference if you need to compare behavior or recover.

---

# Demo 1 — Contract-First Prompting for `POST /tasks`

This demo shows how to define route behavior before asking Copilot to implement it.

The flow has four phases:

```text
Phase 1 — Define the contract
Phase 2 — Set up tab hygiene
Phase 3 — Prompt Copilot from the contract
Phase 4 — Review the generated code against the contract
```

## Demo overview

- The app needs a backend endpoint that lets a client create a task.
- A task must have a title in the `text` field.
- Optional fields may include `description`, `completed`, and `isHighImpact`.
- Invalid input should be rejected before anything is created.
- On success, the API should return the created task.


## Phase 1 — Define the contract first

### Step 1: Open the contract file

```text
packages/backend/src/types/task.ts
```

### Step 2: Add the `POST /tasks` contract

Paste the following into `packages/backend/src/types/task.ts`:

```typescript
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

## Why this matters

- The contract answers what the client can send.
- It marks `text` as required.
- It defines the success behavior.
- It defines the invalid-input behavior.

Copilot now has concrete backend rules instead of guessing from only an endpoint name.

---

## Phase 2 — Set up tab hygiene

### Step 1: Open only the files Copilot needs

```text
packages/backend/src/types/task.ts
packages/backend/src/schemas/task.ts
packages/backend/src/controllers/tasksController.ts
packages/backend/src/routes/tasksRoutes.ts
```
- Active tab: packages/backend/src/schemas/task.ts

### Step 2: Keep unrelated files closed

```text
packages/backend/src/app.ts
packages/backend/src/store/taskStore.ts
packages/backend/src/config/
packages/backend/src/middleware/
```

## Why this tab setup matters

- `types/task.ts` gives Copilot the API contract.
- `schemas/task.ts` is where request validation should live.
- `tasksController.ts` is where the route behavior should live.
- `tasksRoutes.ts` is where the route should be wired.



Open files provide signal. Closed files reduce unrelated edits and architectural drift.

---

## Phase 3 — Prompt Copilot from the contract

### Step 1: Use the implementation prompt

Paste this into Copilot Chat:

```text
Use the contract for POST /tasks as defined in the types/task.ts

1. Generate a Zod validation schema derived directly from the interface.

2. Implement the route handler. Parse and validate the request body using that schema.

3. Map validation failure to this stable shape:

{ error: "validation_error", message: string, details: <validation detail> }

4. On success, create the task and return 201 with the full task object.

Do not add fields or behaviors not specified in the contract.
```

## Expected outcome

Copilot should generate:

- a request-body schema in `packages/backend/src/schemas/task.ts`
- a handler in `packages/backend/src/controllers/tasksController.ts`
- route wiring in `packages/backend/src/routes/tasksRoutes.ts`

---

## Phase 4 — Review the generated code

### Schema review checklist

Check that the generated schema:

- creates `createTaskBodySchema`
- requires `text`
- trims extra spaces from `text`
- rejects empty task text
- keeps `description` optional
- keeps `completed` optional
- keeps `isHighImpact` optional

### Handler review checklist

Check that the handler:

- reads the request body
- validates with `createTaskBodySchema.safeParse()`
- returns `400` on validation failure
- uses the stable validation error shape
- creates the task only after validation passes
- returns `201` with the full created task

### Route review checklist

Check that the route file:

- imports the create handler
- connects `POST /` to the handler
- keeps routing separate from controller logic

### Mounted route note

- `tasksRoutes.ts` may show `POST /`
- because `app.ts` mounts the router at `/api/tasks`, the actual backend endpoint is:

```text
POST /api/tasks
```

### Accept or reject generated code with this checklist

| Contract requirement | What to verify |
|---|---|
| Request body uses task fields | Schema includes `text`, `description`, `completed`, `isHighImpact` |
| `text` is required | Schema rejects missing or empty `text` |
| Invalid input returns `400` | Handler maps validation failure to `400` |
| Success returns created task | Handler creates the task only after validation |
| Success status is `201` | Handler returns `201` |

---

# Activity 1 — Contract-First Prompting for `DELETE /tasks/:id`

- This activity follows the same contract-first workflow from the `POST /tasks` demo.

- 1. Complete the following contract 

```text
/**
 * DELETE /tasks/:id
 * @param {number} id -   // URL params arrive as strings but this app coerces
 *                        the id to a number using the schema.
 * @returns {______}      // deleted with no body — which 2xx code means no content?
 * @returns {______}      // id failed validation — which code means bad input?
 * @returns {______}      // id valid but task missing — which code means not found?
 */
export interface DeleteTaskParams {
  id: number;
}
```

- 2. Now Set up your tabs 
- 3. Write the implementation prompt in Copilot Chat
- 4. Check for the handler and the route for `DELETE /tasks/:id`

---
---


# Demo 2 — Chain-of-Thought for `PATCH /tasks/:id`

- This demo adds a reasoning checkpoint before implementation.

- The key business rule is easy to miss:

  - each PATCH field is optional
  - but the request body as a whole cannot be empty

## Demo overview

- The route updates selected fields on an existing task.
- Only fields sent by the client should change.
- Unsupported fields should not be accepted.
- Missing tasks should return `404`.
- An empty request body should return `400`.

---

## Phase 1 — Set up reasoning tab hygiene

### Open these files

```text
packages/backend/src/types/task.ts
packages/backend/src/schemas/task.ts
```
- Active tab: packages/backend/src/schemas/task.ts
  
### Keep these files closed

```text
packages/backend/src/controllers/tasksController.ts
packages/backend/src/routes/tasksRoutes.ts
packages/backend/src/app.ts
```

## Why this tab setup matters

For the reasoning pass, focus on the contract and schema rule first. Do not open implementation files until the reasoning is acceptable.

---

## Phase 2 — Run the reasoning prompt

### Step 1: Ask for reasoning before code

Paste this into Copilot Chat:

```text
- Before writing any code, reason through the PATCH /tasks/:id endpoint:

  - What should happen if the request body is empty — no fields sent at all?
  - What status code and error shape should that produce?
  - What happens if the task ID does not exist?
  - Are there any security concerns with allowing arbitrary field updates?
  
  Explain each case clearly. Do not write any implementation yet.
```

### What the reasoning should cover

The answer should say:

- an empty request body returns `400`
- validation failures use a stable error shape
- unsupported fields should not be accepted
- a missing task id should get a clear not-found response

If Copilot treats an empty body as valid, correct it before asking for code.

---

## Phase 3 — Run the implementation prompt

### Step 1: Open the implementation files after the reasoning is acceptable

```text
packages/backend/src/types/task.ts
packages/backend/src/schemas/task.ts
packages/backend/src/controllers/tasksController.ts
packages/backend/src/routes/tasksRoutes.ts
```

### Step 2: Use the implementation prompt

Paste this into Copilot Chat:

```text
Now implement the handler using the reasoning above.
The rule — reject empty bodies with 400 — must live in the validation schema,
not just as a conditional check inside the handler logic.
```

---

## Phase 4 — Review the generated output

### Schema review

In `packages/backend/src/schemas/task.ts`, review `patchTaskBodySchema` and confirm that it:

- keeps PATCH fields optional
- adds `.refine()`
- rejects empty request bodies
- requires at least one supported field

### Handler review

In `packages/backend/src/controllers/tasksController.ts`, confirm that the handler:

- validates the route `id`
- validates the body with `patchTaskBodySchema.safeParse()`
- returns `400` for invalid input
- returns `404` when the task is not found
- updates only supported fields
- returns `200` with the updated task

### Route review

In `packages/backend/src/routes/tasksRoutes.ts`, confirm that Copilot:

- imports the PATCH handler
- wires the update route
- keeps route wiring separate from handler behavior

---

# Activity 2 — Chain-of-Thought for `GET /api/tasks`

Apply the same reasoning-first workflow to the task-list route.

| Module shorthand | Actual backend route |
|---|---|
| `GET /tasks` | `GET /api/tasks` |

This route has no request body and no required parameters, but it still has an edge case worth reasoning through first.

- 1. Complete the following reasoning prompt similar to the one covered in demo 2

```text
Before writing any code, reason through GET /api/tasks.

- What should the response look like when tasks exist?
- What should happen when there are ______?
                               // think about empty collections — is that an error?
- What status code should always be returned on success?
- Are there any concerns with ______?
                    // think about what you are exposing to the client

Do not write implementation code yet.

```
2. Review the reasoning
3. write the implementation prompt using the above reasoning
4. Check for the handler and the route for `GET /api/tasks`

---






