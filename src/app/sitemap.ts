import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const rootLanguages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}`]),
  );
  const contactLanguages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}/contact`]),
  );

  return [
    ...locales.map((locale) => ({
      url: `${siteUrl}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages: rootLanguages },
    })),
    ...locales.map((locale) => ({
      url: `${siteUrl}/${locale}/contact`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
      alternates: { languages: contactLanguages },
    })),
  ];
}
