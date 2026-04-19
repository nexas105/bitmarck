import {getTranslations} from 'next-intl/server'

const CERT_KEYS = [
  'itil',
  'sinaCore',
  'sinaBasics',
  'devops',
  'databases',
  'linuxAdmin',
  'fitTrainer',
  'nutritionist',
  'lancom',
  'ftth',
] as const

const EDU_KEYS = ['bsc', 'sde', 'itse'] as const

export async function CertificationsSection() {
  const t = await getTranslations('Certifications')

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-3xl px-md md:px-xl scroll-mt-[64px] bg-primary-50"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="certifications-heading"
          className="text-section font-semibold text-text-primary inline-block"
        >
          {t('heading')}
          <span className="block h-1 w-12 bg-accent rounded-full mt-sm" aria-hidden="true" />
        </h2>

        {/* Certifications */}
        <div className="mt-2xl">
          <h3 className="text-body font-semibold text-text-primary mb-md">
            {t('certLabel')}
          </h3>
          <div className="flex flex-wrap gap-sm">
            {CERT_KEYS.map((key) => (
              <span
                key={key}
                className="text-label border border-accent/20 bg-accent/5 text-accent font-medium rounded-full px-4 py-1.5 shadow-sm"
              >
                {t(`certs.${key}`)}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-2xl">
          <h3 className="text-body font-semibold text-text-primary mb-md">
            {t('eduLabel')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {EDU_KEYS.map((key) => (
              <div
                key={key}
                className="rounded-xl border border-border/50 bg-surface-raised p-lg shadow-card"
              >
                <p className="text-body font-semibold text-text-primary">
                  {t(`education.${key}.degree`)}
                </p>
                <p className="text-label text-text-secondary mt-xs">
                  {t(`education.${key}.institution`)}
                </p>
                <div className="flex items-center justify-between mt-sm">
                  <p className="text-label text-text-secondary">
                    {t(`education.${key}.period`)}
                  </p>
                  <span
                    className={`text-label font-medium rounded-full px-3 py-0.5 ${
                      t(`education.${key}.status`) === 'laufend' || t(`education.${key}.status`) === 'in progress'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-surface-subtle text-text-secondary'
                    }`}
                  >
                    {t(`education.${key}.status`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
