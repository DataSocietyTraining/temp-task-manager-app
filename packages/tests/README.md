# Tests package

This package is intentionally empty at the starter stage.

Use Copilot during the red phase to generate Vitest + supertest tests from the
JSDoc contract in `packages/backend/src/schemas/task.ts` and the TODO handlers
in `packages/backend/src/controllers/tasksController.ts`.

Suggested first red prompt:

```text
The Task Manager API has JSDoc contracts and stub handlers. Generate Vitest +
supertest tests that should fail until POST /api/tasks, PATCH /api/tasks/:id,
and DELETE /api/tasks/:id are implemented. Cover happy path, validation failure,
not found, and successful deletion. Name each test after the rule it enforces.
```
