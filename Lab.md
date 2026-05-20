 # Red/Green/Refactor & Constrained Refactoring


# Live Demo 1 — `DELETE /tasks/:id`

- This demo uses the `DELETE /tasks/:id` endpoint.

- The demo has three beats:

```text
Beat 1 — Red
Beat 2 — Green
Beat 3 — Refactor
```

You will temporarily replace the working handler with a `501` stub, generate failing tests, implement the handler, and then refactor it safely.

---

# Before Beat 1 — Prepare the Demo Files

- In the original starter state, the tests area may exist only as the parent folder:

```text
packages/tests/
```

- If `integration/` and `unit/` do not exist yet, create them before the live demo:

```text
packages/tests/integration/
packages/tests/unit/
```

- Make sure these files exist before you begin:

```text
packages/tests/integration/taskHttp.test.ts
packages/tests/unit/taskSchemas.test.ts
```
.

---

# Before Beat 1 — Prepare the DELETE Stub

## Step 1: Open the controller file

- Now with files required for tests in place, let's open the following controller file:

```text
packages/backend/src/controllers/tasksController.ts
```

---

## Step 2: Find `removeTask()`

- Find the existing `removeTask()` handler.

---

## Step 3: Replace `removeTask()` with a `501` stub

- Temporarily replace `removeTask()` with the following:

```ts
export function removeTask(req: Request, res: Response): void {
  res.status(501).send();
}
```

---

## Expected state

- `501` means the handler exists, but the behavior is intentionally not implemented for the demo.


- The `501` response creates a controlled failure for the red phase.


---

# Beat 1 — Red

- Red indicates that the tests exist before the implementation exists.

- The tests should describe the expected behavior from the contract.

- For `DELETE /tasks/:id`, the tests should capture exactly three behaviors:

| Case | Expected Result |
|---|---|
| Valid id | `204` with no body |
| Missing task id | `404` |
| Invalid id format | `400` |

---

## Step 1: Set up the red tab hygiene


- Let’s open the files Copilot needs to generate the implementation.

```text
packages/tests/integration/taskHttp.test.ts
packages/backend/src/types/task.ts
```

- Make sure to keep the following files closed:

```text
packages/backend/src/schemas/task.ts
packages/tests/unit/taskSchemas.test.ts
packages/backend/src/controllers/tasksController.ts
packages/backend/src/app.ts
```


---

## Why this tab setup matters


- taskHttp.test.ts is where the failing HTTP integration tests go.

- types/task.ts is the contract source.

- Keep the contract and test file visible, not the implementation.


- During red, Copilot should see the test file and the contract.

- The tests should come from the contract, not from implementation details.

---

## Step 2: Generate failing tests

- Make sure to be on tab

```text
packages/tests/integration/taskHttp.test.ts
```

- Paste the following prompt into Copilot Chat:

```text
The contract and validation schema for DELETE /tasks/:id are defined.

The handler is currently a stub that returns 501.

Generate tests that assert the documented behaviors. Tests must fail until the handler is implemented.

Cover exactly:
  (1) Happy path: valid id returns 204 with no body
  (2) 404: task id does not exist
  (3) 400: id is not a valid format (for example, a string instead of a number)

Name each test after the rule it enforces.

Use Vitest + supertest.

Do not run tests or terminal commands.
```


---

## Step 3: Review Copilot output

- Accept only changes to:

```text
packages/tests/integration/taskHttp.test.ts
```

- Reject changes to:

```text
packages/backend/src/controllers/tasksController.ts
packages/backend/src/app.ts
packages/backend/src/schemas/task.ts
packages/tests/unit/taskSchemas.test.ts
```

---

## Step 4: Run the red tests manually

- Run the following command in the terminal to run the generated tests

```bash
pnpm test
```

Expected result:

```text
The DELETE /tasks/:id tests fail.
```

- This failure is expected and useful because `removeTask()` is still a `501` stub. The spec is now executable, but the implementation does not satisfy it yet.

---

# Beat 2 — Green

- Green is the smallest implementation that makes the red tests pass.

---

## Step 1: Set up the green tab hygiene

