import { profile } from "@/data/profile";
import type { Localized } from "@/i18n/config";

export type Project = {
  title: Localized<string>;
  url: string;
  summary: Localized<string>;
  highlights: Localized<string[]>;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: {
      ja: "個人開発ポータル — my-apps-portal",
      en: "Personal apps portal — my-apps-portal",
    },
    url: profile.portfolioUrl,
    summary: {
      ja: "業務外で継続している個人開発を一覧化したポータルサイト。新しいフレームワークやパフォーマンス最適化手法を実プロジェクト規模で検証する目的で、住宅性能シミュレーター、ライフプランシミュレーター、ブラウザゲーム、3D 表現サイトなどを揃えています。",
      en: "A portal that lists all the side projects I keep running. The goal is to validate new frameworks and performance techniques at realistic project scale — it currently links to a housing performance simulator, a life-plan simulator, browser games and 3D experiments.",
    },
    highlights: {
      ja: [
        "住宅性能シミュレーター・ライフプランシミュレーターで Lighthouse Desktop 100 / Mobile 99 を達成",
        "Three.js や Recharts などの重量級ライブラリを動的 import 化し、初期バンドルから除外",
        "Apple Human Interface Guidelines を参考にしたモードレス UI・段階的開示・記憶補助の適用",
        "Next.js App Router / Vite / Astro など複数の構成で同等の品質ラインを実現",
      ],
      en: [
        "Reached Lighthouse Desktop 100 / Mobile 99 on the housing-performance and life-plan simulators",
        "Moved heavy libraries (Three.js, Recharts) behind dynamic imports to slim the initial bundle",
        "Applied Apple HIG-inspired patterns: modeless flow, progressive disclosure and recall aids",
        "Maintained the same quality bar across Next.js App Router, Vite and Astro stacks",
      ],
    },
    tags: [
      "Next.js",
      "Vite",
      "Astro",
      "Three.js",
      "Recharts",
      "Tailwind CSS",
      "Performance",
    ],
  },
];
