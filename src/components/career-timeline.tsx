'use client'

import {useRef, useEffect, useState} from 'react'
import {motion, useScroll, useTransform} from 'motion/react'
import {useTranslations} from 'next-intl'
import {CareerStationCard} from '@/components/career-station-card'

const STATION_KEYS = [
  'bitmarck',
  'freelancer',
  'xecuro',
  'persona',
  'bhf',
  'bwi',
  'biermann',
  'mediacom',
  'telekom',
] as const

const STATION_MATCH: Record<string, boolean> = {
  bwi: true,
  xecuro: true,
  bhf: true,
  bitmarck: true,
  telekom: false,
  mediacom: false,
  biermann: false,
  persona: false,
  freelancer: false,
}

export function CareerTimeline() {
  const t = useTranslations('Career')
  const containerRef = useRef<HTMLDivElement>(null)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  const expandLabel = t('expandLabel')
  const collapseLabel = t('collapseLabel')
  const detailLink = t('detailLink')

  return (
    <div className="relative pl-xl" ref={containerRef}>
      {/* SVG vertical accent gradient line with draw-on-scroll */}
      <svg
        className="absolute left-[3px] top-[4px] bottom-[4px] w-[2px]"
        style={{height: 'calc(100% - 8px)'}}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="1" />
            <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {prefersReduced ? (
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="url(#timeline-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : (
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="url(#timeline-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{pathLength}}
          />
        )}
      </svg>

      <ol className="relative flex flex-col gap-lg">
        {STATION_KEYS.map((key, index) => {
          const detailKeys = t.raw(`stations.${key}.details`) as string[]

          return (
            <CareerStationCard
              key={key}
              stationKey={key}
              period={t(`stations.${key}.period`)}
              company={t(`stations.${key}.company`)}
              role={t(`stations.${key}.role`)}
              body={t(`stations.${key}.body`)}
              narrative={t(`stations.${key}.narrative`)}
              technologies={t(`stations.${key}.technologies`)}
              details={detailKeys}
              expandLabel={expandLabel}
              collapseLabel={collapseLabel}
              detailLink={detailLink}
              isLast={index === STATION_KEYS.length - 1}
              index={index}
              dataMatch={STATION_MATCH[key]}
            />
          )
        })}
      </ol>
    </div>
  )
}
