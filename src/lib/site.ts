/**
 * サイトの正規 URL。
 *
 * canonical / OGP / sitemap / robots が全てここを参照する。以前は 5 ファイルに
 * 同じ文字列がハードコードされており、ホスティング移行のたびに取りこぼす形に
 * なっていた。
 *
 * 2026-08-16 に Vercel (resume-tktk7l9.vercel.app) から Cloudflare Workers へ
 * 移行。Vercel 側は Fair Use 超過でアカウントごと 402 になっており、旧 URL を
 * canonical に残すと死んだページを正規扱いさせてしまう。
 */
export const siteUrl = "https://resume.saitotakuya0719.workers.dev";

/** OGP 画像などに表示する、スキームを落としたホスト表記。 */
export const siteHost = new URL(siteUrl).host;
