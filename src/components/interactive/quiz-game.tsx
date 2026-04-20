'use client';

import {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {useTranslations} from 'next-intl';
import {CheckCircle2, XCircle, RotateCcw} from 'lucide-react';

type QuizState = 'playing' | 'finished';

export function QuizGame() {
  const t = useTranslations('Interactive.quiz');
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [state, setState] = useState<QuizState>('playing');
  const [revealed, setRevealed] = useState<boolean | null>(null);

  const questions = [
    {key: 'q1', answer: true},
    {key: 'q2', answer: true},
    {key: 'q3', answer: true},
    {key: 'q4', answer: true},
    {key: 'q5', answer: true},
  ];

  function handleAnswer(answer: boolean) {
    const correct = answer === questions[current].answer;
    if (correct) setScore((s) => s + 1);
    setRevealed(correct);

    setTimeout(() => {
      setRevealed(null);
      if (current + 1 >= questions.length) {
        setState('finished');
      } else {
        setCurrent((c) => c + 1);
      }
    }, 1500);
  }

  function reset() {
    setCurrent(0);
    setScore(0);
    setState('playing');
    setRevealed(null);
  }

  return (
    <div className="flex flex-col gap-lg">
      <AnimatePresence mode="wait">
        {state === 'playing' ? (
          <motion.div
            key={`q-${current}`}
            initial={{opacity: 0, x: 20}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -20}}
            transition={{duration: 0.3}}
            className="flex flex-col gap-md"
          >
            {/* Progress */}
            <div className="flex items-center gap-sm">
              <div className="flex-1 h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{width: `${(current / questions.length) * 100}%`}}
                  animate={{width: `${((current + 1) / questions.length) * 100}%`}}
                  transition={{duration: 0.4}}
                />
              </div>
              <span className="text-xs text-text-tertiary font-mono">
                {current + 1}/{questions.length}
              </span>
            </div>

            {/* Question */}
            <p className="text-body font-medium text-text-primary leading-relaxed">
              {t(`questions.${questions[current].key}.question`)}
            </p>

            {/* Answer feedback */}
            {revealed !== null && (
              <motion.div
                initial={{opacity: 0, y: -8}}
                animate={{opacity: 1, y: 0}}
                className={`flex items-center gap-sm rounded-xl px-md py-sm text-sm font-medium ${
                  revealed
                    ? 'bg-green-50 text-green-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {revealed ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0" />
                )}
                {t(`questions.${questions[current].key}.match`)}
              </motion.div>
            )}

            {/* Buttons */}
            {revealed === null && (
              <div className="flex gap-md">
                <button
                  onClick={() => handleAnswer(true)}
                  className="flex-1 min-h-[44px] rounded-xl bg-accent text-white font-semibold text-body hover:bg-accent-hover transition-colors duration-200"
                >
                  {t('yes')}
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="flex-1 min-h-[44px] rounded-xl border border-border bg-white text-text-primary font-semibold text-body hover:bg-surface-subtle transition-colors duration-200"
                >
                  {t('no')}
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            className="flex flex-col items-center gap-md text-center py-md"
          >
            <div className="text-4xl font-bold text-accent">
              {score}/{questions.length}
            </div>
            <p className="text-heading font-bold text-text-primary">
              {t('resultTitle')}
            </p>
            <p className="text-body text-text-secondary">
              {t('resultDescription')}
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-sm mt-sm text-caption font-medium text-accent hover:text-accent-hover transition-colors"
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
