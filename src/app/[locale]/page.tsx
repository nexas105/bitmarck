import {setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import {HeroSection} from '@/components/hero-section';
import {WhyBitmarckSection} from '@/components/why-bitmarck-section';
import {JobMatchSection} from '@/components/job-match-section';
import {CareerSection} from '@/components/career-section';
import {ProjectsSection} from '@/components/projects-section';
import {SkillsSection} from '@/components/skills-section';
import {CertificationsSection} from '@/components/certifications-section';
import {FAQSection} from '@/components/faq-section';
import {ContactSection} from '@/components/contact-section';
import {AnimateOnScroll} from '@/components/animate-on-scroll';
import {hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const isDe = locale === 'de';

  return {
    title: isDe
      ? 'Business Analyst IAM Bewerbung bei Bitmarck'
      : 'Business Analyst IAM Application for Bitmarck',
    description: isDe
      ? 'Kompakte Bewerbungs-Landingpage mit Karriereweg, Projektbelegen, Skills und Kontakt für die Position Business Analyst IAM.'
      : 'Focused application landing page with career track, project proof, skills, and contact for the Business Analyst IAM role.',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: '/de',
        en: '/en',
        'x-default': '/de',
      },
    },
  };
}

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const schemaLocale = locale === 'en' ? 'en' : 'de';

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tobias Ludwig',
    jobTitle: 'Business Analyst IAM',
    url: `https://bitmarck-bewerbung.tjl-it.de/${schemaLocale}`,
    image: 'https://bitmarck-bewerbung.tjl-it.de/tobias-ludwig.jpg',
    sameAs: ['https://github.com/nexas105', 'https://www.tobiasjonas-ludwig.de'],
    knowsAbout: ['IAM', 'Requirements Analysis', 'SINA', 'Business Analysis', 'Software Engineering'],
    worksFor: {
      '@type': 'Organization',
      name: 'Xecuro GmbH',
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bitmarck Bewerbung — Tobias Ludwig',
    url: `https://bitmarck-bewerbung.tjl-it.de/${schemaLocale}`,
    inLanguage: schemaLocale,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(personJsonLd)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(websiteJsonLd)}}
      />
      {/* Dark: Hero + WhyBitmarck */}
      <HeroSection />
      <AnimateOnScroll preset="fadeUp">
        <WhyBitmarckSection />
      </AnimateOnScroll>
      <AnimateOnScroll preset="fadeUp" delay={0.05}>
        <JobMatchSection />
      </AnimateOnScroll>

      {/* Light sections with subtle stepping */}
      <AnimateOnScroll preset="fadeUp">
        <CareerSection />
      </AnimateOnScroll>
      <AnimateOnScroll preset="fadeLeft" delay={0.1}>
        <ProjectsSection />
      </AnimateOnScroll>
      <AnimateOnScroll preset="scaleUp" delay={0.05}>
        <SkillsSection />
      </AnimateOnScroll>

      {/* Slightly darker stepping toward footer */}
      <AnimateOnScroll preset="fadeRight" delay={0.1}>
        <CertificationsSection />
      </AnimateOnScroll>
      <AnimateOnScroll preset="blur" delay={0.05}>
        <FAQSection />
      </AnimateOnScroll>

      {/* Dark: Contact (no wrapper — flush with footer) */}
      <ContactSection />
    </main>
  );
}
