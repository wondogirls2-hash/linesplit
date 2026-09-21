import { NextResponse, type NextRequest } from "next/server";
import { SITE_URL } from "@/lib/site";

const APEX_HOST = "paragraphsplitter.com";

/**
 * 1) Force a single host: https://paragraphsplitter.com (301)
 * 2) Emit Link: rel="canonical" on HTML responses
 *
 * Consolidates www → apex with an explicit 301 so Google prefers one URL.
 * HTTP → HTTPS is handled by Vercel; next.config also declares 301 www rules.
 */
export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host")?.toLowerCase() ?? "";
  const hostname = hostHeader.split(":")[0];
  const { pathname, search } = request.nextUrl;

  // www → apex HTTPS with permanent 301
  if (hostname === `www.${APEX_HOST}`) {
    const target = new URL(
      `https://${APEX_HOST}${pathname === "/" ? "/" : pathname}${search}`
    );
    return NextResponse.redirect(target, 301);
  }

  // Skip Next internals / static assets for header injection
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Self-referencing canonical (trailing slash only on site root)
  const canonicalPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const canonical = `${SITE_URL}${canonicalPath}`;

  const response = NextResponse.next();
  response.headers.set("Link", `<${canonical}>; rel="canonical"`);
  response.headers.set("X-Robots-Tag", "index, follow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
