// pages/middleware.js 
import { NextResponse } from 'next/server';

export function middleware(request: any) {
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}
