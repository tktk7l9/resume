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
      "GraphQL",
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
      "Storybook",
      "Vitest",
      "Jest",
      "Testing Library",
      "Docker",
      "Webpack",
      "Vite",
      "Slack",
      "Figma",
      "Notion",
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
