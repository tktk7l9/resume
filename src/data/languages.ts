import type { Localized } from "@/i18n/config";

export type LanguageItem = {
  name: Localized<string>;
  level: Localized<string>;
};

export const languages: LanguageItem[] = [
  {
    name: {
      ja: "日本語",
      en: "Japanese",
    },
    level: {
      ja: "ネイティブ",
      en: "Native",
    },
  },
  {
    name: {
      ja: "英語",
      en: "English",
    },
    level: {
      ja: "ビジネスレベル（TOEIC 745点）",
      en: "Business proficiency (TOEIC 745)",
    },
  },
];
