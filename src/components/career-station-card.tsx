'use client'

import {useState} from 'react'
import {motion, AnimatePresence} from 'motion/react'
import {ChevronDown} from 'lucide-react'

type CareerStationCardProps = {
  stationKey: string
  period: string
  company: string
  role: string
  body: string
  narrative: string
  technologies: string
  details: string[]
  expandLabel: string
  collapseLabel: string
  isLast?: boolean
  index: number
}

export function CareerStationCard({
  period,
  company,
  role,
  body,
  narrative,
  technologies,
  details,
  expandLabel,
  collapseLabel,
  isLast = false,
  index,
}: CareerStationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.li
      className="relative pl-lg"
      initial={{opacity: 0, x: -20}}
      whileInView={{opacity: 1, x: 0}}
      viewport={{once: true, margin: '-64px'}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Timeline dot with pulse on hover */}
      <motion.div
        className="absolute -left-lg top-[6px] h-3 w-3 rounded-full bg-accent ring-4 ring-accent/10"
        aria-hidden="true"
        whileHover={{scale: 1.4}}
        transition={{type: 'spring', stiffness: 400, damping: 15}}
      />

      {/* Card container */}
      <motion.div
        className={`rounded-xl border border-border/50 bg-surface-raised p-lg shadow-card cursor-pointer transition-colors duration-200 ${
          isExpanded ? 'border-accent/30 shadow-card-hover' : 'hover:border-accent/20 hover:shadow-card-hover'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{y: isExpanded ? 0 : -2}}
        transition={{type: 'spring', stiffness: 300, damping: 25}}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsExpanded(!isExpanded)
          }
        }}
      >
        {/* Header: always visible */}
        <div className="flex items-start justify-between gap-md">
          <div className="flex-1">
            <p className="text-label text-text-secondary">
              {period} &middot; {company}
            </p>
            <h3 className="text-body font-semibold text-text-primary mt-xs">
              {role}
            </h3>
            <p className="text-body text-text-secondary mt-xs leading-relaxed">
              {body}
            </p>
          </div>
          {/* Expand/collapse chevron */}
          {details.length > 0 && (
            <motion.div
              animate={{rotate: isExpanded ? 180 : 0}}
              transition={{type: 'spring', stiffness: 300, damping: 20}}
              className="mt-xs shrink-0"
            >
              <ChevronDown className="h-5 w-5 text-text-secondary" />
            </motion.div>
          )}
        </div>

        {/* Expandable details */}
        <AnimatePresence initial={false}>
          {isExpanded && details.length > 0 && (
            <motion.div
              initial={{height: 0, opacity: 0}}
              animate={{height: 'auto', opacity: 1}}
              exit={{height: 0, opacity: 0}}
              transition={{
                height: {type: 'spring', stiffness: 250, damping: 30},
                opacity: {duration: 0.2},
              }}
              className="overflow-hidden"
            >
              <div className="mt-md pt-md border-t border-border/30">
                {/* Narrative: the red thread */}
                <p className="text-label text-accent italic mb-md">
                  {narrative}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-xs mb-md">
                  {technologies.split(', ').map((tech) => (
                    <span
                      key={tech}
                      className="text-label border border-accent/20 bg-accent/5 text-accent font-medium rounded-full px-3 py-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Detail tasks */}
                <ul className="flex flex-col gap-xs">
                  {details.map((detail, i) => (
                    <motion.li
                      key={i}
                      initial={{opacity: 0, x: -10}}
                      animate={{opacity: 1, x: 0}}
                      transition={{delay: i * 0.05, duration: 0.3}}
                      className="text-body text-text-secondary leading-relaxed flex items-start gap-sm"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent/50 shrink-0" aria-hidden="true" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand/collapse label */}
        {details.length > 0 && (
          <p className="text-label text-accent/70 mt-sm text-right">
            {isExpanded ? collapseLabel : expandLabel}
          </p>
        )}
      </motion.div>
    </motion.li>
  )
}
