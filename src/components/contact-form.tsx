'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {motion, AnimatePresence} from 'motion/react';
import {Send, CheckCircle2, Loader2} from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('Contact');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-body font-semibold text-text-primary">
            {t('successMessage')}
          </p>
          <button
            type="button"
            onClick={() => setFormState('idle')}
            className="mt-sm text-caption text-accent hover:underline"
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
            <label htmlFor="contact-name" className="text-caption font-medium text-text-secondary">
              {t('name')} *
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className="min-h-[44px] rounded-xl border border-border/50 bg-white px-md py-sm text-body text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors duration-200"
              placeholder={t('namePlaceholder')}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-xs">
            <label htmlFor="contact-email" className="text-caption font-medium text-text-secondary">
              {t('email')} *
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="min-h-[44px] rounded-xl border border-border/50 bg-white px-md py-sm text-body text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors duration-200"
              placeholder={t('emailPlaceholder')}
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-xs">
            <label htmlFor="contact-subject" className="text-caption font-medium text-text-secondary">
              {t('subject')} *
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              className="min-h-[44px] rounded-xl border border-border/50 bg-white px-md py-sm text-body text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors duration-200"
              placeholder={t('subjectPlaceholder')}
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-xs">
            <label htmlFor="contact-message" className="text-caption font-medium text-text-secondary">
              {t('message')} *
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              className="rounded-xl border border-border/50 bg-white px-md py-sm text-body text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors duration-200 resize-y"
              placeholder={t('messagePlaceholder')}
            />
          </div>

          {/* Error message */}
          {formState === 'error' && (
            <motion.p
              initial={{opacity: 0, y: -4}}
              animate={{opacity: 1, y: 0}}
              className="text-caption text-red-600 bg-red-50 rounded-lg px-md py-sm"
            >
              {errorMessage}
            </motion.p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={formState === 'loading'}
            className="inline-flex min-h-[44px] items-center justify-center gap-sm rounded-xl bg-accent px-xl py-sm text-body font-semibold text-white shadow-sm hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
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
