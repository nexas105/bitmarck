import {setRequestLocale} from 'next-intl/server';
import {LocaleToggle} from '@/components/locale-toggle';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-lg bg-surface">
      <h1 className="text-display font-semibold text-text-primary">
        Tobias Ludwig
      </h1>
      <p className="text-body text-text-secondary">Business Analyst IAM</p>
      <LocaleToggle />
    </main>
  );
}
