// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const protectedRoutes = [
//   '/dashboard',
//   '/dashboard-admin',
//   '/dashboard-laboran',
//   '/profile',
// ];
// const unprotectedRoutes = ['/', '/login'];

// import { auth } from '@/auth';

// export default async function middleware(request: NextRequest) {
//   const session = await auth();

//   const isProtectedRoute = protectedRoutes.some((prefix) =>
//     request.nextUrl.pathname.startsWith(prefix)
//   );

//   if (!session && isProtectedRoute) {
//     const absoluteURL = new URL('/', request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
//   if (session && unprotectedRoutes.includes(request.nextUrl.pathname)) {
//     const absoluteURL = new URL('/dashboard', request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }


import { auth } from "@/auth"
import { NextResponse } from 'next/server';

export default auth((req) => {
  // const isLoggedIn = !!req.auth
  console.log("ROUTE: ", req.nextUrl.pathname)
  // console.log("IS LOGGED IN: ", isLoggedIn )
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export function middleware(request: any) {
//   if (request.nextUrl.pathname === '/') {
//     const url = request.nextUrl.clone();
//     url.pathname = '/login';
//     return NextResponse.redirect(url);
//   }
// }
