'use client';

import {useState, useRef, useEffect, useCallback} from 'react';
import {useTranslations} from 'next-intl';
import {FileText, FileJson, FileCode, ChevronDown, Mail, Eye, Sparkles} from 'lucide-react';
import {createPortal} from 'react-dom';
import {Link} from '@/i18n/navigation';

const CV_FORMATS = [
  {key: 'pdf', href: '/api/pdf/cv', icon: FileText},
  {key: 'json', href: '/api/cv/json', icon: FileJson},
  {key: 'llm', href: '/api/cv/llm', icon: FileCode},
] as const;

export function CvDownload() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({top: 0, left: 0});
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Hero');

  const updatePos = useCallback(() => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({top: rect.bottom + 4, left: rect.left});
    }
  }, []);

  useEffect(() => {
    if (open) updatePos();
  }, [open, updatePos]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        btnRef.current && !btnRef.current.contains(e.target as Node) &&
        dropRef.current && !dropRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleScroll() {
      if (open) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [open]);

  return (
    <div className="flex flex-wrap gap-sm">
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-sm rounded-xl bg-white text-primary-900 px-xl py-sm text-label font-bold hover:bg-white/90 hover:shadow-glow transition-all duration-200 shadow-elevated"
      >
        <FileText className="h-4 w-4" />
        {t('cta')}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div
          ref={dropRef}
          className="fixed w-72 rounded-2xl border border-white/10 bg-primary-800/95 shadow-elevated backdrop-blur-xl overflow-hidden"
          style={{top: pos.top + 4, left: pos.left, zIndex: 9999}}
        >
          {CV_FORMATS.map(({key, href, icon: Icon}) => (
            <a
              key={key}
              href={href}
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-md px-lg py-md text-label text-white/80 hover:bg-white/8 hover:text-white transition-colors duration-200 first:pt-lg last:pb-lg"
            >
              <div className="p-sm rounded-lg bg-white/10 shrink-0">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold">{t(`cvFormat.${key}.label`)}</div>
                <div className="text-xs text-white/40 mt-px">{t(`cvFormat.${key}.desc`)}</div>
              </div>
            </a>
          ))}
        </div>,
        document.body
      )}

      <Link
        href="/cv"
        className="inline-flex items-center gap-sm rounded-xl border border-white/20 px-xl py-sm text-label font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-all duration-200"
      >
        <Eye className="h-4 w-4" />
        CV ansehen
      </Link>

      <a
        href="/api/pdf/cover-letter"
        download
        className="inline-flex items-center gap-sm rounded-xl border border-white/20 px-xl py-sm text-label font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-all duration-200"
      >
        <Mail className="h-4 w-4" />
        {t('ctaCoverLetter')}
      </a>

      <Link
        href="/interaktiv"
        className="group relative inline-flex items-center gap-sm rounded-xl bg-accent px-xl py-sm text-label font-bold text-white hover:bg-accent-hover transition-all duration-200 shadow-elevated"
      >
        <span className="absolute inset-0 rounded-xl animate-pulse ring-2 ring-accent/50 ring-offset-0" aria-hidden="true" />
        <Sparkles className="h-4 w-4" />
        Interaktiv entdecken
      </Link>
    </div>
  );
}
