'use client';

import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {useTranslations} from 'next-intl';
import {useRouter} from '@/i18n/navigation';
import {Search, X, ArrowRight, Command} from 'lucide-react';

type PaletteEntry = {
  key: string;
  action: 'scroll' | 'navigate';
  target: string;
};

const ENTRIES: PaletteEntry[] = [
  {key: 'iam', action: 'scroll', target: 'skills'},
  {key: 'sina', action: 'scroll', target: 'career'},
  {key: 'anforderungsanalyse', action: 'scroll', target: 'skills'},
  {key: 'projekte', action: 'scroll', target: 'projects'},
  {key: 'verfuegbar', action: 'scroll', target: 'faq'},
  {key: 'standort', action: 'scroll', target: 'faq'},
  {key: 'kontakt', action: 'scroll', target: 'contact'},
  {key: 'cv', action: 'navigate', target: '/cv'},
  {key: 'erfahrung', action: 'scroll', target: 'career'},
  {key: 'zertifikate', action: 'scroll', target: 'certifications'},
];

export function CommandPalette() {
  const t = useTranslations('CommandPalette');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return ENTRIES;
    const q = query.toLowerCase();
    return ENTRIES.filter((e) => {
      const keyword = t(`items.${e.key}.keyword`).toLowerCase();
      const desc = t(`items.${e.key}.description`).toLowerCase();
      return keyword.includes(q) || desc.includes(q);
    });
  }, [query, t]);

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filtered.length]);

  // Keyboard shortcut to open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      // Small delay to ensure the modal is rendered
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  const executeEntry = useCallback(
    (entry: PaletteEntry) => {
      setOpen(false);
      if (entry.action === 'navigate') {
        router.push(entry.target as '/cv');
      } else {
        const el = document.getElementById(entry.target);
        if (el) {
          el.scrollIntoView({behavior: 'smooth'});
        }
      }
    },
    [router]
  );

  // Handle keyboard navigation inside the palette
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          executeEntry(filtered[selectedIndex]);
        }
      }
    },
    [filtered, selectedIndex, executeEntry]
  );

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-[101] flex items-start justify-center pt-[20vh]"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            >
              <motion.div
                className="w-full max-w-lg mx-md bg-surface-raised rounded-xl border border-accent/20 shadow-2xl overflow-hidden"
                initial={{scale: 0.95, y: -10}}
                animate={{scale: 1, y: 0}}
                exit={{scale: 0.95, y: -10}}
                transition={{duration: 0.15}}
                onKeyDown={handleKeyDown}
              >
                {/* Search input */}
                <div className="flex items-center gap-sm px-md border-b border-border">
                  <Search className="h-4 w-4 text-text-tertiary shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('placeholder')}
                    className="flex-1 py-md text-body bg-transparent outline-none text-text-primary placeholder:text-text-tertiary"
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 rounded-md hover:bg-surface-subtle transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4 text-text-tertiary" />
                  </button>
                </div>

                {/* Results list */}
                <div className="max-h-[50vh] overflow-y-auto py-sm">
                  {filtered.length === 0 ? (
                    <p className="px-md py-lg text-body text-text-tertiary text-center">
                      {t('noResults')}
                    </p>
                  ) : (
                    filtered.map((entry, i) => (
                      <button
                        key={entry.key}
                        onClick={() => executeEntry(entry)}
                        className={`w-full flex items-center gap-md px-md py-sm text-left transition-colors duration-100 ${
                          i === selectedIndex
                            ? 'bg-accent/10 text-accent'
                            : 'text-text-primary hover:bg-surface-subtle'
                        }`}
                      >
                        <span className="text-label font-semibold min-w-[120px]">
                          {t(`items.${entry.key}.keyword`)}
                        </span>
                        <span className="flex-1 text-label text-text-secondary truncate">
                          {t(`items.${entry.key}.description`)}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-text-tertiary" />
                      </button>
                    ))
                  )}
                </div>

                {/* Footer hint */}
                <div className="flex items-center gap-lg px-md py-sm border-t border-border text-xs text-text-tertiary">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-surface-subtle border border-border text-[10px] font-mono">
                      &uarr;&darr;
                    </kbd>
                    {t('hintNavigate')}
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-surface-subtle border border-border text-[10px] font-mono">
                      &crarr;
                    </kbd>
                    {t('hintSelect')}
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-surface-subtle border border-border text-[10px] font-mono">
                      esc
                    </kbd>
                    {t('hintClose')}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Small hint button for the sticky header.
 * Dispatches Cmd+K programmatically to open the palette.
 */
export function CommandPaletteHint() {
  return (
    <button
      onClick={() => {
        window.dispatchEvent(
          new KeyboardEvent('keydown', {key: 'k', metaKey: true, bubbles: true})
        );
      }}
      className="hidden md:inline-flex items-center gap-1 px-sm py-1 rounded-lg border border-border bg-surface-subtle text-xs text-text-tertiary hover:text-text-secondary hover:border-accent/30 transition-colors duration-200"
      aria-label="Open command palette (Cmd+K)"
    >
      <Command className="h-3 w-3" />
      <span className="font-mono">K</span>
    </button>
  );
}
