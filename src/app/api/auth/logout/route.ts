import {getSession} from '@/lib/session';
import {NextResponse} from 'next/server';

export async function POST() {
  const session = await getSession();
  session.isLoggedIn = false;
  await session.save();
  return NextResponse.json({ok: true});
}
