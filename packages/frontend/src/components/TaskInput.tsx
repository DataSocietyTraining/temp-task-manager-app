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
}) => {
  return (
    <div className="mb-[40px] flex gap-[12px]">
      <div className="flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="w-full rounded-[12px] bg-[#e1e3e3] px-[20px] py-[17px] text-[16px] font-normal text-[#7a7581] outline-none placeholder:text-[#7a7581] focus:ring-0"
        />
      </div>

      <button
        type="button"
        onClick={onAddClick}
        className="inline-flex items-center gap-[8px] rounded-[12px] bg-[#e02500] px-[24px] py-[16px] font-bold text-[16px] text-white"
      >
        <span className="flex h-[11.667px] w-[11.667px] items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#e02500]">
          +
        </span>
        Add
      </button>
    </div>
  )
}
