import {getTranslations} from 'next-intl/server';
import {CheckCircle} from 'lucide-react';

const MATCH_KEYS = ['digitalization', 'requirements', 'useCases', 'bpmn', 'testing', 'tools', 'analytical'] as const;

export async function JobMatchSection() {
  const t = await getTranslations('JobMatch');

  return (
    <section
      id="job-match"
      className="relative px-md md:px-xl py-3xl md:py-4xl bg-surface overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
          02 / {t('eyebrow')}
        </p>
        <h2 className="text-section font-bold tracking-tight mt-xs inline-block text-text-primary">
          {t('heading')}
          <span
            className="block h-1 w-16 rounded-full mt-sm bg-linear-to-r from-accent to-accent/40"
            aria-hidden="true"
          />
        </h2>
        <p className="mt-md text-body text-text-secondary max-w-2xl">
          {t('intro')}
        </p>

        {/* Column headers */}
        <div className="mt-xl hidden md:grid grid-cols-[1fr_auto_1fr] gap-lg items-center">
          <div className="text-label font-semibold text-text-secondary uppercase tracking-wider">
            {t('colBitmarck')}
          </div>
          <div className="w-20" />
          <div className="text-label font-semibold text-text-secondary uppercase tracking-wider">
            {t('colTobias')}
          </div>
        </div>

        {/* Match rows */}
        <div className="mt-md md:mt-lg flex flex-col gap-md">
          {MATCH_KEYS.map((key) => (
            <div
              key={key}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-sm md:gap-lg items-stretch"
            >
              {/* Left: Bitmarck requirement */}
              <div className="rounded-xl border border-border bg-surface-raised p-md md:p-lg flex items-center">
                <p className="text-body text-text-primary leading-relaxed">
                  {t(`items.${key}.requirement`)}
                </p>
              </div>

              {/* Center: Match chip + connecting line */}
              <div className="hidden md:flex flex-col items-center justify-center relative">
                {/* Horizontal connecting line */}
                <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-emerald-300/50" aria-hidden="true" />
                <span className="relative z-10 inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-sm py-1 text-xs font-semibold text-emerald-700 whitespace-nowrap">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {t('matchLabel')}
                </span>
              </div>

              {/* Mobile: Match chip */}
              <div className="flex md:hidden items-center justify-center py-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-sm py-1 text-xs font-semibold text-emerald-700">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {t('matchLabel')}
                </span>
              </div>

              {/* Right: Tobias's evidence */}
              <div className="rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-md md:p-lg flex items-center">
                <p className="text-body text-text-primary leading-relaxed">
                  {t(`items.${key}.evidence`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
