import {getTranslations} from 'next-intl/server';
import {ProjectCard} from '@/components/project-card';
import {getAllProjects} from '@/data/projects';
import {SectionHeader} from '@/components/section-header';
import {ProjectCarousel} from '@/components/project-carousel';

export async function ProjectsSection() {
  const t = await getTranslations('Projects');
  const projects = getAllProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-4xl px-md md:px-xl scroll-mt-[64px] bg-white overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader number="02" eyebrow="PROJEKTE" heading={t('heading')} id="projects-heading" />
        <div className="mt-xl">
          <ProjectCarousel>
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ProjectCarousel>
        </div>
      </div>
    </section>
  );
}
