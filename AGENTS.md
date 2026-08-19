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
