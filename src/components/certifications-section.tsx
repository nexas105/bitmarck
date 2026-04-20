import {getTranslations} from 'next-intl/server'
import {Link} from '@/i18n/navigation'

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
      className="py-4xl px-md md:px-xl scroll-mt-[64px] bg-primary-50"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="certifications-heading"
          className="text-section font-bold text-text-primary tracking-tight inline-block"
        >
          {t('heading')}
          <span className="block h-1 w-16 bg-linear-to-r from-accent to-accent/40 rounded-full mt-sm" aria-hidden="true" />
        </h2>

        {/* Certifications */}
        <div className="mt-2xl">
          <div className="flex items-center justify-between mb-md">
            <h3 className="text-label font-semibold text-text-primary uppercase tracking-wide">
              {t('certLabel')}
            </h3>
            <Link
              href="/zertifikate"
              className="text-label font-medium text-accent hover:text-accent-hover transition-colors duration-200"
            >
              {t('detailLink')}
            </Link>
          </div>
          <div className="flex flex-wrap gap-sm">
            {CERT_KEYS.map((key) => (
              <span
                key={key}
                className="text-label bg-accent/8 text-accent font-medium rounded-full px-3.5 py-1.5 hover:bg-accent/12 transition-colors duration-150"
              >
                {t(`certs.${key}`)}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-2xl">
          <h3 className="text-label font-semibold text-text-primary mb-md uppercase tracking-wide">
            {t('eduLabel')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {EDU_KEYS.map((key) => (
              <div
                key={key}
                className="group rounded-2xl border border-border/60 bg-surface-raised p-lg shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                <p className="text-body font-bold text-text-primary tracking-tight">
                  {t(`education.${key}.degree`)}
                </p>
                <p className="text-label text-text-secondary mt-xs">
                  {t(`education.${key}.institution`)}
                </p>
                <div className="flex items-center justify-between mt-md pt-md border-t border-border/50">
                  <p className="text-xs text-text-tertiary font-medium">
                    {t(`education.${key}.period`)}
                  </p>
                  <span
                    className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${
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
