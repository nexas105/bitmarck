import {getTranslations} from 'next-intl/server';
import {MetricCard} from '@/components/metric-card';

export async function MetricsDashboard() {
  const t = await getTranslations('Metrics');

  const metrics = [
    {value: t('experience'), label: t('experienceLabel'), context: t('experienceContext')},
    {value: t('projects'), label: t('projectsLabel'), context: t('projectsContext')},
    {value: t('certificates'), label: t('certificatesLabel'), context: t('certificatesContext')},
    {value: t('degree'), label: t('degreeLabel'), context: t('degreeContext')},
  ];

  return (
    <div className="grid grid-cols-2 gap-md">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.label}
          value={metric.value}
          label={metric.label}
          context={metric.context}
          index={index}
        />
      ))}
    </div>
  );
}
