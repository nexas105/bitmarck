import {setRequestLocale, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {ArrowLeft, Briefcase, Target, Trophy, Zap} from 'lucide-react';
import {Tag} from '@/components/tag';

const STATION_KEYS = [
  'telekom',
  'mediacom',
  'biermann',
  'bwi',
  'bhf',
  'persona',
  'freelancer',
  'xecuro',
  'bitmarck',
] as const;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    STATION_KEYS.map((slug) => ({locale, slug}))
  );
}

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export default async function CareerDetailPage({params}: Props) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  if (!STATION_KEYS.includes(slug as typeof STATION_KEYS[number])) {
    notFound();
  }

  const t = await getTranslations('Career');
  const td = await getTranslations('CareerDetail');

  const station = {
    period: t(`stations.${slug}.period`),
    company: t(`stations.${slug}.company`),
    role: t(`stations.${slug}.role`),
    technologies: t(`stations.${slug}.technologies`),
    overview: t(`stations.${slug}.detailPage.overview`),
    baRelevance: t(`stations.${slug}.detailPage.baRelevance`),
    achievements: t.raw(`stations.${slug}.detailPage.achievements`) as string[],
    skillsGained: t.raw(`stations.${slug}.detailPage.skillsGained`) as string[],
  };

  return (
    <main className="py-4xl px-md md:px-xl">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/#career"
          className="group inline-flex items-center gap-sm text-label font-medium text-accent hover:text-accent-hover transition-colors duration-200 mb-2xl"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
          {td('back')}
        </Link>

        {/* Header */}
        <div className="mb-3xl">
          <div className="inline-flex items-center gap-sm rounded-full bg-accent/8 border border-accent/20 px-md py-xs mb-lg">
            <Briefcase className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="text-xs font-medium text-accent tracking-wide uppercase">
              {station.period}
            </span>
          </div>
          <h1 className="text-display font-bold text-text-primary tracking-tight">
            {station.role}
          </h1>
          <p className="text-lg text-text-secondary mt-sm">
            {station.company}
          </p>
          <div className="flex flex-wrap gap-xs mt-lg">
            {station.technologies.split(', ').map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </div>

        {/* Content sections */}
        <div className="flex flex-col gap-2xl">
          {/* Overview */}
          <div className="relative pl-lg border-l-2 border-accent/40">
            <h2 className="text-heading font-bold text-text-primary mb-sm tracking-tight flex items-center gap-sm">
              <Briefcase className="h-5 w-5 text-accent" aria-hidden="true" />
              {td('overview')}
            </h2>
            <p className="text-body text-text-secondary leading-loose">
              {station.overview}
            </p>
          </div>

          {/* BA Relevance */}
          <div className="relative pl-lg border-l-2 border-accent/40">
            <h2 className="text-heading font-bold text-text-primary mb-sm tracking-tight flex items-center gap-sm">
              <Target className="h-5 w-5 text-accent" aria-hidden="true" />
              {td('baRelevance')}
            </h2>
            <div className="rounded-lg bg-accent/5 border border-accent/20 px-lg py-md">
              <p className="text-body text-text-secondary leading-loose">
                {station.baRelevance}
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="relative pl-lg border-l-2 border-accent/40">
            <h2 className="text-heading font-bold text-text-primary mb-md tracking-tight flex items-center gap-sm">
              <Trophy className="h-5 w-5 text-accent" aria-hidden="true" />
              {td('achievements')}
            </h2>
            <ul className="flex flex-col gap-sm">
              {station.achievements.map((item) => (
                <li key={item} className="flex items-start gap-sm text-body text-text-secondary leading-loose">
                  <Trophy className="h-4 w-4 text-accent/60 mt-1.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Gained */}
          <div className="relative pl-lg border-l-2 border-accent/40">
            <h2 className="text-heading font-bold text-text-primary mb-md tracking-tight flex items-center gap-sm">
              <Zap className="h-5 w-5 text-accent" aria-hidden="true" />
              {td('skillsGained')}
            </h2>
            <div className="flex flex-wrap gap-sm">
              {station.skillsGained.map((skill) => (
                <Tag key={skill} variant="outline">{skill}</Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
