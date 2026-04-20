import {getTranslations} from 'next-intl/server';
import {Mail, GitBranch, Globe, Heart} from 'lucide-react';

export async function Footer() {
  const t = await getTranslations('Footer');

  const quickLinks = [
    {href: '/#career', label: 'Karriere'},
    {href: '/#skills', label: 'Skills'},
    {href: '/#projects', label: 'Projekte'},
    {href: '/#certifications', label: 'Zertifikate'},
  ];

  const contactLinks = [
    {href: 'mailto:Ludwig.tobias105@t-online.de', icon: Mail, label: 'Ludwig.tobias105@t-online.de'},
    {href: 'https://github.com/nexas105', icon: GitBranch, label: 'github.com/nexas105'},
    {href: 'https://www.tobiasjonas-ludwig.de', icon: Globe, label: 'tobiasjonas-ludwig.de'},
  ];

  return (
    <footer className="relative border-t border-white/[0.15] bg-primary-900">
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-md md:px-xl py-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2xl">
          {/* Brand column */}
          <div>
            <p className="text-lg font-bold text-white/90 tracking-tight mb-sm">
              Tobias Ludwig
            </p>
            <p className="text-label text-white/60 leading-relaxed">
              Business Analyst IAM
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-md">
              Navigation
            </p>
            <ul className="flex flex-col gap-xs">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-label text-white/60 hover:text-accent-light transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-md">
              Kontakt
            </p>
            <ul className="flex flex-col gap-sm">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-sm text-label text-white/60 hover:text-accent-light transition-colors duration-200"
                  >
                    <link.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-2xl pt-lg border-t border-white/[0.15]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-sm">
            <p className="text-xs text-white/50 font-medium tracking-wide">
              {t('builtWith')}
            </p>
            <p className="inline-flex items-center gap-xs text-xs text-white/50">
              Made with <Heart className="h-3 w-3 text-red-400/60" aria-hidden="true" /> in Germany
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
