// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Define route groups
const adminRoutes = ['/admin'];
const ngoRoutes = ['/ngo'];
const foodProviderRoutes = ['/food-provider'];
const userRoutes = ['/dashboard', '/profile']; // authenticated users

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Combine all protected routes
  const protectedRoutes = [
    ...adminRoutes,
    ...ngoRoutes,
    ...foodProviderRoutes,
    ...userRoutes,
  ];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to login if user is not authenticated
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Role-based access control
  if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (pathname.startsWith('/ngo') && token?.role !== 'NGO') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (pathname.startsWith('/food-provider') && token?.role !== 'FOOD_PROVIDER') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Prevent admins from accessing normal user routes
  if (userRoutes.some((route) => pathname.startsWith(route)) && token?.role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

// Configure middleware matcher
export const config = {
  matcher: [
    '/admin/:path*',
    '/ngo/:path*',
    '/food-provider/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/api/:path*',
  ],
};
