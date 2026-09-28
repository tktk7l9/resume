import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Keeps the default dummy incremental cache. Pages are SSG at deploy time, and the
// experience-years label is frozen at that date too (fine, since it moves in 0.5-year steps).
// ISR / on-demand revalidation is not used, so R2 and the like are not needed.
// https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig();
