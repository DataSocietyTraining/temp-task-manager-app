import React from 'react'
import { Trash2 } from 'lucide-react'

interface Task {
  id: number
  text: string
  completed: boolean
  isHighImpact: boolean
}

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`group flex items-center gap-4 rounded-lg border border-slate-200 bg-white px-5 py-3 shadow-sm transition ${
        task.completed ? 'opacity-60' : 'opacity-100'
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5 cursor-pointer rounded border-slate-300 text-slate-900 focus:ring-slate-400"
      />

      <span className={`flex-1 text-sm ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
        {task.text}
      </span>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="opacity-0 transition group-hover:opacity-100 text-slate-400 hover:text-red-600"
        aria-label={`Delete ${task.text}`}
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}
