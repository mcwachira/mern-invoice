// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value; // assuming role is set in cookies

  const url = request.nextUrl;

  // Redirect unauthenticated users
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect unauthenticated users
  if (!token && url.pathname.startsWith("/documents")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect unauthenticated users
  if (!token && url.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect unauthenticated users
  if (!token && url.pathname.startsWith("/customers")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Role-based route protection example
  if (url.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/documents/:path*",
    "/profile/:path*",
    "/customers/:path*",
    "/admin/:path*",
  ], // paths to protect
};
