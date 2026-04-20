'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {LocaleToggle} from '@/components/locale-toggle';
import {HamburgerMenu} from '@/components/hamburger-menu';

const SECTION_IDS = ['career', 'projects', 'skills', 'certifications', 'faq', 'contact'] as const;
const NAV_KEYS = ['career', 'projects', 'skills', 'certifications', 'faq', 'contact'] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}

export function StickyHeader() {
  const t = useTranslations('Nav');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {rootMargin: '-64px 0px -50% 0px', threshold: 0}
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 h-[64px] border-b border-border/50 bg-[#FFFFFF] md:bg-surface-raised/85 md:backdrop-blur-xl md:backdrop-saturate-150">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-md md:px-xl">
        {/* Left: Name/Logo */}
        <button
          onClick={() => {
            window.scrollTo({top: 0, behavior: 'smooth'});
            setActiveSection('hero');
          }}
          className="text-label font-bold text-text-primary min-h-[44px] flex items-center tracking-tight hover:text-accent transition-colors duration-200"
        >
          Tobias Ludwig
        </button>

        {/* Center/Right: Desktop nav links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-xs" aria-label="Main navigation">
          {NAV_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => scrollToSection(key)}
              className={`relative min-h-[44px] flex items-center px-md text-label font-medium transition-colors duration-200 ${
                activeSection === key
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t(key)}
              {activeSection === key && (
                <span className="absolute bottom-3 left-md right-md h-0.5 bg-accent rounded-full" />
              )}
            </button>
          ))}
          <div className="ml-sm pl-sm border-l border-border/50 flex items-center gap-sm">
            <LocaleToggle />
          </div>
          <div className="ml-sm pl-sm border-l border-border/50 flex items-center gap-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <button
              onClick={() => {
                window.scrollTo({top: 0, behavior: 'smooth'});
              }}
              className="text-label font-medium text-accent hover:text-accent-hover transition-colors duration-200"
            >
              CV
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-accent text-white px-md py-xs rounded-full text-label font-medium hover:bg-accent-hover transition-colors duration-200"
            >
              {t('contact')}
            </button>
          </div>
        </nav>

        {/* Right: Hamburger menu + availability dot (visible on mobile only) */}
        <div className="md:hidden flex items-center gap-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          <HamburgerMenu
            activeSection={activeSection}
            onNavigate={(id) => {
              scrollToSection(id);
            }}
          />
        </div>
      </div>
    </header>
  );
}
