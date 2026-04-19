import {setRequestLocale, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {getProject, getAllProjectSlugs} from '@/data/projects';
import {Tag} from '@/components/tag';
import {ArrowLeft, ExternalLink} from 'lucide-react';

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
    <main className="py-3xl px-md md:px-xl">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-xs text-label text-accent hover:text-accent-hover transition-colors duration-150 ease mb-xl"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {td('back')}
        </Link>

        {/* Project title */}
        <h1 className="text-display font-semibold text-text-primary">
          {t(project.titleKey)}
        </h1>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-xs mt-md">
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
            className="inline-flex items-center gap-xs text-label text-accent hover:text-accent-hover transition-colors duration-150 ease mt-md"
          >
            {td('viewOnGithub')}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}

        {/* Problem / Ansatz / Ergebnis sections */}
        <div className="mt-2xl flex flex-col gap-xl">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-heading font-semibold text-text-primary mb-sm">
                {section.heading}
              </h2>
              <p className="text-body text-text-secondary leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
