"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, locales } from "@/i18n/config";
import { switchLocalePath } from "@/lib/locale-path";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  ariaLabel: string;
};

export function LanguageSwitcher({
  locale,
  label,
  ariaLabel,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const nextLocale = locales.find((l) => l !== locale) ?? locale;

  return (
    <Link
      href={switchLocalePath(pathname, nextLocale)}
      hrefLang={nextLocale}
      // The label is written in the target language ("English" on the ja page).
      lang={nextLocale}
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center min-h-11 px-3 rounded-md border border-border bg-card text-foreground hover:bg-accent transition-colors text-sm font-medium"
    >
      {label}
    </Link>
  );
}
