'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname, useRouter} from '@/i18n/navigation';
import {LocaleToggle} from '@/components/locale-toggle';
import {HamburgerMenu} from '@/components/hamburger-menu';
import {FocusMode} from '@/components/focus-mode';
import {MatchToggle} from '@/components/match-toggle';
import {CommandPaletteHint} from '@/components/command-palette';

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
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const isCvPage = pathname === '/cv';
  const [activeSection, setActiveSection] = useState<string>('hero');

  function handleSectionNavigate(id: string) {
    if (isHome) {
      scrollToSection(id);
      setActiveSection(id);
      return;
    }

    router.push(`/#${id}`);
  }

  // Deterministic scroll-spy for homepage sections
  useEffect(() => {
    if (!isHome) {
      setActiveSection('hero');
      return;
    }

    const tracked = SECTION_IDS
      .map((id) => ({id, el: document.getElementById(id)}))
      .filter((entry): entry is {id: string; el: HTMLElement} => entry.el !== null);

    if (tracked.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      if (window.scrollY < 120) {
        setActiveSection('hero');
        return;
      }

      const activationLine = 96; // header + breathing room
      let current = tracked[0].id;

      for (const section of tracked) {
        const top = section.el.getBoundingClientRect().top;
        if (top <= activationLine) {
          current = section.id;
        } else {
          break;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, {passive: true});
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [isHome]);

  return (
    <header className="sticky top-0 z-50 h-[64px] border-b border-border/50 bg-[#FFFFFF] md:bg-surface-raised/85 md:backdrop-blur-xl md:backdrop-saturate-150">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-md md:px-xl">
        {/* Left: Name/Logo — links to home */}
        <Link
          href="/"
          className="text-label font-bold text-text-primary min-h-[44px] flex items-center tracking-tight hover:text-accent transition-colors duration-200"
        >
          Tobias Ludwig
        </Link>

        {/* Center/Right: Desktop nav links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-xs" aria-label="Main navigation">
          {NAV_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleSectionNavigate(key)}
              className={`relative min-h-[44px] flex items-center px-md text-label font-medium transition-colors duration-200 ${
                isHome && activeSection === key
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t(key)}
              {isHome && activeSection === key && (
                <span className="absolute bottom-3 left-md right-md h-0.5 bg-accent rounded-full" />
              )}
            </button>
          ))}
          <div className="ml-sm pl-sm border-l border-border/50 flex items-center gap-xs">
            <CommandPaletteHint />
            <MatchToggle />
            <FocusMode />
            <LocaleToggle />
          </div>
          <div className="ml-sm pl-sm border-l border-border/50 flex items-center gap-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <Link
              href="/cv"
              className={`text-label font-medium transition-colors duration-200 ${
                isCvPage
                  ? 'text-accent'
                  : 'text-accent hover:text-accent-hover'
              }`}
            >
              CV
            </Link>
            <button
              onClick={() => handleSectionNavigate('contact')}
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
              handleSectionNavigate(id);
            }}
          />
        </div>
      </div>
    </header>
  );
}
