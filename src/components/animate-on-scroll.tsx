'use client'

import {motion, type Variants} from 'motion/react'

const presets = {
  fadeUp: {
    hidden: {opacity: 0, y: 40},
    visible: {opacity: 1, y: 0},
  },
  fadeDown: {
    hidden: {opacity: 0, y: -40},
    visible: {opacity: 1, y: 0},
  },
  fadeLeft: {
    hidden: {opacity: 0, x: -60},
    visible: {opacity: 1, x: 0},
  },
  fadeRight: {
    hidden: {opacity: 0, x: 60},
    visible: {opacity: 1, x: 0},
  },
  scaleUp: {
    hidden: {opacity: 0, scale: 0.9},
    visible: {opacity: 1, scale: 1},
  },
  blur: {
    hidden: {opacity: 0, filter: 'blur(10px)'},
    visible: {opacity: 1, filter: 'blur(0px)'},
  },
} as const satisfies Record<string, Variants>

type PresetName = keyof typeof presets

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  preset?: PresetName
  variants?: Variants
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  preset = 'fadeUp',
  variants,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, margin: '-80px'}}
      variants={variants ?? presets[preset]}
      transition={{duration: 0.8, delay, ease: [0.16, 1, 0.3, 1]}}
      className={className}
    >
      {children}
    </motion.div>
  )
}
