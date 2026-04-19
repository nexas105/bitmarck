import {getTranslations} from 'next-intl/server';
import {MetricsDashboard} from '@/components/metrics-dashboard';
import {CvDownload} from '@/components/cv-download';
import {HeroAnimations} from '@/components/hero-animations';

export async function HeroSection() {
  const t = await getTranslations('Hero');

  return (
    <section id="hero" className="relative px-md md:px-xl py-4xl md:py-5xl scroll-mt-[64px] bg-linear-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
      {/* Layered background effects */}
      <div className="absolute inset-0 bg-radial-[at_70%_30%] from-accent/10 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-radial-[at_20%_80%] from-accent/5 to-transparent" aria-hidden="true" />
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px'}} aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-xl md:gap-3xl items-center">
        {/* Left: Name, Role, Value Prop, CTA */}
        <HeroAnimations>
          <div>
            <p className="text-label font-medium text-accent-light tracking-wide uppercase mb-sm">
              {t('role')}
            </p>
            <h1 className="text-hero font-bold text-white leading-tight tracking-tight">
              {t('name')}
            </h1>
            <p className="text-lg text-white/60 mt-lg leading-relaxed max-w-[480px]">
              {t('valueProposition')}
            </p>
            {/* CTA buttons — CV formats dropdown + cover letter */}
            <div className="mt-xl">
              <CvDownload />
            </div>
          </div>
        </HeroAnimations>
        {/* Right: Metrics Dashboard */}
        <MetricsDashboard />
      </div>
    </section>
  );
}
