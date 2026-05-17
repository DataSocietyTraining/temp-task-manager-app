import React from 'react'
import { TaskItem } from './TaskItem'
import type { Task } from '../types/task'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  isEmpty: boolean
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, isEmpty }) => {
  return (
    <div className="space-y-[16px]">
      {isEmpty ? (
        <p className="py-[24px] text-center text-[#7a7581]">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))
      )}
    </div>
  )
}
