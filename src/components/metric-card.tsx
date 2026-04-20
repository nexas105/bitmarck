'use client'

import {motion} from 'motion/react'

type MetricCardProps = {
  value: string
  label: string
  index: number
}

export function MetricCard({value, label, index}: MetricCardProps) {
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
          {value}
        </p>
        <p className="text-xs text-white/70 mt-sm font-medium tracking-widest uppercase">
          {label}
        </p>
      </div>
    </motion.div>
  )
}
