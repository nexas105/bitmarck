import {setRequestLocale, getTranslations} from 'next-intl/server';
import NextLink from 'next/link';
import {Link as I18nLink} from '@/i18n/navigation';
import {ArrowLeft, Download, Briefcase, GraduationCap, Award, FolderOpen, Cpu, Heart} from 'lucide-react';
import {getAllProjects} from '@/data/projects';
import {CvScrollRail} from '@/components/cv-scroll-rail';

const STATION_KEYS = [
  'xecuro',
  'freelancer',
  'persona',
  'bhf',
  'bwi',
  'biermann',
  'mediacom',
  'telekom',
] as const;

const CERT_KEYS = [
  'sinaCore',
  'sinaBasics',
  'itil',
  'devops',
  'databases',
  'sapErp',
  'qualitaetssicherung',
  'softwaretechnik',
  'businessAnalyst',
  'linuxAdmin',
  'lancom',
  'ftth',
  'fitTrainer',
  'nutritionist',
] as const;

const EDU_KEYS = ['bsc', 'sde', 'itse'] as const;

const SKILL_CATEGORIES = ['iam', 'ba', 'devops', 'languages'] as const;

type Props = {
  params: Promise<{locale: string}>;
};

export default async function CvPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Career');
  const tCert = await getTranslations('CertificationDetail');
  const tCerts = await getTranslations('Certifications');
  const tSkills = await getTranslations('Skills');
  const tProjects = await getTranslations();
  const tHero = await getTranslations('Hero');

  const projects = getAllProjects();

  return (
    <main className="py-4xl px-md md:px-xl print:py-md print:px-sm">
      <CvScrollRail />
      <div className="mx-auto max-w-4xl xl:pr-[120px]">
        {/* Back link + Download */}
        <div className="flex items-center justify-between mb-2xl print:hidden">
          <I18nLink
            href="/#career"
            className="group inline-flex items-center gap-sm text-label font-medium text-accent hover:text-accent-hover transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
            {locale === 'de' ? 'Zurueck' : 'Back'}
          </I18nLink>
          <NextLink
            href="/api/pdf/cv"
            className="inline-flex items-center gap-sm px-lg py-sm rounded-full bg-accent text-white text-label font-medium hover:bg-accent-hover transition-colors duration-200"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {tHero('cta')}
          </NextLink>
        </div>

        {/* Header / Profile */}
        <header className="mb-3xl border-b border-border/40 pb-2xl">
          <h1 className="text-hero font-bold text-text-primary tracking-tight leading-tight">
            {tHero('name')}
          </h1>
          <p className="text-subhero text-accent font-medium mt-xs">
            {tHero('role')}
          </p>
          <p className="text-lg text-text-secondary mt-md leading-relaxed max-w-3xl">
            {tHero('valueProposition')}
          </p>
        </header>

        {/* Berufserfahrung */}
        <section id="cv-experience" className="mb-3xl scroll-mt-[88px]">
          <div className="flex items-center gap-sm mb-xl">
            <Briefcase className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="text-section font-bold text-text-primary tracking-tight">
              {locale === 'de' ? 'Berufserfahrung' : 'Professional Experience'}
            </h2>
          </div>
          <div className="flex flex-col gap-xl">
            {STATION_KEYS.map((key) => {
              const details = t.raw(`stations.${key}.details`) as string[];
              return (
                <article key={key} className="relative pl-lg border-l-2 border-accent/30">
                  <div className="flex flex-wrap items-baseline gap-sm mb-xs">
                    <span className="text-label font-medium text-accent">
                      {t(`stations.${key}.period`)}
                    </span>
                    <span className="text-text-tertiary">&middot;</span>
                    <span className="text-label font-medium text-text-secondary">
                      {t(`stations.${key}.company`)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary tracking-tight">
                    {t(`stations.${key}.role`)}
                  </h3>
                  <p className="text-body text-text-secondary mt-sm leading-relaxed">
                    {t(`stations.${key}.body`)}
                  </p>
                  {details.length > 0 && (
                    <ul className="mt-sm flex flex-col gap-xs">
                      {details.map((detail, i) => (
                        <li key={i} className="text-label text-text-secondary flex items-start gap-sm leading-relaxed">
                          <span className="mt-[7px] h-1 w-1 rounded-full bg-accent/40 shrink-0" aria-hidden="true" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-xs mt-sm">
                    {t(`stations.${key}.technologies`).split(', ').map((tech) => (
                      <span key={tech} className="text-xs bg-accent/8 text-accent font-medium rounded-full px-2 py-0.5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Ausbildung */}
        <section id="cv-education" className="mb-3xl scroll-mt-[88px]">
          <div className="flex items-center gap-sm mb-xl">
            <GraduationCap className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="text-section font-bold text-text-primary tracking-tight">
              {locale === 'de' ? 'Ausbildung' : 'Education'}
            </h2>
          </div>
          <div className="flex flex-col gap-lg">
            {EDU_KEYS.map((key) => (
              <div key={key} className="pl-lg border-l-2 border-accent/30">
                <div className="flex flex-wrap items-baseline gap-sm mb-xs">
                  <span className="text-label font-medium text-accent">
                    {tCerts(`education.${key}.period`)}
                  </span>
                  <span className="text-text-tertiary">&middot;</span>
                  <span className="text-label font-medium text-text-secondary">
                    {tCerts(`education.${key}.institution`)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {tCerts(`education.${key}.degree`)}
                </h3>
                <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                  tCerts(`education.${key}.status`) === 'laufend' || tCerts(`education.${key}.status`) === 'in progress'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {tCerts(`education.${key}.status`)}
                </span>
                <p className="text-body text-text-secondary mt-sm leading-relaxed">
                  {tCert(`education.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Zertifikate */}
        <section id="cv-certifications" className="mb-3xl scroll-mt-[88px]">
          <div className="flex items-center gap-sm mb-xl">
            <Award className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="text-section font-bold text-text-primary tracking-tight">
              {locale === 'de' ? 'Zertifikate' : 'Certifications'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {CERT_KEYS.map((key) => (
              <div key={key} className="rounded-xl border border-border/40 bg-surface-raised p-md">
                <h3 className="text-body font-semibold text-text-primary">
                  {tCert(`certs.${key}.name`)}
                </h3>
                <p className="text-xs text-text-tertiary mt-xs">
                  {tCert(`certs.${key}.provider`)}
                </p>
                <span className={`inline-block text-xs font-medium rounded-full px-2 py-0.5 mt-xs ${
                  tCert(`certs.${key}.status`) === 'laufend' || tCert(`certs.${key}.status`) === 'in progress'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {tCert(`certs.${key}.status`)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Projekte */}
        <section id="cv-projects" className="mb-3xl scroll-mt-[88px]">
          <div className="flex items-center gap-sm mb-xl">
            <FolderOpen className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="text-section font-bold text-text-primary tracking-tight">
              {locale === 'de' ? 'Projekte' : 'Projects'}
            </h2>
          </div>
          <div className="flex flex-col gap-lg">
            {projects.map((project) => (
              <div key={project.slug} className="pl-lg border-l-2 border-accent/30">
                <h3 className="text-lg font-semibold text-text-primary">
                  {tProjects(project.titleKey)}
                </h3>
                <p className="text-body text-text-secondary mt-xs leading-relaxed">
                  {tProjects(project.descriptionKey)}
                </p>
                <div className="flex flex-wrap gap-xs mt-sm">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs bg-accent/8 text-accent font-medium rounded-full px-2 py-0.5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="cv-skills" className="mb-3xl scroll-mt-[88px]">
          <div className="flex items-center gap-sm mb-xl">
            <Cpu className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="text-section font-bold text-text-primary tracking-tight">
              {locale === 'de' ? 'Skills' : 'Skills'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat}>
                <h3 className="text-body font-semibold text-text-primary mb-sm">
                  {tSkills(`categories.${cat}`)}
                </h3>
                <p className="text-label text-text-secondary leading-relaxed">
                  {tSkills(`categoryDescriptions.${cat}`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ehrenamt */}
        <section id="cv-volunteering" className="mb-3xl scroll-mt-[88px]">
          <div className="flex items-center gap-sm mb-xl">
            <Heart className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="text-section font-bold text-text-primary tracking-tight">
              {locale === 'de' ? 'Ehrenamt' : 'Volunteer Work'}
            </h2>
          </div>
          <div className="pl-lg border-l-2 border-accent/30">
            <h3 className="text-lg font-semibold text-text-primary">
              {tProjects('ProjectData.dbfv.title')}
            </h3>
            <p className="text-body text-text-secondary mt-xs leading-relaxed">
              {tProjects('ProjectData.dbfv.description')}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
