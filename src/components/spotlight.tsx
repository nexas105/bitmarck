'use client'

import {useCallback, useRef, useState, type ReactNode} from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export function Spotlight({children, className = ''}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({x: 0, y: 0})
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      {/* Glow follows cursor - hidden on touch devices */}
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden transition-opacity duration-500 md:pointer-fine:block"
        style={{
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(37, 99, 235, 0.05), transparent 70%)`,
          willChange: 'background',
        }}
        aria-hidden="true"
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
