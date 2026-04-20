'use client';

import {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {useTranslations} from 'next-intl';
import {CheckCircle2, RotateCcw, Search} from 'lucide-react';

type ItemState = 'pending' | 'revealed';

const REQUIREMENTS = [
  {key: 'q1'},
  {key: 'q2'},
  {key: 'q3'},
  {key: 'q4'},
  {key: 'q5'},
];

export function QuizGame() {
  const t = useTranslations('Interactive.quiz');
  const [states, setStates] = useState<Record<string, ItemState>>(
    Object.fromEntries(REQUIREMENTS.map((r) => [r.key, 'pending']))
  );

  const revealedCount = Object.values(states).filter((s) => s === 'revealed').length;
  const allRevealed = revealedCount === REQUIREMENTS.length;

  function reveal(key: string) {
    setStates((prev) => ({...prev, [key]: 'revealed'}));
  }

  function reset() {
    setStates(Object.fromEntries(REQUIREMENTS.map((r) => [r.key, 'pending'])));
  }

  return (
    <div className="flex flex-col gap-md">
      {/* Progress bar */}
      <div className="flex items-center gap-sm">
        <div className="flex-1 h-1.5 bg-surface-subtle rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{width: '0%'}}
            animate={{width: `${(revealedCount / REQUIREMENTS.length) * 100}%`}}
            transition={{duration: 0.4}}
          />
        </div>
        <span className="text-xs text-text-tertiary font-mono">
          {revealedCount}/{REQUIREMENTS.length}
        </span>
      </div>

      {/* Requirement checklist */}
      <div className="flex flex-col gap-sm">
        {REQUIREMENTS.map((req, i) => {
          const state = states[req.key];
          return (
            <motion.div
              key={req.key}
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: i * 0.06, duration: 0.3}}
              className={`rounded-xl border px-md py-sm transition-colors duration-300 ${
                state === 'revealed'
                  ? 'border-green-200 bg-green-50/50'
                  : 'border-border/60 bg-white'
              }`}
            >
              <div className="flex items-start gap-sm">
                {/* Icon area */}
                <div className="mt-0.5 shrink-0">
                  <AnimatePresence mode="wait">
                    {state === 'revealed' ? (
                      <motion.div
                        key="check"
                        initial={{scale: 0, rotate: -90}}
                        animate={{scale: 1, rotate: 0}}
                        transition={{type: 'spring', stiffness: 500, damping: 15}}
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="pending"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                      >
                        <div className="h-5 w-5 rounded-full border-2 border-border" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium leading-snug ${
                    state === 'revealed' ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {t(`questions.${req.key}.question`)}
                  </p>

                  {/* Match reveal */}
                  <AnimatePresence>
                    {state === 'revealed' && (
                      <motion.p
                        initial={{height: 0, opacity: 0}}
                        animate={{height: 'auto', opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.3}}
                        className="text-xs text-green-700 mt-xs leading-relaxed overflow-hidden"
                      >
                        {t(`questions.${req.key}.match`)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action button */}
                {state === 'pending' && (
                  <button
                    onClick={() => reveal(req.key)}
                    className="shrink-0 inline-flex items-center gap-1 min-h-[32px] px-sm rounded-lg bg-accent/8 text-accent text-xs font-semibold hover:bg-accent/15 transition-colors duration-200"
                  >
                    <Search className="h-3 w-3" />
                    Pr&uuml;fen
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Result when all revealed */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            className="flex flex-col items-center gap-sm text-center py-md rounded-xl bg-green-50 border border-green-200"
          >
            <div className="text-3xl font-bold text-accent">
              {revealedCount}/{REQUIREMENTS.length}
            </div>
            <p className="text-heading font-bold text-text-primary">
              {t('resultTitle')}
            </p>
            <p className="text-sm text-text-secondary px-md">
              {t('resultDescription')}
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-sm mt-xs text-caption font-medium text-accent hover:text-accent-hover transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t('restart')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
