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
      initial={{opacity: 0, y: 20, scale: 0.95}}
      animate={{opacity: 1, y: 0, scale: 1}}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.03,
        transition: {type: 'spring', stiffness: 400, damping: 20},
      }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-lg text-center overflow-hidden cursor-default"
    >
      {/* Subtle gradient shimmer on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      <div className="relative">
        <p className="text-display font-bold text-white tracking-tight">
          {value}
        </p>
        <p className="text-label text-white/50 mt-xs font-medium tracking-wide uppercase">
          {label}
        </p>
      </div>
    </motion.div>
  )
}
