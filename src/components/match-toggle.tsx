'use client';

import {useState} from 'react';

export function MatchToggle() {
  const [active, setActive] = useState(false);

  function toggle() {
    const next = !active;
    setActive(next);
    document.body.classList.toggle('match-mode', next);
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={active}
      title={active ? 'Match-Modus deaktivieren' : 'Match-Modus aktivieren'}
      className={`min-h-[44px] flex items-center gap-xs px-sm py-xs rounded-full text-xs font-medium transition-all duration-200 ${
        active
          ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-400'
          : 'text-text-secondary hover:text-emerald-600 hover:bg-emerald-50'
      }`}
    >
      <span>Match</span>
      <span className={`transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-40'}`}>
        &#10003;
      </span>
    </button>
  );
}
