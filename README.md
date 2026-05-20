# MODULE-3 — Red/Green/Refactor and Constrained Refactoring

**— The app used in this module**

This module continues with **Methodical Tasks**, the same task manager app used throughout the course.

Methodical Tasks has a React frontend and an Express backend. The app includes three views: **Tasks**, **Focus**, and **Archive**. In this module, the main work happens in the backend, where route handlers are implemented and safely refactored with Copilot.

The backend uses **TypeScript**, **Express**, and **Zod** for validation. The focus of this module is not to generate large amounts of new code. The focus is to use Copilot carefully inside a controlled workflow:

```text

1. Red      → write failing tests first

2. Green    → implement only what the tests require

3. Refactor → improve clarity without changing behavior


**— The app you are building**
The course is built around a single app called Methodical Tasks — a task manager with a React frontend and an Express backend. The app has three views: Tasks (create and manage tasks), Focus (high-impact tasks only), and Archive (completed tasks). You can see all three views in your reference handout.
The backend uses TypeScript, Express, and Zod for validation. The frontend uses React, TypeScript, and Tailwind CSS. You will build both sides over the 5-day course.

**— Your two folders**
You have two folders in your working environment:
- **temp-task-manager-app** — this is your working directory. Everything you build through prompting goes here. It starts mostly empty. You will fill it in by writing prompts and generating code with Copilot across Days 1 through 5.
- **task-manager-app** — this is the complete reference implementation. All the code is already there. If your prompt produces broken code, or if you get stuck and need to move on, copy what you need from here and continue. It is a fallback, not a cheat sheet.


## File Hierarchy — What You Are Working With


The reference app lives at `task-manager-app/`. Your working directory mirrors the same structure at `temp-task-manager-app/`. The key folders:

### Repository structure
```
task-manager-app/
├── backend/
│   └── src/
│    ├── app.ts           ← Express app setup, CORS, routes, error handler
│    ├── index.ts         ← Server entry point (port 3001)
│    ├── config/index.ts  ← Port and CORS origin config
│    ├── controllers/
│    │   └── tasksController.ts  ← listTasks, createTask, patchTask, removeTask
│    ├── middleware/
│    │   └── errorHandler.ts ← Global error handler
│    ├── routes/
│    │   └── tasksRoutes.ts  ← GET /api/tasks, POST /api/tasks, PATCH & DELETE /api/tasks/:id
│    ├── schemas/
│    │   └── task.ts      ← Zod schemas: createTaskBodySchema, patchTaskBodySchema, taskIdParamSchema
│    ├── store/
│    │   └── taskStore.ts ← In-memory task store with resetTaskStore()
│    └── types/
│        └── task.ts      ← Task interface (id, text, description, completed, isHighImpact)
├── packages/
│   └── src/
│    ├── App.tsx          ← Root component, state management, tab routing
│    ├── index.css        ← Global styles and custom animations (task-complete-pulse)
│    ├── api/
│    │   └── tasksApi.ts  ← fetchTasks, createTask, patchTask, deleteTask (calls backend via Vite proxy)
│    ├── components/      ← Header, TabNavigation, HeroSection, TaskInput, TaskItem,
│    │                         TaskList, FocusModeCard, ArchiveActions, EmptyState, Button
│    └── types/
│        └── task.ts      ← Task interface — identical to packages/backend/src/types/task.ts
└── (see packages/ for backend, frontend, tests)
	├── integration/
	│   └── tasksHttp.test.ts   ← HTTP integration tests (Modules 2-3)
	└── unit/
		├── taskSchemas.test.ts ← Zod schema unit tests
		└── taskStore.test.ts   ← Store unit tests
```
---


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
