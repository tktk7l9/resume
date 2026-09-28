import { isLocale, type Locale } from "@/i18n/config";

/**
 * Same page in another language: "/ja/contact" -> "/en/contact".
 * Anything without a known locale prefix falls back to the locale top.
 */
export function switchLocalePath(
  pathname: string | null,
  nextLocale: Locale,
): string {
  const [, first, ...rest] = (pathname ?? "").split("/");
  if (!first || !isLocale(first)) return `/${nextLocale}`;
  return ["", nextLocale, ...rest].join("/");
}
