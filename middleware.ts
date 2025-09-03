// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { verifyToken } from "@/lib/auth"

// // Define protected routes and their required roles
// const protectedRoutes = {
//   "/dashboard": ["donor", "ngo", "food-provider"],
//   "/admin": ["admin"],
//   "/donate": ["donor"],
//   "/ngo": ["ngo"],
//   "/food-provider": ["food-provider"],
// }

// const publicRoutes = [
//   "/",
//   "/auth/login",
//   "/auth/register",
//   "/auth/forgot-password",
//   "/about",
//   "/contact",
//   "/api/auth/login",
//   "/api/auth/register",
//   "/api/auth/logout",
// ]

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   // Allow public routes
//   if (publicRoutes.some((route) => pathname.startsWith(route))) {
//     return NextResponse.next()
//   }

//   // Get auth token from cookies
//   const token = request.cookies.get("auth-token")?.value

//   if (!token) {
//     // Redirect to login if no token
//     return NextResponse.redirect(new URL("/auth/login", request.url))
//   }

//   // Verify token
//   const payload = await verifyToken(token)
//   if (!payload) {
//     // Invalid token, redirect to login
//     const response = NextResponse.redirect(new URL("/auth/login", request.url))
//     response.cookies.delete("auth-token")
//     return response
//   }

//   // Check role-based access
//   for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
//     if (pathname.startsWith(route)) {
//       if (!allowedRoles.includes(payload.role)) {
//         // User doesn't have required role
//         return NextResponse.redirect(new URL("/unauthorized", request.url))
//       }
//     }
//   }

//   // Add user info to headers for server components
//   const requestHeaders = new Headers(request.headers)
//   requestHeaders.set("x-user-id", payload.userId)
//   requestHeaders.set("x-user-role", payload.role)
//   requestHeaders.set("x-user-email", payload.email)

//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   })
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// }
