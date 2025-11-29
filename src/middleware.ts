import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {

    const url = request.nextUrl.clone();
    const pathname = url.pathname;
    const protectedPaths = ['/ingredients', '/recipes/new', '/recipes/:path*'];
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
    })
    
    if (
      protectedPaths.some((route) =>
         pathname.startsWith(route.replace(':path*', ''))
      )
   ) {
      if (!token) {
         const url = new URL('/error', request.url);
         url.searchParams.set('message', 'Недостаточно прав');
         return NextResponse.redirect(url);
      }
   }

    return NextResponse.next(); 
}