import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { profile } from "@/data/profile";
import { isLocale, type Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    return {};
  }
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ja: "/ja",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      url: `${siteUrl}/${locale}`,
      siteName: dict.meta.title,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: dict.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName[locale],
    alternateName: profile.fullName[locale === "ja" ? "en" : "ja"],
    url: `${siteUrl}/${locale}`,
    email: `mailto:${profile.email}`,
    jobTitle: dict.meta.headline,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.address[locale],
      addressCountry: "JP",
    },
    sameAs: [profile.githubUrl, profile.linkedinUrl, profile.portfolioUrl],
  };

  return (
    <div lang={locale} className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale={locale} dict={dict} />
      <div className="flex-1">
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 py-8 gap-8">
          <Sidebar locale={locale} dict={dict} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
