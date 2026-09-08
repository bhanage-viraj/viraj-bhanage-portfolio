import { NextResponse, type NextRequest } from "next/server";
import {
  INTERN_DESK_COOKIE,
  INTERN_DESK_UI_COOKIE,
  internDeskSlug,
  isInternDeskApi,
  isInternDeskPath,
} from "@/lib/intern-desk-guard";

const COOKIE = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

function attachDeskCookies(response: NextResponse, slug: string) {
  response.cookies.set(INTERN_DESK_COOKIE, slug, COOKIE);
  response.cookies.set(INTERN_DESK_UI_COOKIE, "1", {
    ...COOKIE,
    httpOnly: false,
  });
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

function hiddenNotFound() {
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}

export function middleware(request: NextRequest) {
  const slug = internDeskSlug();
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(INTERN_DESK_COOKIE)?.value;
  const allowed = Boolean(slug) && token === slug;
  const localOpen =
    process.env.NODE_ENV !== "production" &&
    (isInternDeskPath(pathname) || isInternDeskApi(pathname));

  if (slug && (pathname === `/${slug}` || pathname.startsWith(`/${slug}/`))) {
    const rest = pathname.slice(slug.length + 1);
    const url = request.nextUrl.clone();
    url.pathname = `/intern${rest === "/" ? "" : rest}`;
    return attachDeskCookies(NextResponse.rewrite(url), slug);
  }

  if (isInternDeskPath(pathname) || isInternDeskApi(pathname)) {
    if (allowed || localOpen) {
      const response = NextResponse.next();
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      return response;
    }
    return hiddenNotFound();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
