import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (!path.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  const password = request.cookies.get('hbkfp_auth')?.value;
  const correctPassword = process.env.DASHBOARD_PASSWORD || 'hazelrigg2026';

  if (password !== correctPassword) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};