import {getTranslations} from 'next-intl/server';
import {ProjectCard} from '@/components/project-card';
import {AnimateOnScroll} from '@/components/animate-on-scroll';
import {getAllProjects} from '@/data/projects';

export async function ProjectsSection() {
  const t = await getTranslations('Projects');
  const projects = getAllProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-4xl px-md md:px-xl scroll-mt-[64px] bg-primary-50"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="projects-heading"
          className="text-section font-bold text-text-primary mb-md tracking-tight inline-block"
        >
          {t('heading')}
          <span className="block h-1 w-16 bg-linear-to-r from-accent to-accent/40 rounded-full mt-sm" aria-hidden="true" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mt-xl">
          {projects.map((project, index) => (
            <AnimateOnScroll key={project.slug} delay={index * 0.08}>
              <ProjectCard project={project} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
