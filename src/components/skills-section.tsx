import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Tag} from '@/components/tag';


const SKILL_CATEGORIES = [
  {
    key: 'iam' as const,
    skills: ['SINA', 'RLS', 'JWT', 'RBAC', 'Auth Systems', 'API Design'],
  },
  {
    key: 'ba' as const,
    skills: ['Anforderungsanalyse', 'Use Cases', 'DSGVO', 'Prozessoptimierung', 'Dokumentation', 'Stakeholder Management'],
  },
  {
    key: 'devops' as const,
    skills: ['Docker', 'Linux', 'Self-Hosting', 'CI/CD', 'Cisco', 'LANCOM', 'VLAN', 'Git'],
  },
  {
    key: 'languages' as const,
    skills: ['TypeScript', 'JavaScript', 'Dart', 'Java', 'SQL', 'Next.js', 'React', 'Flutter', 'Node.js', 'Tailwind CSS'],
  },
] as const;

export async function SkillsSection() {
  const t = await getTranslations('Skills');

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-4xl px-md md:px-xl scroll-mt-[64px]"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="skills-heading"
          className="text-section font-bold text-text-primary mb-md tracking-tight inline-block"
        >
          {t('heading')}
          <span className="block h-1 w-16 bg-linear-to-r from-accent to-accent/40 rounded-full mt-sm" aria-hidden="true" />
        </h2>
        <p className="text-lg text-text-secondary mt-md leading-relaxed max-w-2xl">
          {t('intro')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-xl">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.key} className="rounded-2xl border border-border/50 bg-surface-raised p-lg shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-label font-semibold text-text-primary mb-xs uppercase tracking-wide">
                {t(`categories.${category.key}`)}
              </h3>
              <p className="text-sm text-text-tertiary mb-md leading-relaxed">
                {t(`categoryDescriptions.${category.key}`)}
              </p>
              <div className="flex flex-wrap gap-sm">
                {category.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
              <Link
                href={`/skills/${category.key}`}
                className="inline-flex items-center gap-xs text-label font-medium text-accent hover:text-accent-hover transition-colors duration-150 mt-md group-hover:gap-sm"
              >
                {t('detailLink')}
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
