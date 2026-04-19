'use client';

import {useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';

export function LocaleToggle() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-xs">
      <Link
        href={pathname}
        locale="de"
        aria-label={locale === 'de' ? 'Aktuelle Sprache: Deutsch' : 'Zu Deutsch wechseln'}
        className={`min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors duration-150 ease ${
          locale === 'de'
            ? 'font-semibold text-text-primary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        DE
      </Link>
      <span className="text-text-secondary">/</span>
      <Link
        href={pathname}
        locale="en"
        aria-label={locale === 'en' ? 'Current language: English' : 'Switch to English'}
        className={`min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors duration-150 ease ${
          locale === 'en'
            ? 'font-semibold text-text-primary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        EN
      </Link>
    </div>
  );
}
