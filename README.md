# temp task manager

Lean starter derived from the completed Task Manager app.

This version uses the uploaded learner frontend state. The UI is present, but `packages/frontend/src/api/tasksApi.ts` is intentionally stubbed so learners can implement the API client with Copilot.

The backend is also intentionally lean so learners can implement schema validation, route handlers, route mapping, and tests without fighting project setup issues.

## Run

```bash
pnpm install
pnpm dev:backend
pnpm dev:frontend
```

Backend: http://localhost:3001  
Frontend: http://localhost:5174

The uploaded frontend Vite config uses port `5174` to avoid clashing with another reference frontend on `5173`.

## Starter behavior

- `GET /api/health` works.
- Backend `GET /api/tasks` returns `[]` so the UI can load.
- Frontend `fetchTasks()` currently returns `[]` from the learner stub.
- Frontend `createTask`, `patchTask`, and `deleteTask` intentionally throw learner-stub errors.
- Backend `POST`, `PATCH`, and `DELETE` controller logic is intentionally incomplete.

## Main learner files

```text
packages/frontend/src/api/tasksApi.ts
packages/backend/src/schemas/task.ts
packages/backend/src/controllers/tasksController.ts
packages/backend/src/routes/tasksRoutes.ts
packages/tests/integration/tasksHttp.test.ts
```

See `COPILOT_IMPLEMENTATION_PATH.md` for the exact prompt sequence.
