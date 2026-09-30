import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Global 404. The root layout has no locale param, so the page is bilingual:
 * each block is marked with its own language and points back to that locale's
 * résumé (SHIG 59, 60). Next's default 404 has no landmark or heading.
 */
export const metadata: Metadata = {
  title: "404 | ページが見つかりません / Page not found",
};

export default async function NotFound() {
  const dicts = await Promise.all(
    locales.map(
      async (locale) => [locale, await getDictionary(locale)] as const,
    ),
  );

  return (
    <main
      id="main"
      className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16"
    >
      {dicts.map(([locale, dict]) => {
        // One h1 per page: the default locale's block is the primary one.
        const Heading = locale === defaultLocale ? "h1" : "h2";
        return (
          <section
            key={locale}
            lang={locale}
            aria-labelledby={`not-found-title-${locale}`}
            className="w-full max-w-md rounded-lg border border-border bg-card p-6"
          >
            <p className="text-sm text-muted-foreground">404</p>
            <Heading
              id={`not-found-title-${locale}`}
              className="mt-1 text-xl font-bold text-foreground"
            >
              {dict.notFound.title}
            </Heading>
            <p className="mt-2 text-sm text-muted-foreground">
              {dict.notFound.description}
            </p>
            <Link
              href={`/${locale}`}
              className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm text-foreground underline underline-offset-4 hover:opacity-80"
            >
              <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
              {dict.notFound.backToResume}
            </Link>
          </section>
        );
      })}
    </main>
  );
}
