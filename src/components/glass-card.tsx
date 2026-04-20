'use client'

import {type ReactNode} from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export function GlassCard({children, className = ''}: Props) {
  return (
    <div
      className={`group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:shadow-glow ${className}`}
    >
      {/* Gradient border shimmer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, transparent 50%, rgba(139, 92, 246, 0.06) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Inner glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.06)',
        }}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  )
}

/**
 * Light-theme variant for use on light backgrounds (skills section, etc.)
 */
export function GlassCardLight({children, className = ''}: Props) {
  return (
    <div
      className={`group relative rounded-2xl border border-border/50 bg-surface-raised/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-accent/20 hover:shadow-card-hover hover:-translate-y-1 ${className}`}
    >
      {/* Subtle gradient on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, transparent 50%, rgba(139, 92, 246, 0.02) 100%)',
        }}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  )
}
