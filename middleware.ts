import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(_req: NextRequest) {
  // CORS headers for API routes (optional if deploying same origin)
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};


