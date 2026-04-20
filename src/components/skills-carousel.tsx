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
  const half = Math.ceil(items.length / 2)
  const left = items.slice(0, half)
  const right = items.slice(half)

  const swiperConfig = {
    modules: [EffectCube, Autoplay, Pagination],
    effect: 'cube' as const,
    cubeEffect: {shadow: false, slideShadows: false},
    pagination: {clickable: true},
    grabCursor: true,
    loop: true,
  }

  return (
    <>
      <style>{`
        .skills-cube .swiper-pagination-bullet-active { background: var(--color-accent) !important; }
      `}</style>

      {/* Mobile: single cube with all items */}
      <div className="md:hidden">
        <Swiper
          className="skills-cube !pb-xl"
          {...swiperConfig}
          autoplay={{delay: 3000, disableOnInteraction: true}}
        >
          {items.map((child, i) => (
            <SwiperSlide key={i}>{child}</SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: 2 cubes side by side */}
      <div className="hidden md:grid md:grid-cols-2 gap-lg">
        <Swiper
          className="skills-cube !pb-xl"
          {...swiperConfig}
          autoplay={{delay: 3000, disableOnInteraction: true}}
        >
          {left.map((child, i) => (
            <SwiperSlide key={i}>{child}</SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          className="skills-cube !pb-xl"
          {...swiperConfig}
          autoplay={{delay: 4000, disableOnInteraction: true}}
        >
          {right.map((child, i) => (
            <SwiperSlide key={i}>{child}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
