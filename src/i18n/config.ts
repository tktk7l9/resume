export const locales = ["ja", "en"] as const;
export const defaultLocale = "ja" satisfies Locale;

export type Locale = (typeof locales)[number];

export type Localized<T> = Record<Locale, T>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
