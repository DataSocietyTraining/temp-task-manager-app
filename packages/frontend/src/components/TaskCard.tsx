import React from 'react'

export type TaskStatus = 'Todo' | 'In Progress' | 'Done' | string

interface TaskCardProps {
  title: string
  assignee: string
  status: TaskStatus
}

const statusStyles: Record<string, string> = {
  Todo: 'bg-slate-100 text-slate-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Done: 'bg-emerald-100 text-emerald-800'
}

export const TaskCard: React.FC<TaskCardProps> = ({ title, assignee, status }) => {
  const badgeClass = statusStyles[status] ?? 'bg-violet-100 text-violet-800'

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">Assigned to <span className="font-medium text-slate-900">{assignee}</span></p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${badgeClass}`}>
          {status}
        </span>
      </div>
    </article>
  )
}
