# 職務経歴書 — 齋藤拓也

**[▶ 公開サイト](https://resume-tktk7l9.vercel.app)**

Next.js + Tailwind CSS で構築したインタラクティブな職務経歴書サイト。日本語 / English の 2 言語に対応し、ヘッダーのボタンからブラウザ印刷経由で PDF として保存できます。

## 機能

- 日本語 / English の切り替え（`/ja`・`/en` で SSG）
- ライト / ダークテーマの切り替え
- ブラウザ印刷を用いた PDF ダウンロード（印刷用 CSS で A4 に整形）
- 自己紹介・経歴・個人開発・スキル・言語の各セクション

## 技術構成

- [Next.js](https://nextjs.org/)（App Router）
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Biome](https://biomejs.dev/)
- [Vercel](https://vercel.com/)

## 起動

```bash
pnpm install
pnpm dev
```
