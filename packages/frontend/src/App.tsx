
import React, { useState } from 'react'
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

  const handleToggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  const visibleTasks = currentView === 'Archive'
    ? tasks.filter((task) => task.completed)
    : tasks

  const highImpactWaitingCount = tasks.filter((task) => task.isHighImpact && !task.completed).length

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-[72px] py-6 border-b border-[#ECECEC] max-w-[1440px] mx-auto">
        <div className="text-xl font-semibold text-[#6C3DF4] tracking-tight select-none" style={{ fontFamily: 'Inter, sans-serif' }}>
          Methodical Tasks
        </div>
        <nav className="flex gap-8">
          <button
            onClick={() => setCurrentView('Tasks')}
            className={`relative font-medium text-base pb-1 focus:outline-none ${currentView === 'Tasks' ? 'text-[#6C3DF4]' : 'text-[#B0B0B0]'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Tasks
            {currentView === 'Tasks' && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#6C3DF4] rounded"></span>}
          </button>
          <button
            onClick={() => setCurrentView('Focus')}
            className={`relative font-medium text-base pb-1 focus:outline-none ${currentView === 'Focus' ? 'text-[#6C3DF4]' : 'text-[#B0B0B0]'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Focus
            {currentView === 'Focus' && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#6C3DF4] rounded"></span>}
          </button>
          <button
            onClick={() => setCurrentView('Archive')}
            className={`relative font-medium text-base pb-1 focus:outline-none ${currentView === 'Archive' ? 'text-[#6C3DF4]' : 'text-[#B0B0B0]'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Archive
            {currentView === 'Archive' && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#6C3DF4] rounded"></span>}
          </button>
        </nav>
        <div className="flex items-center gap-4">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F0F0F0]">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6C3DF4" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
            </svg>
          </button>
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User avatar" className="w-9 h-9 rounded-full border-2 border-[#ECECEC] object-cover" />
        </div>
      </header>

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
