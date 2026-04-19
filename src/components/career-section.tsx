import {getTranslations} from 'next-intl/server';
import {CareerTimeline} from '@/components/career-timeline';

export async function CareerSection() {
  const t = await getTranslations('Career');

  return (
    <section id="career" aria-labelledby="career-heading" className="py-3xl px-md md:px-xl scroll-mt-[64px]">
      <div className="mx-auto max-w-4xl">
        <h2 id="career-heading" className="text-heading font-semibold text-text-primary">
          {t('heading')}
        </h2>
        <p className="text-body text-text-secondary mt-md leading-relaxed">
          {t('intro')}
        </p>
        <div className="mt-2xl">
          <CareerTimeline />
        </div>
      </div>
    </section>
  );
}
