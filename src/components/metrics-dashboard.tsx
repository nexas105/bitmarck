import {getTranslations} from 'next-intl/server';
import {MetricCard} from '@/components/metric-card';

export async function MetricsDashboard() {
  const t = await getTranslations('Metrics');

  const metrics = [
    {value: t('experience'), label: t('experienceLabel')},
    {value: t('projects'), label: t('projectsLabel')},
    {value: t('certificates'), label: t('certificatesLabel')},
    {value: t('degree'), label: t('degreeLabel')},
  ];

  return (
    <div className="grid grid-cols-2 gap-md">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.label}
          value={metric.value}
          label={metric.label}
          index={index}
        />
      ))}
    </div>
  );
}
