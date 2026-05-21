


import React from 'react'
import type { Task } from '../types/task'
import { theme } from '../theme'

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}


// React.memo: Only re-render TaskItem if its task prop changes (optimizes list rendering)
export const TaskItem: React.FC<TaskItemProps> = React.memo(({ task, onToggle, onDelete }) => (
  <div
    className={
      'flex items-center transition-colors'
      + (task.completed
        ? ' opacity-70'
        : ' shadow-sm')
    }
    style={{
      minHeight: theme.spacing.cardMinHeight,
      borderRadius: theme.radius.input,
      paddingLeft: theme.spacing.cardPaddingX,
      paddingRight: theme.spacing.cardPaddingX,
      paddingTop: theme.spacing.cardPaddingY,
      paddingBottom: theme.spacing.cardPaddingY,
      marginBottom: theme.spacing.cardGap,
      background: task.completed ? theme.colors.surfaceMuted : theme.colors.surface,
      boxShadow: !task.completed ? '0 1px 2px 0 ' + theme.colors.cardShadow : undefined,
      transition: 'background 0.2s, box-shadow 0.2s',
    }}
  >
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => onToggle(task.id)}
      className={'transition-colors'}
      style={{
        width: theme.spacing.checkbox,
        height: theme.spacing.checkbox,
        minWidth: theme.spacing.checkbox,
        minHeight: theme.spacing.checkbox,
        borderRadius: theme.radius.checkbox,
        marginRight: theme.spacing.md,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: task.completed ? theme.colors.primaryBorder : theme.colors.primaryBorderMuted,
        background: task.completed ? theme.colors.primaryLight : theme.colors.surface,
        accentColor: task.completed ? theme.colors.primaryLight : theme.colors.primaryBorderMuted,
        appearance: 'none',
        outline: 'none',
        boxShadow: `0 0 0 2px ${task.completed ? theme.colors.primaryBorder : theme.colors.primaryBorderMuted}`,
        transition: 'background 0.2s, border-color 0.2s',
      }}
    />
    <span
      className={'flex-1 transition-colors' + (task.completed ? ' line-through' : '')}
      style={{
        fontSize: theme.typography.heading.lg.fontSize,
        fontWeight: theme.typography.fontWeight.medium,
        color: task.completed ? '#8B89A0' : '#232323', // Not in theme, fallback to original
        fontFamily: theme.typography.fontFamily,
        transition: 'color 0.2s',
      }}
    >
      {task.text}
    </span>
    {task.completed && (
      <button
        style={{
          marginLeft: theme.spacing.md,
          padding: theme.spacing.xs,
          borderRadius: theme.radius.input,
          transition: 'background 0.2s',
        }}
        className="transition"
        aria-label="Delete task"
        onClick={() => onDelete(task.id)}
        type="button"
        onMouseOver={e => (e.currentTarget.style.background = theme.colors.border)}
        onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
      >
        {/* Trash icon, Figma color #B0B0B0 */}
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={theme.colors.textPlaceholder} strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    )}
  </div>
))
