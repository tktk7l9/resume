const isDev = process.env.NODE_ENV === "development";

// 外部から読み込むリソースは無し (外部 URL はすべて単なるリンク)。
// 'unsafe-inline' は Next のハイドレーション用インラインスクリプトと
// JSON-LD (layout.tsx) に必要。'unsafe-eval' は dev の HMR のみ。
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
  // CSP の frame-ancestors と冗長だが古いブラウザ向けに残す
  { key: "X-Frame-Options", value: "DENY" },
  // MIME スニッフィング対策
  { key: "X-Content-Type-Options", value: "nosniff" },
  // リファラ情報の制限
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 不要なブラウザ機能を無効化
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HSTS (Vercel ではデフォルトで付くが明示)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental.optimizeCss (critters による CSS インライン化) は削除した。
  // Next 16 の Turbopack ビルドでは効かず、実際に出力 HTML は
  // <link rel="stylesheet"> のままでインライン <style> は 0 件だった。
  // さらに @opennextjs/cloudflare は optimizeCss が true だと
  // .next/static/css を無条件にコピーしようとするが、Next 16 は CSS を
  // static/chunks/ に出すためディレクトリが無く ENOENT でビルドが落ちる。
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
