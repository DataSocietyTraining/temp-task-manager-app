import React from 'react'
import { Button } from './Button'

interface ArchiveActionsProps {
  onBackToTasks: () => void
  onClearArchive: () => void
}

export const ArchiveActions: React.FC<ArchiveActionsProps> = ({
  onBackToTasks,
  onClearArchive
}) => {
  return (
    <div className="flex gap-4 justify-center mt-8">
      <Button variant="secondary" size="md" onClick={onBackToTasks}>
        Back to Tasks
      </Button>
      <Button variant="primary" size="md" onClick={onClearArchive}>
        Clear Archive
      </Button>
    </div>
  )
}
