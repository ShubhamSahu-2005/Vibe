import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next({
    request: {
      headers: new Headers(request.headers)
    },
  });
}

// Increase body size limit globally
export const config = {
  matcher: "/api/:path*", // Apply to all API routes
  api: {
    bodySizeLimit: "25mb", // Increase limit to 25MB
  },
};