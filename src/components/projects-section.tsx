import {getTranslations} from 'next-intl/server';
import {ProjectCard} from '@/components/project-card';
import {getAllProjects} from '@/data/projects';

export async function ProjectsSection() {
  const t = await getTranslations('Projects');
  const projects = getAllProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-3xl px-md md:px-xl scroll-mt-[64px]"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="projects-heading"
          className="text-heading font-semibold text-text-primary mb-xl"
        >
          {t('heading')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
