import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// キャッシュは既定のまま（全ページ SSG / 静的で、ISR も on-demand revalidate も
// 使っていないため、R2 等のインクリメンタルキャッシュは不要）。
// https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig();
