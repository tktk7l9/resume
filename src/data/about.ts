import type { Localized } from "@/i18n/config";
import { careerStarts, formatExperienceYears } from "@/lib/experience-years";

type Strength = {
  title: Localized<string>;
  body: Localized<string>;
};

export type About = {
  headline: Localized<string>;
  summary: Localized<string>;
  strengths: Strength[];
};

const headline: Localized<string> = {
  ja: "ユーザー体験の質と、計測できる品質の両方にこだわるフロントエンドエンジニア",
  en: "Frontend engineer who cares equally about user experience and measurable code quality.",
};

const strengths: Strength[] = [
  {
    title: {
      ja: "ユーザー価値起点の UI / UX 設計",
      en: "User-value-driven UI / UX design",
    },
    body: {
      ja: "「画面を作る」前に、ユーザーがそのプロダクトに何を期待するかを言語化することを大切にしています。表現系の学部出身ということもあり、視線誘導・情報密度・余白・トーンといった非機能要件にこだわり、デザイナーや PM と仮説をすり合わせながら実装を進めます。Human Interface Guidelines / WCAG / shadcn のような既存ガイドラインを尊重しつつ、必要に応じてプロダクト固有のパターンを提案します。",
      en: "Before opening a code editor I try to put into words what the user expects from the product. With a performing-arts background I pay close attention to visual hierarchy, density, whitespace and tone, and partner with designers and PMs to validate hypotheses early. I respect existing guidelines (HIG, WCAG, shadcn patterns) while proposing product-specific variations when they better serve the user.",
    },
  },
  {
    title: {
      ja: "パフォーマンス最適化と計測ベースの品質改善",
      en: "Performance optimization grounded in measurement",
    },
    body: {
      ja: "Lighthouse / Web Vitals / バンドル分析を日常的に使い、「速くなった気がする」ではなく数値で語れる改善を積み重ねます。個人開発の住宅性能シミュレーターやライフプランシミュレーターでは、Three.js / Recharts などの重量級ライブラリの動的 import、レンダーブロッキング CSS の削減、画像のプレロード設計などにより Lighthouse Desktop 100、Mobile 99 を達成しています。公開しているアプリでは lib のテストカバレッジ 100%、Lighthouse 100 点、Mozilla Observatory A+ を維持しており、CI のゲートで割り込ませて落とし続けています。チーム開発でも、Storybook・Vitest・型安全・CI/CD まで含めた DX 改善で「壊しにくいフロントエンド」を作ることを意識しています。",
      en: "I rely on Lighthouse, Web Vitals and bundle analysis day-to-day so improvements can be discussed as numbers, not hunches. In my personal housing-performance and life-plan simulators I have reached Lighthouse Desktop 100 / Mobile 99 through dynamic imports of heavy libraries (Three.js, Recharts), elimination of render-blocking CSS and careful image preloading. Across my published apps I hold lib test coverage at 100%, Lighthouse at 100 and a Mozilla Observatory A+ — enforced as CI gates rather than checked by hand. On client teams I extend the same mindset to DX: Storybook documentation, Vitest coverage, type safety and CI/CD pipelines so the frontend stays hard to break.",
    },
  },
  {
    title: {
      ja: "AI ツールの利用と、開発フローそのものの設計",
      en: "Using AI tools — and designing the workflow around them",
    },
    body: {
      ja: "業務では Claude Code / GitHub Copilot / ChatGPT / Gemini を日常の開発に組み込んでいます。コードを書かせる用途に留めず、コードレビュー・リファクタリング・テスト作成まで任せる範囲を広げ、実装したコードは必ず AI で確認して「他の人が読んで分かるか」を基準に整えてから出すようにしています。個人開発ではそこから一歩進めて、開発フローそのものを設計しています。Claude Code の個人スキルを 10 本自作し、subagent で調査と実装を並行させ、CI にテストカバレッジ 100% ゲート・Lighthouse ゲート・gitleaks・npm audit を組み込んで、AI が書いたコードを人手のレビュー前に機械で落とす形にしています。生成 AI で量を出すほど機械的な検証が要る、という前提です。業務ではまだ使う側ですが、個人で設計まで踏み込んできたため、チームへの AI 活用の導入や品質ゲートの整備を担う役割にも関われると考えています。",
      en: "On client work I build Claude Code, GitHub Copilot, ChatGPT and Gemini into everyday development. Rather than limiting them to writing code, I have widened what I delegate to include code review, refactoring and test authoring — and I check every change with AI against a single bar: will another engineer be able to read this? On my own projects I go a step further and design the workflow itself: ten custom Claude Code skills, subagents that run research and implementation in parallel, and a CI pipeline gating on 100% test coverage, Lighthouse, gitleaks and npm audit — so anything AI writes is caught by a machine before it reaches human review. The more volume you generate with AI, the more mechanical verification you need. On client teams I am still a user of these tools, but because I have designed the workflow myself, I am ready to take on introducing AI practice to a team and building the quality gates that go with it.",
    },
  },
  {
    title: {
      ja: "学習速度と自走力",
      en: "Self-directed learning and execution",
    },
    body: {
      ja: "新しい技術領域に対して、ドキュメント・公式リポジトリ・実プロダクトのコードを読み比べながら自分で検証する習慣を持っています。Next.js App Router、TailwindCSS v4、Astro、Three.js、Astro / Vite / Next.js といった複数の構成を業務外で実際に触り、得た知見をクライアント案件に持ち込んでいます。アサインされた範囲を超えて動くことを意識しており、管理画面の案件ではチームの稼働状況を相談したうえで、未経験だった Go に自主的に手を挙げ、カルテ情報の取得・削除をバックエンドからフロントエンドまで一通り実装しました。",
      en: "When picking up a new technology I cross-read documentation, the official repo, and real-world code, then validate it with a working prototype. I have shipped side projects on Next.js App Router, Tailwind CSS v4, Astro, Vite and Three.js, and feed what I learn back into client work. I deliberately step outside my assigned scope: on the admin-dashboard project I talked through the team's capacity, volunteered for Go despite having no prior experience with it, and implemented medical-record fetch / delete end-to-end from backend to frontend.",
    },
  },
];

