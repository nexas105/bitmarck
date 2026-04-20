'use client'

import React, {useState} from 'react'
import {AnimatePresence, motion} from 'motion/react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {EffectCoverflow, EffectCards, EffectCube, EffectFlip, Pagination, Navigation, Autoplay} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-flip'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const views = ['Carousel', 'Grid'] as const
type View = (typeof views)[number]

const swiperEffects = ['Coverflow', 'Cards', 'Cube', 'Flip', 'Slide'] as const
type SwiperEffect = (typeof swiperEffects)[number]

type Props = {
  children: React.ReactNode
  /** Unique ID for layoutId animations (prevents conflicts between multiple instances) */
  id: string
  /** Default swiper effect */
  defaultEffect?: SwiperEffect
  /** Grid columns on desktop */
  gridCols?: 2 | 3
  /** Show navigation arrows on coverflow/slide */
  showNavigation?: boolean
  /** Autoplay delay in ms (0 = disabled) */
  autoplayDelay?: number
}

export function UniversalCarousel({
  children,
  id,
  defaultEffect = 'Coverflow',
  gridCols = 2,
  showNavigation = true,
  autoplayDelay = 4000,
}: Props) {
  const [activeView, setActiveView] = useState<View>('Carousel')
  const [activeEffect, setActiveEffect] = useState<SwiperEffect>(defaultEffect)
  const items = React.Children.toArray(children)

  const gridClass = gridCols === 3
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg'
    : 'grid grid-cols-1 md:grid-cols-2 gap-lg'

  const autoplay = autoplayDelay > 0
    ? {delay: autoplayDelay, disableOnInteraction: true}
    : false

  return (
    <div>
      <style>{`
        .${id}-swiper .swiper-pagination-bullet-active { background: var(--color-accent) !important; }
        .${id}-swiper .swiper-button-next, .${id}-swiper .swiper-button-prev { color: var(--color-accent) !important; }
      `}</style>

      {/* Main View Toggle */}
      <div className="mb-md flex justify-center">
        <div className="bg-primary-900/5 backdrop-blur-sm rounded-xl p-1 border border-border/30 flex gap-1">
          {views.map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`relative rounded-lg px-md py-xs text-sm font-medium transition-colors duration-200 ${
                activeView === view ? 'text-text-primary font-semibold' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {activeView === view && (
                <motion.div
                  layoutId={`${id}-main-tab`}
                  className="absolute inset-0 bg-white shadow-sm rounded-lg"
                  transition={{type: 'spring', stiffness: 400, damping: 30}}
                />
              )}
              <span className="relative z-10">{view}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Effect Sub-Tabs */}
      <AnimatePresence>
        {activeView === 'Carousel' && (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.2}}
            className="flex justify-center mb-lg overflow-hidden"
          >
            <div className="flex gap-1">
              {swiperEffects.map((effect) => (
                <button
                  key={effect}
                  onClick={() => setActiveEffect(effect)}
                  className={`relative text-xs rounded-full px-sm py-xs font-medium transition-colors duration-200 ${
                    activeEffect === effect ? 'text-text-primary font-semibold' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {activeEffect === effect && (
                    <motion.div
                      layoutId={`${id}-effect-tab`}
                      className="absolute inset-0 bg-white shadow-sm rounded-full"
                      transition={{type: 'spring', stiffness: 400, damping: 30}}
                    />
                  )}
                  <span className="relative z-10">{effect}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeView === 'Carousel' ? (
          <motion.div
            key={`carousel-${activeEffect}`}
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -12}}
            transition={{duration: 0.3}}
          >
            {activeEffect === 'Coverflow' && (
              <Swiper
                className={`${id}-swiper !pb-xl`}
                modules={[EffectCoverflow, Pagination, ...(showNavigation ? [Navigation] : []), ...(autoplay ? [Autoplay] : [])]}
                effect="coverflow"
                grabCursor centeredSlides
                slidesPerView={1.2}
                breakpoints={{640: {slidesPerView: 1.8}, 1024: {slidesPerView: 2.5}}}
                coverflowEffect={{rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: false}}
                pagination={{clickable: true}}
                navigation={showNavigation}
                autoplay={autoplay || undefined}
                loop spaceBetween={20}
              >
                {items.map((child, i) => (
                  <SwiperSlide key={i} className="!h-auto">{child}</SwiperSlide>
                ))}
              </Swiper>
            )}

            {activeEffect === 'Cards' && (
              <div className="max-w-[400px] mx-auto">
                <Swiper
                  className={`${id}-swiper !pb-xl`}
                  modules={[EffectCards, Pagination, ...(autoplay ? [Autoplay] : [])]}
                  effect="cards" grabCursor
                  pagination={{clickable: true}}
                  autoplay={autoplay || undefined}
                  cardsEffect={{perSlideOffset: 8, perSlideRotate: 2, rotate: true, slideShadows: false}}
                >
                  {items.map((child, i) => (
                    <SwiperSlide key={i}>{child}</SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {activeEffect === 'Cube' && (
              <div className="max-w-[400px] mx-auto">
                <Swiper
                  className={`${id}-swiper !pb-xl`}
                  modules={[EffectCube, Pagination, ...(autoplay ? [Autoplay] : [])]}
                  effect="cube" grabCursor
                  pagination={{clickable: true}}
                  autoplay={autoplay || undefined}
                  cubeEffect={{shadow: false, slideShadows: false}}
                >
                  {items.map((child, i) => (
                    <SwiperSlide key={i}>{child}</SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {activeEffect === 'Flip' && (
              <div className="max-w-[400px] mx-auto">
                <Swiper
                  className={`${id}-swiper !pb-xl`}
                  modules={[EffectFlip, Pagination, ...(autoplay ? [Autoplay] : [])]}
                  effect="flip" grabCursor
                  pagination={{clickable: true}}
                  autoplay={autoplay || undefined}
                  flipEffect={{slideShadows: false}}
                >
                  {items.map((child, i) => (
                    <SwiperSlide key={i}>{child}</SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {activeEffect === 'Slide' && (
              <Swiper
                className={`${id}-swiper !pb-xl`}
                modules={[Pagination, ...(showNavigation ? [Navigation] : []), ...(autoplay ? [Autoplay] : [])]}
                grabCursor
                pagination={{clickable: true}}
                navigation={showNavigation}
                autoplay={autoplay || undefined}
                loop spaceBetween={20}
                slidesPerView={1}
                breakpoints={{768: {slidesPerView: gridCols === 3 ? 3 : 2}}}
              >
                {items.map((child, i) => (
                  <SwiperSlide key={i} className="!h-auto">{child}</SwiperSlide>
                ))}
              </Swiper>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -12}}
            transition={{duration: 0.3}}
            className={gridClass}
          >
            {items.map((child, i) => (
              <div key={i}>{child}</div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
