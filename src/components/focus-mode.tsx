'use client';

import {useState} from 'react';
import {Eye, EyeOff} from 'lucide-react';

export function FocusMode() {
  const [active, setActive] = useState(false);

  function toggle() {
    const next = !active;
    setActive(next);
    document.body.classList.toggle('focus-mode', next);
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={active}
      title={active ? 'Alle Sektionen anzeigen' : 'Fokus-Modus'}
      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors duration-200"
    >
      {active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );
}
