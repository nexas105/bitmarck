import {getTranslations} from 'next-intl/server';
import {Mail, Phone, Globe, Code2} from 'lucide-react';
import {ContactForm} from '@/components/contact-form';

export async function ContactSection() {
  const t = await getTranslations('Contact');

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-4xl px-md md:px-xl scroll-mt-[64px]"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="contact-heading"
          className="text-section font-bold text-text-primary mb-sm tracking-tight inline-block"
        >
          {t('heading')}
          <span className="block h-1 w-16 bg-linear-to-r from-accent to-accent/40 rounded-full mt-sm" aria-hidden="true" />
        </h2>
        <p className="text-body text-text-secondary mb-xl max-w-2xl">
          {t('intro')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {/* Left: Contact form */}
          <div className="rounded-2xl border border-border/50 bg-surface-raised p-lg shadow-card">
            <h3 className="text-body font-semibold text-text-primary mb-lg">
              {t('formHeading')}
            </h3>
            <ContactForm />
          </div>

          {/* Right: Direct contact info */}
          <div className="rounded-2xl border border-border/50 bg-surface-raised p-lg shadow-card flex flex-col justify-between">
            <div>
              <h3 className="text-body font-semibold text-text-primary mb-lg">
                {t('directHeading')}
              </h3>
              <p className="text-caption text-text-secondary mb-xl">
                {t('directIntro')}
              </p>

              <div className="flex flex-col gap-lg">
                {/* Email */}
                <a
                  href="mailto:Ludwig.tobias105@t-online.de"
                  className="group flex items-center gap-md text-body text-text-primary hover:text-accent transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-200">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-caption font-medium text-text-secondary">{t('emailLabel')}</p>
                    <p className="text-body">Ludwig.tobias105@t-online.de</p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+491731948945"
                  className="group flex items-center gap-md text-body text-text-primary hover:text-accent transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-200">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-caption font-medium text-text-secondary">{t('phoneLabel')}</p>
                    <p className="text-body">+49 173 1948 945</p>
                  </div>
                </a>

                {/* Website */}
                <a
                  href="https://www.tobiasjonas-ludwig.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-md text-body text-text-primary hover:text-accent transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-200">
                    <Globe className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-caption font-medium text-text-secondary">{t('websiteLabel')}</p>
                    <p className="text-body">www.tobiasjonas-ludwig.de</p>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/nexas105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-md text-body text-text-primary hover:text-accent transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-200">
                    <Code2 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-caption font-medium text-text-secondary">{t('githubLabel')}</p>
                    <p className="text-body">github.com/nexas105</p>
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
