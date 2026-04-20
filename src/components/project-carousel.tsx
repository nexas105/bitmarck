'use client'

import React, {useState} from 'react'
import {AnimatePresence, motion} from 'motion/react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {EffectCoverflow, EffectCards, EffectCube, EffectFlip, Pagination, Navigation, Autoplay} from 'swiper/modules'
import {AnimateOnScroll} from '@/components/animate-on-scroll'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-flip'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

type Props = {
  children: React.ReactNode
}

const views = ['Carousel', 'Grid'] as const
type View = (typeof views)[number]

const swiperEffects = ['Coverflow', 'Cards', 'Cube', 'Flip', 'Slide'] as const
type SwiperEffect = (typeof swiperEffects)[number]

export function ProjectCarousel({children}: Props) {
  const [activeView, setActiveView] = useState<View>('Carousel')
  const [activeEffect, setActiveEffect] = useState<SwiperEffect>('Coverflow')
  const items = React.Children.toArray(children)

  return (
    <div>
      <style>{`
        .swiper-pagination-bullet-active { background: var(--color-accent) !important; }
        .swiper-button-next, .swiper-button-prev { color: var(--color-accent) !important; }
      `}</style>

      {/* Main View Toggle Tabs */}
      <div className="mb-md flex justify-center">
        <div className="bg-primary-900/5 backdrop-blur-sm rounded-xl p-1 border border-border/30 flex gap-1">
          {views.map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`relative rounded-lg px-md py-xs text-sm font-medium transition-colors duration-200 ${
                activeView === view
                  ? 'text-text-primary font-semibold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {activeView === view && (
                <motion.div
                  layoutId="project-main-tab-bg"
                  className="absolute inset-0 bg-white shadow-sm rounded-lg"
                  transition={{type: 'spring', stiffness: 400, damping: 30}}
                />
              )}
              <span className="relative z-10">{view}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Effect Sub-Tabs (only when Carousel is active) */}
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
                    activeEffect === effect
                      ? 'text-text-primary font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {activeEffect === effect && (
                    <motion.div
                      layoutId="project-effect-tab-bg"
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

      {/* View Content */}
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
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: false,
                }}
                pagination={{clickable: true}}
                navigation={true}
                autoplay={{delay: 4000, disableOnInteraction: true}}
                loop={true}
                spaceBetween={24}
                breakpoints={{
                  0: {slidesPerView: 1.5},
                  768: {slidesPerView: 2.5},
                }}
              >
                {items.map((child, index) => (
                  <SwiperSlide key={index} className="!w-[340px] md:!w-[380px]">
                    {child}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {activeEffect === 'Cards' && (
              <div className="max-w-[380px] mx-auto">
                <Swiper
                  modules={[EffectCards, Pagination]}
                  effect="cards"
                  grabCursor={true}
                  pagination={{clickable: true}}
                  cardsEffect={{
                    perSlideOffset: 8,
                    perSlideRotate: 2,
                    rotate: true,
                    slideShadows: false,
                  }}
                >
                  {items.map((child, index) => (
                    <SwiperSlide key={index}>
                      {child}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {activeEffect === 'Cube' && (
              <div className="max-w-[380px] mx-auto">
                <Swiper
                  modules={[EffectCube, Pagination]}
                  effect="cube"
                  grabCursor={true}
                  pagination={{clickable: true}}
                  cubeEffect={{
                    shadow: false,
                    slideShadows: false,
                  }}
                >
                  {items.map((child, index) => (
                    <SwiperSlide key={index}>
                      {child}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {activeEffect === 'Flip' && (
              <div className="max-w-[380px] mx-auto">
                <Swiper
                  modules={[EffectFlip, Pagination]}
                  effect="flip"
                  grabCursor={true}
                  pagination={{clickable: true}}
                  flipEffect={{
                    slideShadows: false,
                  }}
                >
                  {items.map((child, index) => (
                    <SwiperSlide key={index}>
                      {child}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {activeEffect === 'Slide' && (
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                grabCursor={true}
                pagination={{clickable: true}}
                navigation={true}
                autoplay={{delay: 3000, disableOnInteraction: true}}
                loop={true}
                spaceBetween={24}
                breakpoints={{
                  0: {slidesPerView: 1},
                  640: {slidesPerView: 2},
                  1024: {slidesPerView: 3},
                }}
              >
                {items.map((child, index) => (
                  <SwiperSlide key={index}>
                    {child}
                  </SwiperSlide>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"
          >
            {items.map((child, index) => (
              <AnimateOnScroll key={index} preset="fadeUp" delay={index * 0.1}>
                {child}
              </AnimateOnScroll>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
