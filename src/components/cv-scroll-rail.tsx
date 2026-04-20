'use client';

import {useEffect, useState} from 'react';
import {useLocale} from 'next-intl';

const CV_SECTIONS = [
  {id: 'cv-experience', labelDe: 'Erfahrung', labelEn: 'Experience'},
  {id: 'cv-education', labelDe: 'Ausbildung', labelEn: 'Education'},
  {id: 'cv-certifications', labelDe: 'Zertifikate', labelEn: 'Certifications'},
  {id: 'cv-projects', labelDe: 'Projekte', labelEn: 'Projects'},
  {id: 'cv-skills', labelDe: 'Skills', labelEn: 'Skills'},
  {id: 'cv-volunteering', labelDe: 'Ehrenamt', labelEn: 'Volunteer'},
] as const;
type CvSectionId = (typeof CV_SECTIONS)[number]['id'];

export function CvScrollRail() {
  const locale = useLocale();
  const [activeId, setActiveId] = useState<string>(CV_SECTIONS[0].id);

  useEffect(() => {
    const tracked = CV_SECTIONS
      .map((section) => ({
        id: section.id,
        el: document.getElementById(section.id),
      }))
      .filter((entry): entry is {id: CvSectionId; el: HTMLElement} => entry.el !== null);

    if (tracked.length === 0) {
      return;
    }

    const updateActive = () => {
      const activationLine = 120;
      let current = tracked[0].id;

      for (const section of tracked) {
        const top = section.el.getBoundingClientRect().top;
        if (top <= activationLine) {
          current = section.id;
        } else {
          break;
        }
      }

      setActiveId(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, {passive: true});
    window.addEventListener('resize', updateActive);

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  return (
    <aside className="fixed right-md top-1/2 z-40 hidden -translate-y-1/2 xl:flex flex-col items-end gap-sm print:hidden">
      <div className="rounded-2xl border border-border/50 bg-surface-raised/92 backdrop-blur-sm p-sm shadow-card">
        <div className="flex flex-col gap-xs">
          {CV_SECTIONS.map((section) => {
            const isActive = section.id === activeId;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  const el = document.getElementById(section.id);
                  if (el) {
                    el.scrollIntoView({behavior: 'smooth'});
                  }
                }}
                className={`min-h-[36px] rounded-lg px-sm text-left text-xs font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-secondary hover:bg-surface-subtle hover:text-text-primary'
                }`}
              >
                {locale === 'de' ? section.labelDe : section.labelEn}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
