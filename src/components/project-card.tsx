import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Tag} from '@/components/tag';
import {type Project} from '@/data/projects';
import {getRepoData} from '@/lib/github';

type ProjectCardProps = {
  project: Project;
};

function getTopLanguages(languages: Record<string, number>, count: number): string[] {
  return Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([name]) => name);
}

function getDaysAgo(dateString: string): number {
  const now = new Date();
  const then = new Date(dateString);
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}

export async function ProjectCard({project}: ProjectCardProps) {
  const t = await getTranslations();

  const githubData =
    project.githubOwner && project.githubRepo
      ? await getRepoData(project.githubOwner, project.githubRepo)
      : null;

  return (
    <article className="group rounded-2xl border border-border/50 bg-surface-raised p-lg flex flex-col gap-md shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ease-out">
      {/* Accent top border on hover */}
      <div className="h-0.5 -mt-lg -mx-lg mb-md rounded-t-2xl bg-linear-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      <h3 className="text-heading font-bold text-text-primary tracking-tight group-hover:text-accent transition-colors duration-200">
        {t(project.titleKey)}
      </h3>
      <p className="text-body text-text-secondary leading-relaxed flex-1">
        {t(project.descriptionKey)}
      </p>
      <div className="flex flex-wrap gap-xs">
        {project.techStack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
      {githubData && (
        <div className="text-xs text-text-tertiary flex flex-col gap-xs">
          {Object.keys(githubData.languages).length > 0 && (
            <span>
              {t('Projects.languages')}: {getTopLanguages(githubData.languages, 3).join(', ')}
            </span>
          )}
          {githubData.pushed_at && (
            <span>
              {t('Projects.lastCommit')}: {t('Projects.daysAgo', {days: getDaysAgo(githubData.pushed_at)})}
            </span>
          )}
        </div>
      )}
      <Link
        href={`/projekte/${project.slug}`}
        className="inline-flex items-center gap-xs text-label font-medium text-accent hover:text-accent-hover transition-colors duration-150 ease group-hover:gap-sm"
      >
        {t('Projects.detailsLink')}
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
      </Link>
    </article>
  );
}
