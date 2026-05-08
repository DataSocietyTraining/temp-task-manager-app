import React from 'react'

type View = 'Tasks' | 'Focus' | 'Archive'

interface HeroSectionProps {
  currentView: View
  highImpactCount: number
  archivedCount: number
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentView,
  highImpactCount,
  archivedCount
}) => {
  const getTitleAndSubtitle = () => {
    switch (currentView) {
      case 'Focus':
        return {
          title: 'Focus Mode',
          subtitle: `${highImpactCount} high-impact task${highImpactCount !== 1 ? 's' : ''} waiting`
        }
      case 'Archive':
        return {
          title: 'Archive',
          subtitle: `${archivedCount} completed task${archivedCount !== 1 ? 's' : ''}`
        }
      default:
        return {
          title: 'My Day',
          subtitle: 'Focus on what matters most.'
        }
    }
  }

  const { title, subtitle } = getTitleAndSubtitle()

  return (
    <div className="text-center mb-10">
      <h1 className="text-5xl font-bold text-[#2c125b] mb-2">{title}</h1>
      <p className="text-[#494550] text-base font-medium opacity-70">{subtitle}</p>
    </div>
  )
}
