import {getTranslations} from 'next-intl/server'
import {CareerStationCard} from '@/components/career-station-card'

const STATION_KEYS = [
  'telekom',
  'mediacom',
  'biermann',
  'bwi',
  'persona',
  'bhf',
  'xecuro',
  'bitmarck',
] as const

export async function CareerTimeline() {
  const t = await getTranslations('Career')

  const expandLabel = t('expandLabel')
  const collapseLabel = t('collapseLabel')

  return (
    <div className="relative pl-xl">
      {/* Vertical accent gradient line */}
      <div
        className="absolute left-[3px] top-[4px] bottom-[4px] w-[2px] bg-linear-to-b from-accent via-accent/50 to-accent/10 rounded-full"
        aria-hidden="true"
      />

      <ol className="relative flex flex-col gap-lg">
        {STATION_KEYS.map((key, index) => {
          const detailKeys = t.raw(`stations.${key}.details`) as string[]

          return (
            <CareerStationCard
              key={key}
              stationKey={key}
              period={t(`stations.${key}.period`)}
              company={t(`stations.${key}.company`)}
              role={t(`stations.${key}.role`)}
              body={t(`stations.${key}.body`)}
              narrative={t(`stations.${key}.narrative`)}
              technologies={t(`stations.${key}.technologies`)}
              details={detailKeys}
              expandLabel={expandLabel}
              collapseLabel={collapseLabel}
              isLast={index === STATION_KEYS.length - 1}
              index={index}
            />
          )
        })}
      </ol>
    </div>
  )
}