function buildSummary(now: Date): Localized<string> {
  const engineer = formatExperienceYears(careerStarts.engineer, now);
  const frontend = formatExperienceYears(careerStarts.frontend, now);
  const remote = formatExperienceYears(careerStarts.remote, now);

  return {
    ja: `エンジニア歴 ${engineer.ja}・フロントエンド ${frontend.ja}。Next.js / React / TypeScript を軸に、業務委託として複数クライアントの新規プロダクト開発・既存サービスのリニューアルに参加しています。直近は自動車サービスの査定申し込み機能を担当し、リリース後はアンケート・クチコミ機能の追加開発も行いました。フルリモート歴 ${remote.ja}で、Slack を中心としたチャットコミュニケーションにより BE / デザイナー / QA と日々チーム開発を行います。Claude Code をはじめとする AI ツールを日常の開発に組み込み、実装だけでなくコードレビューやリファクタリング、テスト作成にも活用しています。立教大学映像身体学科で学んだ「ユーザーの体験を起点に設計する」視点を活かし、UI 実装からパフォーマンス計測・改善まで担当。業務外でも 22 本の個人開発を継続し、新しいフレームワークやベストプラクティスを実プロジェクトで検証しています。`,
    en: `${engineer.en} as an engineer, ${frontend.enValue} as a frontend specialist. I work as a contract frontend engineer on Next.js / React / TypeScript projects, from greenfield builds to long-running redesigns — most recently the vehicle-appraisal request feature of an automotive service, followed by its survey and review functionality. With ${remote.en} of fully-remote experience I collaborate daily with backend, design and QA over Slack-based chat. I build AI tools such as Claude Code into everyday development — not only for writing code but for review, refactoring and tests. My background in performance/film studies at Rikkyo University shapes how I design from the user experience inward — covering UI, accessibility, and performance instrumentation. Outside client work I maintain 22 personal apps to validate new frameworks and best practices against real workloads.`,
  };
}

/** Experience years from `now`. SSG ではビルド（デプロイ）時点の日付で固まる。 */
export function getAbout(now = new Date()): About {
  return {
    headline,
    summary: buildSummary(now),
    strengths,
  };
}
