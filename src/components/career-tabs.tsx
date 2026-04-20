'use client'

import {useState} from 'react'
import {motion, AnimatePresence} from 'motion/react'
import {useTranslations} from 'next-intl'
import {Swiper, SwiperSlide} from 'swiper/react'
import {EffectCoverflow, EffectCards, EffectCube, EffectFlip, Pagination, Autoplay} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-flip'
import 'swiper/css/pagination'
import {CareerTimeline} from '@/components/career-timeline'
import {Link} from '@/i18n/navigation'

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

type TabKey = 'timeline' | 'swiper' | 'compact' | 'cards'

const swiperEffects = ['Coverflow', 'Cards', 'Cube', 'Flip', 'Slide'] as const
type SwiperEffect = (typeof swiperEffects)[number]

export function CareerTabs() {
  const t = useTranslations('Career')
  const [activeTab, setActiveTab] = useState<TabKey>('timeline')

  const tabs: {key: TabKey; label: string}[] = [
    {key: 'timeline', label: t('tabs.timeline')},
    {key: 'swiper', label: t('tabs.swiper')},
    {key: 'compact', label: t('tabs.compact')},
    {key: 'cards', label: t('tabs.cards')},
  ]

  return (
    <div>
      {/* Tab bar */}
      <div className="flex justify-center mb-md">
        <div className="bg-primary-900/5 backdrop-blur-sm rounded-xl p-1 border border-border/30 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-lg py-sm text-label font-medium rounded-lg transition-colors duration-200 ${
                activeTab === tab.key
                  ? 'text-text-primary font-semibold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId="career-tab-bg"
                  className="absolute inset-0 bg-white shadow-sm rounded-lg"
                  transition={{type: 'spring', stiffness: 400, damping: 30}}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{opacity: 0, y: 8}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -8}}
          transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
        >
          {activeTab === 'timeline' && <CareerTimeline />}
          {activeTab === 'swiper' && <SwiperView />}
          {activeTab === 'compact' && <CompactView />}
          {activeTab === 'cards' && <CardsView />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function CompactView() {
  const t = useTranslations('Career')

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border/60">
            <th className="py-sm pr-lg text-xs font-semibold text-text-tertiary uppercase tracking-wide">Zeitraum</th>
            <th className="py-sm pr-lg text-xs font-semibold text-text-tertiary uppercase tracking-wide">Unternehmen</th>
            <th className="py-sm text-xs font-semibold text-text-tertiary uppercase tracking-wide">Rolle</th>
          </tr>
        </thead>
        <tbody>
          {STATION_KEYS.map((key) => (
            <tr key={key} className="border-b border-border/30 group">
              <td className="py-md pr-lg text-label text-accent font-medium whitespace-nowrap">
                {t(`stations.${key}.period`)}
              </td>
              <td className="py-md pr-lg text-label text-text-secondary font-medium whitespace-nowrap">
                {t(`stations.${key}.company`)}
              </td>
              <td className="py-md text-body text-text-primary">
                <Link
                  href={`/karriere/${key}`}
                  className="hover:text-accent transition-colors duration-150 inline-flex items-center gap-xs"
                >
                  {t(`stations.${key}.role`)}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-accent" aria-hidden="true">&rarr;</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CardsView() {
  const t = useTranslations('Career')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
      {STATION_KEYS.map((key) => {
        const company = t(`stations.${key}.company`)
        const initial = company.charAt(0).toUpperCase()

        // Deterministic color based on key
        const colors = [
          'bg-accent/15 text-accent',
          'bg-emerald-100 text-emerald-700',
          'bg-amber-100 text-amber-700',
          'bg-purple-100 text-purple-700',
          'bg-rose-100 text-rose-700',
          'bg-cyan-100 text-cyan-700',
          'bg-orange-100 text-orange-700',
          'bg-indigo-100 text-indigo-700',
          'bg-teal-100 text-teal-700',
        ]
        const colorIndex = STATION_KEYS.indexOf(key) % colors.length
        const colorClass = colors[colorIndex]

        return (
          <Link
            key={key}
            href={`/karriere/${key}`}
            className="group rounded-2xl border border-border/50 bg-surface-raised p-lg flex gap-md shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
          >
            {/* Company initial circle */}
            <div className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${colorClass}`}>
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-body font-semibold text-text-primary tracking-tight group-hover:text-accent transition-colors duration-200 truncate">
                {t(`stations.${key}.role`)}
              </h3>
              <p className="text-label text-text-secondary mt-xs">
                {company}
              </p>
              <p className="text-xs text-accent font-medium mt-xs">
                {t(`stations.${key}.period`)}
              </p>
              <p className="text-xs text-text-tertiary mt-sm line-clamp-2 leading-relaxed">
                {t(`stations.${key}.body`)}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

function SwiperView() {
  const t = useTranslations('Career')
  const [activeEffect, setActiveEffect] = useState<SwiperEffect>('Coverflow')

  const colors = [
    'from-accent to-accent/70',
    'from-emerald-500 to-emerald-400',
    'from-amber-500 to-amber-400',
    'from-purple-500 to-purple-400',
    'from-rose-500 to-rose-400',
    'from-cyan-500 to-cyan-400',
    'from-orange-500 to-orange-400',
    'from-indigo-500 to-indigo-400',
    'from-teal-500 to-teal-400',
  ]

  const renderCard = (key: (typeof STATION_KEYS)[number], i: number) => {
    const company = t(`stations.${key}.company`)
    const colorClass = colors[i % colors.length]

    return (
      <Link
        href={`/karriere/${key}`}
        className="block rounded-2xl border border-border/50 bg-surface-raised shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden h-full"
      >
        <div className={`h-1.5 bg-linear-to-r ${colorClass}`} />
        <div className="p-lg">
          <p className="text-xs font-medium text-accent mb-xs">
            {t(`stations.${key}.period`)}
          </p>
          <h3 className="text-body font-bold text-text-primary tracking-tight">
            {t(`stations.${key}.role`)}
          </h3>
          <p className="text-label text-text-secondary mt-xs">{company}</p>
          <p className="text-xs text-text-tertiary mt-md leading-relaxed line-clamp-3">
            {t(`stations.${key}.body`)}
          </p>
          <div className="flex flex-wrap gap-xs mt-md">
            {t(`stations.${key}.technologies`).split(', ').slice(0, 4).map((tech) => (
              <span key={tech} className="text-[10px] bg-accent/10 text-accent font-medium rounded-full px-2 py-0.5">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div>
      <style>{`
        .career-swiper .swiper-pagination-bullet-active { background: var(--color-accent) !important; }
        .career-swiper .swiper-slide { height: auto; }
      `}</style>

      {/* Effect Sub-Tabs */}
      <div className="flex justify-center mb-lg">
        <div className="flex gap-1">
          {swiperEffects.map((effect) => (
            <button
              key={effect}
              onClick={() => setActiveEffect(effect)}
              className={`relative text-xs rounded-full px-sm py-xs font-medium transition-colors duration-200 ${
                activeEffect === effect
                  ? 'text-text-primary font-semibold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {activeEffect === effect && (
                <motion.div
                  layoutId="career-effect-tab-bg"
                  className="absolute inset-0 bg-white shadow-sm rounded-full"
                  transition={{type: 'spring', stiffness: 400, damping: 30}}
                />
              )}
              <span className="relative z-10">{effect}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeEffect}
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -12}}
          transition={{duration: 0.3}}
        >
          {activeEffect === 'Coverflow' && (
            <Swiper
              className="career-swiper !pb-xl"
              modules={[EffectCoverflow, Pagination]}
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView={1.3}
              breakpoints={{
                640: {slidesPerView: 1.8},
                1024: {slidesPerView: 2.5},
              }}
              coverflowEffect={{rotate: 0, stretch: 0, depth: 120, modifier: 2, slideShadows: false}}
              pagination={{clickable: true}}
              spaceBetween={20}
            >
              {STATION_KEYS.map((key, i) => (
                <SwiperSlide key={key}>{renderCard(key, i)}</SwiperSlide>
              ))}
            </Swiper>
          )}

          {activeEffect === 'Cards' && (
            <div className="max-w-[380px] mx-auto">
              <Swiper
                className="career-swiper !pb-xl"
                modules={[EffectCards, Pagination]}
                effect="cards"
                grabCursor
                pagination={{clickable: true}}
                cardsEffect={{
                  perSlideOffset: 8,
                  perSlideRotate: 2,
                  rotate: true,
                  slideShadows: false,
                }}
              >
                {STATION_KEYS.map((key, i) => (
                  <SwiperSlide key={key}>{renderCard(key, i)}</SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {activeEffect === 'Cube' && (
            <div className="max-w-[380px] mx-auto">
              <Swiper
                className="career-swiper !pb-xl"
                modules={[EffectCube, Pagination]}
                effect="cube"
                grabCursor
                pagination={{clickable: true}}
                cubeEffect={{
                  shadow: false,
                  slideShadows: false,
                }}
              >
                {STATION_KEYS.map((key, i) => (
                  <SwiperSlide key={key}>{renderCard(key, i)}</SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {activeEffect === 'Flip' && (
            <div className="max-w-[380px] mx-auto">
              <Swiper
                className="career-swiper !pb-xl"
                modules={[EffectFlip, Pagination]}
                effect="flip"
                grabCursor
                pagination={{clickable: true}}
                flipEffect={{
                  slideShadows: false,
                }}
              >
                {STATION_KEYS.map((key, i) => (
                  <SwiperSlide key={key}>{renderCard(key, i)}</SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {activeEffect === 'Slide' && (
            <Swiper
              className="career-swiper !pb-xl"
              modules={[Pagination, Autoplay]}
              grabCursor
              pagination={{clickable: true}}
              autoplay={{delay: 3000, disableOnInteraction: true}}
              loop
              spaceBetween={20}
              breakpoints={{
                0: {slidesPerView: 1},
                640: {slidesPerView: 2},
                1024: {slidesPerView: 3},
              }}
            >
              {STATION_KEYS.map((key, i) => (
                <SwiperSlide key={key}>{renderCard(key, i)}</SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
