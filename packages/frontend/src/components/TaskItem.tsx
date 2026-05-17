import React from 'react'
import type { Task } from '../types/task'

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const containerClasses = task.completed
    ? 'bg-[#f2f4f4] opacity-60 px-[18px] py-[20px]'
    : 'bg-white shadow-[0px_12px_20px_rgba(35,6,83,0.06)] px-[20px] py-[20px]'

  return (
    <div className={`flex items-center gap-[16px] rounded-[8px] ${containerClasses}`}>
      {/* Left checkbox / state indicator */}
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className={`flex h-[28px] w-[28px] items-center justify-center rounded-[6px] ${
          task.completed ? 'bg-[#422b72]' : 'bg-white border-2 border-[#e1e3e3]'
        }`}
        aria-label={task.completed ? 'Mark task active' : 'Mark task complete'}
      >
        {task.completed ? (
          <svg viewBox="0 0 24 24" className="h-[24px] w-[24px] fill-white" aria-hidden="true">
            <path d="M20.285 5.59a1 1 0 0 0-1.414-1.414L9 13.049 5.129 9.18a1 1 0 0 0-1.414 1.415l4.585 4.585a1 1 0 0 0 1.414 0l10.571-10.57Z" />
          </svg>
        ) : (
          <div className="h-[12px] w-[12px] rounded-sm" />
        )}
      </button>

      {/* Text */}
      <div className="flex-1">
        <p
          className={`leading-[24px] text-[16px] ${
            task.completed
              ? 'text-[#494550] font-medium line-through decoration-current decoration-solid'
              : 'text-[#191c1d] font-semibold tracking-[-0.4px]'
          }`}
        >
          {task.text}
        </p>
      </div>

      {/* Right action: delete only shown for completed (matches screenshot) */}
      {task.completed ? (
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="text-[#9aa0a6] hover:text-[#d23f3f] p-[8px]"
          aria-label={`Delete ${task.text}`}
        >
          <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-current" aria-hidden>
            <path d="M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1h5a1 1 0 1 1 0 2h-1l-1 14a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3L4 5H3a1 1 0 1 1 0-2h5zM8 7v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7H8z" />
          </svg>
        </button>
      ) : (
        <div className="opacity-0 p-[8px]">
          <div className="h-[15px] w-[13.333px] rounded-sm" />
        </div>
      )}
    </div>
  )
}
