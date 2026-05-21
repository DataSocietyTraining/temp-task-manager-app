import React from 'react'
import { Button } from './Button'

interface FocusModeCardProps {
  highImpactCount: number
  isInFocusView: boolean
  onViewInsights: () => void
  onBackToTasks: () => void
}

export const FocusModeCard: React.FC<FocusModeCardProps> = ({
  highImpactCount,
  isInFocusView,
  onViewInsights,
  onBackToTasks
}) => {
  return (
    <div
      className="relative overflow-hidden rounded-[18px] p-8 text-white"
      style={{
        background: 'linear-gradient(155deg, #2B1452 0%, #3A1E6E 100%)'
      }}
    >
      {/* Decorative circle */}
      <div className="absolute -bottom-14 -right-14 h-52 w-52 rounded-full bg-[rgba(75,41,130,0.45)] blur-[36px]" />

      {/* Content */}
      <div className="relative z-10">
        <h3 className="mb-3 text-[44px] font-bold leading-[1.05] tracking-[-0.01em] text-white">Focus Mode</h3>
        <p className="mb-12 max-w-md text-[40px] font-medium leading-[1.2] text-[#B4A1E6]">
          {highImpactCount} high-impact task{highImpactCount !== 1 ? 's' : ''} waiting
        </p>
        <Button
          variant="tertiary"
          size="md"
          className="h-14 rounded-[18px] px-10 text-[40px] font-bold leading-none text-[#674285] bg-[#CF9DF7] hover:bg-[#C993F4]"
          onClick={isInFocusView ? onBackToTasks : onViewInsights}
        >
          {isInFocusView ? 'Back to Tasks' : 'View Insights'}
        </Button>
      </div>
    </div>
  )
}
