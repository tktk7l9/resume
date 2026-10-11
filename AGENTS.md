<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

Single Next.js 16 (App Router, Turbopack) app — a bilingual (ja/en) résumé site. There is no separate backend service; the Next app is the only service. Dependencies are refreshed by the startup update script (`pnpm install --frozen-lockfile`), so you normally don't need to install anything manually.

Standard commands (see `package.json` scripts and `README.md`):

- `pnpm dev` — dev server on `http://localhost:3000` (Turbopack). Root `/` returns a 307 redirect to `/ja` or `/en` based on locale; open `/ja` or `/en` directly.
- `pnpm lint` — Biome lint (`pnpm check` also auto-fixes/format).
- `pnpm build` — `next build` (runs TypeScript type-check + static generation).
- `pnpm preview` / `pnpm deploy` — Cloudflare Workers via `@opennextjs/cloudflare`. Not needed for normal local dev; `preview` builds a workerd bundle and can surface differences `next dev` doesn't.

Non-obvious gotchas:

- `next dev` regenerates `AGENTS.md` + `CLAUDE.md` (this managed block) and rewrites `next-env.d.ts` to reference `.next/dev/types/...`, whereas `next build` points it at `.next/types/...`. So `next-env.d.ts` flips depending on which command ran last — this diff is an expected artifact, not a real change; leave it (or `git checkout -- next-env.d.ts`).
- The contact form at `/[locale]/contact` uses a Server Action + Resend and requires a `RESEND_API_KEY` (set as a Cloudflare Worker secret in prod, or in `.env.local` for local; see `.env.local.example`). Without it the form shows a config error, but the rest of the site renders and works fine — a missing key does not block dev/build.
- When editing `.env.local`, keep comments on their own lines — a trailing `KEY=value # comment` gets stored with the comment as part of the value (this previously broke all three Resend vars in prod).
- The CSP nonce comes from the Worker, not from Next. `src/lib/csp.ts` is the source of truth (served by `headers()` in `next.config.ts`) and keeps `script-src 'self' 'unsafe-inline'`. `wrangler.jsonc` `main` is `worker.ts`, which wraps `.open-next/worker.js` and, for every `text/html` response, replaces that `'unsafe-inline'` with a per-request `'nonce-…'` and stamps it on each inline `<script>` via HTMLRewriter (`src/lib/csp-nonce.ts`). The header is replaced, never appended: exactly one CSP per response. Never point `main` back at `.open-next/worker.js` (silently restores `'unsafe-inline'`; `src/lib/worker-entry.test.ts` guards it), never add `'strict-dynamic'` (it makes `'self'` be ignored, so the `/_next/static` chunks would be blocked), and keep HTML out of `public/` (Workers Assets serve it without running the Worker). `pnpm dev` / `next start` do not run the Worker and keep the static header; check the real CSP with `pnpm preview`.
- Only inline JavaScript gets the nonce (`isInlineJavaScript` in `src/lib/csp-nonce.ts`): `<script src>`, an SVG `<script href>` and data blocks such as the ld+json are left unstamped. **Trust boundary:** HTMLRewriter cannot tell Next's inline scripts from injected ones, so any inline `<script>` that reaches the server-rendered HTML gets the nonce. The nonce is safe only while the server never emits untrusted HTML. `src/lib/trust-boundary.test.tsx` enforces it: `dangerouslySetInnerHTML` is allowed only in the files on its allowlist (today `src/components/json-ld.tsx`, which escapes every `<`), each with a reason and a hostile-input test. Render structured data through `JsonLd`; a new raw-HTML sink goes on that list with both, or it fails CI.
