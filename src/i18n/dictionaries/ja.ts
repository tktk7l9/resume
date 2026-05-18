const dictionary = {
  meta: {
    title: "齋藤拓也のresume",
    description:
      "フロントエンドエンジニア 齋藤拓也の職務経歴書。Next.js・React・TypeScriptを中心としたWebアプリ開発の経歴とスキルを掲載。",
    headline: "フロントエンドエンジニア（業務委託）",
  },
  nav: {
    about: "自己紹介",
    timeline: "経歴",
    projects: "個人開発",
    skills: "スキル",
    languages: "言語",
    contact: "連絡先",
    links: "リンク",
  },
  sections: {
    about: "自己紹介",
    timeline: "経歴",
    projects: "個人開発",
    skills: "スキル",
    languages: "言語",
  },
  timeline: {
    responsibilities: "担当範囲",
    achievements: "成果",
    present: "現在",
    yearLabel: "年",
    monthLabel: "ヶ月",
  },
  header: {
    switchLanguage: "English",
    switchLanguageAria: "Switch to English",
  },
  footer: {
    copyright: "© {year} {name}",
  },
} as const;

export default dictionary;
export type Dictionary = typeof dictionary;
