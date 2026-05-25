import { ContactForm } from "@/components/contact-form";
import { type Locale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ArrowLeftIcon, MailIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        ja: "/ja/contact",
        en: "/en/contact",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      url: `${url}/${locale}/contact`,
      siteName: dict.meta.title,
      title: dict.contact.metaTitle,
      description: dict.contact.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.contact.metaTitle,
      description: dict.contact.metaDescription,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  return (
    <section id="contact" className="mb-10 scroll-mt-24">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
        <span className="text-muted-foreground">
          <MailIcon className="w-5 h-5" />
        </span>
        <h2 className="text-xl font-bold text-foreground">
          {dict.contact.pageTitle}
        </h2>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        {dict.contact.description}
      </p>

      <ContactForm locale={locale} dict={dict.contact} />

      <div className="mt-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {dict.contact.backToResume}
        </Link>
      </div>
    </section>
  );
}
