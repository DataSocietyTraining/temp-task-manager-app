import React from 'react'
import { TabNavigation } from './TabNavigation'

type View = 'Tasks' | 'Focus' | 'Archive'

interface HeaderProps {
  currentView: View
  onChangeView: (view: View) => void
}

export const Header: React.FC<HeaderProps> = ({ currentView, onChangeView }) => {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-md bg-[rgba(248,250,252,0.8)] border-b border-[rgba(0,0,0,0.05)] shadow-sm">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-32 py-4">
        {/* Logo */}
        <div className="font-bold text-xl text-[#4c1d95] font-manrope">
          Methodical Tasks
        </div>

        {/* Navigation */}
        <TabNavigation currentView={currentView} onChangeView={onChangeView} />

        {/* Right Actions */}
        <div className="flex gap-4 items-center">
          <button className="text-[#4c1d95] hover:text-[#2c125b]" aria-label="Settings">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600" />
        </div>
      </div>
    </div>
  )
}
