import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import {Space_Grotesk} from 'next/font/google';
import {StickyHeader} from '@/components/sticky-header';
import {Footer} from '@/components/footer';
import {MotionProvider} from '@/components/motion-provider';
import {Terminal} from '@/components/terminal';
import {InteractiveFab} from '@/components/interactive-fab';
import {CommandPalette} from '@/components/command-palette';
import {ScrollStory} from '@/components/scroll-story';
import '../globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bitmarck-bewerbung.tjl-it.de';
const metadataBase = (() => {
  try {
    return new URL(SITE_URL);
  } catch {
    return new URL('https://bitmarck-bewerbung.tjl-it.de');
  }
})();

function getSeoCopy(locale: string) {
  if (locale === 'en') {
    return {
      title: 'Tobias Ludwig — Business Analyst IAM',
      description:
        'Application website for the Business Analyst IAM role at Bitmarck: career path, project proof, IAM expertise, and CV.',
      locale: 'en_US' as const,
    };
  }

  return {
    title: 'Tobias Ludwig — Business Analyst IAM',
    description:
      'Bewerbungswebsite für die Position Business Analyst IAM bei Bitmarck: Karriereweg, Projekt-Nachweise, IAM-Expertise und CV.',
    locale: 'de_DE' as const,
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const seo = getSeoCopy(locale);

  return {
    metadataBase,
    title: {
      default: seo.title,
      template: `%s | Tobias Ludwig`,
    },
    description: seo.description,
    applicationName: 'Bitmarck Bewerbung',
    keywords: [
      'Business Analyst IAM',
      'Bitmarck Bewerbung',
      'IAM',
      'Anforderungsanalyse',
      'SINA',
      'Tobias Ludwig',
    ],
    authors: [{name: 'Tobias Ludwig'}],
    creator: 'Tobias Ludwig',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: '/de',
        en: '/en',
        'x-default': '/de',
      },
    },
    openGraph: {
      type: 'website',
      url: `/${locale}`,
      title: seo.title,
      description: seo.description,
      siteName: 'Bitmarck Bewerbung — Tobias Ludwig',
      locale: seo.locale,
      images: [
        {
          url: '/tobias-ludwig.jpg',
          width: 1200,
          height: 630,
          alt: 'Tobias Ludwig — Business Analyst IAM',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/tobias-ludwig.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={spaceGrotesk.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <StickyHeader />
            {children}
            <Footer />
            <Terminal />
            <InteractiveFab />
            <CommandPalette />
            <ScrollStory />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