- Let’s now open the files Copilot needs to generate the implementation.

```text
packages/tests/integration/taskHttp.test.ts
packages/backend/src/schemas/task.ts
packages/backend/src/controllers/tasksController.ts
```

- Make sure to keep the following files closed:
  
```text
packages/backend/src/types/task.ts
packages/tests/unit/taskSchemas.test.ts
packages/backend/src/app.ts
```




---

## Why this tab setup matters


- taskHttp.test.ts is now the behavioral signal.

- schemas/task.ts and tasksController.ts are implementation targets.

- Hide the contract, unit test, and app files so Copilot does not wander.


- During green, Copilot should see the failing tests and the implementation target.

- It should not modify app setup or routing.


---

## Step 2: Implement the DELETE handler

- Make sure to be on tab:

```text
packages/backend/src/controllers/tasksController.ts
```

Before prompting Copilot:

```text
1. Open packages/backend/src/controllers/tasksController.ts.
2. Find removeTask().
3. Select only removeTask(), or place the cursor inside removeTask().
4. Do not select the full file.
5. Do not include other handlers in the selection.
```

Paste this prompt into Copilot Chat:

```text
Implement the DELETE /tasks/:id handler so every test above passes.

Do not add behaviors, endpoints, or fields that the tests do not require.

Validate the route parameter before any business logic runs.

Keep validation aligned with the contract.

Do not run tests or terminal commands.
```

---

## Step 3: Review Copilot output

- Accept the update only if it changes:

```text
removeTask()
```

- A correct implementation should preserve this behavior:

```text
1. Id validation happens before store access.
2. Invalid ids return 400.
3. Missing tasks return 404.
4. Valid deletes return 204 with no body.
```




---

## Step 4: Run the green tests manually

- Run the following command in the terminal

```bash
pnpm test
```

Expected result:

```text
The DELETE /tasks/:id tests pass.
```

- This pass matters because the tests came from the contract, the implementation stayed scoped, and expected behavior is now checked.



---

# Green Is Not the Place to Be Creative

| Good Green Phase | Risky Green Phase |
|---|---|
| Implements exactly what tests require | Adds unrelated behavior |
| Uses the existing app structure | Invents new architecture |
| Keeps changes local | Touches unrelated files |
| Leaves cleanup for refactor | Refactors while implementing |

Untested behavior is risk, not a bonus.

The green phase is deliberately boring.

That is the point.

---

# Beat 3 — Refactor

- Refactor means cleaner structure with the same behavior.

- The suite must already be green before refactoring begins.

- This beat also introduces the idea of constrained refactoring.

---

## Step 1: Set up the refactor tab hygiene

- Let’s open the files Copilot needs to generate the implementation.

```text
packages/backend/src/controllers/tasksController.ts
packages/tests/integration/taskHttp.test.ts
```

- Make sure to keep the following files closed:

```text
packages/tests/unit/taskSchemas.test.ts
packages/backend/src/schemas/task.ts
packages/backend/src/app.ts
```


---

## Why this tab setup matters

- tasksController.ts is the only refactor target.

- taskHttp.test.ts stays open as the behavior gate.

- Hide schema, unit test, and app files so the refactor stays narrow.


- During refactor, Copilot should only clean up the controller code.

- It should not change schemas, tests, app setup, routes, or unrelated handlers.



---

## Step 2: Refactor `removeTask()` safely

- Make sure to be on tab:

```text
packages/backend/src/controllers/tasksController.ts
```


Before prompting Copilot:

```text
1. Open packages/backend/src/controllers/tasksController.ts.
2. Find removeTask().
3. Select only removeTask(), or place the cursor inside removeTask().
4. Do not select the full file.
5. Do not include other handlers in the selection.
```

- Paste the following prompt into Copilot Chat:

```text
Refactor handler removeTask() for clarity only.
For example, extract repeated validation error logic into a local helper in this same file.
All tests must still pass with no changes to test expectations.
Do not alter status codes, response body shapes, or validation rules.
Do not move code to new files.
Do not run tests or terminal commands.
```



---

