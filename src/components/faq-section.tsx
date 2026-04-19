'use client';

import {useTranslations} from 'next-intl';
import {ChevronDown} from 'lucide-react';

const FAQ_KEYS = ['location', 'startDate', 'whyBitmarck', 'whyBA'] as const;

export function FAQSection() {
  const t = useTranslations('FAQ');

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-4xl px-md md:px-xl scroll-mt-[64px] bg-primary-50"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="faq-heading"
          className="text-section font-bold text-text-primary mb-xl tracking-tight inline-block"
        >
          {t('heading')}
          <span className="block h-1 w-16 bg-linear-to-r from-accent to-accent/40 rounded-full mt-sm" aria-hidden="true" />
        </h2>
        <div className="rounded-2xl border border-border/50 bg-surface-raised overflow-hidden shadow-card">
          {FAQ_KEYS.map((key, index) => (
            <details key={key} className={`group ${index < FAQ_KEYS.length - 1 ? 'border-b border-border/40' : ''}`}>
              <summary className="flex items-center justify-between min-h-[44px] py-lg px-lg cursor-pointer list-none text-body font-semibold text-text-primary hover:bg-surface-subtle/50 transition-colors duration-200">
                {t(`items.${key}.question`)}
                <div className="shrink-0 ml-md p-xs rounded-full bg-surface-subtle group-hover:bg-accent/10 transition-colors duration-200">
                  <ChevronDown
                    className="h-4 w-4 text-text-secondary group-hover:text-accent shrink-0 transition-all duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </div>
              </summary>
              <div className="px-lg pb-lg text-body text-text-secondary leading-relaxed">
                {t(`items.${key}.answer`)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
