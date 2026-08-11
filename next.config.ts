import type { NextConfig } from "next";

/**
 * Content-Security-Policy
 * - 'unsafe-inline' for script-src is required because Next.js injects inline
 *   runtime chunks and the app uses JSON-LD <script type="application/ld+json">
 *   blocks across every tool page. Locking these down with nonces is a future
 *   task; the rest of the policy is strict.
 * - cdn.jsdelivr.net is allow-listed for the pdf.js worker used by PDF tools.
 * - googletagmanager / google-analytics are allow-listed for analytics.
 * - worker-src 'blob:' is required for tesseract.js / ffmpeg.wasm / pdf.js
 *   when they fall back to blob: workers.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdn.jsdelivr.net",
  "worker-src 'self' blob: https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://cdn.jsdelivr.net",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    // NOTE: keep ignoreBuildErrors so unrelated type issues in tool pages do
    // not block production builds. Run `tsc --noEmit` in CI to catch type
    // drift separately.
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          // 'require-corp' blocks Google Analytics and other third-party
          // scripts that don't send CORP headers. 'credentialless' is the
          // modern, more permissive alternative that still gives isolation.
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(self), geolocation=(), interest-cohort=()",
          },
          // HSTS — forces HTTPS for 2 years, includes subdomains, eligible for
          // browser preload lists. Fixes the "missing Strict-Transport-Security
          // header" SEO issue.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: CONTENT_SECURITY_POLICY,
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      // Long-cache immutable static assets — improves repeat-visit performance
      // and reduces HTTP request overhead noted in the SEO audit.
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
