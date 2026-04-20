import {getTranslations} from 'next-intl/server';
import {CareerTabs} from '@/components/career-tabs';
import {SectionHeader} from '@/components/section-header';
import {Link} from '@/i18n/navigation';

export async function CareerSection() {
  const t = await getTranslations('Career');

  return (
    <section id="career" aria-labelledby="career-heading" className="py-4xl px-md md:px-xl scroll-mt-[64px] bg-surface bg-dot-pattern">
      <div className="mx-auto max-w-4xl">
        <SectionHeader number="01" eyebrow="BERUFSERFAHRUNG" heading={t('heading')} id="career-heading">
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            {t('intro')}
          </p>
        </SectionHeader>
        <div className="mt-2xl">
          <CareerTabs />
        </div>
        <div className="mt-xl text-center">
          <Link
            href="/cv"
            className="inline-flex items-center gap-xs text-label font-medium text-accent hover:text-accent-hover transition-colors duration-150"
          >
            {t('viewFullCv')}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
