'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';

type Props = {
  locale: string;
  children: React.ReactNode;
};

export function AdminShell({locale, children}: Props) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch('/api/auth/logout', {method: 'POST'});
    router.push(`/${locale}/admin/login`);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 border-b border-border bg-surface-raised px-lg py-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-heading font-semibold text-text-primary">Admin</h1>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-md border border-border px-md py-xs text-label text-text-secondary transition-colors hover:border-destructive hover:text-destructive disabled:opacity-50"
          >
            {loggingOut ? 'Abmelden...' : 'Abmelden'}
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl p-lg">{children}</main>
    </div>
  );
}
