const isDev = process.env.NODE_ENV === "development";

// No resources are loaded from outside (all external URLs are plain links).
// 'unsafe-inline' is needed for Next's hydration scripts embedded in the HTML and for
// JSON-LD (layout.tsx). 'unsafe-eval' is only for HMR in dev.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Redundant with CSP frame-ancestors, but kept for older browsers
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limit referrer information
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features we do not need
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HSTS (set explicitly on Workers too)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
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
