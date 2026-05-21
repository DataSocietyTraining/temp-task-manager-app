

import React from 'react'
import type { Task } from '../types/task'

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => (
  <div
    className={
      'flex items-center rounded-xl px-6 py-4 mb-2 transition-colors'
      + (task.completed
        ? ' bg-[#F3F3F3] opacity-70'
        : ' bg-white shadow-sm')
    }
    style={{ minHeight: 64 }} // Figma: 64px row height
  >
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => onToggle(task.id)}
      className={
        'w-7 h-7 rounded-lg mr-4 border-2 transition-colors'
        + (task.completed
          ? ' border-[#B9AEE2] bg-[#8B79B7] accent-[#8B79B7]'
          : ' border-[#D6D1E6] bg-white accent-[#D6D1E6]')
      }
      style={{
        minWidth: 28, minHeight: 28,
        appearance: 'none',
        outline: 'none',
        boxShadow: task.completed
          ? '0 0 0 2px #B9AEE2'
          : '0 0 0 2px #D6D1E6'
      }}
    />
    <span
      className={
        'flex-1 text-[20px] font-medium transition-colors'
        + (task.completed
          ? ' text-[#8B89A0] line-through'
          : ' text-[#232323]')
      }
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {task.text}
    </span>
    {task.completed && (
      <button
        className="ml-4 p-1 hover:bg-[#ECECEC] rounded transition"
        aria-label="Delete task"
        onClick={() => onDelete(task.id)}
        type="button"
      >
        {/* Trash icon, Figma color #B0B0B0 */}
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#B0B0B0" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    )}
  </div>
)
