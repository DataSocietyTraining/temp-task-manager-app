// ─────────────────────────────────────────────
//  Core domain types for the Task Manager API
//  TODO: Add any additional fields your app needs
// ─────────────────────────────────────────────

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Assignee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

// ── Request body shapes ──────────────────────

export interface CreateTaskBody {
  title: string;
  description?: string;
  status?: TaskStatus;
  assigneeId?: string;
  dueDate?: string;
}

export interface UpdateTaskBody {
  title?: string;
  description?: string;
  status?: TaskStatus;
  assigneeId?: string | null;
  dueDate?: string | null;
}

export interface CreateAssigneeBody {
  name: string;
  email: string;
}

export interface UpdateAssigneeBody {
  name?: string;
  email?: string;
}
