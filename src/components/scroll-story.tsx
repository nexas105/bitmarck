'use client';

import {useEffect, useState, useCallback} from 'react';
import {useTranslations} from 'next-intl';

const SECTIONS = [
  {id: 'career', navKey: 'career'},
  {id: 'projects', navKey: 'projects'},
  {id: 'skills', navKey: 'skills'},
  {id: 'certifications', navKey: 'certifications'},
  {id: 'faq', navKey: 'faq'},
  {id: 'contact', navKey: 'contact'},
] as const;

export function ScrollStory() {
  const t = useTranslations('Nav');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) {
            setActiveIndex(index);
            setIsVisible(true);
          }
        },
        {rootMargin: '-40% 0px -40% 0px', threshold: 0}
      );

      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
      observers.push(observer);
    });

    // Hide when at top (hero)
    const heroObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(false);
          setActiveIndex(-1);
        }
      },
      {threshold: 0.5}
    );

    const heroEl = document.querySelector('main > section:first-of-type') ||
      document.querySelector('[class*="hero"]') ||
      document.querySelector('main > div:first-child');
    if (heroEl) heroObserver.observe(heroEl);

    return () => {
      observers.forEach((o) => o.disconnect());
      heroObserver.disconnect();
    };
  }, []);

  const isAtEnd = activeIndex === SECTIONS.length - 1;

  const scrollToNext = useCallback(() => {
    if (activeIndex < SECTIONS.length - 1) {
      const nextSection = SECTIONS[activeIndex + 1];
      const el = document.getElementById(nextSection.id);
      if (el) el.scrollIntoView({behavior: 'smooth'});
    }
  }, [activeIndex]);

  if (!isVisible || activeIndex < 0) return null;

  return (
    <div className="fixed right-md top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-md pointer-events-none">
      {/* Current section label */}
      <div className="pointer-events-auto flex items-center gap-sm">
        <span className="text-xs font-medium text-text-secondary bg-surface-raised/90 backdrop-blur-sm px-sm py-xs rounded-full shadow-card border border-border/30">
          {t(SECTIONS[activeIndex].navKey)}
        </span>
      </div>

      {/* Dot indicators */}
      <div className="flex flex-col items-center gap-xs">
        <div className="w-px h-lg bg-border/30" />
        {SECTIONS.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const el = document.getElementById(SECTIONS[index].id);
              if (el) el.scrollIntoView({behavior: 'smooth'});
            }}
            className={`pointer-events-auto rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'h-2.5 w-2.5 bg-accent shadow-glow'
                : index < activeIndex
                  ? 'h-1.5 w-1.5 bg-accent/40'
                  : 'h-1.5 w-1.5 bg-border'
            }`}
            aria-label={t(SECTIONS[index].navKey)}
          />
        ))}
        <div className="w-px h-lg bg-border/30" />
      </div>

      {/* "Weiter" button */}
      {!isAtEnd && (
        <button
          onClick={scrollToNext}
          className="pointer-events-auto text-xs font-medium text-accent hover:text-accent-hover bg-surface-raised/90 backdrop-blur-sm px-sm py-xs rounded-full shadow-card border border-border/30 transition-colors duration-200 flex items-center gap-xs"
        >
          Weiter
          <span aria-hidden="true" className="text-[10px]">&darr;</span>
        </button>
      )}
    </div>
  );
}
