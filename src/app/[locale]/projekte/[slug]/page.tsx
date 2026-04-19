import {setRequestLocale, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {getProject, getAllProjectSlugs} from '@/data/projects';
import {Tag} from '@/components/tag';
import {ArrowLeft, ExternalLink, CheckCircle2, Lightbulb} from 'lucide-react';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllProjectSlugs().map((slug) => ({locale, slug}))
  );
}

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export default async function ProjectDetailPage({params}: Props) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations();
  const td = await getTranslations('ProjectDetail');

  const sections = [
    {heading: td('problem'), content: t(project.detail.problemKey)},
    {heading: td('approach'), content: t(project.detail.approachKey)},
    {heading: td('result'), content: t(project.detail.resultKey)},
  ];

  return (
    <main className="py-4xl px-md md:px-xl">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-sm text-label font-medium text-accent hover:text-accent-hover transition-colors duration-200 mb-2xl"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
          {td('back')}
        </Link>

        {/* Project title */}
        <h1 className="text-display font-bold text-text-primary tracking-tight">
          {t(project.titleKey)}
        </h1>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-sm mt-lg">
          {project.techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        {/* GitHub link (optional) */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-sm text-label font-medium text-accent hover:text-accent-hover transition-colors duration-200 mt-lg"
          >
            {td('viewOnGithub')}
            <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        )}

        {/* Problem / Ansatz / Ergebnis sections */}
        <div className="mt-3xl flex flex-col gap-2xl">
          {sections.map((section) => (
            <div key={section.heading} className="relative pl-lg border-l-2 border-accent/20">
              <h2 className="text-heading font-bold text-text-primary mb-sm tracking-tight">
                {section.heading}
              </h2>
              <p className="text-body text-text-secondary leading-loose">
                {section.content}
              </p>
            </div>
          ))}

          {/* Highlights section */}
          {project.detail.highlightsKey && (
            <div className="relative pl-lg border-l-2 border-emerald-500/30">
              <h2 className="text-heading font-bold text-text-primary mb-md tracking-tight flex items-center gap-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                {td('highlights')}
              </h2>
              <ul className="flex flex-col gap-sm">
                {t(project.detail.highlightsKey).split('\n').map((item) => (
                  <li key={item} className="flex items-start gap-sm text-body text-text-secondary leading-loose">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500/60 mt-1.5 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Learnings section */}
          {project.detail.learningsKey && (
            <div className="relative pl-lg border-l-2 border-amber-500/30">
              <h2 className="text-heading font-bold text-text-primary mb-md tracking-tight flex items-center gap-sm">
                <Lightbulb className="h-5 w-5 text-amber-500" aria-hidden="true" />
                {td('learnings')}
              </h2>
              <div className="rounded-lg bg-surface-secondary/50 border border-border/50 px-lg py-md">
                <p className="text-body text-text-secondary leading-loose italic">
                  {t(project.detail.learningsKey)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tech Stack Detail */}
        <div className="mt-3xl">
          <h2 className="text-heading font-bold text-text-primary mb-md tracking-tight">
            {td('techStack')}
          </h2>
          <div className="flex flex-wrap gap-sm">
            {project.techStack.map((tech) => (
              <Tag key={tech} variant="outline">{tech}</Tag>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
