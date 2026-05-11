import React from 'react'

type View = 'Tasks' | 'Focus' | 'Archive'

interface TabNavigationProps {
  currentView: View
  onChangeView: (view: View) => void
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ currentView, onChangeView }) => {
  const tabs: View[] = ['Tasks', 'Focus', 'Archive']

  return (
    <nav aria-label="Primary navigation">
      <div className="flex items-center gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onChangeView(tab)}
            className={`relative text-sm font-semibold transition-colors ${
              currentView === tab
                ? 'text-purple-700'
                : 'text-purple-400 hover:text-purple-700'
            }`}
          >
            <span>{tab}</span>
            {currentView === tab && (
              <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-purple-700" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
