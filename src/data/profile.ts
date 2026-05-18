import type { Localized } from "@/i18n/config";

export const profile = {
  fullName: {
    ja: "齋藤 拓也",
    en: "Takuya Saito",
  } satisfies Localized<string>,
  email: "saitotakuya0719@gmail.com",
  address: {
    ja: "東京都多摩市",
    en: "Tama, Tokyo, Japan",
  } satisfies Localized<string>,
  githubUrl: "https://github.com/tktk7l9",
  linkedinUrl: "https://linkedin.com/in/tktk7l9",
  portfolioUrl: "https://my-apps-portal-tau.vercel.app/",
} as const;
