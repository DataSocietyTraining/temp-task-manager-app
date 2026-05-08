import React from 'react'
import { Star, Trash2 } from 'lucide-react'

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
  onToggleHighImpact: (id: number) => void
  showHighImpactButton?: boolean
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onToggleHighImpact,
  showHighImpactButton = true
}) => {
  return (
    <div
      className={`flex gap-4 items-center p-5 rounded-lg shadow-[0px_12px_40px_0px_rgba(35,6,83,0.06)] transition-all group ${
        task.completed ? 'bg-[#f2f4f4] opacity-60' : 'bg-white'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 flex items-center justify-center transition-colors"
        aria-label={`${task.completed ? 'Mark incomplete' : 'Mark complete'}: ${task.text}`}
      >
        {task.completed ? (
          <div className="w-7 h-7 bg-[#422b72] rounded-[6px] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-6 h-6 border-2 border-[#d0d3d4] rounded-[4px]" />
        )}
      </button>

      {/* Task Text */}
      <span
        className={`flex-1 text-base font-semibold tracking-[-0.4px] transition-all ${
          task.completed
            ? 'line-through text-[#494550] font-medium'
            : 'text-[#191c1d]'
        }`}
      >
        {task.text}
      </span>

      {/* High Impact Star Button */}
      {showHighImpactButton && (
        <button
          onClick={() => onToggleHighImpact(task.id)}
          className={`flex-shrink-0 transition-opacity opacity-0 group-hover:opacity-100 p-2 ${
            task.isHighImpact
              ? 'text-yellow-500'
              : 'text-[#d0d3d4] hover:text-yellow-400'
          }`}
          aria-label={`${task.isHighImpact ? 'Remove from' : 'Add to'} high-impact`}
        >
          <Star size={16} fill={task.isHighImpact ? 'currentColor' : 'none'} />
        </button>
      )}

      {/* Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 text-[#6b6b6b] hover:text-[#e02500] transition-opacity opacity-0 group-hover:opacity-100 p-2"
        aria-label={`Delete: ${task.text}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
