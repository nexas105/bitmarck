'use client';

import {useState, useEffect} from 'react';
import {motion} from 'motion/react';
import {useTranslations} from 'next-intl';

const CATEGORIES = [
  {key: 'iam', value: 85},
  {key: 'ba', value: 80},
  {key: 'devops', value: 75},
  {key: 'dev', value: 70},
] as const;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function getRadarPoints(cx: number, cy: number, maxR: number, values: number[]) {
  const step = 360 / values.length;
  return values.map((v, i) => {
    const r = (v / 100) * maxR;
    return polarToCartesian(cx, cy, r, step * i);
  });
}

export function SkillRadar() {
  const t = useTranslations('Interactive.skillRadar');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const cx = 150;
  const cy = 150;
  const maxR = 110;
  const size = 300;
  const step = 360 / CATEGORIES.length;

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1];

  // Radar shape points
  const values = CATEGORIES.map((c) => c.value);
  const points = getRadarPoints(cx, cy, maxR, values);
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center gap-md">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px]">
        {/* Grid rings */}
        {rings.map((scale) => {
          const r = maxR * scale;
          const ringPoints = CATEGORIES.map((_, i) =>
            polarToCartesian(cx, cy, r, step * i)
          );
          const ringPath = ringPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
          return (
            <path
              key={scale}
              d={ringPath}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth={0.5}
              opacity={0.6}
            />
          );
        })}

        {/* Axis lines */}
        {CATEGORIES.map((_, i) => {
          const end = polarToCartesian(cx, cy, maxR, step * i);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={end.x}
              y2={end.y}
              stroke="var(--color-border)"
              strokeWidth={0.5}
              opacity={0.4}
            />
          );
        })}

        {/* Radar shape */}
        <motion.path
          d={pathData}
          fill="rgba(37, 99, 235, 0.12)"
          stroke="var(--color-accent)"
          strokeWidth={2}
          strokeLinejoin="round"
          initial={{pathLength: 0, opacity: 0}}
          animate={animate ? {pathLength: 1, opacity: 1} : {}}
          transition={{duration: 1.2, ease: [0.16, 1, 0.3, 1]}}
        />

        {/* Data points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="var(--color-accent)"
            stroke="white"
            strokeWidth={2}
            initial={{scale: 0, opacity: 0}}
            animate={animate ? {scale: 1, opacity: 1} : {}}
            transition={{duration: 0.4, delay: 0.8 + i * 0.1}}
          />
        ))}

        {/* Labels */}
        {CATEGORIES.map((cat, i) => {
          const labelR = maxR + 20;
          const pos = polarToCartesian(cx, cy, labelR, step * i);
          return (
            <text
              key={cat.key}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-text-secondary"
              fontSize={11}
              fontWeight={500}
            >
              {t(`categories.${cat.key}`)}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-md">
        {CATEGORIES.map((cat) => (
          <div key={cat.key} className="flex items-center gap-xs">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-xs text-text-secondary">
              {t(`categories.${cat.key}`)} {cat.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
