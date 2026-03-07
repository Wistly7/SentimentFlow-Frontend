import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Define your secret key (must be the same as when you created the token)
// Store this in your .env file
const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);

interface UserJwtPayload {
    userInfo: {
  id: string;
  roleId: number;} // Ensure your token payload includes the 'role'
  iat: number;
  exp: number;
}

export async function middleware(request: NextRequest) {
  // Get the token from the user's cookies
  const token = request.cookies.get('user-token')?.value;

  // --- 1. Define Public and Protected Routes ---
  const { pathname } = request.nextUrl;
  
  // These are your public routes that don't require auth
  if (pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.endsWith('/')) {
    return NextResponse.next();
  }

  // --- 2. Check for Token ---
  if (!token) {
    // If no token and they're trying to access a protected route, redirect to login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // --- 3. Verify Token and Role ---
  try {
    // Verify the token
    const { payload } = await jwtVerify<UserJwtPayload>(token, JWT_SECRET_KEY);
    // Get the user's role from the token
    const userRole:number = payload.userInfo.roleId;
    // Check if they are trying to access an admin-only route
    if (pathname.startsWith('/dashboard/upload-image') && userRole!==2) {
      // If not an admin, redirect to a "not authorized" page or the homepage
      const unauthorizedUrl = new URL('/unauthorized', request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }
    
    // If token is valid and role is correct (or not an admin route), let them proceed
    return NextResponse.next();

  } catch (error) {
    // Token is invalid, expired, or verification failed
    console.error("Token verification failed:", error);
    const loginUrl = new URL('/login', request.url);
    
    // Clear the invalid cookie
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set('user-token', '', { expires: new Date(0) });
    return response;
  }
}

// 4. Use the "Matcher" to specify which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * This avoids running middleware on unnecessary assets.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}