import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Edge proxy for SEO canonicalization.
 *
 * Fixes the "URL Canonicalization Test" SEO failure:
 * https://freekit.online/ and https://www.freekit.online/ should resolve to
 * the same URL. We 301-redirect every www. request to the apex domain so all
 * ranking signals consolidate on https://freekit.online.
 *
 * HTTP→HTTPS upgrade is intentionally NOT done here — it is the
 * responsibility of the edge proxy (Vercel / Cloudflare / Nginx) which
 * terminates TLS. The HSTS header set in next.config.ts is the SEO signal
 * that locks HTTPS on for browsers.
 *
 * In Next.js 16 the `middleware.ts` file convention was renamed to `proxy.ts`
 * and the exported function from `middleware` to `proxy`.
 */
const HOST = "freekit.online"

export function proxy(req: NextRequest) {
  // Skip non-GET — never redirect POST/PUT etc.
  if (req.method !== "GET") {
    return NextResponse.next()
  }

  const url = req.nextUrl
  const host = req.headers.get("host") || ""

  // www → apex 301 redirect (canonicalization).
  // Only fires for the production www hostname — localhost / preview URLs
  // are left alone so local dev and staging deploys keep working.
  if (host === `www.${HOST}` || host.startsWith(`www.${HOST}:`)) {
    const portMatch = host.match(/:(\d+)$/)
    const port = portMatch ? `:${portMatch[1]}` : ""
    const newUrl = new URL(url.pathname + url.search, `https://${HOST}${port}`)
    return NextResponse.redirect(newUrl, 301)
  }

  return NextResponse.next()
}

export const config = {
  // Run on all routes except Next internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|ads.txt|logo.svg|og-image.png|apple-touch-icon.png|icon-192.png|icon-512.png|api).*)"],
}
