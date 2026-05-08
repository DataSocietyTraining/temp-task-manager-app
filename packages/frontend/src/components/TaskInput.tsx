import React from 'react'

interface TaskInputProps {
  value: string
  onChange: (value: string) => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onAddClick: () => void
  placeholder?: string
}

export const TaskInput: React.FC<TaskInputProps> = ({
  value,
  onChange,
  onKeyPress,
  onAddClick,
  placeholder = 'Add a methodical task...'
}) => {
  return (
    <div className="flex gap-3 mb-10">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        className="flex-1 px-5 py-[17px] bg-[#e1e3e3] rounded-xl text-base font-normal text-[#7a7581] placeholder-[#7a7581] focus:outline-none focus:ring-2 focus:ring-[#4c1d95] focus:ring-offset-2 transition-all"
      />
      <button
        onClick={onAddClick}
        className="bg-[#e02500] hover:bg-[#cc1f00] text-white font-bold text-base px-6 py-4 rounded-xl flex items-center gap-2 transition-colors"
      >
        <svg className="w-[7px] h-[7px]" viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        Add
      </button>
    </div>
  )
}
