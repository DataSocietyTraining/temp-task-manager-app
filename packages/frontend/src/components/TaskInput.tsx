

import React from 'react'
import { theme } from '../theme'

interface TaskInputProps {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onAddClick: () => void
  placeholder?: string
}

export const TaskInput: React.FC<TaskInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onAddClick,
  placeholder = 'Add a methodical task...'
}) => (
  <div
    className="flex w-full"
    style={{
      maxWidth: theme.spacing.maxInputWidth,
      gap: theme.spacing.gap,
      marginBottom: theme.spacing.lg,
    }}
  >
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="flex-1 outline-none"
      style={{
        borderRadius: theme.radius.input,
        background: theme.colors.surfaceInput,
        paddingLeft: theme.spacing.inputPaddingX,
        paddingRight: theme.spacing.inputPaddingX,
        paddingTop: theme.spacing.inputPaddingY,
        paddingBottom: theme.spacing.inputPaddingY,
        fontSize: theme.typography.body.base.fontSize,
        color: theme.colors.textMuted,
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.body.base.fontWeight,
        transition: 'box-shadow 0.2s',
      }}
      // placeholderColor is not a valid prop; placeholder color is set via CSS only
      // Focus ring
      onFocus={e => (e.currentTarget.style.boxShadow = `0 0 0 2px ${theme.colors.primary}`)}
      onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
    />
    <button
      type="button"
      onClick={onAddClick}
      style={{
        background: theme.colors.accentRed,
        color: '#fff',
        fontWeight: theme.typography.fontWeight.semibold,
        borderRadius: theme.radius.button,
        paddingLeft: theme.spacing.buttonPaddingX,
        paddingRight: theme.spacing.buttonPaddingX,
        paddingTop: theme.spacing.buttonPaddingY,
        paddingBottom: theme.spacing.buttonPaddingY,
        fontSize: theme.typography.body.base.fontSize,
        fontFamily: theme.typography.fontFamily,
        transition: 'background 0.2s',
      }}
      onMouseOver={e => (e.currentTarget.style.background = theme.colors.accentRedHover)}
      onMouseOut={e => (e.currentTarget.style.background = theme.colors.accentRed)}
    >
      + Add
    </button>
  </div>
)
