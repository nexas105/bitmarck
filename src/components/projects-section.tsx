import {getTranslations} from 'next-intl/server';
import {ProjectCard} from '@/components/project-card';
import {AnimateOnScroll} from '@/components/animate-on-scroll';
import {getAllProjects} from '@/data/projects';
import {SectionHeader} from '@/components/section-header';

export async function ProjectsSection() {
  const t = await getTranslations('Projects');
  const projects = getAllProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-4xl px-md md:px-xl scroll-mt-[64px] bg-white overflow-hidden"
    >
      {/* Top gradient fade from surface */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-surface to-transparent" aria-hidden="true" />
      {/* Bottom gradient fade to surface */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-surface to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-6xl">
        <SectionHeader number="02" eyebrow="PROJEKTE" heading={t('heading')} id="projects-heading" />
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
