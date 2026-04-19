'use client'

import {motion, type Variants} from 'motion/react'

const fadeInUp: Variants = {
  hidden: {opacity: 0, y: 32},
  visible: {opacity: 1, y: 0},
}

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  variants?: Variants
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  variants = fadeInUp,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, margin: '-64px'}}
      variants={variants}
      transition={{duration: 0.7, delay, ease: [0.16, 1, 0.3, 1]}}
      className={className}
    >
      {children}
    </motion.div>
  )
}
