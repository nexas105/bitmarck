import {NextRequest, NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiting: max 3 emails per IP per hour
const rateLimitMap = new Map<string, {count: number; resetAt: number}>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, {count: 1, resetAt: now + 60 * 60 * 1000});
    return false;
  }

  if (entry.count >= 3) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {error: 'Too many requests. Please try again later.'},
        {status: 429}
      );
    }

    const body = await request.json();
    const {name, email, subject, message} = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {error: 'All fields are required.'},
        {status: 400}
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {error: 'Invalid email address.'},
        {status: 400}
      );
    }

    const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO} =
      process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      console.error('Missing SMTP environment variables');
      return NextResponse.json(
        {error: 'Server configuration error.'},
        {status: 500}
      );
    }

    const port = parseInt(SMTP_PORT, 10);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      ...(port === 587 ? {requireTLS: true} : {}),
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"Bewerbungswebsite" <${SMTP_USER}>`,
      replyTo: email,
      to: SMTP_USER,
      subject: `[Bewerbung Kontakt] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nBetreff: ${subject}\n\n${message}`,
      html: `
        <h3>Neue Kontaktanfrage von der Bewerbungswebsite</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Betreff:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    return NextResponse.json({success: true});
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {error: 'Failed to send message.'},
      {status: 500}
    );
  }
}
