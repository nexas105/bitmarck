import {getSession} from '@/lib/session';
import {NextRequest, NextResponse} from 'next/server';

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const attempts = new Map<string, {count: number; firstAttempt: number}>();

function isRateLimited(ip: string): boolean {
  const record = attempts.get(ip);
  if (!record) return false;

  if (Date.now() - record.firstAttempt > RATE_LIMIT_WINDOW) {
    attempts.delete(ip);
    return false;
  }

  return record.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string): void {
  const record = attempts.get(ip);
  if (!record || Date.now() - record.firstAttempt > RATE_LIMIT_WINDOW) {
    attempts.set(ip, {count: 1, firstAttempt: Date.now()});
  } else {
    record.count++;
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {error: 'Too many attempts. Try again later.'},
      {status: 429}
    );
  }

  const {username, password} = await request.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const session = await getSession();
    session.isLoggedIn = true;
    await session.save();
    attempts.delete(ip);
    return NextResponse.json({ok: true});
  }

  recordFailedAttempt(ip);
  return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
}
