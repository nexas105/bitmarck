import {getTranslations} from 'next-intl/server';
import {MetricsDashboard} from '@/components/metrics-dashboard';

export async function HeroSection() {
  const t = await getTranslations('Hero');

  return (
    <section id="hero" className="px-md md:px-xl py-4xl scroll-mt-[64px]">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
        {/* Left: Name, Role, Value Prop, CTA */}
        <div>
          <h1 className="text-display font-semibold text-text-primary leading-snug">
            {t('name')}
          </h1>
          <p className="text-heading text-text-secondary mt-sm">
            {t('role')}
          </p>
          <p className="text-body text-text-primary mt-md leading-relaxed">
            {t('valueProposition')}
          </p>
          {/* CTA buttons — CV and cover letter downloads */}
          <div className="mt-lg flex flex-wrap gap-sm">
            <a
              href="/api/pdf/cv"
              download
              className="inline-flex items-center rounded-lg bg-accent px-lg py-sm text-label font-semibold text-white hover:bg-accent-hover transition-colors duration-150"
            >
              {t('cta')}
            </a>
            <a
              href="/api/pdf/cover-letter"
              download
              className="inline-flex items-center rounded-lg border border-accent px-lg py-sm text-label font-semibold text-accent hover:bg-accent hover:text-white transition-colors duration-150"
            >
              {t('ctaCoverLetter')}
            </a>
          </div>
        </div>
        {/* Right: Metrics Dashboard */}
        <MetricsDashboard />
      </div>
    </section>
  );
}
