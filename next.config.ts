import type { NextConfig } from "next";
import { contentSecurityPolicy } from "./src/lib/csp";

// src/lib/csp.ts is the source of truth for the CSP. In production worker.ts
// replaces its script-src 'unsafe-inline' with a per-request nonce on every
// HTML response.
const csp = contentSecurityPolicy({
  dev: process.env.NODE_ENV === "development",
});

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Redundant with CSP frame-ancestors, but kept for older browsers
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limit referrer information
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features we do not need
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // No window.open / cross-origin popups are used, so isolating the browsing context costs nothing.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // HSTS (set explicitly on Workers too)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // experimental.optimizeCss (CSS inlining via critters) was removed.
  // It has no effect in Next 16 Turbopack builds: the output HTML still had
  // <link rel="stylesheet"> and zero embedded <style> tags.
  // On top of that, with optimizeCss true @opennextjs/cloudflare always tries to
  // copy .next/static/css, but Next 16 emits CSS into static/chunks/, so the
  // directory does not exist and the build fails with ENOENT.
  // The immutable cache for /_next/static lives in public/_headers (Workers Static Assets).
  // headers() in next.config does not apply there.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
