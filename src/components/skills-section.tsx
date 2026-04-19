import {getTranslations} from 'next-intl/server';
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-xl">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.key} className="rounded-2xl border border-border/50 bg-surface-raised p-lg shadow-card">
              <h3 className="text-label font-semibold text-text-primary mb-md uppercase tracking-wide">
                {t(`categories.${category.key}`)}
              </h3>
              <div className="flex flex-wrap gap-sm">
                {category.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
