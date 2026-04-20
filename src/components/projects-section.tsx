import {getTranslations} from 'next-intl/server';
import {ProjectCard} from '@/components/project-card';
import {getAllProjects} from '@/data/projects';
import {SectionHeader} from '@/components/section-header';
import {UniversalCarousel} from '@/components/universal-carousel';

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
          <UniversalCarousel id="projects" defaultEffect="Coverflow" gridCols={3} autoplayDelay={4000}>
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </UniversalCarousel>
        </div>
      </div>
    </section>
  );
}
