import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const loginPath = '/login';

  const authToken = request.cookies.get('authToken');

  if (!authToken) {
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/funcionario/admin', '/funcionario/agenda', '/funcionario/pacientes'], 
};
