'use client'

import {useEffect, useRef} from 'react'
import {motion, useInView, animate} from 'motion/react'

type MetricCardProps = {
  value: string
  label: string
  context: string
  index: number
}

function parseNumericValue(value: string): {num: number; prefix: string; suffix: string} | null {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/)
  if (!match) return null
  return {prefix: match[1], num: parseInt(match[2], 10), suffix: match[3]}
}

function AnimatedNumber({value}: {value: string}) {
  const ref = useRef<HTMLSpanElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, {once: true})
  const parsed = parseNumericValue(value)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || !parsed || hasAnimated.current || !numRef.current) return
    hasAnimated.current = true

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      numRef.current.textContent = String(parsed.num)
      return
    }

    const controls = animate(0, parsed.num, {
      duration: 2,
      ease: 'easeOut',
      onUpdate(latest) {
        if (numRef.current) {
          numRef.current.textContent = String(Math.round(latest))
        }
      },
    })

    return () => controls.stop()
  }, [isInView, parsed])

  if (!parsed) {
    return <span ref={ref}>{value}</span>
  }

  return (
    <span ref={ref}>
      {parsed.prefix}<span ref={numRef}>0</span>{parsed.suffix}
    </span>
  )
}

export function MetricCard({value, label, context, index}: MetricCardProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 24, scale: 0.92}}
      animate={{opacity: 1, y: 0, scale: 1}}
      transition={{
        duration: 0.6,
        delay: 0.4 + index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.04,
        borderColor: 'rgba(255,255,255,0.3)',
        transition: {type: 'spring', stiffness: 400, damping: 20},
      }}
      className="group relative rounded-2xl border border-white/[0.15] bg-white/[0.08] backdrop-blur-md p-xl text-center overflow-hidden cursor-default"
    >
      {/* Subtle gradient shimmer on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
      {/* Top accent line */}
      <div className="absolute top-0 left-[20%] right-[20%] h-px bg-linear-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
      <div className="relative">
        <p className="text-section font-bold text-white tracking-tight leading-none">
          <AnimatedNumber value={value} />
        </p>
        <p className="text-xs text-white/70 mt-sm font-medium tracking-widest uppercase">
          {label}
        </p>
        <p className="text-[10px] text-white/40 mt-xs leading-snug">
          {context}
        </p>
      </div>
    </motion.div>
  )
}
