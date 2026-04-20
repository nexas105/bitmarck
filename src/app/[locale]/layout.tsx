import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
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
