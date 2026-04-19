'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

export function LoginForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: formData.get('username'),
          password: formData.get('password'),
        }),
      });

      if (res.ok) {
        router.push('/de/admin');
        router.refresh();
      } else if (res.status === 429) {
        setError('Zu viele Versuche. Bitte spaeter erneut versuchen.');
      } else {
        setError('Ungueltige Anmeldedaten');
      }
    } catch {
      setError('Verbindungsfehler. Bitte erneut versuchen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-md">
      <div className="flex flex-col gap-xs">
        <label htmlFor="username" className="text-label font-semibold text-text-primary">
          Benutzername
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="rounded-md border border-border bg-surface-raised px-md py-sm text-body text-text-primary outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div className="flex flex-col gap-xs">
        <label htmlFor="password" className="text-label font-semibold text-text-primary">
          Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="rounded-md border border-border bg-surface-raised px-md py-sm text-body text-text-primary outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      {error && (
        <p className="text-label text-destructive" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-accent px-md py-sm text-label font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
      >
        {loading ? 'Anmelden...' : 'Anmelden'}
      </button>
    </form>
  );
}
