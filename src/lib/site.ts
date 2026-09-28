/**
 * The site's canonical URL.
 *
 * canonical / OGP / sitemap / robots all read it from here. The same string used to be
 * hard-coded in 5 files, which meant something was missed on every hosting move.
 *
 * Moved from Vercel (resume-tktk7l9.vercel.app) to Cloudflare Workers on 2026-08-16.
 * The Vercel account as a whole returns 402 after exceeding Fair Use, so leaving the
 * old URL as canonical would mark a dead page as the canonical one.
 */
export const siteUrl = "https://resume.saitotakuya0719.workers.dev";

/** Host without the scheme, shown on the OGP image and elsewhere. */
export const siteHost = new URL(siteUrl).host;
