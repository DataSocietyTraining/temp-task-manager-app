

import React from 'react'
import type { Task } from '../types/task'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => (
  <div className="w-full max-w-[544px] flex flex-col gap-2 mb-10">
    {tasks.map(task => (
      <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
    ))}
  </div>
)
