import {getIronSession} from 'iron-session';
import {cookies} from 'next/headers';

export type SessionData = {
  isLoggedIn: boolean;
};

export const sessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'bitmarck-admin',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
  },
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