## Step 3: Review Copilot output

Accept the refactor only if:

- removeTask() is the only code changed

- behavior stays the same for validation, status codes, and response shapes

- tests, route wiring, app.ts, and other handlers are unchanged

- no code is moved to a new file

Reject the other changes 

---

## Step 4: Run tests after refactor manually

- Run the following command in the terminal

```bash
pnpm test
```

Expected result:

```text
The DELETE /tasks/:id tests still pass.
```

- The code was cleaned up, but behavior stayed fixed.



---

# The Three Prompts Form One Controlled Workflow

| Prompt | Purpose |
|---|---|
| Red prompt | Make expected behavior executable |
| Green prompt | Implement only what tests require |
| Refactor prompt | Improve structure without behavior drift |

The workflow is controlled because each prompt has one job.

---

## Demo 2A — Unconstrained Refactor

- Use the `removeTask()` handler from the previous Red / Green / Refactor demo.

- At this point, the handler works. Now show what happens when the refactor prompt does not define boundaries.

---

### Step 1: Open the target file

- Let's open the working tab :

```text
packages/backend/src/controllers/tasksController.ts
```

Find:

```text
removeTask()
```

- Select only the `removeTask()` function, or place the cursor inside it.

- Do not select the whole file.

---

### Step 2: Use the weak refactor prompt

Paste the following prompt into Copilot:

```text
Refactor this function.

Do not run tests or terminal commands.
```

---


### Step 4: Discuss why the prompt is risky

- The prompt is risky because it does not say what must stay unchanged.

- It allows Copilot to decide the scope of the refactor.

- A weak prompt may still produce safe-looking code, but that safety is not guaranteed by the prompt.

---

### Demo takeaway

```text
1. The problem is not that "Refactor this function" always fails.

2. The problem is that it does not define boundaries.

3. A constrained prompt states what may change and what must not change before Copilot edits the code.
```

---

## Demo 2B — Constrained Refactor

- Now let's run the same type of refactor with explicit boundaries.

The target is still:

```text
removeTask()
```

- In this demo, tests are opened as gates and the prompt clearly protects behavior.

---

### Step 1: Set up the constrained refactor tab hygiene

- Let’s open the files Copilot needs to generate the implementation.

```text
packages/backend/src/controllers/tasksController.ts
packages/tests/unit/taskSchemas.test.ts
packages/tests/integration/tasksHttp.test.ts
```

- Make sure to keep the following files closed:

```text
packages/backend/src/schemas/task.ts
packages/backend/src/app.ts
packages/backend/src/routes/tasksRoutes.ts
```

Why this setup matters:

```text
1. tasksController.ts is the refactor target
2. unit and integration tests are visible behavior gates
3. schemas/task.ts is not a refactor target in this demo
4. app.ts and routes are not being changed
```

---

### Step 2: Select the target function

- Let the working tab be the following:

```text
packages/backend/src/controllers/tasksController.ts
```

Find:

```text
removeTask()
```

Select only the `removeTask()` function, or place the cursor inside it.

Do not select the whole file.

Do not include other handlers in the selection.

---

### Step 3: Use the constrained refactor prompt

Paste this prompt into Copilot:

```text
Refactor for readability only, inside this function.

Do not rename the function or its parameters.

Do not change the error messages or error types that callers rely on.

Do not remove validation checks of any kind.

Do not extract helpers to new files — keep everything in this file.

All existing tests must still pass without any changes to test code.

Do not run tests or terminal commands.
```

For this `removeTask()` demo, “validation checks” means the id validation block that validates `req.params.id` before calling `deleteTask()`.

---

### Step 4: Review Copilot output

Accept the change only if:

```text
only removeTask() changes
validation, errors, status codes, and response shape stay the same
tests and route wiring are unchanged
no code moves to a new file
```

Reject the change if Copilot edits anything outside that scope.




---

### Step 5: Run tests manually

After accepting the constrained refactor, run:

```bash
pnpm test
```

Expected result:

```text
All existing tests still pass.
```

Reason:

```text
The refactor was constrained, and the test suite remained the guard.
```



---

