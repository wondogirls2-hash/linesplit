import { NextResponse, type NextRequest } from "next/server";
import { SITE_URL } from "@/lib/site";

/**
 * Emit an HTTP Link: rel="canonical" header on every HTML response.
 * Reinforces self-referencing canonicals when Google has historically
 * preferred a wrong host (expired-domain / soft-404 confusion).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // favicon, robots.txt served separately, images, etc.
  ) {
    return NextResponse.next();
  }

  const canonicalPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const canonical = `${SITE_URL}${canonicalPath}`;

  const response = NextResponse.next();
  response.headers.set("Link", `<${canonical}>; rel="canonical"`);
  // Discourage caches/proxies from rewriting host identity
  response.headers.set("X-Robots-Tag", "all");
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files and Next internals.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
