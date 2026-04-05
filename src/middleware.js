import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/login', '/join', '/join/welcome'];
const LOGGED_IN_REDIRECT_PATHS = ['/login', '/join', '/join/welcome'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const userType = request.cookies.get('userType')?.value;

  // refreshToken은 있는데 userType이 없으면 USER로 세팅 후 대시보드로 리다이렉트
  if (refreshToken && !userType) {
    const response = NextResponse.redirect(new URL('/challenge/list', request.url));
    response.cookies.set('userType', 'USER', { path: '/' });
    return response;
  }

  const dashboard = userType === 'ADMIN' ? '/admin/challengesSettings' : '/challenge/list';

  // 로그인한 유저가 로그인/회원가입/웰컴 페이지 접근 시 대시보드로 리다이렉트
  if (refreshToken && LOGGED_IN_REDIRECT_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  if (pathname === '/') {
    if (refreshToken) {
      return NextResponse.redirect(new URL(dashboard, request.url));
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
