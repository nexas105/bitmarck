'use client';

import {useEffect, useState, useCallback} from 'react';
import {useTranslations} from 'next-intl';
import {Menu, X} from 'lucide-react';
import {motion, AnimatePresence} from 'motion/react';
import {LocaleToggle} from '@/components/locale-toggle';

const NAV_KEYS = ['career', 'projects', 'skills', 'certifications', 'faq', 'contact'] as const;

type HamburgerMenuProps = {
  activeSection: string;
  onNavigate: (id: string) => void;
};

export function HamburgerMenu({activeSection, onNavigate}: HamburgerMenuProps) {
  const t = useTranslations('Nav');
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 min-h-[44px] min-w-[44px] flex items-center justify-center text-text-primary hover:text-accent transition-colors duration-150"
        aria-expanded={isOpen}
        aria-label={isOpen ? t('menuClose') : t('menuOpen')}
      >
        <motion.div
          animate={{rotate: isOpen ? 90 : 0}}
          transition={{duration: 0.2}}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
              className="fixed inset-0 top-[64px] z-40 bg-black/20 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            {/* Slide-down panel */}
            <motion.div
              initial={{opacity: 0, y: -8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
              className="fixed left-0 right-0 top-[64px] z-50 bg-white border-b border-border/50 shadow-elevated"
            >
              <nav className="flex flex-col px-lg py-md" aria-label="Mobile navigation">
                {NAV_KEYS.map((key, i) => (
                  <motion.button
                    key={key}
                    initial={{opacity: 0, x: -16}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
                    onClick={() => {
                      onNavigate(key);
                      close();
                    }}
                    className={`min-h-[48px] flex items-center text-body font-medium border-b border-border/20 last:border-b-0 transition-colors duration-150 ${
                      activeSection === key
                        ? 'text-accent'
                        : 'text-text-primary'
                    }`}
                  >
                    {activeSection === key && (
                      <span className="w-1 h-4 bg-accent rounded-full mr-md" aria-hidden="true" />
                    )}
                    {t(key)}
                  </motion.button>
                ))}
                <div className="flex items-center justify-center pt-md mt-sm border-t border-border/30">
                  <LocaleToggle />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
