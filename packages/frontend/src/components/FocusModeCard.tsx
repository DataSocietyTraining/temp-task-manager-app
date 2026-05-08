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
      className="relative overflow-hidden rounded-xl p-8 text-white"
      style={{
        background: 'linear-gradient(155deg, rgb(38, 17, 68) 0%, rgb(66, 43, 114) 100%)'
      }}
    >
      {/* Decorative circle */}
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[rgba(44,18,91,0.2)] rounded-full blur-[32px]" />

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-3">Focus Mode</h3>
        <p className="text-sm font-normal text-[#af96e5] mb-8 max-w-xs leading-relaxed">
          Deep work session active. Prioritizing
          <br />
          {highImpactCount} high-impact task{highImpactCount !== 1 ? 's' : ''}.
        </p>
        <Button
          variant="tertiary"
          size="sm"
          onClick={isInFocusView ? onBackToTasks : onViewInsights}
        >
          {isInFocusView ? 'Back to Tasks' : 'View Insights'}
        </Button>
      </div>
    </div>
  )
}
