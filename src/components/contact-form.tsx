'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {motion, AnimatePresence} from 'motion/react';
import {Send, CheckCircle2, Loader2} from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

type ContactFormProps = {
  variant?: 'light' | 'dark';
};

export function ContactForm({variant = 'light'}: ContactFormProps) {
  const t = useTranslations('Contact');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const isDark = variant === 'dark';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
        setErrorMessage(data.error || t('errorMessage'));
      }
    } catch {
      setFormState('error');
      setErrorMessage(t('errorMessage'));
    }
  }

  const labelClass = isDark
    ? 'text-caption text-white/80 font-medium'
    : 'text-caption text-text-primary font-medium';

  const inputClass = isDark
    ? 'min-h-[44px] rounded-xl border border-white/[0.15] bg-white/[0.06] px-md py-sm text-body text-white placeholder:text-white/40 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 transition-colors duration-200'
    : 'min-h-[44px] rounded-xl border border-border bg-white px-md py-sm text-body text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 transition-colors duration-200';

  const textareaClass = isDark
    ? 'rounded-xl border border-white/[0.15] bg-white/[0.06] px-md py-sm text-body text-white placeholder:text-white/40 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 transition-colors duration-200 resize-y'
    : 'rounded-xl border border-border bg-white px-md py-sm text-body text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 transition-colors duration-200 resize-y';

  return (
    <AnimatePresence mode="wait">
      {formState === 'success' ? (
        <motion.div
          key="success"
          initial={{opacity: 0, scale: 0.95}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.95}}
          transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
          className="flex flex-col items-center justify-center gap-md py-4xl text-center"
        >
          <div className={`flex h-16 w-16 items-center justify-center rounded-full ${isDark ? 'bg-emerald-400/10' : 'bg-green-50'}`}>
            <CheckCircle2 className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-green-600'}`} />
          </div>
          <p className={`text-body font-semibold ${isDark ? 'text-white' : 'text-text-primary'}`}>
            {t('successMessage')}
          </p>
          <button
            type="button"
            onClick={() => setFormState('idle')}
            className={`mt-sm text-caption hover:underline ${isDark ? 'text-emerald-400' : 'text-accent'}`}
          >
            {t('sendAnother')}
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.3}}
          onSubmit={handleSubmit}
          className="flex flex-col gap-lg"
        >
          {/* Name */}
          <div className="flex flex-col gap-xs">
            <label htmlFor="contact-name" className={labelClass}>
              {t('name')} <span className={`text-sm ${isDark ? 'text-red-400' : 'text-destructive'}`}>*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className={inputClass}
              placeholder={t('namePlaceholder')}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-xs">
            <label htmlFor="contact-email" className={labelClass}>
              {t('email')} <span className={`text-sm ${isDark ? 'text-red-400' : 'text-destructive'}`}>*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className={inputClass}
              placeholder={t('emailPlaceholder')}
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-xs">
            <label htmlFor="contact-subject" className={labelClass}>
              {t('subject')} <span className={`text-sm ${isDark ? 'text-red-400' : 'text-destructive'}`}>*</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              className={inputClass}
              placeholder={t('subjectPlaceholder')}
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-xs">
            <label htmlFor="contact-message" className={labelClass}>
              {t('message')} <span className={`text-sm ${isDark ? 'text-red-400' : 'text-destructive'}`}>*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              className={textareaClass}
              placeholder={t('messagePlaceholder')}
            />
          </div>

          {/* Error message */}
          {formState === 'error' && (
            <motion.p
              initial={{opacity: 0, y: -4}}
              animate={{opacity: 1, y: 0}}
              className={`text-caption rounded-lg px-md py-sm ${isDark ? 'text-red-400 bg-red-400/10' : 'text-red-600 bg-red-50'}`}
            >
              {errorMessage}
            </motion.p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={formState === 'loading'}
            className="inline-flex min-h-[44px] items-center justify-center gap-sm rounded-xl bg-accent px-xl py-sm text-body font-semibold text-white shadow-sm hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
          >
            {formState === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t('sending')}
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t('submit')}
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
