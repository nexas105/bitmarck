import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {MapPin, Calendar, Globe, Shield} from 'lucide-react';
import {MetricsDashboard} from '@/components/metrics-dashboard';
import {CvDownload} from '@/components/cv-download';
import {HeroAnimations} from '@/components/hero-animations';

export async function HeroSection() {
  const t = await getTranslations('Hero');
  const tt = await getTranslations('TrustStrip');

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
            {/* Eyebrow */}
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/50 mb-lg">
              {t('eyebrow')}
            </p>
            {/* Profile photo + Name */}
            <div className="flex items-center gap-lg mb-md">
              <div className="relative shrink-0">
                <Image
                  src="/tobias-ludwig.jpg"
                  alt="Tobias Ludwig"
                  width={80}
                  height={80}
                  className="rounded-full object-cover object-top border-2 border-white/20 shadow-lg"
                  style={{width: 80, height: 80}}
                  priority
                />
                <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-primary-900 animate-pulse" aria-hidden="true" />
              </div>
              <h1 className="text-hero font-bold text-white leading-none tracking-tight">
                {t('name')}
              </h1>
            </div>
            <p className="text-lg text-white/75 leading-relaxed max-w-[480px]">
              {t('valueProposition')}
            </p>
            <p className="mt-md inline-flex items-center rounded-full border border-emerald-300/35 bg-emerald-400/10 px-sm py-xs text-xs font-semibold tracking-wide text-emerald-200">
              {t('focusLine')}
            </p>
            {/* Trust Strip */}
            <div className="flex flex-wrap gap-sm mt-lg">
              {[
                {icon: <MapPin className="h-3.5 w-3.5" />, text: tt('location')},
                {icon: <Calendar className="h-3.5 w-3.5" />, text: tt('available')},
                {icon: <Globe className="h-3.5 w-3.5" />, text: tt('languages')},
                {icon: <Shield className="h-3.5 w-3.5" />, text: tt('domainFit')},
              ].map((chip) => (
                <span key={chip.text} className="inline-flex items-center gap-xs rounded-full bg-white/[0.07] border border-white/10 px-sm py-xs text-xs text-white/60">
                  {chip.icon}
                  {chip.text}
                </span>
              ))}
            </div>
            {/* CTA buttons — CV formats dropdown + cover letter */}
            <div className="mt-xl">
              <CvDownload />
            </div>
          </div>
        </HeroAnimations>
        {/* Right: Metrics Dashboard */}
        <MetricsDashboard />
      </div>

      {/* Bottom edge gradient removed — hero flows seamlessly into WhyBitmarck dark section */}
    </section>
  );
}
