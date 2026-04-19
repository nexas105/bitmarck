import {getTranslations} from 'next-intl/server';

export async function Footer() {
  const t = await getTranslations('Footer');

  return (
    <footer className="border-t border-border bg-surface-subtle py-2xl px-md md:px-xl">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-label text-text-secondary">
          {t('builtWith')}
        </p>
      </div>
    </footer>
  );
}
