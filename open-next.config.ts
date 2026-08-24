import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// 既定の dummy incremental cache のまま。ページはデプロイ時 SSG で、
// 経験年数ラベルもその時点の日付で固まる（0.5 年刻みなので十分）。
// ISR / on-demand revalidate は使わないので R2 等は不要。
// https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig();
