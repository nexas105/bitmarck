import {getSession} from '@/lib/session';
import {redirect} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {AdminShell} from '@/components/admin/admin-shell';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function AdminLayout({children, params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect(`/${locale}/admin/login`);
  }

  return <AdminShell locale={locale}>{children}</AdminShell>;
}
