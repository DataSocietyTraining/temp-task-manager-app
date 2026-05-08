import { useCallback, useEffect, useState } from 'react'
import {
  Header,
  HeroSection,
  TaskInput,
  TaskList,
  FocusModeCard,
  ArchiveActions
} from './components'
import type { Task } from './types/task'
import * as api from './api/tasksApi'

type View = 'Tasks' | 'Focus' | 'Archive'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')
  const [currentView, setCurrentView] = useState<View>('Tasks')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setError(null)
    const data = await api.fetchTasks()
    setTasks(data)
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    refresh()
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load tasks')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [refresh])

  const addTask = async () => {
    if (!input.trim()) return
    setError(null)
    try {
      const created = await api.createTask(input.trim())
      setTasks((prev) => [...prev, created])
      setInput('')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not create task')
    }
  }

  const toggleTask = async (id: number) => {
    const t = tasks.find((x) => x.id === id)
    if (!t) return
    setError(null)
    try {
      const updated = await api.patchTask(id, { completed: !t.completed })
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not update task')
    }
  }

  const toggleHighImpact = async (id: number) => {
    const t = tasks.find((x) => x.id === id)
    if (!t) return
    setError(null)
    try {
      const updated = await api.patchTask(id, { isHighImpact: !t.isHighImpact })
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not update task')
    }
  }

  const deleteTask = async (id: number) => {
    setError(null)
    try {
      await api.deleteTask(id)
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not delete task')
    }
  }

  const archiveCompletedTasks = async () => {
    const completed = tasks.filter((task) => task.completed)
    setError(null)
    try {
      await Promise.all(completed.map((t) => api.deleteTask(t.id)))
      setTasks((prev) => prev.filter((task) => !task.completed))
      setCurrentView('Tasks')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not clear archive')
      await refresh()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void addTask()
    }
  }

  const getFilteredTasks = () => {
    if (currentView === 'Focus') {
      return tasks.filter((task) => !task.completed && task.isHighImpact)
    }
    if (currentView === 'Archive') {
      return tasks.filter((task) => task.completed)
    }
    return tasks.filter((task) => !task.completed)
  }

  const filteredTasks = getFilteredTasks()
  const archivedCount = tasks.filter((task) => task.completed).length
  const highImpactCount = tasks.filter((task) => !task.completed && task.isHighImpact).length

  if (loading) {
    return (
      <div className="bg-[#f8fafa] min-h-screen flex items-center justify-center text-slate-600">
        Loading tasks…
      </div>
    )
  }

  return (
    <div className="bg-[#f8fafa] min-h-screen">
      <Header currentView={currentView} onChangeView={setCurrentView} />

      <div className="min-h-screen flex items-start justify-center pt-12 px-6">
        <div className="w-full max-w-[500px]">
          {error && (
            <div
              className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
              role="alert"
            >
              {error}
            </div>
          )}

          <HeroSection
            currentView={currentView}
            highImpactCount={highImpactCount}
            archivedCount={archivedCount}
          />

          {currentView !== 'Archive' && (
            <TaskInput
              value={input}
              onChange={setInput}
              onKeyPress={handleKeyPress}
              onAddClick={() => void addTask()}
            />
          )}

          <TaskList
            tasks={filteredTasks}
            currentView={currentView}
            onToggle={(id) => void toggleTask(id)}
            onDelete={(id) => void deleteTask(id)}
            onToggleHighImpact={(id) => void toggleHighImpact(id)}
            isEmpty={filteredTasks.length === 0}
          />

          {currentView !== 'Archive' && highImpactCount > 0 && (
            <FocusModeCard
              highImpactCount={highImpactCount}
              isInFocusView={currentView === 'Focus'}
              onViewInsights={() => setCurrentView('Focus')}
              onBackToTasks={() => setCurrentView('Tasks')}
            />
          )}

          {currentView === 'Archive' && archivedCount > 0 && (
            <ArchiveActions
              onBackToTasks={() => setCurrentView('Tasks')}
              onClearArchive={() => void archiveCompletedTasks()}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
