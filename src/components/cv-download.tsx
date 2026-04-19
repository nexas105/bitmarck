'use client';

import {useState, useRef, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {FileText, FileJson, FileCode, ChevronDown, Mail} from 'lucide-react';

const CV_FORMATS = [
  {key: 'pdf', href: '/api/pdf/cv', icon: FileText},
  {key: 'json', href: '/api/cv/json', icon: FileJson},
  {key: 'llm', href: '/api/cv/llm', icon: FileCode},
] as const;

export function CvDownload() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations('Hero');

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="flex flex-wrap gap-sm">
      {/* CV Download with format dropdown */}
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-xs rounded-lg bg-white text-primary-900 px-lg py-sm text-label font-semibold hover:bg-white/90 transition-colors duration-150"
        >
          <FileText className="h-4 w-4" />
          {t('cta')}
          <ChevronDown className={`h-4 w-4 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute top-full left-0 mt-xs w-64 rounded-lg border border-white/20 bg-primary-800 shadow-elevated backdrop-blur-sm overflow-hidden z-50">
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
          </div>
        )}
      </div>

      {/* Cover Letter Download */}
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
