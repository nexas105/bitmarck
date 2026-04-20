'use client'

import {Swiper, SwiperSlide} from 'swiper/react'
import {EffectCube, Autoplay, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export function SkillsCarousel({children}: Props) {
  const items = React.Children.toArray(children)

  return (
    <div className="max-w-[420px] mx-auto">
      <style>{`
        .skills-swiper .swiper-pagination-bullet-active { background: var(--color-accent) !important; }
        .skills-swiper .swiper-slide { height: auto; }
      `}</style>
      <Swiper
        className="skills-swiper !pb-xl"
        modules={[EffectCube, Autoplay, Pagination]}
        effect="cube"
        cubeEffect={{
          shadow: false,
          slideShadows: false,
        }}
        autoplay={{delay: 3500, disableOnInteraction: true}}
        pagination={{clickable: true}}
        grabCursor
        loop
      >
        {items.map((child, i) => (
          <SwiperSlide key={i}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
