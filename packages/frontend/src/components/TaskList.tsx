import React from 'react'
import { TaskItem } from './TaskItem'

interface Task {
  id: number
  text: string
  completed: boolean
  isHighImpact: boolean
}

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  isEmpty: boolean
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, isEmpty }) => {
  return (
    <div className="space-y-3">
      {isEmpty ? (
        <p className="py-12 text-center text-slate-500">
          No tasks yet. Add one to get started!
        </p>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />)
      )}
    </div>
  )
}
