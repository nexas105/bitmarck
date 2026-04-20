'use client'

import {motion, useScroll, useTransform} from 'motion/react'
import {useRef, type ReactNode} from 'react'

type Props = {
  children: ReactNode
  className?: string
  offset?: number
}

export function ParallaxSection({children, className = '', offset = 40}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{y, willChange: 'transform'}}>
        {children}
      </motion.div>
    </div>
  )
}
