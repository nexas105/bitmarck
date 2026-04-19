import {getTranslations} from 'next-intl/server';
import {CareerTimeline} from '@/components/career-timeline';

export async function CareerSection() {
  const t = await getTranslations('Career');

  return (
    <section id="career" aria-labelledby="career-heading" className="py-4xl px-md md:px-xl scroll-mt-[64px]">
      <div className="mx-auto max-w-4xl">
        <h2 id="career-heading" className="text-section font-bold text-text-primary tracking-tight inline-block">
          {t('heading')}
          <span className="block h-1 w-16 bg-linear-to-r from-accent to-accent/40 rounded-full mt-sm" aria-hidden="true" />
        </h2>
        <p className="text-lg text-text-secondary mt-md leading-relaxed max-w-2xl">
          {t('intro')}
        </p>
        <div className="mt-2xl">
          <CareerTimeline />
        </div>
      </div>
    </section>
  );
}