### Demo takeaway

```text
1. The constrained prompt tells Copilot what it may improve and what it must not touch.

2. The test suite confirms that the accepted refactor did not break behavior.
```



# In-Class Exercise

- Complete two tasks:

```text
Task 3 — Red / Green / Refactor for PATCH /tasks/:id
Task 4 — Constrained Refactoring
```

- Write the prompt.

- After writing each prompt:

```text
1. Paste it into Copilot Chat.
2. Review the generated change before accepting it.
3. Accept only files that are in scope.
4. Run the project test command manually when instructed.
```
---

# Task 3 — Red / Green / Refactor for `PATCH /tasks/:id`

- This task uses a Red / Green / Refactor workflow for the `PATCH /tasks/:id` endpoint.

- `PATCH /tasks/:id` updates one or more fields on an existing task.

- The endpoint should follow these rules:

```text

1. A valid update returns 200 with the updated task.

2. A missing task returns 404.

3. An empty request body returns 400.

4. An invalid task id returns 400.
```
---

# Before Task 3 — Set Up the PATCH Stub

- Start with an intentionally incomplete `PATCH` handler.

- In `packages/backend/src/controllers/tasksController.ts`, locate the existing `patchTask()` function.

- Replace only the body of `patchTask()` with the following stub:

```ts

export function patchTask(req: Request, res: Response): void {

  res.status(501).send();

}


# Task 3 Part A — Red

## Goal

Write and run a prompt that asks Copilot to generate Vitest + supertest tests for:

```text
PATCH /tasks/:id
```

- The tests should target the `501` stub and fail until the real implementation exists.

---

## Required behaviors

- red prompt must ask for tests covering exactly:

```text
1. Happy path: valid id and valid body returns 200 with the updated task.
2. 404: task id does not exist.
3. 400: request body is empty — no fields sent at all.
4. 400: id is not a valid format, such as a string instead of a number.
```

## The red prompt must make the testing context clear and should include details like the following.

  - Current stub and target endpoint

  - Add tests in the existing integration test file

  - Do not run tests or terminal commands.


# Task 3 Part B — Green

- Write one follow-up prompt that asks for the patchTask handler implementation only, such that every test from Part A passes. No extra features beyond what the tests require.


##  Prompt should reference:
  - taskIdParamSchema for id validation
  - patchTaskBodySchema for body validation, including the .refine() rule that rejects empty bodies
  - store.updateTask() for the actual update
  - The sendValidationError helper for consistent 400 responses


# Task 3 Part C — Refactor


- Write and run a prompt that asks Copilot to refactor `patchTask()` for readability only.

- The suite must stay green.

---

## Refactor prompt must include these hard constraints


- Every test still passes with no changes to test code.
- patchTask is not renamed.
- Status codes 400, 404, and 200 are not changed.
- Response shapes are not changed.
- The .refine() rule in patchTaskBodySchema that rejects empty bodies is not removed or weakened.
- sendValidationError is not removed or moved to a new file.
- No code is extracted to new files.
- Do not run tests or terminal commands.


---


# Task 4 — Constrained Refactoring

Task 4 focuses on the difference between an unconstrained refactor prompt and a fully constrained refactor prompt.


---

# Task 4 Part A — Risk Inventory


- Write  an unconstrained refactoring prompt for the `patchTask()` handler.

- Then list at least three specific risks that could silently break behavior.

---

- List at least three risks:

```text
Risks:

1.

2.

3.
```

---

# Task 4 Part B — Fully Constrained Prompt


- Rewrite Part A as a fully constrained prompt.

- The prompt should allow readability improvements only and explicitly state what must not change.

---

## constrained prompt must include:

- One clearly stated allowed goal: readability only.
- Do not rename patchTask or its parameters.
- Do not change or remove the .refine() rule that rejects empty bodies.
- Do not change the error shape returned by sendValidationError.
- Do not change status codes 400, 404, or 200.
- Do not reorder id validation and body validation.
- Id must be checked first.
- Do not move code to new files.
- All existing tests must still pass with no changes to test code.
- Do not run tests or terminal commands.


---


