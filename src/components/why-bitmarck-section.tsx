import {getTranslations} from 'next-intl/server';
import {Shield, Key, Target} from 'lucide-react';

const cards = [
  {icon: Shield, titleKey: 'card1Title', descKey: 'card1Description'},
  {icon: Key, titleKey: 'card2Title', descKey: 'card2Description'},
  {icon: Target, titleKey: 'card3Title', descKey: 'card3Description'},
] as const;

export async function WhyBitmarckSection() {
  const t = await getTranslations('WhyBitmarck');

  return (
    <section id="why-bitmarck" className="relative px-md md:px-xl py-4xl md:py-5xl bg-linear-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-radial-[at_50%_40%] from-accent/8 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="text-section font-bold text-white tracking-tight mb-xl text-center">
          {t('heading')}
          <span className="block h-1 w-16 bg-linear-to-r from-emerald-400 to-emerald-400/40 rounded-full mt-sm mx-auto" aria-hidden="true" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {cards.map(({icon: Icon, titleKey, descKey}) => (
            <div
              key={titleKey}
              className="border border-white/[0.12] bg-white/[0.06] backdrop-blur-md rounded-2xl p-lg flex flex-col gap-md"
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <Icon className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-heading font-bold text-white tracking-tight">
                {t(titleKey)}
              </h3>
              <p className="text-body text-white/70 leading-relaxed">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
