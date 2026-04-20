'use client'

import {motion} from 'motion/react'
import {type ReactNode} from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export function TextReveal({children, className = ''}: Props) {
  const text = typeof children === 'string' ? children : String(children ?? '')
  const words = text.split(' ')

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, margin: '-40px'}}
      transition={{staggerChildren: 0.04}}
      className={`inline ${className}`}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: {opacity: 0, y: 8},
              visible: {opacity: 1, y: 0},
            }}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
