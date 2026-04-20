'use client'

import {type ReactNode} from 'react'

type SectionHeaderProps = {
  number: string
  eyebrow: string
  heading: string
  id?: string
  children?: ReactNode
  variant?: 'light' | 'dark'
}

export function SectionHeader({number, eyebrow, heading, id, children, variant = 'light'}: SectionHeaderProps) {
  const isDark = variant === 'dark'

  return (
    <div>
      <p className={`font-mono text-xs tracking-[0.2em] uppercase ${isDark ? 'text-emerald-400' : 'text-accent'}`}>
        {number} / {eyebrow}
      </p>
      <h2
        id={id}
        className={`text-section font-bold tracking-tight mt-xs inline-block ${isDark ? 'text-white' : 'text-text-primary'}`}
      >
        {heading}
        <span className={`block h-1 w-16 rounded-full mt-sm ${isDark ? 'bg-linear-to-r from-emerald-400 to-emerald-400/40' : 'bg-linear-to-r from-accent to-accent/40'}`} aria-hidden="true" />
      </h2>
      {children && (
        <div className="mt-md">
          {children}
        </div>
      )}
    </div>
  )
}
