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
    <main>
      <HeroSection />
      {/* Gradient divider: hero → why-bitmarck */}
      <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <AnimateOnScroll preset="fadeUp">
        <WhyBitmarckSection />
      </AnimateOnScroll>
      {/* Gradient divider: why-bitmarck → career */}
      <div className="h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" aria-hidden="true" />
      <AnimateOnScroll preset="fadeUp">
        <CareerSection />
      </AnimateOnScroll>
      <div className="h-px bg-linear-to-r from-transparent via-accent/15 to-transparent" aria-hidden="true" />
      <AnimateOnScroll preset="fadeLeft" delay={0.1}>
        <ProjectsSection />
      </AnimateOnScroll>
      <div className="h-px bg-linear-to-r from-transparent via-accent/15 to-transparent" aria-hidden="true" />
      <AnimateOnScroll preset="scaleUp" delay={0.05}>
        <SkillsSection />
      </AnimateOnScroll>
      <div className="h-px bg-linear-to-r from-transparent via-accent/15 to-transparent" aria-hidden="true" />
      <AnimateOnScroll preset="fadeRight" delay={0.1}>
        <CertificationsSection />
      </AnimateOnScroll>
      <div className="h-px bg-linear-to-r from-transparent via-accent/15 to-transparent" aria-hidden="true" />
      <AnimateOnScroll preset="blur" delay={0.05}>
        <FAQSection />
      </AnimateOnScroll>
      <div className="h-px bg-linear-to-r from-transparent via-accent/15 to-transparent" aria-hidden="true" />
      <AnimateOnScroll preset="fadeUp" delay={0.1}>
        <ContactSection />
      </AnimateOnScroll>
    </main>
  );
}
