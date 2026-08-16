# 職務経歴書 — 齋藤拓也

[![Keyway Secrets](https://www.keyway.sh/badge.svg?repo=tktk7l9/resume)](https://www.keyway.sh/vaults/tktk7l9/resume)

**[▶ 公開サイト](https://resume.saitotakuya0719.workers.dev)**

Next.js + Tailwind CSS で構築したインタラクティブな職務経歴書サイト。日本語 / English の 2 言語に対応。

## 機能

- 日本語 / English の切り替え（`/ja`・`/en` で SSG）
- 自己紹介・経歴・個人開発・スキル・言語の各セクション

## 技術構成

- [Next.js](https://nextjs.org/)（App Router）
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Biome](https://biomejs.dev/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) + [@opennextjs/cloudflare](https://opennext.js.org/cloudflare)

## 起動

```bash
pnpm install
pnpm dev
```

## デプロイ（Cloudflare Workers）

```bash
pnpm preview   # workerd ランタイムでローカル確認（next dev では検出できない差分がある）
pnpm deploy    # ビルドして本番へ
```

問い合わせフォームの送信に必要な値は Worker のシークレットとして設定する
（`.env.local` はローカル開発専用で、デプロイには使われない）。

```bash
pnpm exec wrangler secret put RESEND_API_KEY
pnpm exec wrangler secret list   # 設定済みの一覧
```

`RESEND_TO_EMAIL` / `RESEND_FROM_EMAIL` は未設定ならコード側の既定値が使われる。
値を入れる場合、`.env.local.example` のコメントごと貼り付けないよう注意すること
（過去にそれで 3 変数すべてが壊れ、フォームが無言で失敗していた）。
