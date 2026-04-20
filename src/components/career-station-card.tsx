'use client'

import {useState} from 'react'
import {motion, AnimatePresence} from 'motion/react'
import {ChevronDown} from 'lucide-react'
import {Link} from '@/i18n/navigation'

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
  detailLink: string
  isLast?: boolean
  index: number
  dataMatch?: boolean
}

export function CareerStationCard({
  stationKey,
  period,
  company,
  role,
  body,
  narrative,
  technologies,
  details,
  expandLabel,
  collapseLabel,
  detailLink,
  isLast = false,
  index,
  dataMatch,
}: CareerStationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.li
      className="relative pl-xl"
      initial={{opacity: 0, x: -24}}
      whileInView={{opacity: 1, x: 0}}
      viewport={{once: true, margin: '-64px'}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...(dataMatch !== undefined ? {'data-match': String(dataMatch)} : {})}
    >
      {/* Timeline dot with ring animation */}
      <motion.div
        className={`absolute -left-[22px] top-[8px] h-3 w-3 rounded-full border-2 border-accent transition-colors duration-200 ${
          isExpanded ? 'bg-accent' : 'bg-surface-raised'
        }`}
        aria-hidden="true"
        whileHover={{scale: 1.5}}
        transition={{type: 'spring', stiffness: 400, damping: 15}}
      />

      {/* Card container */}
      <motion.div
        className={`group rounded-2xl border bg-surface-raised p-lg shadow-card cursor-pointer transition-all duration-300 ${
          isExpanded
            ? 'border-accent/30 shadow-card-hover ring-1 ring-accent/10'
            : 'border-border/60 hover:border-accent/20 hover:shadow-card-hover'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{y: isExpanded ? 0 : -3}}
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
            <div className="flex flex-wrap items-center gap-sm">
              <span className="text-label font-medium text-accent">
                {period}
              </span>
              <span className="text-label text-text-tertiary">&middot;</span>
              <span className="text-label text-text-secondary font-medium">
                {company}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mt-xs tracking-tight">
              {role}
            </h3>
            <p className="text-body text-text-secondary mt-sm leading-relaxed">
              {body}
            </p>
          </div>
          {/* Expand/collapse chevron */}
          {details.length > 0 && (
            <motion.div
              animate={{rotate: isExpanded ? 180 : 0}}
              transition={{type: 'spring', stiffness: 300, damping: 20}}
              className="mt-sm shrink-0 p-xs rounded-full bg-surface-subtle group-hover:bg-accent/10 transition-colors duration-200"
            >
              <ChevronDown className="h-4 w-4 text-text-secondary group-hover:text-accent transition-colors duration-200" />
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
                opacity: {duration: 0.25},
              }}
              className="overflow-hidden"
            >
              <div className="mt-lg pt-lg border-t border-border/50">
                {/* Technologies */}
                <div className="flex flex-wrap gap-xs mb-lg">
                  {technologies.split(', ').map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-accent/8 text-accent font-medium rounded-full px-2.5 py-1 tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Detail tasks */}
                <ul className="flex flex-col gap-sm">
                  {details.map((detail, i) => (
                    <motion.li
                      key={i}
                      initial={{opacity: 0, x: -12}}
                      animate={{opacity: 1, x: 0}}
                      transition={{delay: i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
                      className="text-body text-text-secondary leading-relaxed flex items-start gap-sm"
                    >
                      <span className="mt-[9px] h-1 w-1 rounded-full bg-accent/40 shrink-0" aria-hidden="true" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>

                {/* Detail page link */}
                <Link
                  href={`/karriere/${stationKey}`}
                  className="inline-flex items-center gap-xs text-label font-medium text-accent hover:text-accent-hover transition-colors duration-150 mt-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  {detailLink}
                  <span aria-hidden="true" className="transition-transform duration-200 hover:translate-x-0.5">&rarr;</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand/collapse label */}
        {details.length > 0 && (
          <p className="text-label text-accent/60 mt-md text-right font-medium group-hover:text-accent transition-colors duration-200">
            {isExpanded ? collapseLabel : expandLabel}
          </p>
        )}
      </motion.div>
    </motion.li>
  )
}
