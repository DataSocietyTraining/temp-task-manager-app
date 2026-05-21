
import React, { useState, useCallback, useMemo } from 'react'
import { FocusModeCard } from './components/FocusModeCard'
import { TaskInput } from './components/TaskInput'
import { TaskList } from './components/TaskList'
import type { Task } from './types/task'

type View = 'Tasks' | 'Focus' | 'Archive'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Review quarterly design guidelines', completed: false, isHighImpact: true },
    { id: 2, text: 'Prepare editorial bento layout assets', completed: false, isHighImpact: true },
    { id: 3, text: 'Check typographic scales for accessibility', completed: true, isHighImpact: false },
    { id: 4, text: 'Morning focus session: Tonal depth study', completed: true, isHighImpact: false }
  ])
  const [input, setInput] = useState('')
  const [currentView, setCurrentView] = useState<View>('Tasks')

  const handleAddTask = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: trimmed,
        completed: false,
        isHighImpact: false
      }
    ])
    setInput('')
  }

  // useCallback: Stable reference for React.memo(TaskItem)
  const handleToggleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }, [])

  // useCallback: Stable reference for React.memo(TaskItem)
  const handleDeleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  // useMemo: Only recompute filteredTasks when tasks or currentView changes
  const visibleTasks = useMemo(() => (
    currentView === 'Archive'
      ? tasks.filter((task) => task.completed)
      : tasks
  ), [tasks, currentView])

  // useMemo: Only recompute highImpactCount when tasks change
  const highImpactWaitingCount = useMemo(() => (
    tasks.filter((task) => task.isHighImpact && !task.completed).length
  ), [tasks])

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center">
      {/* ...existing code for header... */}
      {/* Place the closing header tag here, after header content */}
      {/* Example: */}
      {/* <header> ...header content... </header> */}

      {/* Main Content */}
      <main className="flex flex-col items-center flex-1 py-8 w-full">
        <h1 className="text-5xl font-extrabold text-[#3B176B] mt-6 mb-2 tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
          {currentView === 'Focus' ? 'Focus Mode' : currentView === 'Archive' ? 'Archive' : 'My Day'}
        </h1>
        <p className="text-[#7C7C7C] text-lg mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
          {currentView === 'Focus' ? 'Deep work with high-impact priorities.' : currentView === 'Archive' ? 'Completed tasks, methodically tracked.' : 'Focus on what matters most.'}
        </p>
        {currentView !== 'Archive' && (
          <TaskInput
            value={input}
            onChange={setInput}
            onKeyDown={handleInputKeyDown}
            onAddClick={handleAddTask}
          />
        )}
        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
        {/* Ensure TaskItem uses task.id as key in TaskList (required for React.memo to work efficiently) */}
        <div className="w-full max-w-[544px] mt-2">
          <FocusModeCard
            highImpactCount={highImpactWaitingCount}
            isInFocusView={currentView === 'Focus'}
            onViewInsights={() => setCurrentView('Focus')}
            onBackToTasks={() => setCurrentView('Tasks')}
          />
        </div>
      </main>
    </div>
  )
}
