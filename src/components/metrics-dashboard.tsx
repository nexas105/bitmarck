import {getTranslations} from 'next-intl/server';
import {MetricCard} from '@/components/metric-card';

export async function MetricsDashboard() {
  const t = await getTranslations('Metrics');

  const metrics = [
    {
      value: t('experience'),
      label: t('experienceLabel'),
      context: t('experienceContext'),
      proof: [
        'Deutsche Telekom (2014-2016)',
        'Media.com (2016-2018)',
        'Biermann (2018-2021)',
        'BWI GmbH (2021-2023)',
        'BHF Group (2023-2024)',
        'Xecuro (2025-heute)',
      ],
    },
    {
      value: t('projects'),
      label: t('projectsLabel'),
      context: t('projectsContext'),
      proof: [
        'Auth API Service — IAM mit JWT/RBAC',
        'Next CMS — Mandantenfähiges CMS',
        'MyFitCoach PRO — Multi-Platform',
        'Partner App — Privacy-by-Design',
        'Logbuch App — Feldanforderungen',
        'MPA Nutrition Shop — E-Commerce E2E',
        'DBFV Wettkampfsoftware — Ehrenamt',
      ],
    },
    {
      value: t('certificates'),
      label: t('certificatesLabel'),
      context: t('certificatesContext'),
      proof: [
        'ITIL Foundation',
        'SINA CORE',
        'SINA BASICS',
        'DevOps Fundamentals',
        'Linux System Admin',
        'Datenbanken',
        'LANCOM',
        'FTTH Glasfaser',
        'SAP ERP Grundkurs',
        'Business Analyst (laufend)',
      ],
    },
    {
      value: t('degree'),
      label: t('degreeLabel'),
      context: t('degreeContext'),
      proof: [
        'FernUniversität Hagen, seit Okt 2024',
        'Software Developer Expert (IU, 2023-2024)',
        'IT-Systemelektroniker (Telekom, 2011-2014)',
      ],
    },
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
          proof={metric.proof}
        />
      ))}
    </div>
  );
}
