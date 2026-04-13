import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to the login page itself
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        const sessionCookie = request.cookies.get('admin_session')?.value;
        const validSession = sessionCookie === 'authenticated_admin';

        if (!validSession) {
            // Redirect unauthenticated to login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
