import {getTranslations} from 'next-intl/server';
import {MetricsDashboard} from '@/components/metrics-dashboard';

export async function HeroSection() {
  const t = await getTranslations('Hero');

  return (
    <section id="hero" className="relative px-md md:px-xl py-4xl scroll-mt-[64px] bg-linear-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
      <div className="absolute inset-0 bg-radial-[at_70%_30%] from-accent/8 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
        {/* Left: Name, Role, Value Prop, CTA */}
        <div>
          <h1 className="text-hero font-semibold text-white leading-snug">
            {t('name')}
          </h1>
          <p className="text-subhero text-white/70 mt-sm">
            {t('role')}
          </p>
          <p className="text-body text-white/80 mt-md leading-relaxed">
            {t('valueProposition')}
          </p>
          {/* CTA buttons — CV and cover letter downloads */}
          <div className="mt-lg flex flex-wrap gap-sm">
            <a
              href="/api/pdf/cv"
              download
              className="inline-flex items-center rounded-lg bg-white text-primary-900 px-lg py-sm text-label font-semibold hover:bg-white/90 transition-colors duration-150"
            >
              {t('cta')}
            </a>
            <a
              href="/api/pdf/cover-letter"
              download
              className="inline-flex items-center rounded-lg border border-white/30 px-lg py-sm text-label font-semibold text-white hover:bg-white/10 transition-colors duration-150"
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
