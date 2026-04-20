'use client'

import React, {useState} from 'react'
import {AnimatePresence, motion} from 'motion/react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {EffectCoverflow, Pagination, Navigation, Autoplay} from 'swiper/modules'
import {AnimateOnScroll} from '@/components/animate-on-scroll'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

type Props = {
  children: React.ReactNode
}

const views = ['Carousel', 'Grid'] as const
type View = (typeof views)[number]

export function ProjectCarousel({children}: Props) {
  const [activeView, setActiveView] = useState<View>('Carousel')
  const items = React.Children.toArray(children)

  return (
    <div>
      <style>{`
        .swiper-pagination-bullet-active { background: var(--color-accent) !important; }
        .swiper-button-next, .swiper-button-prev { color: var(--color-accent) !important; }
      `}</style>

      {/* View Toggle Tabs */}
      <div className="mb-lg flex justify-center gap-sm">
        {views.map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`relative rounded-full px-md py-xs text-sm font-medium transition-colors ${
              activeView === view
                ? 'bg-accent text-white'
                : 'bg-surface-subtle text-text-secondary hover:text-text-primary'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* View Content */}
      <AnimatePresence mode="wait">
        {activeView === 'Carousel' ? (
          <motion.div
            key="carousel"
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -12}}
            transition={{duration: 0.3}}
          >
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
                <SwiperSlide
                  key={index}
                  className="!w-[340px] md:!w-[380px]"
                >
                  {child}
                </SwiperSlide>
              ))}
            </Swiper>
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
