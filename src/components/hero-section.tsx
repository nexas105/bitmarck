import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {MetricsDashboard} from '@/components/metrics-dashboard';
import {CvDownload} from '@/components/cv-download';
import {HeroAnimations} from '@/components/hero-animations';

export async function HeroSection() {
  const t = await getTranslations('Hero');

  return (
    <section id="hero" className="relative px-md md:px-xl py-4xl md:py-5xl scroll-mt-[64px] bg-linear-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
      {/* Animated gradient mesh blob */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute h-[500px] w-[500px] rounded-full blur-[120px] opacity-[0.15]"
          style={{
            background: 'radial-gradient(circle, #2563EB, transparent 70%)',
            top: '10%', left: '60%',
            animation: 'mesh-float-1 18s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
      </div>
      {/* Radial gradient background effect */}
      <div className="absolute inset-0 bg-radial-[at_70%_30%] from-accent/10 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-xl md:gap-3xl items-center">
        {/* Left: Photo + Name, Role, Value Prop, CTA */}
        <HeroAnimations>
          <div>
            {/* Profile photo + badge */}
            <div className="flex items-center gap-lg mb-xl">
              <div className="relative shrink-0">
                <Image
                  src="/tobias-ludwig.jpg"
                  alt="Tobias Ludwig"
                  width={120}
                  height={120}
                  className="rounded-full object-cover object-top border-2 border-white/20 shadow-lg w-[96px] h-[96px] md:w-[120px] md:h-[120px]"
                  priority
                />
                {/* Online indicator */}
                <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-primary-900 animate-pulse" aria-hidden="true" />
              </div>
              <div>
                <div className="inline-flex items-center gap-sm rounded-full bg-white/[0.07] border border-white/10 px-md py-xs mb-sm">
                  <p className="text-xs font-medium text-white/70 tracking-wide uppercase">
                    {t('role')}
                  </p>
                </div>
                <h1 className="text-display md:text-hero font-bold text-white leading-tight tracking-tight">
                  {t('name')}
                </h1>
              </div>
            </div>
            <p className="text-lg text-white/75 leading-relaxed max-w-[480px]">
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

      {/* Bottom edge gradient for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-surface" aria-hidden="true" />
    </section>
  );
}
