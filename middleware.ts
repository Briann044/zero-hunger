// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

const adminRoutes = ['/admin'];
const ngoRoutes = ['/ngo'];
const foodProviderRoutes = ['/food-provider'];
const userRoutes = ['/'];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // All protected routes
  const isProtectedRoute = [
    ...adminRoutes,
    ...ngoRoutes,
    ...foodProviderRoutes,
    ...userRoutes,
  ].some((route) => pathname.startsWith(route));

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Role-based access
  if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (pathname.startsWith('/ngo') && token?.role !== 'NGO') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (pathname.startsWith('/food-provider') && token?.role !== 'FOOD_PROVIDER') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Example redirect: admin should not access user dashboard
  if (pathname.startsWith('/dashboard') && token?.role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/ngo/:path*',
    '/food-provider/:path*',
    '/dashboard/:path*',
    '/api/:path*',
    '/', // root path
  ],
};
