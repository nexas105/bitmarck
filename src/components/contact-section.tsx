import {getTranslations} from 'next-intl/server';
import {Mail, Phone, Globe, Code2} from 'lucide-react';
import {ContactForm} from '@/components/contact-form';
import {SectionHeader} from '@/components/section-header';

export async function ContactSection() {
  const t = await getTranslations('Contact');

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-4xl px-md md:px-xl scroll-mt-[64px] bg-linear-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-radial-[at_30%_60%] from-accent/8 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeader number="06" eyebrow="KONTAKT" heading={t('heading')} id="contact-heading" variant="dark">
          <p className="text-body text-white/70 max-w-2xl">
            {t('intro')}
          </p>
        </SectionHeader>
        <div className="mb-xl" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {/* Left: Contact form */}
          <div className="rounded-2xl border border-white/[0.12] bg-white/[0.06] backdrop-blur-md p-lg shadow-card">
            <h3 className="text-body font-semibold text-white mb-lg">
              {t('formHeading')}
            </h3>
            <ContactForm variant="dark" />
          </div>

          {/* Right: Direct contact info */}
          <div className="rounded-2xl border border-white/[0.12] bg-white/[0.06] backdrop-blur-md p-lg shadow-card flex flex-col justify-between">
            <div>
              <h3 className="text-body font-semibold text-white mb-lg">
                {t('directHeading')}
              </h3>
              <p className="text-caption text-white/60 mb-xl">
                {t('directIntro')}
              </p>

              <div className="flex flex-col gap-lg">
                {/* Email */}
                <a
                  href="mailto:Ludwig.tobias105@t-online.de"
                  className="group flex items-center gap-md text-body text-white hover:text-emerald-400 transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] group-hover:bg-white/[0.12] transition-colors duration-200">
                    <Mail className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-caption font-medium text-white/60">{t('emailLabel')}</p>
                    <p className="text-body text-white">Ludwig.tobias105@t-online.de</p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+491731948945"
                  className="group flex items-center gap-md text-body text-white hover:text-emerald-400 transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] group-hover:bg-white/[0.12] transition-colors duration-200">
                    <Phone className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-caption font-medium text-white/60">{t('phoneLabel')}</p>
                    <p className="text-body text-white">+49 173 1948 945</p>
                  </div>
                </a>

                {/* Website */}
                <a
                  href="https://www.tobiasjonas-ludwig.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-md text-body text-white hover:text-emerald-400 transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] group-hover:bg-white/[0.12] transition-colors duration-200">
                    <Globe className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-caption font-medium text-white/60">{t('websiteLabel')}</p>
                    <p className="text-body text-white">www.tobiasjonas-ludwig.de</p>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/nexas105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-md text-body text-white hover:text-emerald-400 transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] group-hover:bg-white/[0.12] transition-colors duration-200">
                    <Code2 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-caption font-medium text-white/60">{t('githubLabel')}</p>
                    <p className="text-body text-white">github.com/nexas105</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
