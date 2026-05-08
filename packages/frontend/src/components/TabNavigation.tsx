import React from 'react'

type View = 'Tasks' | 'Focus' | 'Archive'

interface TabNavigationProps {
  currentView: View
  onChangeView: (view: View) => void
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ currentView, onChangeView }) => {
  const tabs: View[] = ['Tasks', 'Focus', 'Archive']

  return (
    <div className="flex gap-8 items-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChangeView(tab)}
          className={`font-semibold text-base pb-1 transition-colors ${
            currentView === tab
              ? 'text-[#4c1d95] border-b-2 border-[#4c1d95]'
              : 'text-[#a78bfa] hover:text-[#4c1d95]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
