/**
 * Source of truth for the Content-Security-Policy. headers() in next.config.ts
 * serves it on every response the Next server produces (HTML, RSC, images).
 *
 * No resources are loaded from outside (all external URLs are plain links).
 * script-src has 'unsafe-inline' here because Next writes its bootstrap and RSC
 * payload as inline <script> (self.__next_f.push). In production every HTML
 * response passes through worker.ts, which swaps that token for a per-request
 * nonce (src/lib/csp-nonce.ts), so browsers never see 'unsafe-inline' in
 * script-src on pages. `next dev` / `next start` never run the Worker and keep
 * this static value. Next 16's proxy (middleware) cannot issue the nonce
 * instead: it runs only on the Node runtime, which OpenNext on Cloudflare
 * Workers does not support.
 *
 * The JSON-LD in [locale]/layout.tsx is a data block, not executed, so it is
 * outside script-src (the Worker stamps the nonce on it anyway; harmless).
 * 'unsafe-eval' is only for HMR in dev.
 */
export function contentSecurityPolicy({
  dev = false,
}: {
  dev?: boolean;
} = {}): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");
}
