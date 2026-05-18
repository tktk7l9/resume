import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { type Locale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

const url = "https://resume-tktk7l9.vercel.app";

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
    metadataBase: new URL(url),
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
      url: `${url}/${locale}`,
      siteName: dict.meta.title,
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
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

  return (
    <div lang={locale} className="flex flex-1 flex-col">
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
