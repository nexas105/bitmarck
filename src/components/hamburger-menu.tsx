'use client';

import {useEffect, useState, useCallback} from 'react';
import {useTranslations} from 'next-intl';
import {Menu, X} from 'lucide-react';
import {LocaleToggle} from '@/components/locale-toggle';

const NAV_KEYS = ['career', 'projects', 'skills', 'certifications', 'faq'] as const;

type HamburgerMenuProps = {
  activeSection: string;
  onNavigate: (id: string) => void;
};

export function HamburgerMenu({activeSection, onNavigate}: HamburgerMenuProps) {
  const t = useTranslations('Nav');
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when open (Pitfall 4)
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-text-primary hover:text-text-secondary transition-colors duration-150 ease"
        aria-expanded={isOpen}
        aria-label={isOpen ? t('menuClose') : t('menuOpen')}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-[64px] z-40 bg-surface-raised">
          <nav className="flex flex-col items-center gap-md py-xl" aria-label="Mobile navigation">
            {NAV_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => {
                  onNavigate(key);
                  close();
                }}
                className={`min-h-[44px] text-body transition-colors duration-150 ease ${
                  activeSection === key
                    ? 'font-semibold text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {t(key)}
              </button>
            ))}
            <div className="mt-md">
              <LocaleToggle />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
