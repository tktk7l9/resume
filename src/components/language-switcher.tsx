import { type Locale, locales } from "@/i18n/config";
import Link from "next/link";

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
  const nextLocale = locales.find((l) => l !== locale) ?? locale;

  return (
    <Link
      href={`/${nextLocale}`}
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center h-9 px-3 rounded-md border border-border bg-card text-foreground hover:bg-accent transition-colors text-sm font-medium"
    >
      {label}
    </Link>
  );
}
