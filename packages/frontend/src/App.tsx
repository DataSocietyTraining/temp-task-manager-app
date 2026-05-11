import { useState } from 'react'
import { Header, TaskInput, TaskList } from './components'
import type { Task } from './types/task'

type View = 'Tasks' | 'Focus' | 'Archive'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')
  const [details, setDetails] = useState('')
  const [currentView, setCurrentView] = useState<View>('Tasks')

  const addTask = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const newTask: Task = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      isHighImpact: false
    }

    setTasks((prev) => [...prev, newTask])
    setInput('')
    setDetails('')
  }

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const getViewTitle = () => {
    switch (currentView) {
      case 'Focus':
        return 'Focus Mode'
      case 'Archive':
        return 'Archived'
      default:
        return 'My Day'
    }
  }

  const getViewSubtitle = () => {
    switch (currentView) {
      case 'Focus':
        return 'High-impact tasks only.'
      case 'Archive':
        return 'Completed and archived tasks.'
      default:
        return 'Focus on what matters most.'
    }
  }

  const filteredTasks = (() => {
    switch (currentView) {
      case 'Focus':
        return tasks.filter((t) => !t.completed && t.isHighImpact)
      case 'Archive':
        return tasks.filter((t) => t.completed)
      default:
        return tasks.filter((t) => !t.completed)
    }
  })()

  return (
    <div className="min-h-screen bg-slate-50">
      <Header currentView={currentView} onChangeView={setCurrentView} />

      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-slate-900">{getViewTitle()}</h1>
          <p className="mt-3 text-lg text-slate-500">{getViewSubtitle()}</p>
        </div>

        {/* Task Input Form */}
        {currentView !== 'Archive' && (
          <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a methodical task..."
                  className="h-12 flex-1 rounded-lg border border-slate-300 bg-slate-50 px-4 text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
                <button
                  type="button"
                  onClick={addTask}
                  className="inline-flex h-12 items-center gap-2 rounded-lg bg-red-600 px-6 text-white font-semibold hover:bg-red-700 transition"
                >
                  <span>+</span>
                  Add
                </button>
              </div>

              {/* Details Section */}
              <details className="group">
                <summary className="cursor-pointer select-none text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Details <span className="text-slate-400">(optional)</span>
                </summary>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Add context, links, or sub-steps..."
                  className="mt-3 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
                  rows={4}
                />
              </details>
            </div>
          </div>
        )}

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          isEmpty={filteredTasks.length === 0}
        />
      </main>
    </div>
  )
}

export default App
