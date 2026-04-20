'use client';

import {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {useTranslations} from 'next-intl';
import {ChevronRight, RotateCcw} from 'lucide-react';

const STATION_KEYS = ['telekom', 'mediacom', 'biermann', 'bwi', 'bhf', 'xecuro', 'bitmarck'] as const;

export function CareerExplorer() {
  const t = useTranslations('Interactive.careerExplorer');
  const [activeIndex, setActiveIndex] = useState(-1);

  const progress = activeIndex >= 0
    ? ((activeIndex + 1) / STATION_KEYS.length) * 100
    : 0;

  function handleNext() {
    if (activeIndex < STATION_KEYS.length - 1) {
      setActiveIndex((i) => i + 1);
    }
  }

  function reset() {
    setActiveIndex(-1);
  }

  const isComplete = activeIndex === STATION_KEYS.length - 1;

  return (
    <div className="flex flex-col gap-lg">
      {/* Progress bar */}
      <div className="flex items-center gap-sm">
        <div className="flex-1 h-1.5 bg-surface-subtle rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            animate={{width: `${progress}%`}}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
          />
        </div>
        <span className="text-xs text-text-tertiary font-mono">
          {activeIndex >= 0 ? activeIndex + 1 : 0}/{STATION_KEYS.length}
        </span>
      </div>

      {/* Station content */}
      <div className="min-h-[140px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeIndex < 0 ? (
            <motion.div
              key="start"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="text-center"
            >
              <p className="text-body text-text-secondary mb-md">{t('startText')}</p>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-sm min-h-[44px] rounded-xl bg-accent text-white font-semibold px-xl py-sm hover:bg-accent-hover transition-colors duration-200"
              >
                {t('startButton')}
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={STATION_KEYS[activeIndex]}
              initial={{opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -16}}
              transition={{duration: 0.35}}
              className="w-full"
            >
              <div className="rounded-xl border border-border/60 bg-surface-subtle/50 p-lg">
                <div className="flex items-center gap-sm mb-xs">
                  <span className="text-xs font-mono text-accent uppercase tracking-wider">
                    {t(`stations.${STATION_KEYS[activeIndex]}.period`)}
                  </span>
                </div>
                <p className="text-heading font-bold text-text-primary tracking-tight">
                  {t(`stations.${STATION_KEYS[activeIndex]}.company`)}
                </p>
                <p className="text-sm text-text-secondary mt-xs">
                  {t(`stations.${STATION_KEYS[activeIndex]}.role`)}
                </p>
                <p className="text-body text-text-secondary mt-sm leading-relaxed">
                  {t(`stations.${STATION_KEYS[activeIndex]}.funFact`)}
                </p>
              </div>

              {/* Next / Complete button */}
              <div className="flex justify-end mt-md">
                {isComplete ? (
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-sm text-caption font-medium text-accent hover:text-accent-hover transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t('restart')}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-sm min-h-[36px] rounded-lg bg-accent text-white font-medium text-sm px-lg py-xs hover:bg-accent-hover transition-colors duration-200"
                  >
                    {t('next')}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
