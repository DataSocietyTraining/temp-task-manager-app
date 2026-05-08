import React from 'react'

interface EmptyStateProps {
  message: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="text-center py-12">
      <p className="text-[#7a7581] text-base">{message}</p>
    </div>
  )
}
