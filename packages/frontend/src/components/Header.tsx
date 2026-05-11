import React from 'react'
import { TabNavigation } from './TabNavigation'

type View = 'Tasks' | 'Focus' | 'Archive'

interface HeaderProps {
  currentView: View
  onChangeView: (view: View) => void
}

export const Header: React.FC<HeaderProps> = ({ currentView, onChangeView }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-lg font-bold text-purple-700">Methodical Tasks</div>
        <TabNavigation currentView={currentView} onChangeView={onChangeView} />
      </div>
    </header>
  )
}
