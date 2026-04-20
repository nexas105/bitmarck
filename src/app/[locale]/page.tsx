import {setRequestLocale} from 'next-intl/server';
import {HeroSection} from '@/components/hero-section';
import {WhyBitmarckSection} from '@/components/why-bitmarck-section';
import {CareerSection} from '@/components/career-section';
import {ProjectsSection} from '@/components/projects-section';
import {SkillsSection} from '@/components/skills-section';
import {CertificationsSection} from '@/components/certifications-section';
import {FAQSection} from '@/components/faq-section';
import {ContactSection} from '@/components/contact-section';
import {AnimateOnScroll} from '@/components/animate-on-scroll';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-linear-to-b from-surface via-surface via-40% to-primary-900">
      <HeroSection />
      <AnimateOnScroll preset="fadeUp">
        <WhyBitmarckSection />
      </AnimateOnScroll>
      <AnimateOnScroll preset="fadeUp">
        <CareerSection />
      </AnimateOnScroll>
      <AnimateOnScroll preset="fadeLeft" delay={0.1}>
        <ProjectsSection />
      </AnimateOnScroll>
      <AnimateOnScroll preset="scaleUp" delay={0.05}>
        <SkillsSection />
      </AnimateOnScroll>
      <AnimateOnScroll preset="fadeRight" delay={0.1}>
        <CertificationsSection />
      </AnimateOnScroll>
      <AnimateOnScroll preset="blur" delay={0.05}>
        <FAQSection />
      </AnimateOnScroll>
      <AnimateOnScroll preset="fadeUp" delay={0.1}>
        <ContactSection />
      </AnimateOnScroll>
    </main>
  );
}
