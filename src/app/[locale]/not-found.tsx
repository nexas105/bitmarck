import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-lg bg-surface">
      <h1 className="text-display font-semibold text-text-primary">{t('heading')}</h1>
      <p className="text-body text-text-secondary">{t('body')}</p>
      <Link href="/" className="text-accent hover:text-accent-hover transition-colors duration-150 ease">
        {t('cta')}
      </Link>
    </main>
  );
}
