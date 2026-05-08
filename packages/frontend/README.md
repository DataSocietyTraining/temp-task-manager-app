# To-Do App

A simple and clean desktop To-Do web app built with React, TypeScript, and Tailwind CSS.

**Course repo (learner):** This folder mirrors **`src/task-manager-app/frontend/`** (the **`ui/feature`** To-Do UI: Tasks / Focus / Archive, same components and `App.tsx`). The **only** intentional difference is **`src/api/tasksApi.ts`**: it is a **stub** you replace by copying patterns from **`../../task-manager-app/frontend/src/api/tasksApi.ts`** once your Express **`../backend/`** exposes `/api/tasks`. The completed app to compare against is **`../../task-manager-app/`**.

## Features

- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Clean, modern UI with smooth animations
- ✅ Fully typed with TypeScript
- ✅ Responsive design

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 16+ and pnpm

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the **API** first (from `../backend/`, port **3001** — see `../README.md`), then start the Vite dev server:
```bash
pnpm run dev
```

The app opens at **`http://localhost:5174`** (not 5173 — avoids colliding with the reference app). Vite **proxies** `/api` to `http://localhost:3001` in both **`pnpm run dev`** and **`pnpm run preview`** (preview on port **4174** — see `vite.config.ts`).

### Build for Production

```bash
pnpm run build
```

This creates an optimized production build in the `dist` folder.

### Preview production build

With the API on **3001**:

```bash
pnpm run build
pnpm run preview
```

Opens **http://localhost:4174** with `/api` proxied to the backend.

## How to Use

- **Add Task**: Type in the input field and press Enter or click the Add button
- **Complete Task**: Click the circle icon to mark a task as complete (it will show a checkmark and strikethrough)
- **Delete Task**: Hover over a task and click the trash icon to delete it

## Project Structure

```
├── src/
│   ├── api/tasksApi.ts   # REST client for /api/tasks
│   ├── types/task.ts     # Shared Task type
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles
├── index.html            # HTML entry point
├── package.json          # Dependencies
├── pnpm-lock.yaml        # Lock file
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite config
├── tailwind.config.js    # Tailwind config
└── postcss.config.js     # PostCSS config
```

## Code Features

- **Functional Components**: Uses React hooks (`useState`, `useEffect`)
- **TypeScript Interface**: Task interface for type safety
- **Data**: Loads and mutates tasks via the **`../backend/`** REST API (Vite dev proxy to port 3001)
- **State Management**: Local state synced with the server after each action
- **Responsive Design**: Works on mobile and desktop
- **Smooth Animations**: Hover effects and transitions
- **Icons**: Lucide React icons for a polished look
