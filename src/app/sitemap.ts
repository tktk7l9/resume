import { locales } from "@/i18n/config";
import type { MetadataRoute } from "next";

const base = "https://resume-tktk7l9.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const rootLanguages = Object.fromEntries(
    locales.map((locale) => [locale, `${base}/${locale}`]),
  );
  const contactLanguages = Object.fromEntries(
    locales.map((locale) => [locale, `${base}/${locale}/contact`]),
  );

  return [
    ...locales.map((locale) => ({
      url: `${base}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages: rootLanguages },
    })),
    ...locales.map((locale) => ({
      url: `${base}/${locale}/contact`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
      alternates: { languages: contactLanguages },
    })),
  ];
}
