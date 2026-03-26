import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/login', '/join'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const userType = request.cookies.get('userType')?.value;

  if (pathname === '/') {
    if (refreshToken) {
      return NextResponse.redirect(
        new URL(userType === 'ADMIN' ? '/admin/challengesSettings' : '/challenge/list', request.url)
      );
    }
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/admin') && userType !== 'ADMIN') {
    return NextResponse.redirect(new URL('/challenge/list', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
