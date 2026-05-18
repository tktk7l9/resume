import type { Localized } from "@/i18n/config";

export type ExperienceType = "work" | "education" | "project";

export type ExperienceItem = {
  startDate: string;
  endDate?: string;
  type: ExperienceType;
  title: Localized<string>;
  company: {
    name: Localized<string>;
    url?: string;
  };
  responsibilities: Localized<string[]>;
  achievements?: Localized<string[]>;
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    startDate: "2026-04",
    type: "project",
    title: {
      ja: "自動車サービス開発 — フロントエンドエンジニア（業務委託）",
      en: "Automotive service platform — Frontend engineer (Contract)",
    },
    company: {
      name: {
        ja: "ソフトバンク株式会社",
        en: "SoftBank Corp.",
      },
      url: "https://www.softbank.jp/",
    },
    responsibilities: {
      ja: [
        "Next.js / React / TypeScript を用いた自動車関連サービスの Web フロントエンド開発",
        "デザイナーから受け取る Figma を元にした UI 実装と、再利用可能なコンポーネント設計",
        "API スキーマに沿った型定義と、画面横断のステート管理の整備",
      ],
      en: [
        "Building the web frontend of an automotive service in Next.js / React / TypeScript",
        "Translating Figma designs into UI and shaping reusable component primitives",
        "Aligning typed API contracts and structuring cross-screen state management",
      ],
    },
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    startDate: "2025-03",
    endDate: "2026-03",
    type: "project",
    title: {
      ja: "自動車サービス開発 — フロントエンドエンジニア（業務委託）",
      en: "Automotive service platform — Frontend engineer (Contract)",
    },
    company: {
      name: {
        ja: "SBテクノロジー株式会社",
        en: "SoftBank Technology Corp.",
      },
      url: "https://www.softbanktech.co.jp/",
    },
    responsibilities: {
      ja: [
        "Next.js / React / TypeScript を用いた自動車関連サービスの Web フロントエンド開発",
        "デザイナーから受け取る Figma を元にした UI 実装と、再利用可能なコンポーネント設計",
        "API スキーマに沿った型定義と、画面横断のステート管理の整備",
      ],
      en: [
        "Building the web frontend of an automotive service in Next.js / React / TypeScript",
        "Translating Figma designs into UI and shaping reusable component primitives",
        "Aligning typed API contracts and structuring cross-screen state management",
      ],
    },
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    startDate: "2024-09",
    endDate: "2025-02",
    type: "project",
    title: {
      ja: "HRテック新規サービス開発 — フロントエンドエンジニア（業務委託）",
      en: "HR-tech greenfield product — Frontend engineer (Contract)",
    },
    company: {
      name: {
        ja: "レバレジーズ株式会社",
        en: "Leverages Co., Ltd.",
      },
      url: "https://leverages.jp/",
    },
    responsibilities: {
      ja: [
        "React / TypeScript を用いたモチベーション管理画面の新規開発",
        "GraphQL でバックエンドと結合し、Zustand によるクライアント側ステートを設計",
        "UI コンポーネントの実装とユニットテスト・コンポーネントテストの追加",
      ],
      en: [
        "Implementing a motivation-management UI from scratch in React / TypeScript",
        "Wiring up GraphQL backend integration and designing client state with Zustand",
        "Building UI primitives and adding unit / component tests",
      ],
    },
    tags: ["React", "TypeScript", "GraphQL", "Zustand"],
  },
  {
    startDate: "2024-09",
    type: "project",
    title: {
      ja: "採用サイト開発・運用 — フロントエンドエンジニア（業務委託）",
      en: "Recruiting site development — Frontend engineer (Contract)",
    },
    company: {
      name: {
        ja: "CAPS株式会社",
        en: "CAPS Inc.",
      },
      url: "https://caps365.jp/",
    },
    responsibilities: {
      ja: [
        "Next.js / React / TypeScript / Mantine を用いた採用サイトの新規開発と継続運用",
        "MicroCMS（ヘッドレスCMS）連携と、編集者が運用しやすいスキーマ設計",
        "リッチなアニメーションを伴うランディングセクションと、SSGform を用いた問い合わせ・応募フォームの実装",
        "Cloudflare Pages へのデプロイと、コンテンツ更新を伴う運用フローの整備",
      ],
      en: [
        "Building and operating a recruiting site in Next.js / React / TypeScript / Mantine",
        "Integrating MicroCMS and designing editor-friendly content schemas",
        "Implementing animated landing sections and contact / application forms via SSGform",
        "Deploying to Cloudflare Pages and refining the editorial update workflow",
      ],
    },
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Mantine",
      "Cloudflare Pages",
      "MicroCMS",
      "SSGform",
    ],
  },
  {
    startDate: "2023-10",
    endDate: "2024-08",
    type: "work",
    title: {
      ja: "管理画面リニューアル開発 — フロントエンドエンジニア",
      en: "Admin dashboard redesign — Frontend engineer",
    },
    company: {
      name: {
        ja: "CAPS株式会社",
        en: "CAPS Inc.",
      },
      url: "https://caps365.jp/",
    },
    responsibilities: {
      ja: [
        "患者・カルテ情報を扱う管理画面の Next.js / React / TypeScript / Mantine による刷新",
        "GraphQL を用いたバックエンド結合と、Jotai を用いた画面間ステート管理の設計",
        "Storybook によるコンポーネントカタログの整備と、Vitest / Testing Library でのユニットテスト導入",
        "一部 Go サーバーサイドの読み解き・改修を含む、フロント／API 境界の調整",
      ],
      en: [
        "Rewriting the patient / medical-records admin dashboard in Next.js / React / TypeScript / Mantine",
        "Integrating GraphQL APIs and designing cross-screen state management with Jotai",
        "Setting up Storybook component catalogue and introducing Vitest / Testing Library unit tests",
        "Reading and modifying parts of the Go backend to align the frontend / API contract",
      ],
    },
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Mantine",
      "GraphQL",
      "Jotai",
      "Go",
    ],
  },
  {
    startDate: "2018-07",
    endDate: "2019-10",
    type: "work",
    title: {
      ja: "クレジットカード共通基幹システムの運用保守 — システムエンジニア",
      en: "Credit-card core system operations — Systems engineer",
    },
    company: {
      name: {
        ja: "日本アイビーエム・ソリューション・サービス株式会社（ISOL）",
        en: "Japan IBM Solution Services, Inc. (ISOL)",
      },
      url: "https://www.ibm.com/jp-ja/about/subsidiaries/ijds",
    },
    responsibilities: {
      ja: [
        "クレジットカード共通基幹システムの運用保守と、Java 製の管理画面機能追加",
        "VBA を用いた業務自動化ツールの作成と、Excel ベースの設計・テスト資料の整備",
        "テスト計画の策定と回帰テストの実施",
        "プロジェクト有志の社内勉強会への参加・発表、Oracle Certified Java Programmer Silver SE 8 取得",
      ],
      en: [
        "Operating and maintaining a shared credit-card core system, adding Java admin-panel features",
        "Building VBA automation utilities and producing Excel-based design / test artifacts",
        "Planning and executing regression test cycles",
        "Presenting at the in-house study group; earned Oracle Certified Java Programmer Silver SE 8",
      ],
    },
    tags: ["Java", "Excel", "VBA", "Oracle"],
  },
  {
    startDate: "2018-04",
    endDate: "2018-07",
    type: "work",
    title: {
      ja: "新入社員研修",
      en: "New-graduate engineer training",
    },
    company: {
      name: {
        ja: "日本アイビーエム・ソリューション・サービス株式会社（ISOL）",
        en: "Japan IBM Solution Services, Inc. (ISOL)",
      },
      url: "https://www.ibm.com/jp-ja/about/subsidiaries/ijds",
    },
    responsibilities: {
      ja: [
        "ビジネスマナー・Java プログラミング・IBM 製品に関する集合研修",
        "チーム開発・個人開発の演習、デザインシンキング・ワークショップへの参加",
      ],
      en: [
        "Group training on business etiquette, Java programming and IBM product fundamentals",
        "Team / solo development exercises and a design-thinking workshop",
      ],
    },
    tags: ["Java", "IBM", "Design Thinking"],
  },
  {
    startDate: "2012-04",
    endDate: "2018-03",
    type: "education",
    title: {
      ja: "現代心理学部 映像身体学科",
      en: "B.A., Department of Body Expression and Cinematic Arts",
    },
    company: {
      name: {
        ja: "立教大学",
        en: "Rikkyo University",
      },
      url: "https://www.rikkyo.ac.jp/",
    },
    responsibilities: {
      ja: [
        "映画・写真・広告・演劇・ダンス・武術など、映像表現と身体表現をワークショップ形式で学習",
        "表現の手法・知識・チームでの制作プロセスを実習を通して習得",
      ],
      en: [
        "Studied film, photography, advertising, theater, dance and martial arts through workshop-style classes",
        "Developed expressive technique and learned collaborative production workflows hands-on",
      ],
    },
    tags: [],
  },
];
