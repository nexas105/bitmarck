import {getSession} from '@/lib/session';
import {redirect} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {LoginForm} from '@/components/admin/login-form';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function AdminLoginPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const session = await getSession();

  if (session.isLoggedIn) {
    redirect(`/${locale}/admin`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-md">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface-raised p-xl shadow-sm">
        <h1 className="mb-lg text-center text-heading font-semibold text-text-primary">
          Admin Login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
