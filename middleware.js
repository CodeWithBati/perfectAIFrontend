import { toast } from "react-hot-toast";

export function middleware(request) {

  const pathsToCheck = ['/chat', '/profile', '/dashboard'];
  const isUnderDashboard = (pathname) => {
    return pathname == '/dashboard' || pathname.startsWith('/dashboard/');
  };

  const token = request.cookies.get('token')?.value;
  const user = request.cookies.get('user')?.value;

  if (token && JSON?.parse(user)?.role !== 'admin' && (request.nextUrl.pathname === '/chat' || isUnderDashboard(request.nextUrl.pathname))) {
    return Response.redirect(new URL('/', request.url)); 
  }

  // if (
  //   !token &&
  //   !user &&
  //   (pathsToCheck.includes(request.nextUrl.pathname) || isUnderDashboard(request.nextUrl.pathname))
  // ) {
  //   return Response.redirect(new URL('/login', request.url));
  // }

  if (
    token &&
    user &&
    [
      '/login',
      '/register',
      '/verify-email',
      '/forget-password',
      '/reset-password',
    ].includes(request.nextUrl.pathname)
  ) {
    return Response.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/((?!api).*)'],
};
