import React from 'react'
import { TaskItem } from './TaskItem'
import { EmptyState } from './EmptyState'

type View = 'Tasks' | 'Focus' | 'Archive'

interface Task {
  id: number
  text: string
  completed: boolean
  isHighImpact: boolean
}

interface TaskListProps {
  tasks: Task[]
  currentView: View
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onToggleHighImpact: (id: number) => void
  isEmpty: boolean
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  currentView,
  onToggle,
  onDelete,
  onToggleHighImpact,
  isEmpty
}) => {
  const getEmptyMessage = () => {
    switch (currentView) {
      case 'Focus':
        return 'No high-impact tasks. Mark tasks as high-impact to focus.'
      case 'Archive':
        return 'No archived tasks yet.'
      default:
        return 'No tasks yet. Add one to get started!'
    }
  }

  return (
    <div className="space-y-4 mb-10">
      {isEmpty ? (
        <EmptyState message={getEmptyMessage()} />
      ) : (
        <>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onToggleHighImpact={onToggleHighImpact}
              showHighImpactButton={currentView !== 'Archive'}
            />
          ))}
        </>
      )}
    </div>
  )
}
