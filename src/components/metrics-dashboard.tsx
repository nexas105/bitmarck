import {getTranslations} from 'next-intl/server';

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
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-lg text-center"
        >
          <p className="text-heading font-semibold text-white">
            {metric.value}
          </p>
          <p className="text-label text-white/60 mt-xs">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}
