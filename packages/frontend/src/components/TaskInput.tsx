import React from 'react'

interface TaskInputProps {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onAddClick: () => void
  placeholder?: string
}

export const TaskInput: React.FC<TaskInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onAddClick,
  placeholder = 'Add a task...'
}) => {
  return (
    <div className="mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="h-12 w-full flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          type="button"
          onClick={onAddClick}
          className="inline-flex h-12 items-center rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
    </div>
  )
}
