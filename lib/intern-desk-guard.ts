export const INTERN_DESK_COOKIE = "vd";
export const INTERN_DESK_UI_COOKIE = "vd_ui";

const RESERVED = new Set([
  "api",
  "intern",
  "work",
  "certificates",
  "_next",
  "favicon.ico",
]);

export function internDeskSlug(): string {
  const slug = process.env.INTERN_DESK_SLUG?.trim() ?? "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return "";
  if (slug.length < 8 || slug.length > 48) return "";
  if (RESERVED.has(slug)) return "";
  return slug;
}

export function isInternDeskPath(pathname: string): boolean {
  return pathname === "/intern" || pathname.startsWith("/intern/");
}

export function isInternDeskApi(pathname: string): boolean {
  return pathname === "/api/intern" || pathname.startsWith("/api/intern/");
}
