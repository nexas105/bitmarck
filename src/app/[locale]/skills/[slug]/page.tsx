import {setRequestLocale, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {ArrowLeft, Shield, BarChart3, Server, Code} from 'lucide-react';
import {Tag} from '@/components/tag';

const CATEGORY_KEYS = ['iam', 'ba', 'devops', 'languages'] as const;

// Map: translation key -> display name
const CATEGORY_SKILLS: Record<string, {key: string; display: string}[]> = {
  iam: [
    {key: 'SINA', display: 'SINA'},
    {key: 'JWT', display: 'JWT'},
    {key: 'RBAC', display: 'RBAC'},
    {key: 'RLS', display: 'RLS'},
    {key: 'AuthSystems', display: 'Auth Systems'},
    {key: 'ApiDesign', display: 'API Design'},
  ],
  ba: [
    {key: 'Anforderungsanalyse', display: 'Anforderungsanalyse'},
    {key: 'UseCases', display: 'Use Cases'},
    {key: 'DSGVO', display: 'DSGVO'},
    {key: 'Prozessoptimierung', display: 'Prozessoptimierung'},
    {key: 'Dokumentation', display: 'Dokumentation'},
    {key: 'StakeholderManagement', display: 'Stakeholder Management'},
  ],
  devops: [
    {key: 'Docker', display: 'Docker'},
    {key: 'Linux', display: 'Linux'},
    {key: 'Cisco', display: 'Cisco'},
    {key: 'LANCOM', display: 'LANCOM'},
    {key: 'Git', display: 'Git'},
  ],
  languages: [
    {key: 'TypeScript', display: 'TypeScript'},
    {key: 'Flutter', display: 'Flutter'},
    {key: 'SQL', display: 'SQL'},
    {key: 'NextJs', display: 'Next.js'},
  ],
};

const CATEGORY_ICONS: Record<string, typeof Shield> = {
  iam: Shield,
  ba: BarChart3,
  devops: Server,
  languages: Code,
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CATEGORY_KEYS.map((slug) => ({locale, slug}))
  );
}

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export default async function SkillDetailPage({params}: Props) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  if (!CATEGORY_KEYS.includes(slug as typeof CATEGORY_KEYS[number])) {
    notFound();
  }

  const t = await getTranslations('Skills');

  const title = t(`detailPages.${slug}.title`);
  const overview = t(`detailPages.${slug}.overview`);
  const skills = CATEGORY_SKILLS[slug] || [];
  const Icon = CATEGORY_ICONS[slug] || Shield;

  return (
    <main className="py-4xl px-md md:px-xl">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/#skills"
          className="group inline-flex items-center gap-sm text-label font-medium text-accent hover:text-accent-hover transition-colors duration-200 mb-2xl"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
          &larr; Zur&uuml;ck
        </Link>

        {/* Header */}
        <div className="mb-3xl">
          <div className="inline-flex items-center gap-sm rounded-full bg-accent/8 border border-accent/20 px-md py-xs mb-lg">
            <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="text-xs font-medium text-accent tracking-wide uppercase">
              {t(`categories.${slug}`)}
            </span>
          </div>
          <h1 className="text-display font-bold text-text-primary tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-text-secondary mt-md leading-relaxed max-w-3xl">
            {overview}
          </p>
        </div>

        {/* Individual skills */}
        <div className="flex flex-col gap-lg">
          {skills.map(({key, display}) => {
            const description = t(`detailPages.${slug}.skills.${key}.description`);
            const level = t(`detailPages.${slug}.skills.${key}.level`);
            const context = t(`detailPages.${slug}.skills.${key}.context`);

            return (
              <div
                key={key}
                className="rounded-2xl border border-border/50 bg-surface-raised p-lg shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="flex items-start justify-between gap-md mb-sm">
                  <h2 className="text-heading font-bold text-text-primary tracking-tight">
                    {display}
                  </h2>
                  <Tag variant="outline">{level}</Tag>
                </div>
                <p className="text-body text-text-secondary leading-relaxed mb-md">
                  {description}
                </p>
                <div className="flex items-center gap-xs text-xs text-text-tertiary">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Kontext: {context}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
