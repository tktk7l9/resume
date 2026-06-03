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
        "所有車を登録すると事業者から買取価格が提示される「査定申し込み」機能を、設計・開発からリリース後の運用（追加開発・バグ対応）まで一貫して担当",
        "Next.js / React / TypeScript による UI 実装と再利用可能なコンポーネント設計、画面横断のステート管理・型定義の整備",
        "技術選定・調査・リファクタリングを率先し、Copilot / ChatGPT などの AI ツールを開発に積極活用",
        "開発10名・全体13名のチームで、Slack 中心のフルリモート開発（BE / デザイナー / QA と協働）",
      ],
      en: [
        "Owned the vehicle-appraisal request feature end-to-end — from design and build to post-release operation (enhancements and bug fixes)",
        "Implemented UI in Next.js / React / TypeScript, designing reusable components and structuring cross-screen state and typed API contracts",
        "Drove technical selection, investigation and refactoring; used Copilot / ChatGPT actively in day-to-day development",
        "Worked fully remote on a 10-developer / 13-person team, collaborating via Slack with backend, design and QA",
      ],
    },
    tags: ["Next.js", "React", "TypeScript", "MySQL"],
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
        en: "SB Technology Corp.",
      },
      url: "https://www.softbanktech.co.jp/",
    },
    responsibilities: {
      ja: [
        "上記ソフトバンクと同一の自動車サービスを、契約形態が SBテクノロジーだった期間に担当",
        "査定申し込み機能を中心に、Next.js / React / TypeScript で UI 実装・コンポーネント設計・テストを実施",
      ],
      en: [
        "Same automotive service as the SoftBank entry above, during the period contracted through SB Technology",
        "Focused on the appraisal-request feature: UI implementation, component design and testing in Next.js / React / TypeScript",
      ],
    },
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    startDate: "2024-09",
    endDate: "2025-02",
    type: "project",
    title: {
      ja: "人事労務・モチベーション管理システム開発 — フロントエンドエンジニア（業務委託）",
      en: "HR / motivation-management system — Frontend engineer (Contract)",
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
        "従業員のモチベーション管理サービスの新規機能を、React / TypeScript / Radix UI で開発",
        "UI コンポーネントの実装・ステート管理と、GraphQL によるバックエンド結合、ユニット／コンポーネントテストの追加",
        "開発8名・全体15名のスクラムチームで、Slack / Figma / Asana / DocBase を用いて開発",
      ],
      en: [
        "Built new features for an employee-motivation management product in React / TypeScript / Radix UI",
        "Implemented UI components and state management, wired up the GraphQL backend, and added unit / component tests",
        "Worked in an 8-developer / 15-person scrum team using Slack, Figma, Asana and DocBase",
      ],
    },
    tags: ["React", "TypeScript", "Radix UI", "GraphQL", "Zustand"],
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
    startDate: "2021-07",
    endDate: "2024-08",
    type: "work",
    title: {
      ja: "クリニック向け Web アプリ開発・管理画面刷新 — フロントエンドエンジニア（正社員）",
      en: "Clinic web apps & admin dashboard — Frontend engineer (Full-time)",
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
        "30拠点規模の自社クリニックで使う予約・患者マイページ Web アプリのリプレイス開発（約2年）。Next.js / React / Jotai / MUI で UI 実装〜ステート管理、GraphQL 連携、Jest / Testing Library / Cypress / Storybook によるテスト整備まで担当",
        "患者・カルテ情報を扱う管理画面のリニューアル（Next.js / React / Mantine）と、DB 操作を含む Go バックエンドの一部実装",
        "電子カルテ・患者マイページ（CakePHP / Go）の運用：機能追加・不具合対応",
        "事業部ポータルサイト（ヘッドレス CMS・問い合わせフォーム含む約12ページ）をエンジニア一人体制で技術選定から構築。microCMS / Cloudflare Pages を採用し、他部署が運用しやすい CMS 選定とドキュメント整備も担当",
      ],
      en: [
        "Led a ~2-year replacement of the reservation / patient-portal web app used across ~30 in-house clinics — UI in Next.js / React / Jotai / MUI, state management, GraphQL integration, and test setup with Jest / Testing Library / Cypress / Storybook",
        "Redesigned the patient / medical-records admin dashboard (Next.js / React / Mantine) and implemented parts of the Go backend including DB operations",
        "Operated the electronic medical record / patient portal (CakePHP / Go): feature additions and bug fixes",
        "Single-handedly built a division portal site (~12 pages incl. headless CMS and contact forms) from technical selection — choosing microCMS / Cloudflare Pages and writing docs so other teams could operate the CMS",
      ],
    },
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Jotai",
      "MUI",
      "Mantine",
      "GraphQL",
      "Go",
      "GCP",
      "microCMS",
      "Cloudflare Pages",
      "Cypress",
    ],
  },
  {
    startDate: "2019-11",
    endDate: "2021-06",
    type: "work",
    title: {
      ja: "GCP データ基盤・分析・モバイル開発 — システムエンジニア",
      en: "GCP data platform, analytics & mobile — Systems engineer",
    },
    company: {
      name: {
        ja: "株式会社トップゲート",
        en: "Top Gate Inc.",
      },
      url: "https://www.topgate.co.jp/",
    },
    responsibilities: {
      ja: [
        "保険会社の統合データウェアハウスを GCP（BigQuery / Cloud Storage）で構築し、オンプレミスからクラウドへの本番データ移行を実施",
        "アパレル企業のデータレイク構築・運用（Cloud Composer / Pub/Sub / Cloud Functions / Cloud Scheduler 等）をインフラ担当として推進",
        "ファッショントレンド分析の PoC：AutoML Vision / Vision API でモデルを作成し、学習用画像のスクレイピング〜ラベル付けまで担当",
        "自動車業のデータ可視化 PoC では Looker のカスタム画面を JavaScript で実装し、Cloud Build で CD 環境を構築",
        "Flutter / Dart による自社名刺モバイルアプリの改修、AngularJS による地域電子クーポンアプリのフロント開発",
      ],
      en: [
        "Built an insurer's integrated data warehouse on GCP (BigQuery / Cloud Storage) and migrated production data from on-prem to the cloud",
        "Drove construction and operation of an apparel company's data lake (Cloud Composer / Pub/Sub / Cloud Functions / Cloud Scheduler) as the infrastructure engineer",
        "Ran a fashion-trend analysis PoC: built models with AutoML Vision / Vision API and handled image scraping and labeling for training data",
        "For an automotive data-visualization PoC, implemented custom Looker screens in JavaScript and set up a CD pipeline with Cloud Build",
        "Enhanced an in-house business-card mobile app in Flutter / Dart and built the frontend of a regional e-coupon app in AngularJS",
      ],
    },
    tags: [
      "GCP",
      "BigQuery",
      "Cloud Composer",
      "Looker",
      "Python",
      "Go",
      "Flutter",
      "Dart",
      "AngularJS",
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
        "クレジットカード共通基幹システム（Java / Struts / Db2）の運用保守と、管理画面機能の追加",
        "VBA を用いた業務自動化ツールの作成と、Excel ベースの設計・テスト資料の整備、回帰テストの実施",
        "Rational ClearCase / ClearQuest を用いた構成・課題管理",
        "プロジェクト有志の社内勉強会で発表。Oracle Certified Java Programmer Silver SE 8 を取得",
      ],
      en: [
        "Operated and maintained a shared credit-card core system (Java / Struts / Db2) and added admin-panel features",
        "Built VBA automation utilities, produced Excel-based design / test artifacts and ran regression test cycles",
        "Managed configuration and issues with Rational ClearCase / ClearQuest",
        "Presented at the in-house study group; earned Oracle Certified Java Programmer Silver SE 8",
      ],
    },
    tags: ["Java", "Struts", "Db2", "VBA", "Oracle"],
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
        "チーム開発・個人開発の演習（要件定義〜設計）、デザインシンキング・ワークショップへの参加",
      ],
      en: [
        "Group training on business etiquette, Java programming and IBM product fundamentals",
        "Team / solo development exercises (requirements to design) and a design-thinking workshop",
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
