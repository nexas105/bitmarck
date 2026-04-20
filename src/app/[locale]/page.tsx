import {setRequestLocale} from 'next-intl/server';
import {HeroSection} from '@/components/hero-section';
import {CareerSection} from '@/components/career-section';
import {ProjectsSection} from '@/components/projects-section';
import {SkillsSection} from '@/components/skills-section';
import {CertificationsSection} from '@/components/certifications-section';
import {FAQSection} from '@/components/faq-section';
import {ContactSection} from '@/components/contact-section';
import {AnimateOnScroll} from '@/components/animate-on-scroll';
import {Spotlight} from '@/components/spotlight';
import {ParallaxSection} from '@/components/parallax-section';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection />
      <Spotlight>
        <AnimateOnScroll preset="fadeUp">
          <CareerSection />
        </AnimateOnScroll>
      </Spotlight>
      <AnimateOnScroll preset="fadeLeft" delay={0.1}>
        <ProjectsSection />
      </AnimateOnScroll>
      <Spotlight>
        <AnimateOnScroll preset="scaleUp" delay={0.05}>
          <SkillsSection />
        </AnimateOnScroll>
      </Spotlight>
      <ParallaxSection offset={30}>
        <AnimateOnScroll preset="fadeRight" delay={0.1}>
          <CertificationsSection />
        </AnimateOnScroll>
      </ParallaxSection>
      <Spotlight>
        <AnimateOnScroll preset="blur" delay={0.05}>
          <FAQSection />
        </AnimateOnScroll>
      </Spotlight>
      <AnimateOnScroll preset="fadeUp" delay={0.1}>
        <ContactSection />
      </AnimateOnScroll>
    </main>
  );
}
