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
      className="py-3xl px-md md:px-xl scroll-mt-[64px]"
    >
      <div className="mx-auto max-w-[56rem]">
        <h2
          id="faq-heading"
          className="text-heading font-semibold text-text-primary mb-xl"
        >
          {t('heading')}
        </h2>
        <div>
          {FAQ_KEYS.map((key) => (
            <details key={key} className="group border-b border-border">
              <summary className="flex items-center justify-between min-h-[44px] py-md cursor-pointer list-none text-body font-semibold text-text-primary hover:bg-surface-subtle transition-colors duration-150 ease">
                {t(`items.${key}.question`)}
                <ChevronDown
                  className="h-5 w-5 text-text-secondary shrink-0 transition-transform duration-150 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-md text-body text-text-secondary leading-relaxed">
                {t(`items.${key}.answer`)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
