
import React from 'react'
import { TabNavigation } from './TabNavigation'
import { theme } from '../theme'

type View = 'Tasks' | 'Focus' | 'Archive'

interface HeaderProps {
  currentView: View
  onChangeView: (view: View) => void
}

export const Header: React.FC<HeaderProps> = ({ currentView, onChangeView }) => {
  return (
    <header
      className="sticky top-0 z-20 shadow-sm"
      style={{
        borderBottom: `1px solid ${theme.colors.headerBorder}`,
        background: theme.colors.headerBg,
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <div
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4"
      >
        <div
          className="text-lg font-bold"
          style={{ color: theme.colors.headerText }}
        >
          Methodical Tasks
        </div>
        <TabNavigation currentView={currentView} onChangeView={onChangeView} />
      </div>
    </header>
  )
}
