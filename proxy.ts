import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://onlinecitizenshiptest.com";
const configuredSiteUrl = new URL(
  rawSiteUrl.startsWith("http://") || rawSiteUrl.startsWith("https://")
    ? rawSiteUrl
    : `https://${rawSiteUrl}`,
);
const canonicalHost = configuredSiteUrl.host.toLowerCase();
const wwwHost = `www.${canonicalHost}`;

/**
 * Keep a single canonical origin so search engines do not index http://,
 * https://www and https:// variants of the same page as duplicate URLs.
 * Uses 301 Moved Permanently for standard SEO compliance.
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase();

  if (host !== canonicalHost && host !== wwwHost) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const protocol =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
    url.protocol.replace(":", "");

  const needsHostRedirect = host === wwwHost;
  const needsHttpsRedirect = protocol !== "https";

  if (!needsHostRedirect && !needsHttpsRedirect) {
    return NextResponse.next();
  }

  url.protocol = "https:";
  url.host = canonicalHost;
  url.port = "";

  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
