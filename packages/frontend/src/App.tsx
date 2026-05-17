import { useState } from 'react'
import { Header, TaskInput, TaskList, FocusModeCard } from './components'
import type { Task } from './types/task'

type View = 'Tasks' | 'Focus' | 'Archive'

const initialTasks: Task[] = [
  {
    id: 1,
    text: 'Review quarterly design guidelines',
    completed: false,
    isHighImpact: false,
  },
  {
    id: 2,
    text: 'Prepare editorial bento layout assets',
    completed: false,
    isHighImpact: false,
  },
  {
    id: 3,
    text: 'Check typographic scales for accessibility',
    completed: true,
    isHighImpact: false,
  },
  {
    id: 4,
    text: 'Morning focus session: Tonal depth study',
    completed: true,
    isHighImpact: false,
  },
]

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [input, setInput] = useState('')
  const [currentView, setCurrentView] = useState<View>('Tasks')

  const addTask = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const nextTask: Task = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      isHighImpact: false,
    }

    setTasks((previousTasks) => [...previousTasks, nextTask])
    setInput('')
  }

  const deleteTask = (id: number) => {
    setTasks((previousTasks) => previousTasks.filter((t) => t.id !== id))
  }

  const toggleTask = (id: number) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const sortedTasks = (taskList: Task[]) =>
    [...taskList].sort((a, b) => Number(a.completed) - Number(b.completed))

  const currentTasks =
    currentView === 'Archive'
      ? tasks.filter((task) => task.completed)
      : currentView === 'Focus'
      ? tasks.filter((task) => !task.completed && task.isHighImpact)
      : sortedTasks(tasks)

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="mx-auto max-w-[1296px] px-[24px] md:px-[72px]">
        <Header currentView={currentView} onChangeView={setCurrentView} />

        <main className="mx-auto w-full max-w-[500px] pb-[96px] pt-[48px]">
          <section className="mb-[40px] text-center">
            <h1 className="mx-auto w-[174.75px] text-[56px] font-bold leading-[56px] tracking-[-2.8px] text-[#2c125b]">
              My Day
            </h1>
            <p className="mx-auto mt-[8px] w-[215.75px] text-[16px] font-medium leading-[24px] text-[#494550] opacity-70">
              Focus on what matters most.
            </p>
          </section>

          {currentView !== 'Archive' && (
            <TaskInput
              value={input}
              onChange={setInput}
              onKeyDown={(event) => {
                if (event.key === 'Enter') addTask()
              }}
              onAddClick={addTask}
              placeholder="Add a methodical task..."
            />
          )}

          <TaskList
            tasks={currentTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            isEmpty={currentTasks.length === 0}
          />

          <FocusModeCard
            highImpactCount={tasks.filter((t) => !t.completed && t.isHighImpact).length}
            isInFocusView={currentView === 'Focus'}
            onViewInsights={() => setCurrentView('Focus')}
            onBackToTasks={() => setCurrentView('Tasks')}
          />
        </main>
      </div>
    </div>
  )
}

export default App
