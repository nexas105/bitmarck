import {getTranslations} from 'next-intl/server';

const STATION_KEYS = ['telekom', 'netzwerk', 'bwi', 'bhf', 'xecuro', 'bitmarck'] as const;

export async function CareerTimeline() {
  const t = await getTranslations('Career');

  return (
    <div className="relative pl-lg">
      {/* Vertical line */}
      <div className="absolute left-[3px] top-[4px] bottom-[4px] w-px bg-border" aria-hidden="true" />

      <ol className="relative flex flex-col gap-lg">
        {STATION_KEYS.map((key) => (
          <li key={key} className="relative pl-lg">
            {/* Timeline dot */}
            <div
              className="absolute -left-lg top-[6px] h-2 w-2 rounded-full border border-border bg-surface-raised"
              aria-hidden="true"
            />
            {/* Station content */}
            <p className="text-label text-text-secondary">
              {t(`stations.${key}.period`)} &middot; {t(`stations.${key}.company`)}
            </p>
            <h3 className="text-body font-semibold text-text-primary mt-xs">
              {t(`stations.${key}.role`)}
            </h3>
            <p className="text-body text-text-secondary mt-xs leading-relaxed">
              {t(`stations.${key}.body`)}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
