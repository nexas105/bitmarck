import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Tag} from '@/components/tag';
import {SectionHeader} from '@/components/section-header';
import {Shield, BarChart3, Server, Code} from 'lucide-react';


const CATEGORY_STYLES = {
  iam: {
    icon: Shield,
    gradient: 'from-blue-500 to-cyan-400',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  ba: {
    icon: BarChart3,
    gradient: 'from-emerald-500 to-teal-400',
    iconBg: 'bg-emerald-100 text-emerald-600',
  },
  devops: {
    icon: Server,
    gradient: 'from-purple-500 to-indigo-400',
    iconBg: 'bg-purple-100 text-purple-600',
  },
  languages: {
    icon: Code,
    gradient: 'from-orange-500 to-amber-400',
    iconBg: 'bg-orange-100 text-orange-600',
  },
} as const;

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
      className="py-4xl px-md md:px-xl scroll-mt-[64px] bg-surface"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeader number="03" eyebrow="KOMPETENZEN" heading={t('heading')} id="skills-heading">
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            {t('intro')}
          </p>
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-xl">
          {SKILL_CATEGORIES.map((category) => {
            const style = CATEGORY_STYLES[category.key];
            const Icon = style.icon;

            return (
              <div
                key={category.key}
                className="group rounded-2xl border border-border/50 bg-surface-raised shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Color accent top bar */}
                <div className={`h-1.5 bg-linear-to-r ${style.gradient}`} />

                <div className="p-lg">
                  {/* Icon + Title */}
                  <div className="flex items-start gap-md mb-md">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${style.iconBg}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-body font-bold text-text-primary tracking-tight">
                        {t(`categories.${category.key}`)}
                      </h3>
                      <p className="text-xs text-text-tertiary mt-xs leading-relaxed">
                        {t(`categoryDescriptions.${category.key}`)}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-sm">
                    {category.skills.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </div>

                  {/* Detail link */}
                  <Link
                    href={`/skills/${category.key}`}
                    className="inline-flex items-center gap-xs text-label font-medium text-accent hover:text-accent-hover transition-colors duration-150 mt-md"
                  >
                    {t('detailLink')}
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
