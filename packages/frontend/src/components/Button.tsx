import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'font-bold transition-colors rounded-xl flex items-center justify-center'

  const variantClasses = {
    primary: 'bg-[#e02500] hover:bg-[#cc1f00] text-white',
    secondary: 'bg-[#a78bfa] hover:bg-[#4c1d95] text-white',
    tertiary: 'bg-[#ddaffe] text-[#653d83] hover:bg-[#e8c5ff]'
  }

  const sizeClasses = {
    sm: 'text-sm px-6 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-base px-6 py-4'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  )
}
