'use client';

import {useState} from 'react';
import {Briefcase, BriefcaseIcon} from 'lucide-react';

export function FocusMode() {
  const [active, setActive] = useState(false);

  function toggle() {
    const next = !active;
    setActive(next);
    document.body.classList.toggle('recruiter-mode', next);
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={active}
      title={active ? 'Alle Sektionen anzeigen' : 'Recruiter-Modus: Kompakt + Match-Highlighting'}
      className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full transition-colors duration-200 ${
        active
          ? 'text-accent bg-accent/10'
          : 'text-text-secondary hover:text-accent hover:bg-accent/10'
      }`}
    >
      {active ? <BriefcaseIcon className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
    </button>
  );
}
