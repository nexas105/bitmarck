'use client'

import {motion} from 'motion/react'
import {type ReactNode} from 'react'

type Props = {
  children: ReactNode
}

export function HeroAnimations({children}: Props) {
  return (
    <motion.div
      initial={{opacity: 0, y: 30}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.7, ease: [0.16, 1, 0.3, 1]}}
    >
      {children}
    </motion.div>
  )
}
