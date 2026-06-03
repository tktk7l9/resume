import type { Localized } from "@/i18n/config";

export type SkillCategory = {
  title: Localized<string>;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: {
      ja: "プログラミング言語",
      en: "Languages",
    },
    skills: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: {
      ja: "フレームワーク / ライブラリ",
      en: "Frameworks / Libraries",
    },
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Mantine",
      "shadcn/ui",
      "Zustand",
      "Jotai",
      "zod",
      "GraphQL",
    ],
  },
  {
    title: {
      ja: "データベース / クラウド",
      en: "Databases / Cloud",
    },
    skills: [
      "PostgreSQL",
      "MySQL",
      "GCP",
      "AWS",
      "Cloudflare",
      "Firebase",
      "Docker",
    ],
  },
  {
    title: {
      ja: "ツール",
      en: "Tooling",
    },
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "VS Code",
      "Storybook",
      "Vitest",
      "Jest",
      "Testing Library",
      "Webpack",
      "Vite",
      "microCMS",
      "Figma",
      "Slack",
      "Notion",
      "Confluence",
      "Jira",
      "Asana",
      "Claude Code",
      "ChatGPT",
      "GitHub Copilot",
    ],
  },
  {
    title: {
      ja: "その他",
      en: "Practices",
    },
    skills: [
      "アジャイル",
      "スクラム",
      "CI/CD",
      "Lighthouse",
      "Web Vitals",
      "アクセシビリティ（WCAG / HIG）",
    ],
  },
];
