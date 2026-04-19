'use client';

import {useState, useRef, useEffect, useCallback} from 'react';
import {useTranslations} from 'next-intl';
import {FileText, FileJson, FileCode, ChevronDown, Mail} from 'lucide-react';
import {createPortal} from 'react-dom';

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
        className="inline-flex items-center gap-xs rounded-lg bg-white text-primary-900 px-lg py-sm text-label font-semibold hover:bg-white/90 transition-colors duration-150"
      >
        <FileText className="h-4 w-4" />
        {t('cta')}
        <ChevronDown className={`h-4 w-4 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div
          ref={dropRef}
          className="fixed w-64 rounded-lg border border-white/20 bg-[#1e293b] shadow-2xl backdrop-blur-sm overflow-hidden"
          style={{top: pos.top, left: pos.left, zIndex: 9999}}
        >
          {CV_FORMATS.map(({key, href, icon: Icon}) => (
            <a
              key={key}
              href={href}
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-sm px-md py-sm text-label text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-150"
            >
              <Icon className="h-4 w-4 shrink-0" />
              <div>
                <div className="font-semibold">{t(`cvFormat.${key}.label`)}</div>
                <div className="text-[12px] text-white/50">{t(`cvFormat.${key}.desc`)}</div>
              </div>
            </a>
          ))}
        </div>,
        document.body
      )}

      <a
        href="/api/pdf/cover-letter"
        download
        className="inline-flex items-center gap-xs rounded-lg border border-white/30 px-lg py-sm text-label font-semibold text-white hover:bg-white/10 transition-colors duration-150"
      >
        <Mail className="h-4 w-4" />
        {t('ctaCoverLetter')}
      </a>
    </div>
  );
}
