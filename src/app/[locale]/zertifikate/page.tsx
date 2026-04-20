import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {Tag} from '@/components/tag';
import {
  ArrowLeft,
  Shield,
  Settings,
  Server,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Clock,
  CheckCircle2,
} from 'lucide-react';

const CATEGORIES = ['iamSecurity', 'itMethoden', 'infrastructure', 'branche'] as const;

const CATEGORY_ICONS: Record<string, typeof Shield> = {
  iamSecurity: Shield,
  itMethoden: Settings,
  infrastructure: Server,
  branche: Briefcase,
};

const CERT_KEYS_BY_CATEGORY: Record<string, string[]> = {
  iamSecurity: ['sinaCore', 'sinaBasics'],
  itMethoden: ['itil', 'devops', 'databases', 'sapErp', 'qualitaetssicherung', 'softwaretechnik', 'businessAnalyst'],
  infrastructure: ['linuxAdmin', 'lancom', 'ftth'],
  branche: ['fitTrainer', 'nutritionist'],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

type Props = {
  params: Promise<{locale: string}>;
};

export default async function CertificationsDetailPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('CertificationDetail');
  const tCerts = await getTranslations('Certifications');

  return (
    <main className="py-4xl px-md md:px-xl">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/#certifications"
          className="group inline-flex items-center gap-sm text-label font-medium text-accent hover:text-accent-hover transition-colors duration-200 mb-2xl"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
          {t('back')}
        </Link>

        {/* Header */}
        <div className="mb-3xl">
          <div className="inline-flex items-center gap-sm rounded-full bg-accent/8 border border-accent/20 px-md py-xs mb-lg">
            <Award className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="text-xs font-medium text-accent tracking-wide uppercase">
              {t('badge')}
            </span>
          </div>
          <h1 className="text-display font-bold text-text-primary tracking-tight">
            {t('heading')}
          </h1>
          <p className="text-lg text-text-secondary mt-md leading-relaxed max-w-3xl">
            {t('intro')}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-3xl">
          {CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category] || Shield;
            const certKeys = CERT_KEYS_BY_CATEGORY[category];

            return (
              <div key={category}>
                {/* Category heading */}
                <div className="flex items-center gap-sm mb-lg border-b border-border/40 pb-sm">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h2 className="text-heading font-bold text-text-primary tracking-tight">
                    {t(`categories.${category}`)}
                  </h2>
                </div>

                {/* Certs in this category */}
                <div className="flex flex-col gap-md">
                  {certKeys.map((key) => {
                    const status = t(`certs.${key}.status`);
                    const isInProgress = status === 'laufend' || status === 'in progress';

                    return (
                      <div
                        key={key}
                        className="rounded-2xl border border-border/60 bg-surface-raised p-lg shadow-card hover:shadow-card-hover transition-shadow duration-300"
                      >
                        <div className="flex items-start justify-between gap-md mb-sm">
                          <h3 className="text-body font-bold text-text-primary tracking-tight">
                            {t(`certs.${key}.name`)}
                          </h3>
                          <span
                            className={`shrink-0 inline-flex items-center gap-xs text-xs font-semibold rounded-full px-2.5 py-0.5 ${
                              isInProgress
                                ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                                : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                            }`}
                          >
                            {isInProgress ? (
                              <Clock className="h-3 w-3" aria-hidden="true" />
                            ) : (
                              <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                            )}
                            {status}
                          </span>
                        </div>

                        {/* Provider */}
                        <p className="text-xs text-text-tertiary font-medium mb-sm">
                          {t(`certs.${key}.provider`)}
                        </p>

                        {/* Description */}
                        <p className="text-body text-text-secondary leading-relaxed mb-md">
                          {t(`certs.${key}.description`)}
                        </p>

                        {/* BA Relevance */}
                        <div className="rounded-lg bg-accent/8 border border-accent/20 px-md py-sm">
                          <div className="flex items-center gap-xs mb-xs">
                            <BookOpen className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                            <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                              {t('baRelevanceLabel')}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {t(`certs.${key}.baRelevance`)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Education section */}
        <div className="mt-4xl">
          <div className="flex items-center gap-sm mb-lg border-b border-border/40 pb-sm">
            <GraduationCap className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="text-heading font-bold text-text-primary tracking-tight">
              {tCerts('eduLabel')}
            </h2>
          </div>

          <div className="flex flex-col gap-md">
            {(['bsc', 'sde', 'itse'] as const).map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-border/50 bg-surface-raised p-lg shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="flex items-start justify-between gap-md mb-sm">
                  <div>
                    <h3 className="text-body font-bold text-text-primary tracking-tight">
                      {tCerts(`education.${key}.degree`)}
                    </h3>
                    <p className="text-label text-text-secondary mt-xs">
                      {tCerts(`education.${key}.institution`)}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center gap-xs text-xs font-semibold rounded-full px-2.5 py-0.5 ${
                      tCerts(`education.${key}.status`) === 'laufend' || tCerts(`education.${key}.status`) === 'in progress'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-surface-subtle text-text-secondary'
                    }`}
                  >
                    {tCerts(`education.${key}.status`) === 'laufend' || tCerts(`education.${key}.status`) === 'in progress' ? (
                      <Clock className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    )}
                    {tCerts(`education.${key}.status`)}
                  </span>
                </div>
                <p className="text-xs text-text-tertiary font-medium mb-md">
                  {tCerts(`education.${key}.period`)}
                </p>
                <p className="text-body text-text-secondary leading-relaxed">
                  {t(`education.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary tags */}
        <div className="mt-3xl">
          <h2 className="text-heading font-bold text-text-primary mb-md tracking-tight">
            {t('allCertsLabel')}
          </h2>
          <div className="flex flex-wrap gap-sm">
            {Object.values(CERT_KEYS_BY_CATEGORY).flat().map((key) => (
              <Tag key={key} variant="outline">{t(`certs.${key}.name`)}</Tag>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
