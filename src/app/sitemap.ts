import { locales } from "@/i18n/config";
import type { MetadataRoute } from "next";

const base = "https://resume-tktk7l9.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${base}/${locale}`]),
  );

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
