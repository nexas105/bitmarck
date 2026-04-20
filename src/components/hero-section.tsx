import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {MetricsDashboard} from '@/components/metrics-dashboard';
import {CvDownload} from '@/components/cv-download';
import {HeroAnimations} from '@/components/hero-animations';
import {TextReveal} from '@/components/text-reveal';

export async function HeroSection() {
  const t = await getTranslations('Hero');

  return (
    <section id="hero" className="relative px-md md:px-xl py-4xl md:py-5xl scroll-mt-[64px] bg-linear-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
      {/* Animated gradient mesh blobs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute h-[500px] w-[500px] rounded-full blur-[120px] opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, #2563EB, transparent 70%)',
            top: '10%', left: '60%',
            animation: 'mesh-float-1 18s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute h-[400px] w-[400px] rounded-full blur-[100px] opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #7C3AED, transparent 70%)',
            top: '50%', left: '20%',
            animation: 'mesh-float-2 20s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute h-[350px] w-[350px] rounded-full blur-[100px] opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #3B82F6, transparent 70%)',
            top: '30%', left: '40%',
            animation: 'mesh-float-3 15s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
      </div>
      {/* Layered background effects */}
      <div className="absolute inset-0 bg-radial-[at_70%_30%] from-accent/10 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-radial-[at_20%_80%] from-accent/5 to-transparent" aria-hidden="true" />
      {/* Noise grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '256px 256px'}} aria-hidden="true" />
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px'}} aria-hidden="true" />
      {/* Large decorative accent circle */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/[0.04] blur-3xl" aria-hidden="true" />

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
                  width={96}
                  height={96}
                  className="rounded-full object-cover object-top border-2 border-white/20 shadow-lg"
                  style={{width: 96, height: 96}}
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
              <TextReveal>{t('valueProposition')}</TextReveal>
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
