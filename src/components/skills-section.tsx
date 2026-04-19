import {getTranslations} from 'next-intl/server';
import {Tag} from '@/components/tag';

const SKILL_CATEGORIES = [
  {
    key: 'iam' as const,
    skills: ['OAuth2', 'JWT', 'RBAC', 'SAML', 'LDAP', 'PKI', 'SINA', 'Zero Trust'],
  },
  {
    key: 'ba' as const,
    skills: ['Anforderungsanalyse', 'Use Cases', 'User Stories', 'BPMN', 'Stakeholder Management', 'Fachkonzepte'],
  },
  {
    key: 'devops' as const,
    skills: ['Docker', 'Linux', 'Traefik', 'Prometheus', 'Grafana', 'CI/CD', 'Nginx', 'Git'],
  },
  {
    key: 'languages' as const,
    skills: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Bash', 'Next.js', 'React', 'Tailwind CSS'],
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
