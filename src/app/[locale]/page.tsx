import {setRequestLocale} from 'next-intl/server';
import {HeroSection} from '@/components/hero-section';
import {CareerSection} from '@/components/career-section';
import {ProjectsSection} from '@/components/projects-section';
import {SkillsSection} from '@/components/skills-section';
import {FAQSection} from '@/components/faq-section';
import {AnimateOnScroll} from '@/components/animate-on-scroll';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection />
      <AnimateOnScroll>
        <CareerSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <ProjectsSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <SkillsSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <FAQSection />
      </AnimateOnScroll>
    </main>
  );
}
