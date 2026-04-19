import {getTranslations} from 'next-intl/server';

export async function Footer() {
  const t = await getTranslations('Footer');

  return (
    <footer className="border-t border-white/10 bg-primary-900 py-3xl px-md md:px-xl">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-label text-white/40 font-medium tracking-wide">
          {t('builtWith')}
        </p>
      </div>
    </footer>
  );
}
