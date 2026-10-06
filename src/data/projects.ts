import { profile } from "@/data/profile";
import type { Localized } from "@/i18n/config";

export type ProjectLink = {
  label: Localized<string>;
  url: string;
};

export type Project = {
  title: Localized<string>;
  url: string;
  summary: Localized<string>;
  highlights: Localized<string[]>;
  tags: string[];
  /** Secondary links shown under the highlights (e.g. the portal's blog). */
  links?: ProjectLink[];
};

// Figures come from public sources only: the portal's header totals, each
// public repository's README / content on origin/main, and the live sites.
// Last checked 2026-10-06.
export const projects: Project[] = [
  {
    title: {
      ja: "個人開発ポータル — my-apps-portal",
      en: "Personal apps portal — my-apps-portal",
    },
    url: profile.portfolioUrl,
    summary: {
      ja: "業務外で続けている個人開発 22 作品（うち公開中 20）を一覧にしたポートフォリオ。作品ごとに Lighthouse・テストカバレッジ・依存パッケージの脆弱性・シークレット検出の計測値を載せ、ヘッダーで自動集計しています。各アプリの設計・技術選定・更新内容は開発ブログに書いています。",
      en: "A portfolio of the 22 side projects I keep running outside client work (20 of them live). Each entry carries its measured Lighthouse scores, test coverage, dependency vulnerabilities and secret-scan results, and the header totals them automatically. A development blog covers the design, technology choices and updates behind each app.",
    },
    highlights: {
      ja: [
        "テスト総数 9,427 件。Lighthouse Performance は計測した 19 作品の平均 95.4（うち 16 作品が 90 点以上）",
        "作品ごとに構成を選び分けている: Next.js App Router・SvelteKit・TanStack Start・Vite のほか、Electron と SwiftUI のデスクトップアプリも",
        "学習アプリ: AI Primer（9 トラック 46 レッスン）、CSS Atelier・GLSL Atelier（各 19 トラック 47 レッスン）、Snippet Sprint（17 言語 286 問）",
        "Three.js を使う作品は動的 import で初期バンドルから外し、常時 3D 描画でもモバイルの Lighthouse を落とさない",
      ],
      en: [
        "9,427 tests in total; the 19 apps measured on Lighthouse average 95.4 for Performance, 16 of them at 90 or above",
        "The stack is chosen per app — Next.js App Router, SvelteKit, TanStack Start and Vite on the web, plus desktop apps in Electron and SwiftUI",
        "Learning apps: AI Primer (9 tracks, 46 lessons), CSS Atelier and GLSL Atelier (19 tracks, 47 lessons each) and Snippet Sprint (286 problems across 17 languages)",
        "Apps built on Three.js load it through dynamic imports, keeping mobile Lighthouse scores up even with continuous 3D rendering",
      ],
    },
    tags: [
      "Next.js",
      "SvelteKit",
      "TanStack Start",
      "Vite",
      "Three.js",
      "Cloudflare Workers",
      "Performance",
    ],
    links: [
      {
        label: { ja: "開発ブログ", en: "Development blog" },
        url: `${profile.portfolioUrl}blog`,
      },
    ],
  },
  {
    title: {
      ja: "Somewhere Now — 世界のライブカメラ",
      en: "Somewhere Now — live cameras worldwide",
    },
    url: "https://somewhere-now.saitotakuya0719.workers.dev/",
    summary: {
      ja: "118 の国と地域、5,711 地点の YouTube ライブカメラを、地図と地球儀から選んでアプリ内で見られる Web アプリ（日本語 / English）。昼夜の境界、現地時刻と天気、最大 4 画面の同時表示に対応しています。",
      en: "A web app for browsing 5,711 YouTube live cameras across 118 countries and regions from a map or a globe, and watching them in place (Japanese / English). It draws the current day–night line and shows local time and weather, with up to four streams side by side.",
    },
    highlights: {
      ja: [
        "カメラの定義（バンドル同梱）と生存状態（Cloudflare KV）を分け、Cron が 10 分ごとに生存確認を回して、死んだリンクを地図に残さない",
        "YouTube Data API の無料枠 10,000 units/日 に対し、確認・再探索の頻度を設計して上限 8,000 units に収める",
      ],
      en: [
        "Separates camera definitions (bundled) from live status (Cloudflare KV); a Cron Trigger runs liveness checks every 10 minutes so the map does not fill up with dead links",
        "Schedules liveness checks and rediscovery to stay under 8,000 of the YouTube Data API's free 10,000 daily units",
      ],
    },
    tags: ["Cloudflare Workers", "KV", "Cron Triggers", "MapLibre GL", "Vite"],
  },
  {
    title: {
      ja: "Service Anatomy — サービス解剖マガジン",
      en: "Service Anatomy — a magazine that dissects services",
    },
    url: "https://serviceanatomy.com/",
    summary: {
      ja: "人気サービスを、サービス解説・UX 分析・技術構成の推定・ビジネスモデルの 4 面から公開情報をもとに読み解く日英バイリンガルの分析マガジン。記事 94 本と、2 サービスを突き合わせる比較解剖 27 本を掲載しています。",
      en: "A bilingual (Japanese / English) magazine that analyses popular services from public information on four fronts: what the service does, its UX, its likely technology stack and its business model. It carries 94 articles plus 27 head-to-head comparisons.",
    },
    highlights: {
      ja: [
        "Next.js 16 の全ルートをビルド時に静的生成し、Cloudflare Workers から配信（sitemap 2,196 URL）",
        "日英の項目一致や、確度「確認済み」の技術に一次情報 URL を必須とするなど、全記事の整合性をテストで CI 強制",
      ],
      en: [
        "Every Next.js 16 route is generated statically at build time and served from Cloudflare Workers (2,196 URLs in the sitemap)",
        "Tests enforced in CI keep every article consistent — matching language-neutral fields across Japanese and English, and a primary-source URL for every technology marked as confirmed",
      ],
    },
    tags: ["Next.js", "unified / remark", "Cloudflare Workers", "SSG", "i18n"],
  },
  {
    title: {
      ja: "chronoscroll — 歴史ニュース年表",
      en: "chronoscroll — a scrolling timeline of history",
    },
    url: "https://chronoscroll.saitotakuya0719.workers.dev/",
    summary: {
      ja: "1829 年から現在までの国内外の出来事 27,453 件を、ズームで詳しさが変わる縦スクロール年表で読める Web アプリ。Wikipedia の年ページをビルド時のデータパイプラインで解析し、注目度をスコアリングしています。",
      en: "A vertical, zoomable timeline of 27,453 events in Japan and worldwide from 1829 to today — the closer you zoom, the more detail appears. A build-time data pipeline parses Wikipedia's year pages and scores each event for prominence.",
    },
    highlights: {
      ja: [
        "SvelteKit 3 + Svelte 5 の静的サイト。可視範囲だけを描画する仮想化タイムラインで、毎フレームのズームとスクロールに追従",
        "出来事ごとの静的 HTML は R2 に置いて Worker から返し、静的アセットと分けて配信",
      ],
      en: [
        "A static SvelteKit 3 + Svelte 5 site; a virtualised timeline renders only what is on screen, keeping up with zoom and scroll on every frame",
        "Per-event static HTML pages live in R2 and are served by a Worker, separately from the static assets",
      ],
    },
    tags: ["SvelteKit", "Svelte 5", "Cloudflare Workers", "R2", "MiniSearch"],
  },
];
