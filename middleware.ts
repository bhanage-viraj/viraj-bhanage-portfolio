import { NextResponse, type NextRequest } from "next/server";
import { internDeskSlug } from "@/lib/intern-desk-guard";

function noIndex(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export function middleware(request: NextRequest) {
  const slug = internDeskSlug();
  const { pathname } = request.nextUrl;

  if (slug && (pathname === `/${slug}` || pathname.startsWith(`/${slug}/`))) {
    const rest = pathname.slice(slug.length + 1);
    const url = request.nextUrl.clone();
    url.pathname = `/intern${rest === "/" ? "" : rest}`;
    return noIndex(NextResponse.rewrite(url));
  }

  if (
    pathname === "/intern" ||
    pathname.startsWith("/intern/") ||
    pathname === "/api/intern" ||
    pathname.startsWith("/api/intern/")
  ) {
    return noIndex(NextResponse.next());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
