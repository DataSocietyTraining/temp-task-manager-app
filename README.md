# temp-task-manager-app

- Frontend: React + Vite
- Backend: Express + TypeScript

## Prerequisites

- Node.js 20 or later
- `pnpm`

If `pnpm` is not installed, install it with:

```bash
npm install -g pnpm
```

## Install Dependencies

From the project root, run:

```bash
pnpm install
```

This installs dependencies for all workspace packages under `packages/`.

## Run the Starter App

Open two terminal tabs from the project root.

Start the backend:

```bash
pnpm --dir packages/backend dev
```

Start the frontend:

```bash
pnpm --dir packages/frontend dev
```

Default local URLs:

- Frontend: `http://localhost:5174`
- Backend: `http://localhost:3001`

## Build

Build the backend:

```bash
pnpm --dir packages/backend build
```

Build the frontend:

```bash
pnpm --dir packages/frontend build
```

