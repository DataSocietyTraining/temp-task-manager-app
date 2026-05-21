
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
  placeholder = 'Add a methodical task...'
}) => (
  <div className="flex w-full max-w-[544px] gap-4 mb-6">
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="flex-1 rounded-xl bg-[#E9E9E9] px-6 py-3 text-base text-[#7C7C7C] placeholder-[#B0B0B0] outline-none focus:ring-2 focus:ring-[#6C3DF4]"
      style={{ fontFamily: 'Inter, sans-serif' }} // Figma font
    />
    <button
      type="button"
      onClick={onAddClick}
      className="bg-[#F4431D] hover:bg-[#d63a18] text-white font-semibold rounded-xl px-7 py-3 text-base transition-colors"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      + Add
    </button>
  </div>
)
