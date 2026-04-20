import {getTranslations} from 'next-intl/server';
import {CareerTimeline} from '@/components/career-timeline';
import {SectionHeader} from '@/components/section-header';

export async function CareerSection() {
  const t = await getTranslations('Career');

  return (
    <section id="career" aria-labelledby="career-heading" className="py-4xl px-md md:px-xl scroll-mt-[64px]">
      <div className="mx-auto max-w-4xl">
        <SectionHeader number="01" eyebrow="BERUFSERFAHRUNG" heading={t('heading')} id="career-heading">
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            {t('intro')}
          </p>
        </SectionHeader>
        <div className="mt-2xl">
          <CareerTimeline />
        </div>
      </div>
    </section>
  );
}
