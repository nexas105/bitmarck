'use client'

import {type ReactNode} from 'react'

type SectionHeaderProps = {
  number: string
  eyebrow: string
  heading: string
  id?: string
  children?: ReactNode
}

export function SectionHeader({number, eyebrow, heading, id, children}: SectionHeaderProps) {
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
        {number} / {eyebrow}
      </p>
      <h2
        id={id}
        className="text-section font-bold text-text-primary tracking-tight mt-xs inline-block"
      >
        {heading}
        <span className="block h-1 w-16 bg-linear-to-r from-accent to-accent/40 rounded-full mt-sm" aria-hidden="true" />
      </h2>
      {children && (
        <div className="mt-md">
          {children}
        </div>
      )}
    </div>
  )
}
