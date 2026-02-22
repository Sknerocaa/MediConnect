// Auth middleware — uncomment when database is connected
// export { auth as middleware } from "@/lib/auth";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  // Pass through all requests for now (no DB connected)
  // When database is configured, replace this file with:
  //   export { auth as middleware } from "@/lib/auth";
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
