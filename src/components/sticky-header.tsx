'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {LocaleToggle} from '@/components/locale-toggle';
import {HamburgerMenu} from '@/components/hamburger-menu';

const SECTION_IDS = ['career', 'projects', 'skills', 'faq'] as const;
const NAV_KEYS = ['career', 'projects', 'skills', 'faq'] as const;

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
    <header className="sticky top-0 z-50 h-[64px] border-b border-border bg-surface-raised">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-md md:px-xl">
        {/* Left: Name/Logo */}
        <button
          onClick={() => {
            window.scrollTo({top: 0, behavior: 'smooth'});
            setActiveSection('hero');
          }}
          className="text-label font-semibold text-text-primary min-h-[44px] flex items-center"
        >
          Tobias Ludwig
        </button>

        {/* Center/Right: Desktop nav links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-md" aria-label="Main navigation">
          {NAV_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => scrollToSection(key)}
              className={`min-h-[44px] flex items-center px-sm text-label transition-colors duration-150 ease ${
                activeSection === key
                  ? 'text-text-primary border-l-2 border-accent pl-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t(key)}
            </button>
          ))}
          <LocaleToggle />
        </nav>

        {/* Right: Hamburger menu (visible on mobile only) */}
        <div className="md:hidden">
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
