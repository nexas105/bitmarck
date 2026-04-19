import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Tag} from '@/components/tag';
import {type Project} from '@/data/projects';

type ProjectCardProps = {
  project: Project;
};

export async function ProjectCard({project}: ProjectCardProps) {
  const t = await getTranslations();

  return (
    <article className="rounded-lg border border-border bg-surface-raised p-lg flex flex-col gap-md hover:shadow-sm transition-shadow duration-150 ease">
      <h3 className="text-heading font-semibold text-text-primary">
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
      <Link
        href={`/projekte/${project.slug}`}
        className="text-label text-accent hover:text-accent-hover transition-colors duration-150 ease"
      >
        {t('Projects.detailsLink')}
      </Link>
    </article>
  );
}
