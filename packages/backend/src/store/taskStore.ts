/** In-memory store supplied for the exercise. Learners should not need to rewrite this file. */
import type { Task } from '../types/task';

const seed: Task[] = [
  {
    id: 1,
    text: 'Review quarterly design guidelines',
    description: 'Focus on spacing, grids, and component tokens.',
    completed: false,
    isHighImpact: false,
  },
  {
    id: 2,
    text: 'Prepare editorial bento layout assets',
    description: '',
    completed: false,
    isHighImpact: true,
  },
  {
    id: 3,
    text: 'Check typographic scales for accessibility',
    description: 'WCAG contrast and minimum sizes for body copy.',
    completed: true,
    isHighImpact: false,
  },
  {
    id: 4,
    text: 'Morning focus session: Tonal depth study',
    description: '',
    completed: true,
    isHighImpact: true,
  },
];

let tasks: Task[] = seed.map((t) => ({ ...t }));
let nextId = 5;

/** Restores seed data; used by the external test suite in `../tests/`. */
export function resetTaskStore(): void {
  tasks = seed.map((t) => ({ ...t }));
  nextId = 5;
}

export function getTasks(): Task[] {
  return tasks.map((t) => ({ ...t }));
}

export function getTaskById(id: number): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function createTask(
  input: Pick<Task, 'text'> & Partial<Pick<Task, 'completed' | 'isHighImpact' | 'description'>>
): Task {
  const task: Task = {
    id: nextId++,
    text: input.text,
    description: input.description ?? '',
    completed: input.completed ?? false,
    isHighImpact: input.isHighImpact ?? false,
  };
  tasks = [...tasks, task];
  return { ...task };
}

export function updateTask(
  id: number,
  patch: Partial<Pick<Task, 'text' | 'completed' | 'isHighImpact' | 'description'>>
): Task | undefined {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return undefined;
  const updated: Task = { ...tasks[idx], ...patch };
  tasks = [...tasks.slice(0, idx), updated, ...tasks.slice(idx + 1)];
  return { ...updated };
}

export function deleteTask(id: number): boolean {
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  return tasks.length < before;
}
