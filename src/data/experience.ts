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
    endDate: "2026-09",
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
        "同一サービスのグロース期後半を担当（契約形態が SBテクノロジーからソフトバンクへ変更）。CVR 改善施策の実装と技術的負債の解消を継続",
        "アンケート・クチコミ機能を新規に設計から実装まで担当。「開始・入力・完了」を1ページ内の3コンポーネントで切り替える構成とし、画面遷移をまたぐ査定申し込みとは構成を分けて要件に合う形を選択",
        "ディレクターが設計した「複数社選択推奨バルーン」の表示と、その AB 検証の実装を担当。社内 AB 検証ツールの複数キャンペーン ID 対応も実施",
        "相場比較グラフの実装、価格提示期限の表示対応など、ユーザーが判断に使う情報の可視化を担当",
        "ボタンが非活性のままになる不具合を、対症療法ではなく根本原因から修正",
        "SCSS の !important 削除、font-family 指定の整理など、リプレイス期に積み残した負債を施策の合間に返済",
        "開発10名・全体13名のフルリモートチーム。仕様のやりとりや決定事項は Slack / GitHub / Jira / Confluence にできるだけテキストで残すよう心がけ、BE / デザイナー / QA と協働",
      ],
      en: [
        "Continued on the same service through the later growth phase (contract vehicle changed from SB Technology to SoftBank), implementing CVR-improvement work and paying down technical debt",
        "Designed and built the survey and review features, switching between three components (start / input / complete) within a single page — deliberately a different shape from the multi-page appraisal flow, chosen to fit the requirement",
        "Implemented a director-designed \"multi-vendor recommendation\" balloon and the A/B test around it, plus multi-campaign-ID support in the in-house experimentation tool",
        "Built the market-price comparison chart and the price-offer expiry display — surfacing the information users actually decide on",
        "Fixed a defect where a button stayed disabled, tracing it to the root cause rather than patching the symptom",
        "Removed SCSS !important declarations and tidied font-family definitions, paying down debt left over from the replacement phase between feature work",
        "Fully remote on a 10-developer / 13-person team; kept specs and decisions written down in Slack / GitHub / Jira / Confluence, working alongside backend, design and QA",
      ],
    },
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "SCSS",
      "Jotai",
      "React Hook Form",
      "zod",
      "Vitest",
      "Testing Library",
      "MySQL",
    ],
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
        "所有車を登録すると事業者から買取価格が提示される査定サービスに、新規立ち上げのフェーズから参画。リリース前の7ヶ月で開発し、リリース後は CVR 改善と技術的負債の解消を継続（同一サービスをソフトバンク契約期間へ引き継ぎ）",
        "査定申し込みの「入力・確認・完了」3ページを、詳細設計から実装・テスト・リリースまで一貫して担当。確認ページに認証コードの入力を挟む仕様で、画面をまたいで入力値を共有する必要があったため FormProvider の context を用意し、React Hook Form と zod で状態とバリデーションを一元管理",
        "別チームが HTML / CSS / jQuery で実装していた画面を、React・Next.js へ置き換える作業を担当",
        "Next.js / React の採用は決まっていたが、チームに経験者が不在の立ち上げフェーズだったため、その上で使うライブラリの選定を主導。「他のメンバーが後から触れること」を基準に、必要最低限で API がシンプルな Jotai、情報量が多く自力で解決しやすい React Hook Form / zod、テストは Vitest / Testing Library を採用",
        "リプレイス時に最適化しきれなかったスタイルを、リリース後に CSS 分離として3期に分けて返済。一度に行うとリリースを止めることになるため、機能追加と並行して進められる単位に区切り、複数人で分担",
        "ディレクターが設計した AB 検証の実装を担当（査定スタートボタンの文言、売却希望時期アンケートモーダル）。LP を2本作成し、流入経路別の出し分けも実装",
        "背中押し施策として、売却希望時期テキスト、価格提示の有効期限カウントダウン、スカウトリスト待機中のデザイン改修を実装。登録完了画面の文言変更で迷惑メール判定による離脱にも対応",
        "Next.js のバージョンアップ対応、使われなくなった Storybook の撤去、エラーログの出力改善、カスタムロガーの重複削除を実施",
        "SP のスカウト一覧で車両切替時に画像が前の車両のまま残る不具合を、一次調査から原因特定・修正・再発防止まで対応",
        "Claude Code / GitHub Copilot を早い段階から日常の開発に組み込み、実装だけでなくコードレビュー・リファクタリング・テスト作成にも活用。実装したコードは必ず AI で確認し、他の人が読んでも分かりやすいコードになることを意識",
      ],
      en: [
        "Joined an automotive appraisal service — where owners register a car and receive offers from dealers — at the greenfield stage. Built it over the seven months before launch, then continued with CVR improvements and debt paydown (the same service carried on into the SoftBank contract period)",
        "Owned the three-page appraisal flow (input / confirm / complete) from detailed design through implementation, testing and release. An email verification code sits on the confirm step, so form values had to survive navigation: I set up a FormProvider context and centralised state and validation with React Hook Form and zod",
        "Replaced screens another team had built in HTML / CSS / jQuery with React and Next.js",
        "Next.js / React were already chosen, but no one on the team had used them, so I led the selection of the libraries layered on top. My criterion was \"can the next person pick this up\": Jotai for its minimal, simple API; React Hook Form and zod for the volume of material available when someone gets stuck; Vitest / Testing Library for tests",
        "Paid down the styling left unoptimised during the replacement by splitting CSS extraction into three phases after launch. Doing it in one pass would have halted releases, so I sized each phase to run alongside feature work and shared it across the team",
        "Implemented director-designed A/B tests (appraisal CTA copy, a sell-timing survey modal), built two landing pages and added routing so the right one is served by traffic source",
        "Shipped nudge features — sell-timing copy, a countdown on the price-offer expiry, and a redesign of the waiting state in the scout list. Reworded the registration-complete screen to reduce drop-off caused by spam filtering",
        "Handled a Next.js version upgrade, removed a Storybook setup that had fallen out of use, improved error-log output and de-duplicated a custom logger",
        "Traced and fixed a defect where switching vehicles in the mobile scout list left the previous car's image on screen — from first triage through root cause, fix and prevention",
        "Adopted Claude Code / GitHub Copilot early in daily development — not only for implementation but for code review, refactoring and writing tests; every change was checked with AI to keep the code readable for others",
      ],
    },
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "SCSS",
      "Jotai",
      "React Hook Form",
      "zod",
      "Vitest",
      "Testing Library",
      "MySQL",
    ],
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
        "UI コンポーネントの実装・ステート管理（Jotai）と、Apollo Client を用いた GraphQL 結合、Jest / Testing Library によるユニット／コンポーネントテストの追加",
        "担当プロダクトのほか他プロダクトからも共通で使われる独自デザインシステムのリポジトリを管理し、新規機能に必要なコンポーネントの追加・修正も担当。自分の担当プロダクト単体ではなく、他プロダクトからも使われる前提で実装",
        "開発8名・全体15名のスクラムチームで、Slack / Figma / Asana / DocBase を用いて開発",
      ],
      en: [
        "Built new features for an employee-motivation management product in React / TypeScript / Radix UI",
        "Implemented UI components and state management (Jotai), wired up GraphQL via Apollo Client, and added unit / component tests with Jest / Testing Library",
        "Maintained the shared in-house design-system repository used across multiple products, adding and revising the components the new feature needed — built on the assumption that other products would consume them, not just my own",
        "Worked in an 8-developer / 15-person scrum team using Slack, Figma, Asana and DocBase",
      ],
    },
    tags: [
      "React",
      "TypeScript",
      "Radix UI",
      "GraphQL",
      "Apollo Client",
      "Jotai",
      "Jest",
      "Testing Library",
      "PostgreSQL",
    ],
  },
  {
    startDate: "2024-09",
    endDate: "2026-06",
    type: "project",
    title: {
      ja: "採用サイトの継続開発・運用 — フロントエンドエンジニア（業務委託）",
      en: "Recruiting site — ongoing development & operation (Contract)",
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
        "正社員時代に自分が構築した採用サイト（https://recruit.caps365.jp/）を、退職後も業務委託として継続開発・運用。初回リリース時の12ページから、職種別採用ページ・社員インタビュー・FAQ などを追加",
        "MicroCMS（ヘッドレスCMS）のスキーマ設計を、編集する非エンジニアが迷わない形へ継続的に調整",
        "リッチなアニメーションを伴うランディングセクションと、SSGform を用いた問い合わせ・応募フォームの実装",
        "Cloudflare Pages へのデプロイと、コンテンツ更新を伴う運用フローの整備",
        "他クライアントの案件（人事労務システム／自動車サービス）と並行して担当。2026年6月頃をもって先方の社内チームへ移管",
      ],
      en: [
        "Continued to develop and operate the recruiting site (https://recruit.caps365.jp/) that I had originally built as a full-time employee — growing it from the twelve pages of the first release with role-specific hiring pages, employee interviews and an FAQ",
        "Kept refining the MicroCMS schema so the non-engineers editing it would not get lost",
        "Implemented animated landing sections and contact / application forms via SSGform",
        "Deployed to Cloudflare Pages and refined the editorial update workflow",
        "Ran this alongside other client engagements (HR system, automotive service); handed it over to the client's in-house team around June 2026",
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
        "患者・カルテ情報を扱う管理画面のリニューアル。当初は Pages Router で開発していたが、ちょうど App Router が登場したタイミングでリリースまで期間に余裕があったため App Router へ移行",
        "同案件では Mantine をヘッドレスで使い、デザイナーが Figma で作成したデザインに合わせて Tailwind CSS でスタイリング。UI ライブラリの既定のデザインに引っ張られず、デザイン通りに実装できる構成を選択",
        "チームの稼働状況やタスクの状況を相談しながら進め、Go は未経験だったが自主的に手を挙げ、カルテ情報の取得・削除をバックエンドからフロントエンドまで一通り実装。フロントエンドの範囲に閉じず担当を広げることを意識",
        "電子カルテ・患者マイページ（CakePHP / Go）の運用：機能追加・不具合対応",
        "採用サイト（https://recruit.caps365.jp/）と健康経営支援事業サイト（https://healthmanagement.caps365.jp/）の2件を、エンジニア一人体制で技術選定から構築。採用サイトは初回リリース時点でヘッドレス CMS・問い合わせフォームを含む約12ページ構成",
        "フレームワークと状態管理（Next.js / React / Jotai）は他プロダクトと構成を揃えて社内で読める人が多い状態を保ち、サイト固有の要件になる CMS・ホスティング・フォーム（microCMS / Cloudflare Pages / SSGform）だけを一から選定。CMS は運用者が非エンジニアの部署だったため Contentful / Newt / WordPress と比較し、管理画面の日本語対応・国内実績・想定記事量が無料枠に収まることの3点で microCMS を採用",
        "1件目で選定した構成と整備した運用ドキュメントを健康経営支援事業サイトにも流用し、2件目の立ち上げコストを下げた",
      ],
      en: [
        "Led a ~2-year replacement of the reservation / patient-portal web app used across ~30 in-house clinics — UI in Next.js / React / Jotai / MUI, state management, GraphQL integration, and test setup with Jest / Testing Library / Cypress / Storybook",
        "Rebuilt the patient / medical-records admin dashboard. It started on the Pages Router, but as the App Router had just shipped and there was room before release, I migrated it across",
        "Used Mantine headlessly on that project and styled with Tailwind CSS to match the designer's Figma work — a setup chosen so the UI library's default look would not pull the implementation away from the design",
        "Go was new to me, but after talking through the team's capacity and task load I volunteered and implemented medical-record fetch / delete end-to-end, from the Go backend through to the frontend — deliberately widening my scope beyond frontend work",
        "Operated the electronic medical record / patient portal (CakePHP / Go): feature additions and bug fixes",
        "Built two sites single-handedly, from technical selection onward: the recruiting site (https://recruit.caps365.jp/) and the corporate-wellness business site (https://healthmanagement.caps365.jp/). The recruiting site shipped at roughly twelve pages including a headless CMS and contact forms",
        "Kept the framework and state layer (Next.js / React / Jotai) aligned with the company's other products so more people internally could read the code, and selected only the site-specific pieces from scratch — CMS, hosting and forms (microCMS / Cloudflare Pages / SSGform). Since non-engineers would run the CMS day to day, I compared Contentful, Newt and WordPress and chose microCMS on three counts: a Japanese admin UI, domestic adoption so operators could research problems themselves, and the expected article volume fitting the free tier",
        "Reused that stack and the operations documentation on the second site, cutting the cost of standing it up",
      ],
    },
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Jotai",
      "MUI",
      "Mantine",
      "Tailwind CSS",
      "GraphQL",
      "Apollo Client",
      "Go",
      "GCP",
      "microCMS",
      "Cloudflare Pages",
      "SSGform",
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
