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
      className="py-3xl px-md md:px-xl scroll-mt-[64px]"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="skills-heading"
          className="text-heading font-semibold text-text-primary mb-xl"
        >
          {t('heading')}
        </h2>
        <div className="flex flex-col gap-lg">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.key}>
              <h3 className="text-body font-semibold text-text-primary mb-sm">
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
