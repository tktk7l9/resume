// Worker entry (wrangler.jsonc "main"). Wraps the OpenNext worker so every HTML
// response gets a per-request script nonce instead of script-src
// 'unsafe-inline', and every response's CDN-directed Cache-Control (s-maxage)
// is rewritten for browsers (src/lib/csp-nonce.ts). Static assets
// (/_next/static/*) are served by Workers Assets before this runs; no HTML is
// served that way (src/lib/worker-entry.test.ts checks public/ for it).
// https://opennext.js.org/cloudflare/howtos/custom-worker

// The file exists only after `opennextjs-cloudflare build`; wrangler resolves
// it when bundling.
// biome-ignore lint/suspicious/noTsIgnore: missing in CI typecheck (no build yet), present locally after a build, so @ts-expect-error would fail locally
// @ts-ignore
import openNextWorker from "./.open-next/worker.js";
import { type FetchWorker, withScriptNonceWorker } from "./src/lib/csp-nonce";

export default withScriptNonceWorker(openNextWorker as FetchWorker);
